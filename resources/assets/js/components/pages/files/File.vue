<template>
	<MainLayout>
		<div class="file">
			<div class="file-container">
				<div class="file-main-content">
					<div class="content-header">
						<div class="title">
							<h2>
								Files
							</h2>
						</div>
					</div>
					<div class="content-body">
						<div class="breadcrumb-section">
							<nav class="breadcrumb" aria-label="breadcrumbs">
							    <ul>
								    <li v-for="(item, index) in currentDirectory" @click="jumpToDirectory(index)"><a href="#">{{ item == '/' ? 'Root' : item }}</a></li>
								    <li v-if="currentFileToView.length"><a href="#">{{ currentFileToView }}</a></li>
							    </ul>
							</nav>
						</div>
						<div v-if="!viewFile">
							<div class="columns is-multiline">
								<div class="column is-6">
									<button @click="makeDirectory" class="button is-outlined is-info is-small"><i class="fa fa-plus"></i> Create folder</button>
								</div>
								<div class="column is-2">
									<button class="button is-outlined is-primary is-small" @click="uploadFile" @change="onFileChange">
										<i class="fa fa-plus"></i> Upload
										<input id="upload_form" type="file" style="display: none;">
									</button>
								</div>
								<div class="column is-4">
									<div class="field" style="padding-top: 4px;">
							            <b-checkbox>Encrypted upload</b-checkbox>
							        </div>
								</div>
								<div class="column is-6">
									Name
								</div>
								<div class="column is-2">
									Size
								</div>
								<div class="column is-4">
									Actions
								</div>
							</div>
							<div v-if="currentFilesInDirectory.length">
								<div class="columns file-item" :class="item.isSelected == true ? 'selected' : ''" v-for="item in currentFilesInDirectory" @dblclick="listFileInDirectory(item)" @click="selectItem(item)" @contextmenu.prevent="openContextMenu(item, $event)">
									<div class="column is-6">
										<span style="display: flex;" class="file-info">
											<i class="pe-7s-file" v-if="item.type == 'file'"></i>
											<i class="pe-7s-folder" v-else></i>
											<span v-if="!item.isRename">{{ item.name }}</span>
											<span v-else style="width: 100%;">
												<b-field>
										            <b-input v-model="item.name"></b-input>
										        </b-field>
										    </span>
										</span>
									</div>
									<div class="column is-2">
										<b>{{ item.size }} B</b>
									</div>
									<div class="column is-4" v-if="item.isRename == false">
										<button class="button is-success is-outlined is-small" @click.stop="editItem(item)">
											<i class="pe-7s-pen">
											</i>
											Edit
										</button>
										<button class="button is-info is-outlined is-small" @click.stop="moveItem(item, 'move')">
											<i class="pe-7s-right-arrow">
											</i>
											Move
										</button>
										<button class="button is-primary is-outlined is-small">
											<i class="pe-7s-copy-file">
											</i>
											Copy
										</button>
										<b-modal :active.sync="isShowMoveModal" has-modal-card>
								            <modal-move @closeModal="closeModal" :currentSelectedItem="currentSelectedItem" :currentDirectory="currentDirectory"></modal-move>
								        </b-modal>
										<button class="button is-danger is-outlined is-small" @click.stop="deleteItem(item)">
											<i class="pe-7s-trash">
											</i>
											Delete
										</button>
									</div>
									<div class="column is-4" v-else>
										<button class="button is-info is-outlined is-small" @click.stop="saveItem(item)">
											<i class="pe-7s-file">
											</i>
											Save
										</button>
										<button class="button is-danger is-outlined is-small" @click.stop="cancelEdit(item)">
											<i class="pe-7s-close">
											</i>
											Cancel
										</button>
									</div>
								</div>
							</div>
							<div v-else>
								<b-notification type="is-warning">
						            There's no file/folder in this directory
						        </b-notification>
								
							</div>
						</div>
						<div v-else class="view-file">
							<img id="photo" src="">
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="context-menu">
			<div class="context-menu-container">
				<div class="context-item">
					<i class="pe-7s-plus"></i>Rename
				</div>
				<div class="context-item">
					<i class="pe-7s-trash"></i>Delete
				</div>
				<div class="context-item" v-clipboard="currentSelectedItem.hash ? currentSelectedItem.hash.toString() : ''" @success="handleSuccess" @error="handleError">
					<i class="pe-7s-copy-file"></i>Copy Hash</div>
				<div class="context-item" @click="viewInTransaction">
					<i class="pe-7s-credit"></i>View in Transaction
				</div>
			</div>
		</div>
	</MainLayout>
</template>

<script>
	import {cloneDeep} from 'lodash'
	import ModalMove from './ModalMove.vue'
	var Buffer = require('buffer/').Buffer
	export default {
		components: {
			ModalMove
		},
		data() {
			return {
				copyData: 'hehehee',
				currentFilesInDirectory: [],
				currentDirectory: ['/'],
				currentFileToView: '',
				currentSelectedItem: {},
				viewFile: false,
				isEditSomeFile: false,
				previousVersionItem: {},
				isShowMoveModal: false,
				fileJustCreated: {
					status: '',
					name: ''
				},
				receiptOfBlockMined: [],
				checkForLoopOneTime: false
			}
		},
		created() {
			this.listFileInDirectory()
			let self = this
			this.$bus.on('blockMined', receipt => {
				self.receiptOfBlockMined.push(receipt)
				self.renameAfterMining(self.receiptOfBlockMined)
			})
		},
		methods: {
			handleSuccess() {
				this.$toast.open({
                    message: 'Copied hash to Clipboard!',
                    type: 'is-success'
                })
			},
			handleError() {
				this.$toast.open({
                    message: 'Error when copy to clipboard',
                    type: 'is-danger'
                })
			},
			openContextMenu(item, event) {
			    console.log(event.pageX + "," + event.pageY)
			    $(".context-menu").css("left",event.pageX)
			    $(".context-menu").css("top",event.pageY)
			    $(".context-menu").fadeIn(200, this.startFocusOut())
			    this.selectItem(item)
			},
			startFocusOut(){
			    $(document).on("click",function(){
				    $(".context-menu").hide();        
				    $(document).off("click");
			    });
			},
			selectItem(item) {
				if(this.isEditSomeFile) {
					return
				}
				this.currentFilesInDirectory.forEach(item => {
            		item.isSelected = false
            	})
            	item.isSelected = true
            	this.currentSelectedItem = item
            	this.$forceUpdate()
			},
			listFileInDirectory(item = {}) {
				if(this.isEditSomeFile) {
					return
				}
				let self = this
				if(item && item.name && item.type == 'directory') {
					self.currentDirectory.push(item.name)
				}
				
				let path = self.currentDirectory.join('/')

				if(item && item.type == 'file') {
					path += '/' + item.name
					self.$root.ipfsApi.files.read(path, function (err, buf) {
					    var blob = new Blob( [ buf ], { type: "image/jpeg" } );
					    var urlCreator = window.URL || window.webkitURL;
					    var imageUrl = urlCreator.createObjectURL( blob );
					    var img = document.querySelector( "#photo" );
					    img.src = imageUrl;
					})
					self.viewFile = true
					self.currentFileToView = item.name
					return
				}
				
				self.$root.ipfsApi.files.ls(path, function (err, files) {
				    self.currentFilesInDirectory = files
				    self.currentFilesInDirectory.forEach(item => {
				    	self.getFileStat(item)
				    	item.isRename = false
				    	item.isSelected = false
				    })
				})
			},
			getFileStat(item) {
				let path = this.currentDirectory.join('/')


				if(this.currentDirectory.length > 1) {
					path = path.substr(1)
					path += '/' + item.name
				}
				else {
					path += item.name
				}

				let self = this
				self.$root.ipfsApi.files.stat(path, function (err, stats) {
					item.size = stats.cumulativeSize
					item.hash = stats.hash
					item.type = stats.type

					if(self.fileJustCreated.status === 'create' || self.fileJustCreated.status === 'delete') {
						self.currentFilesInDirectory.forEach(item => {
							if(self.fileJustCreated.status === 'create') {
								if(item.name === self.fileJustCreated.name) {
									self.$root.saveIntoTransaction(self.fileJustCreated.status, item, 500)
									self.receiptOfBlockMined.push(item)
									self.fileJustCreated.status = ''
								}
							}
							else {
								if(item.name === self.currentSelectedItem.name) {
									self.$root.saveIntoTransaction(self.fileJustCreated.status, item, 500)
									self.receiptOfBlockMined.push(item)
									self.fileJustCreated.status = ''
								}
							}
						})
					}
					else if (self.fileJustCreated.status === 'rename') {
						self.currentFilesInDirectory.forEach(item => {
							if(item.name === self.currentSelectedItem.name) {
								if(self.checkForLoopOneTime === false) {
									self.checkForLoopOneTime = true
									let dataToSave = {
										hash: self.currentSelectedItem.hash,
										name: self.currentSelectedItem.name,
										oldName: self.removeNamePrefix(self.previousVersionItem.name),
										newName: self.removeNamePrefix(self.currentSelectedItem.name),
										size: self.currentSelectedItem.size,
										type: self.currentSelectedItem.type
									}
									self.$root.saveIntoTransaction(self.fileJustCreated.status, dataToSave, 500)
									self.receiptOfBlockMined.push(item)
									self.fileJustCreated.status = ''
								}
							}
						})
					}
				})
			},
			jumpToDirectory(index) {
				let self = this
				if(self.viewFile == true) {
					self.viewFile = false
					self.currentFileToView = ''
				}
				for(let i = 0; i < self.currentDirectory.length - index - 1; i++) {
					self.currentDirectory.pop()
				}
				let path = this.currentDirectory.join('/')
				self.$root.ipfsApi.files.ls(path, function (err, files) {
				    self.currentFilesInDirectory = files
				    self.currentFilesInDirectory.forEach(item => {
				    	self.getFileStat(item)
				    	item.isRename = false
				    	item.isSelected = false
				    })
				})
			},
			makeDirectory() {
				this.isEditSomeFile = true
				this.currentFilesInDirectory.push({
					hash: '',
					name: '',
					size: '',
					type: 'directory',
					isRename: true
				})
			},
			saveDirectory(item) {
				item.isRename = false
				let path = this.currentDirectory.join('/') + '/' + item.name
				this.$root.ipfsApi.files.mkdir(path, (err) => {
				    if (err) {
				        console.error(err)
				    }
				})
			},
			uploadFile() {
				document.getElementById('upload_form').click();
			},
			onFileChange(e) {
                let files = e.target.files || e.dataTransfer.files
                if (!files.length) return
            	let path = this.currentDirectory.join('/') + '/' + files[0].name

            	var reader = new FileReader();
            	let self = this
			    reader.onload = function(){
			        var arrayBuffer = this.result;
			        path = path.substr(1)
			        self.$root.ipfsApi.files.write(path, Buffer.from(arrayBuffer), {create: true}, (err, result) => {
			        	if(!err) {
			        		self.fileJustCreated.status = 'create'
			        		self.fileJustCreated.name = files[0].name
			        		self.$bus.emit('fileAction', 'create')
			        		self.listFileInDirectory()
			        	}
					})
			    }
			    reader.readAsArrayBuffer(files[0])
            },
            editItem(item) {
            	this.currentFilesInDirectory.forEach(item => {
            		item.isRename = false
            	})
            	this.isEditSomeFile = true
            	item.isRename = true
            	this.currentSelectedItem = item
            	this.previousVersionItem = _.cloneDeep(item)
            	this.checkForLoopOneTime = false
            	this.$forceUpdate()
            },
            cancelEdit(item) {
            	item.isRename = false
            	this.isEditSomeFile = false
            	item.name = this.previousVersionItem.name
            	this.$forceUpdate()
            },
            saveItem(item) {
            	let self = this
            	let path = this.currentDirectory.join('/')
            	let oldPath = path + '/' + this.previousVersionItem.name
            	let newPath = path + '/' + item.name
            	this.$root.ipfsApi.files.mv([oldPath, newPath], (err) => {
				    if (!err) {
				    	self.fileJustCreated.status = 'rename'
				    	self.$bus.emit('fileAction', 'rename')
				        self.listFileInDirectory()
				    }
				})
				item.isRename = false
            	this.isEditSomeFile = false
            	this.$forceUpdate()
            	this.$toast.open({
                    message: `Cập nhật thành công`,
                    position: 'is-bottom-right',
                    type: 'is-success'
                })
            },
            deleteItem(item) {
            	this.currentSelectedItem = item
            	this.$dialog.confirm({
                    title: 'Xoá tệp tin/thư mục',
                    message: `Bạn có chắc muốn xoá tệp/thư muc <b>${item.name}</b>`,
                    confirmText: 'Xoá',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => {
                    	let self = this
                    	let path = self.currentDirectory.join('/')
		            	path += '/' + item.name
		            	// To remove a file
		            	if(item.type == 'file') {
							self.$root.ipfsApi.files.rm(path, (err) => {
							    if (err) {
							    	console.error(err)
							    }
							})
						}
						else {
							self.$root.ipfsApi.files.rm(path, { recursive: true }, (err) => {
							    if (err) {
							    	console.error(err)
							    }
							})
						}
						self.$toast.open({
		                    message: `Xoá tệp/thư mục thành công`,
		                    position: 'is-bottom-right',
		                    type: 'is-success'
		                })

		                self.fileJustCreated.status == 'delete'
		                self.$bus.emit('fileAction', 'delete')
		                self.listFileInDirectory()
                    }
                })
            },
            moveItem(item, type) {
            	this.isShowMoveModal = true
            	this.isEditSomeFile = true
            	this.currentSelectedItem = item
            	this.currentSelectedItem.selectedFor = type
            	this.$forceUpdate()
            	// let path = this.currentDirectory.join('/')
            },
            closeModal() {
            	this.isEditSomeFile = false
            },
            renameAfterMining(arrayOfInfo) {
            	let self = this
            	let item = arrayOfInfo[0]
            	console.log(arrayOfInfo)
        		let blockNumber = arrayOfInfo[1].blockNumber.toString() + '.' + arrayOfInfo[1].transactionIndex.toString()
        		var newName = ''
        		if(this.$root.fileAction === 'create') {
        			newName = '[' + blockNumber.toString() + ']' + item.name
        		}
        		else {
        			newName = self.removeNamePrefix(item.name)
					newName = '[' + blockNumber.toString() + ']' + newName
        		}
            	let path = this.currentDirectory.join('/')
            	let oldPath = path + '/' + item.name
            	let newPath = path + '/' + newName
            	this.$root.ipfsApi.files.mv([oldPath, newPath], (err) => {
				    if (!err) {
				        self.listFileInDirectory()
				    }
				})
				this.receiptOfBlockMined = []
            },
            removeNamePrefix(name) {
            	var name_splice = name
				var index = 0
				for(var i = 0; i < name_splice.length; i++) {
				  if(name_splice[i] === ']') {
				  index = i
				        break
				  }
				}
				var final_name = name_splice
				name_splice = name_splice.slice(0, index + 1)
				final_name = final_name.replace(name_splice, '')
				return final_name
            },
            viewInTransaction() {
            	var name_splice = this.currentSelectedItem.name
            	var index = 0
				for(var i = 0; i < name_splice.length; i++) {
				  if(name_splice[i] === ']') {
				  index = i
				        break
				  }
				}
				name_splice = name_splice.slice(0, index + 1).replace('[', '').replace(']', '')
				name_splice = name_splice.split('.')
				
				let self = this
				let block
				self.$root.web3.eth.getBlock(name_splice[0], function(error, result){
				    if(!error) {
				        block = result
				        self.$router.push(`/transaction/${block.transactions[Number(name_splice[1])]}`)
				    }
				    else {
				        console.error(error)
				    }
				})
            }
		}
	}
</script>

<style lang="scss" scoped>
	.file {
		.file-container {
			width: 100%;
			.header {
			    border-bottom: solid 1px #ddd;
			    padding-bottom: 10px;
			}
			.file-main-content {
				padding: 25px;
				.content-header {
					display: flex;
					.title {
						flex: 5;
					}
				}
				.content-body {
					margin: 50px;
				}
			}
		}
	}
	.file-item {
		transition: all 200ms;
		cursor: pointer;
		&:hover {
			background: #eee;
		}
	}
	.selected {
		background: #eee;
	}	
	.view-file {
		text-align: center;
		#photo {
			width: 300px
		}
	}
	.file-info {
		i {
		    margin-top: 3px;
		    margin-right: 5px;
		}
	}
	button {
		i {
			margin-right: 3px;
		}
	}
	.context-menu{
		display:none;
		position:fixed;
	    border: 1px solid #daecfb;
		width:195px;      
		background:#F9F9F9;
		box-shadow: 3px 3px 2px #E9E9E9;
		border-radius:3px;
		.context-menu-container {
			.context-item {
				transition: all 200ms;
				padding: 5px;
				color: #009dff;
				font-size: 18px;
				&:hover {
					background: #019dff24;
				}
				i {
				    margin-right: 5px;
				}
			}
			.context-item:not(:first-child):not(:last-child) {
				border-top: solid 1px #eee;
				border-bottom: solid 1px #eee;
			}
		}
	}
</style>