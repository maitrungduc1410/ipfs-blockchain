<template>
		<div class="node-info">
			<div class="node-info-container">
				<div class="node-details">
					<div class="main-info" @click="getPeerDetail">
						<div style="float: right;">
							<span v-if="showSubInfo == false">
								<i  class="fa fa-angle-down" style="font-size: 25px;"></i>
							</span>
							<span v-else>
								<i class="fa fa-angle-up" style="font-size: 25px;"></i>
							</span>
						</div>
						<div class="peer-addresses">
							<div>
								<a href="#">{{ peerInfo.peer._idB58String }}</a>
							</div>
							<div style="font-size: 12px;">
								<a href="#">Latency: {{  peerInfo.latency }}</a>
							</div>
						</div>
					</div>
					<div class="sub-info" v-if="showSubInfo">
						<div class="peer-id">
							<span class="title-description">Peer ID: </span>
							<code>{{ peerInfo.peer._idB58String }}</code>
						</div>
						<br>
						<div class="location">
							<span class="title-description">Location: </span>
							<code>{{ (peerDetail.location && peerDetail.location.formatted) ? peerDetail.location.formatted : 'Loading...' }}</code>
						</div>
						<br>
						<div class="agent-version">
							<span class="title-description">Agent version: </span>
							<code>{{ peerDetail.AgentVersion }}</code>
						</div>
						<br>
						<div class="protocol-version">
							<span class="title-description">Protocol version: </span>
							<code>{{ peerDetail.ProtocolVersion }}</code>
						</div>
						<br>
						<div class="public-key">
							<div class="title-description">Public key: </div>
							<div>{{ peerDetail.PublicKey ? peerDetail.PublicKey : '' }}</div>
						</div>
						<div class="netword-addresses">
							<div class="netword-addresses-container">
								<div class="title is-5">
									NETWORK ADDRESSES
								</div>
								<div class="list-addresses" v-if="!peerDetail.Addresses">
									<div class="address-item">
									</div>
								</div>
								<div class="list-addresses" v-else>
									<div class="address-item" v-for="address in peerDetail.Addresses">
										<code>{{ address }}</code>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
</template>

<script>
	import { lookupPretty as getLocation } from 'ipfs-geoip'
	export default {
		props: ['peerInfo'],
		data() {
			return {
				showSubInfo: false,
				peerDetail: {},
				peerIPInfo: {}
			}
		},
		methods: {
			getPeerDetail() {
				console.log(this.peerInfo.addr.toString())
				if(!this.showSubInfo) {
					let self = this
					if(Object.keys(self.peerDetail).length === 0) {
						self.$http.get('http://localhost:5001/api/v0/id?arg=' + self.peerInfo.peer._idB58String + '&stream-channels=true')
						.then(response => {
							self.peerDetail = response.body

							let addr = self.peerInfo.addr.toString()
							getLocation(self.$root.ipfsApi, [addr], (err, res) => {
					            if (err) return console.error(err)
					            res = res || {}
					            self.peerDetail.location = res
					        })
						}, error => {
							console.log(error)
						})
					}
					this.showSubInfo = true
				}
				else {
					this.showSubInfo = false
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.node-info {
		.node-info-container {
			.node-details {
			    padding: 10px;
				border: solid 1px #ddd;
				border-radius: 3px;
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
			}
		}
	}
	.main-info {
		cursor: pointer;
		i {
			opacity: 0.7 ;
		}
		&:hover {
			i {
				opacity: 1;
			}
		}
	}
</style>