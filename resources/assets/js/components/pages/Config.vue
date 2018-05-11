<template>
	<MainLayout>
		<div class="config">
			<div class="config-container">
				<div class="config-main-content">
					<div class="content-header">
						<div class="title">
							<h2>
								Configuration Setup
							</h2>
						</div>
					</div>
					<div class="content-body">
						<div class="action-buttons">
							<button class="button is-success is-medium"><i class="pe-7s-refresh-2"></i>RESET</button>
							<button class="button is-info is-medium"><i class="pe-7s-diskette"></i>SAVE</button>
						</div>
						<b-field label="Config">
				            <b-input type="textarea" v-model="currentConfigText" rows="20"></b-input>
				        </b-field>
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
				currentConfig: {},
				currentConfigText: ''
			}
		},
		created() {
			this.getCurrentConfig()
		},
		methods: {
			getCurrentConfig() {
				this.$root.ipfsApi.config.get((err, config) => {
				    if (err) {
				    	throw err
				    }
				    this.currentConfig = JSON.parse(config)
				    this.currentConfigText = config.toString('utf-8')
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.config {
		.config-container {
			.header {
			    border-bottom: solid 1px #ddd;
			    padding-bottom: 10px;
			}
			.config-main-content {
				padding: 25px;
				.content-header {
					display: flex;
					.title {
						flex: 5;
					}
				}
				.content-body {
					margin-top: 30px;
					.action-buttons {
						text-align: right;
					}
				}
			}
		}
	}
</style>