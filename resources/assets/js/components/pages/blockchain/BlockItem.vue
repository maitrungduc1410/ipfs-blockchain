<template>
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
						<button class="button is-primary">Unconfirmed</button>
						<button class="button is-success">0 gas used</button>
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
								{{ data.timestamp }}
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
								{{ data.size }}
							</div>
						</div>
						<div class="columns block-number">
							<div class="column is-4">
								Miner
							</div>
							<div class="column is-8">
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
							<div class="column is-8">
								{{ hex2a(data.extraData) }}
							</div>
						</div>
					</div>
					<div class="transaction-info">
						<div v-for="(transaction, index) in data.transactions">
							<TransactionItem :data="transaction" :index="index"></TransactionItem>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import TransactionItem from './TransactionItem.vue'
	export default {
		components: {
			TransactionItem
		},
		props: ['data'],
		methods: {
			hex2a(hexx) {
			    var hex = hexx.toString();//force conversion
			    var str = '';
			    for (var i = 0; i < hex.length; i += 2)
			        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
			    return str;
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