<template>
	<MainLayout>
		<div class="dashboard">
			<div class="dashboard-container">
				<div class="dashboard-main-content">
					<div class="content-header">
						<div class="title">
							<h2>
								Dashboard
							</h2>
						</div>
					</div>
					<div class="content-body">
						<div class="node-info">
							<div class="node-info-container">
								<div class="title is-5">
									NODE INFO
								</div>
								<div class="node-details" v-if="Object.keys(dataIdentity).length === 0">
									<div class="peer-id">
										<span class="title-description">Peer ID: </span>
									</div>
									<br>
									<div class="ip-address">
										<span class="title-description">IP address: </span>
									</div>
									<br>
									<div class="location">
										<span class="title-description">Location: </span>
									</div>
									<br>
									<div class="agent-version">
										<span class="title-description">Agent version: </span>
									</div>
									<br>
									<div class="protocol-version">
										<span class="title-description">Protocol version: </span>
									</div>
									<br>
									<div class="public-key">
										<div class="title-description">Public key: </div>
									</div>
								</div>
								<div class="node-details" v-else>
									<div class="peer-id">
										<span class="title-description">Peer ID: </span>
										<code>{{ dataIdentity.id }}</code>
									</div>
									<br>
									<!-- <div class="ip-address">
										<span class="title-description">IP address: </span>
										<span v-if="Object.keys(dataIpAddr).length !== 0">
											<code>{{ dataIpAddr.body.query ? dataIpAddr.body.query : '' }}</code>
											, 
											<code>{{ dataIpAddr.body.isp ? dataIpAddr.body.isp : ''}}</code>
										</span>
										<span v-else><i>Unknown</i></span>
									</div>
									<br>
									<div class="location">
										<span class="title-description">Location: </span>
										<span v-if="Object.keys(dataIpAddr).length !== 0">
											<code>{{ dataIpAddr.body.city ? dataIpAddr.body.city : '' }}</code>
											, 
											<code>{{ dataIpAddr.body.country ? dataIpAddr.body.country : '' }}</code>
										</span>
										<span v-else><i>Unknown</i></span>
									</div> -->
									<br>
									<div class="agent-version">
										<span class="title-description">Agent version: </span>
										<code>{{ dataIdentity.agentVersion }}</code>
									</div>
									<br>
									<div class="protocol-version">
										<span class="title-description">Protocol version: </span>
										<code>{{ dataIdentity.protocolVersion }}</code>
									</div>
									<br>
									<div class="public-key">
										<div class="title-description">Public key: </div>
										<div>{{ dataIdentity.publicKey }}</div>
									</div>
								</div>
							</div>
						</div>
						<div class="netword-addresses">
							<div class="netword-addresses-container">
								<div class="title is-5">
									NETWORK ADDRESSES
								</div>
								<div class="list-addresses">
									<div class="address-item" v-for="address in dataIdentity.addresses">
										<code>{{ address }}</code>
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
	import { lookupPretty as getLocation } from 'ipfs-geoip'
	export default {
		data() {
			return {
				dataIdentity: {}
			}
		},
		created() {
			this.getPeerInfo()
		},
		methods: {
			getPeerInfo() {
				let self = this

				self.$root.ipfsApi.id(function(err, info) {
					if(err) {
						throw err
					}
					self.dataIdentity = info
				})

				// self.$root.ipfsApi.object.data(self.dataIdentity.id, (err, data) => {
				//   if (err) {
				//     throw err
				//   }
				//   console.log(data)
				//   self.dataIpAddr = data
				// })
			},
			// getLocationFromIp() {
			// 	this.$http.get('http://ip-api.com/json')
			// 	.then(response => {
			// 		this.dataIpAddr = response
			// 		let addr = self.peerInfo.addr.toString()
			// 		getLocation(self.$root.ipfsApi, [addr], (err, res) => {
			//             if (err) return console.error(err)
			//             res = res || {}
			//             self.dataIpAddr.location = res
			//         })
			// 	}, error => {
			// 		console.log(error)
			// 	})
			// }
		}
	}
</script>

<style lang="scss" scoped>
	.dashboard {
		.dashboard-container {
			.header {
			    border-bottom: solid 1px #ddd;
			    padding-bottom: 10px;
			}
			.dashboard-main-content {
				padding: 25px;
				.content-header {
					display: flex;
					.title {
						flex: 5;
					}
				}
				.content-body {
					.node-info {
						margin-top: 30px;
						.node-info-container {
							.node-details {
							    padding: 10px;
								border: solid 1px #ddd;
								.title-description {
									font-weight: bold;
								}
								.public-key {
									&>div:not(:first-child) {
										background: #f2f6fd;
										overflow-x: scroll;
										border: solid 1px #f2f6fd;
									    border-radius: 3px;
									}
								}
							}
						}
					}
					.netword-addresses {
						margin-top: 30px;
						.netword-addresses-container {
							.list-addresses {
								padding: 10px;
								border: solid 1px #ddd;
							}
						}
					}
				}
			}
		}
	}
</style>