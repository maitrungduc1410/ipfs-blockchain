<template>
	<MainLayout>
		<div class="connections">
			<div class="connections-container">
				<div class="connections-main-content">
					<div class="content-header">
						<div class="peers-count">
							<h3>You're connected with: {{ list_connections.length }} peers</h3>
						</div>
						<div class="title">
							<h2>
								Connection Infomation
							</h2>
						</div>
					</div>
				</div>
				<div class="columns is-multiline" style="padding: 20px;">
					<div class="column is-6">
						<Map :listLocation="list_location" :isReCheckLocation="isReCheckLocation"></Map>  
					</div>
					<div class="column is-6">
						<div v-for="connection in list_connections" class="peer-item">
							<ConnectionItem :peerInfo="connection"></ConnectionItem>
						</div>
					</div>
				</div>
			</div>
		</div>
	</MainLayout>
</template>

<script>
	import ConnectionItem from './ConnectionItem.vue'
	import Map from './Map.vue'
	import { lookupPretty as getLocation } from 'ipfs-geoip'
	export default {
		components: {
			ConnectionItem,
			Map
		},
		data() {
			return {
				list_connections: [],
				list_location: {},
				isReCheckLocation: false,
				interValConnect: {}
			}
		},
		created() {
			let self = this
			self.getPeersConnected()
			self.interValConnect = setInterval(function(){
				self.getPeersConnected()
				self.reCheckLocation()
			}, 5000);
		},
		beforeDestroy() {
			clearInterval(this.interValConnect)
		},
		methods: {
			getPeersConnected() {
				let self = this
				self.$root.ipfsApi.swarm.peers({verbose: true}, (err, peers) => {
				    if (err) {
				    throw err
				    }
				    peers = peers.sort((a, b) => {
				        return a.peer.toB58String() > b.peer.toB58String() ? 1 : -1
				    })

				    self.list_connections = peers

				    peers.forEach((peer, i) => {
				    	peer.location = {
				    		formatted: ''
				    	}
				    	let id = peer.peer.toB58String()
				        let location = self.list_location[id]
				        if(!location) {
				        	self.isReCheckLocation = false
				        	self.list_location[id] = {}
				        	let addr = peer.addr.toString()
				        	getLocation(self.$root.ipfsApi, [addr], (err, res) => {
					            if (err) return console.error(err)
					            res = res || {}
					            peer.location = res
					            let locations = self.list_location
					            self.list_location[id] = res
					            self.list_connections[i] = peer
					        })
				        }
				        else {
				        	self.isReCheckLocation = true
				        }
				    })

				})
			},
			reCheckLocation() {
				if(!this.isReCheckLocation) {
					return
				}
				this.list_connections.forEach(peer => {
					peer.location = this.list_location[peer.peer._idB58String]
				})
				this.$forceUpdate()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.connections {
		.connections-container {
			.connections-main-content {
				padding: 25px;
			}
		}
	}
	.peer-item:not(:first-child):not(:last-child) {
	    padding: 5px 0;
	}
	.peers-count {
		float: right;
	}
</style>