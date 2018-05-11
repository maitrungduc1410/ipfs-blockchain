<template>
	<MainLayout>
		<div class="block-detail">
			<div class="block-detail-container">
				<div class="block-detail-main-content">
					<div class="content-header">
						<div class="title">
							<h2>
								Block Detail
							</h2>
						</div>
					</div>
					<div class="content-body">
						<div class="block-hash">
							Hash: <span>{{ data.hash }}</span>
						</div>
						<div class="button-actions">
							<button class="button is-primary">{{ countConfirmation }}</button>
							<button class="button is-success">{{ data.gasUsed }} gas used</button>
						</div>
						<div class="block-info">
							<div class="columns block-summary">
								<div class="column">
									<b>Summary</b>
								</div>
							</div>
							<div class="columns block-number">
								<div class="column is-4">
									Block Number
								</div>
								<div class="column is-8">
									{{ data.number }}
								</div>
							</div>
							<div class="columns block-number">
								<div class="column is-4">
									Received Time
								</div>
								<div class="column is-8">
									{{ $root.timeConverter(data.timestamp) }}
								</div>
							</div>
							<div class="columns block-number">
								<div class="column is-4">
									Difficulty
								</div>
								<div class="column is-8">
									{{ data.difficulty }}
								</div>
							</div>
							<div class="columns block-number">
								<div class="column is-4">
									Nonce
								</div>
								<div class="column is-8">
									{{ data.nonce }}
								</div>
							</div>
							<div class="columns block-number">
								<div class="column is-4">
									Size
								</div>
								<div class="column is-8">
									{{ data.size }} Bytes
								</div>
							</div>
							<div class="columns block-number">
								<div class="column is-4">
									Miner
								</div>
								<div class="column is-8" v-if="data.miner">
									<router-link :to="`/address/${data.miner.toLowerCase()}`" class="text-link">{{ data.miner.toLowerCase() }}</router-link>
								</div>
							</div>
							<div class="columns block-number">
								<div class="column is-4">
									Gas Limit
								</div>
								<div class="column is-8">
									{{ data.gasLimit }}
								</div>
							</div>
							<div class="columns block-number">
								<div class="column is-4">
									Data
								</div>
								<div class="column is-8">
									{{ data.extraData }}
								</div>
							</div>
							<div class="columns block-number">
								<div class="column is-4">
									Data (Translated)
								</div>
								<div class="column is-8" v-if="data.extraData">
									{{ hex2a(data.extraData) }}
								</div>
							</div>
						</div>
						<div class="transaction-info">
							<div class="content-header" style="margin-top: 15px;">
								<div class="title">
									<h2>
										Transactions<span> - contained in current block</span>
									</h2>
								</div>
							</div>
							<div v-for="(transaction, index) in data.transactions">
								<TransactionItem :data="transaction" :index="index"></TransactionItem>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</MainLayout>
</template>

<script>
	import TransactionItem from './TransactionItem.vue'
	export default {
		components: {
			TransactionItem
		},
		data() {
			return {
				data: {},
				currentHighestBlock: {}
			}
		},
		created() {
			let self = this
			setTimeout(function() {
				self.getBlock(self.$route.params.blockId)
				self.getBlock('latest')
			}, 1000)
		},
		methods: {
			getBlock(blockNumber) {
				let self = this
				self.$root.web3.eth.getBlock(blockNumber, function(error, result){
				    if(!error) {
				        if(blockNumber === 'latest') {
				        	self.currentHighestBlock = result
				        }
				        else {
				        	self.data = result
				        }
				    }
				    else {
				        console.error(error)
				    }
				})
			},
			hex2a(hexx) {
			    var hex = hexx.toString();//force conversion
			    var str = '';
			    for (var i = 0; i < hex.length; i += 2)
			        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
			    return str;
			}
		},
		computed: {
			countConfirmation() {
				var count = this.currentHighestBlock.number - this.data.number
				count = count.toString() + ' Confirmation'
				return count
			}
		}
	}
</script>

<style lang="scss" scoped>
	.block-detail {
		.block-detail-container {
			.header {
			    border-bottom: solid 1px #ddd;
			    padding-bottom: 10px;
			}
			.block-detail-main-content {
				padding: 25px;
				.content-header {
					display: flex;
					.title {
						flex: 5;
					}
				}
				.content-body {
					padding: 30px;
					.block-hash {
						span {
							color: #0089ff;
							cursor: pointer;
							&:hover {
								text-decoration: underline;	
							}
						}
					}
					.button-actions {
						text-align: right
					}
				}
			}
		}
	}
	.text-link {
		color: #0089ff;
		cursor: pointer;
		&:hover {
			text-decoration: underline;	
		}
	}
</style>