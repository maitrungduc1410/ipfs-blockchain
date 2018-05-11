<template>
	<MainLayout>
		<div class="address">
			<div class="address-container">
				<div class="address-main-content">
					<div class="content-header">
						<div class="title">
							<h2>
								Address <span class="title-description"> - View information about an Ethereum Address</span>
							</h2>
						</div>
					</div>
					<div class="content-body">
						<div class="columns">
							<div class="column is-4">
								Hash
							</div>
							<div class="column is-8">
								<span class="text-link">{{ $route.params.address }}</span>
							</div>
						</div>
						<div class="columns">
							<div class="column is-4">
								Balance (Wei)
							</div>
							<div class="column is-8">
								{{ accountBalance }}
							</div>
						</div>
						<div class="columns">
							<div class="column is-4">
								Balance (Ether)
							</div>
							<div class="column is-8">
								{{ convertToEther(accountBalance) }}
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
				accountBalance: 0
			}
		},
		created() {
			let self = this
			setTimeout(function() {
				self.getAccountBalance(self.$route.params.address)
			}, 1000)
		},	
		methods: {
			getAccountBalance(hash) {
				let self = this
				self.$root.web3.eth.getBalance(hash, function(err, result) {
					self.accountBalance = result
				})
			},
			convertToEther(wei) {
				return Number(wei) / 1000000000000000000
			}
		}
	}
</script>

<style lang="scss" scoped>
	.address {
		.address-container {
			.header {
			    border-bottom: solid 1px #ddd;
			    padding-bottom: 10px;
			}
			.address-main-content {
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