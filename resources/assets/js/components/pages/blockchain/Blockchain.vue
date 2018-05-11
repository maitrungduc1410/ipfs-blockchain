<template>
	<MainLayout>
		<div class="blockchain">
			<div class="blockchain-container">
				<div class="blockchain-main-content">
					<div class="content-header">
						<div class="title">
							<h2>
								Blockchain Explorer
							</h2>
						</div>
					</div>
					<div class="content-body">
						<div class="search-input-section">
							<div class="text-description">
								ENTER A HASH
							</div>
							<div class="columns">
								<div class="column is-10">
									<b-field>
							            <b-input placeholder="Tx Hash, Address or Block number" v-model="textSearch" @keyup.enter.native="search(textSearch)"></b-input>
							        </b-field>
								</div>
								<div class="column is-2">
									<button class="button is-primary" style="width: 100%;" @click="search(textSearch)">GO</button>
								</div>
							</div>
						</div>
						<div class="list-blocks" v-if="Object.keys(currentSelectedBlock).length === 0">
							<b-table
					            :data="list_blocks"
					            :striped="true"
					            :hoverable="true"
					            :loading="isLoading"
					            @click="selectBlock">

					            <template slot-scope="props">
					                <b-table-column field="block_id" label="Block #">
					                    <router-link :to="`/block/${props.row.number}`" class="block-number">{{ props.row.number }}</router-link>
					                </b-table-column>

					                <b-table-column field="size" label="Size">
					                    {{ props.row.size }} Bytes
					                </b-table-column>

					                <b-table-column field="timestamp" label="Timestamp">
					                    {{ $root.timeConverter(props.row.timestamp) }}
					                </b-table-column>

					                <!-- <b-table-column field="date" label="Date" centered>
					                    <span class="tag is-success">
					                        {{ new Date(props.row.date).toLocaleDateString() }}
					                    </span>
					                </b-table-column>

					                <b-table-column label="Gender">
					                    <b-icon pack="fas"
					                        :icon="props.row.gender === 'Male' ? 'mars' : 'venus'">
					                    </b-icon>
					                    {{ props.row.gender }}
					                </b-table-column> -->
					            </template>

					            <template slot="empty">
					                <section class="section">
					                    <div class="content has-text-grey has-text-centered">
					                        <p>
					                            <b-icon
					                                icon="emoticon-sad"
					                                size="is-large">
					                            </b-icon>
					                        </p>
					                        <p>Nothing here.</p>
					                    </div>
					                </section>
					            </template>
					        </b-table>
						</div>
						<div class="block-item" v-else>
							<BlockItem :data="currentSelectedBlock"></BlockItem>
						</div>
					</div>
				</div>
			</div>
		</div>
	</MainLayout>
</template>

<script>
	import Web3 from 'web3'
	import BlockItem from './BlockItem.vue'
	export default {
		components: {
			BlockItem
		},
		data() {
			return {
				list_blocks: [],
				currentSelectedBlock: {},
				isLoading: false,
				textSearch: '',
				isTransactionExist: false
			}
		},
		mounted() {
			let self = this
			this.isLoading = true
			setTimeout(function() {
				self.getLastestBlocks(50)
			}, 1500)
		},
		methods: {
			getLastestBlocks(numberOfBlocks) {
				let latest_block = 0
				let self = this
				self.$root.web3.eth.getBlock('latest', function(error, result){
				    if(!error){
				        latest_block = result.number
				    	for(let i = 0; i < numberOfBlocks; i++) {
							self.$root.web3.eth.getBlock(latest_block - i, function(error, result){
							    if(!error) {
							        self.list_blocks.push(result)
							    	self.isLoading = false
							    }
							    else {
							        console.error(error)
							    	self.isLoading = false
							    }
							})
						}
				    }
				    else {
				        console.error(error)
				    	self.isLoading = false
				    }
				})
			},
			selectBlock(row) {
				this.currentSelectedBlock = row
				this.$router.push(`/block/${row.number}`)
			},
			search(txt_search) {
				let self = this
				if (txt_search.length === 42)
					return self.goToAddrInfos(txt_search)
				else if(txt_search.length === 66) {
					self.$root.web3.eth.getTransaction(txt_search, function(error, result) {
						if(Object.keys(result).length !== 0) {
							self.goToTransactionInfos(txt_search)
						}
						else {
							alert('NONE')
							return self.goToBlockInfos(txt_search)
						}
					})
				}
				else if(parseInt(txt_search) > 0)
					return this.goToBlockInfos(parseInt(txt_search))
				else {
					alert('Don\'t know how to handle '+ txt_search)
				}
			},
			goToAddrInfos(requestStr) {
	            this.$router.push('/address/'+requestStr)
	        },
	        goToBlockInfos(requestStr) {
	            this.$router.push('/block/'+requestStr)
	        },
	        goToTransactionInfos (requestStr) {
	        	this.$router.push('/transaction/'+requestStr)
	        },
		}
	}
</script>

<style lang="scss" scoped>
	.blockchain {
		.blockchain-container {
			.header {
			    border-bottom: solid 1px #ddd;
			    padding-bottom: 10px;
			}
			.blockchain-main-content {
				padding: 25px;
				.content-header {
					display: flex;
					.title {
						flex: 5;
					}
				}
				.content-body {
					padding: 30px;
					.search-input-section {
				    	.text-description {
				    		margin-bottom: 10px;
				    	}
				    }
				}
			}
		}
	}
	.block-number {
		color: #0089ff;
		cursor: pointer;
		&:hover {
			text-decoration: underline;	
		}
	}
</style>