<template>
	<MainLayout>
		<div class="transaction">
			<div class="transaction-container">
				<div class="transaction-main-content">
					<div class="content-header">
						<div class="title">
							<h2>
								Transaction<span class="title-description"> - View information about an Ethereum transaction</span>
							</h2>
						</div>
					</div>
					<div class="content-body">
						<div class="transaction-hash">
							<span class="text-link">{{ $route.params.transactionId }}</span>
						</div>
						<div class="address-transport columns">
							<div class="column is-4">
								<router-link :to="`/address/${transaction.from}`" class="text-link">{{ transaction.from }}</router-link>
							</div>
							<div class="column is-1" style="text-align: center;">
								<img src="https://blockchain.info/Resources/arrow_right_green.png">
							</div>
							<div class="column is-4">
								<router-link :to="`/address/${transaction.to}`" class="text-link">{{ transaction.to }}</router-link>
							</div>
							<div class="column is-2">
								{{ convertToWei(transaction.value) }} ETH
							</div>
						</div>
						<div class="buttons-info">
							<button class="button is-info">{{ countConfirmation }}</button>
							<button class="button is-success">{{ convertToWei(transaction.value) }} ETH</button>
						</div>
						<div class="block-info">
						<div class="columns block-summary">
							<div class="column">
								<b>Summary</b>
							</div>
						</div>
						<div class="columns block-number">
							<div class="column is-4">
								Block Hash
							</div>
							<div class="column is-8">
								<router-link :to="`/block/${transaction.blockHash}`" class="text-link">{{ transaction.blockHash }}</router-link>
							</div>
						</div>
						<div class="columns">
							<div class="column is-4">
								Received Time
							</div>
							<div class="column is-8">
								{{ $root.timeConverter(block.timestamp) }}
							</div>
						</div>
						<div class="columns">
							<div class="column is-4">
								Included In Block
							</div>
							<div class="column is-8">
								<router-link :to="`/block/${block.number}`" class="text-link">{{ block.number }}</router-link>
							</div>
						</div>
						<div class="columns">
							<div class="column is-4">
								Gas Used
							</div>
							<div class="column is-8">
								{{ block.gasUsed }}
							</div>
						</div>
						<div class="columns">
							<div class="column is-4">
								Gas Price
							</div>
							<div class="column is-8">
								{{ transaction.gasPrice }} WEI
							</div>
						</div>
						<div class="columns">
							<div class="column is-4">
								Transaction price
							</div>
							<div class="column is-8">
								{{ (Number(transaction.gas) * Number(transaction.gasPrice))/1000000000000000000 }} ETH
							</div>
						</div>
						<div class="columns">
							<div class="column is-4">
								Data
							</div>
							<code class="column is-8" v-if="transaction.input">
								{{  $root.web3.utils.hexToUtf8(transaction.input) }}
							</code>
						</div>
					</div>
					</div>
				</div>
			</div>
		</div>
	</MainLayout>
</template>

<script>
	export default {
		data() {
			return {
				transaction: {},
				block: {},
				currentHighestBlock: {}
			}
		},
		created() {
			let self = this
			setTimeout(function() {
				self.getTransaction(self.$route.params.transactionId)
			}, 1000)
		},
		methods: {
			getTransaction(hash) {
				let self = this
				this.$root.web3.eth.getTransaction(hash, function(error, result) {
					self.transaction = result
					self.getBlock(result.blockHash)
					self.getBlock('latest')
				})
			},
			getBlock(hash) {
				let self = this
				this.$root.web3.eth.getBlock(hash, function(error, result){
				    if(!error) {
				        if(hash === 'latest') {
				        	self.currentHighestBlock = result
				        }
				        else {
				        	self.block = result
				        }
				    }
				    else {
				        console.error(error)
				    }
				})
			},
			convertToWei(ether) {
				return Number(ether) / 1000000000000000000
			}
		},
		computed: {
			countConfirmation() {
				var count = this.currentHighestBlock.number - this.block.number
				count = count.toString() + ' Confirmation'
				return count
			}
		}
	}
</script>

<style lang="scss" scoped>
	.transaction {
		.transaction-container {
			.header {
			    border-bottom: solid 1px #ddd;
			    padding-bottom: 10px;
			}
			.transaction-main-content {
				padding: 25px;
				.content-header {
					display: flex;
					.title {
						flex: 5;
						.title-description {
							font-size: 18px;
						}
					}
				}
				.content-body {
					padding: 30px;
					.address-transport {
						font-size: 14px;
						margin-top: 20px;
					    text-align: center;
					}
					.buttons-info {
						text-align: right;
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