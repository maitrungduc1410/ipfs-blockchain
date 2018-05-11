<template>
	<MainLayout>
		<div class="search">
			<div class="search-container">
				<div class="search-main-content">
					<div class="content-header">
						<div class="title">
							<h2>
								Search in DAG
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
							            <b-input v-model="hashInput"></b-input>
							        </b-field>
								</div>
								<div class="column is-2">
									<button class="button is-primary" style="width: 100%;" @click="searchDAG(hashInput)">GO</button>
								</div>
							</div>
						</div>
						<div class="object-information">
							<div class="text-description">
								<div class="text-right">
									<a target="_blank" :href="'https://gateway.ipfs.io/ipfs/' + hashInput" class="button is-primary is-outlined"><i class="pe-7s-file"></i>RAW</a>
									<a target="_blank" :href="'https://gateway.ipfs.io/ipfs/' + hashInput" class="button is-danger is-outlined"><i class="pe-7s-file"></i>DOWNLOAD</a>
								</div>
								<div class="text-left">
									OBJECT
								</div>
							</div>
							<div class="info-section">
								<div class="info-section-container">
									<div class="object-link">
										<div class="columns">
											<div class="column is-5">
												<b>OBJECT LINK</b>
											</div>
										</div>
									</div>
									<div class="object-items">
										<div class="columns">
											<div class="column is-5">
												<b>Name</b>
											</div>
											<div class="column is-5">
												<b>Hash</b>
											</div>
											<div class="column is-2">
												<b>Size</b>
											</div>
										</div>
										<div v-if="Object.keys(nodeGet).length !== 0">
											<div class="columns item-get" v-for="item in nodeGet._json.links">
												<div class="column is-5">
													{{ item.name == '' ? '&#8826;blockObject&#8827;' : item.name }}
												</div>
												<div class="column is-5 object-multihash" @click="searchDAG(item.multihash)">
													<span>{{ item.multihash }}</span>
												</div>
												<div class="column is-2">
													{{ item.size }} B
												</div>
											</div>
										</div>
									</div>
									<div class="object-data">
										<div class="columns">
											<div class="column is-12" v-if="Object.keys(nodeGet).length !== 0">
												<b>DATA:</b>
												<br>
												<span>{{ dataLength.data }}</span>
												<div class="show-more"><span style="color: #8362c9" @click="showMore" v-if="nodeGet._json.data.toString('utf-8').length > 500">Show more</span></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</MainLayout>
</template>

<script>
	var Buffer = require('buffer/').Buffer
	export default {
		data() {
			return {
				hashInput: this.$route.params.objectHash,
				nodeGet: {},
				dataLength: {
					data: '',
					page: 1
				}
			}
		},
		mounted() {
			this.searchDAG(this.hashInput)
		},
		methods: {
			searchDAG(hash) {
				if(!hash) {
					return
				}
				this.$route.params.objectHash = hash
				this.$router.push('/search/' + hash)
				this.$root.ipfsApi.object.get(hash, (err, node) => {
				    if (err) {
					    this.$toast.open({
		                    message: `Something's error, please re-check your hash`,
		                    position: 'is-bottom-right',
		                    type: 'is-danger'
		                })
				    }
				    else {
				    	this.nodeGet = node
					    this.dataLength.data = this.nodeGet._json.data.toString("utf-8").slice(0, 500)
				    }
				})
			},
			showMore() {
				this.dataLength.page++
				this.dataLength.data = this.nodeGet._json.data.toString("utf-8").slice(0, 500 * this.dataLength.page)
			}
		},
		watch: {
			'$route.params.objectHash': function() {
				this.hashInput = this.$route.params.objectHash
				this.searchDAG(this.hashInput)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.show-more, .object-multihash {
		span {
			cursor: pointer;
			&:hover {
				color: #8362c9
			}
		}
	}
	.search {
		.search-container {
			.header {
			    border-bottom: solid 1px #ddd;
			    padding-bottom: 10px;
			}
			.search-main-content {
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
				    .object-information {
			    	    margin-top: 50px;
				    	.text-description {
				    		.text-right {
								float: right;
								a {
									text-decoration: none;
								}
								i {
									margin-right: 3px;
								}
				    		}
				    	}
				    	.info-section {
			    		    margin-top: 30px;
			    		    .info-section-container {
			    		    	padding: 10px;
							    border: solid 1px #ddd;
							    border-radius: 3px;
							    .object-link, .object-items {
							    	.columns:first-child {
							    		border-bottom: solid 1px #ddd;
							    	}
							    }
							    .object-data {
							    	margin-top: 10px;
							    	.columns {
							    		border-top: solid 1px #ddd;
							    	}
							    }
							    .object-items {
						    	    font-size: 14px;
						    	    .item-get {
						    	    	&>div {
					    	    		    white-space: nowrap;
										    overflow: hidden;
										    text-overflow: ellipsis;
						    	    	}
						    	    }
							    }
			    		    }
				    	}
				    }
				}
			}
		}
	}
</style>