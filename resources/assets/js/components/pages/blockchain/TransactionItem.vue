<template>
	<div class="transaction-item">
		<div class="transaction-item-container">
			<div class="transaction-item-main-content">
				<div class="content-body">
					<div class="block-info">
						<div class="columns block-summary">
							<div class="column">
								<b>Transaction #{{ Number(index + 1) }}</b>
							</div>
						</div>
						<div class="columns block-number">
							<div class="column is-4">
								Hash
							</div>
							<div class="column is-8">
								<router-link :to="`/transaction/${data}`" class="text-link">{{ data }}</router-link>
							</div>
						</div>
						<div class="columns">
							<div class="column is-4">
								From
							</div>
							<div class="column is-8">
								<router-link :to="`/address/${transaction.from}`" class="text-link">{{ transaction.from }}</router-link>
							</div>
						</div>
						<div class="columns">
							<div class="column is-4">
								To
							</div>
							<div class="column is-8">
								<router-link :to="`/address/${transaction.to}`" class="text-link">{{ transaction.to }}</router-link>
							</div>
						</div>
						<div class="columns">
							<div class="column is-4">
								Gas
							</div>
							<div class="column is-8">
								{{ transaction.gas }}
							</div>
						</div>
						<div class="columns">
							<div class="column is-4">
								Input
							</div>
							<div class="column is-8">
								{{ transaction.input }}
							</div>
						</div>
						<div class="columns">
							<div class="column is-4">
								Value
							</div>
							<div class="column is-8">
								{{ transaction.value }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['data', 'index'],
		data() {
			return {
				transaction: {}
			}
		},
		created() {
			this.getTransaction(this.data)
		},
		methods: {
			getTransaction(hash) {
				let self = this
				this.$root.web3.eth.getTransaction(hash, function(error, result) {
					self.transaction = result
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.transaction-item {
		.transaction-item-container {
			.header {
			    border-bottom: solid 1px #ddd;
			    padding-bottom: 10px;
			}
			.transaction-item-main-content {
				padding: 15px 0;
				.content-header {
					display: flex;
					.title {
						flex: 5;
					}
				}
				.content-body {
					.block-info {
						margin-top: 20px;
					}
					.block-info:not(:last-child) {
						padding-bottom: 20px;
					    border-bottom: solid 1px #ddd;
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