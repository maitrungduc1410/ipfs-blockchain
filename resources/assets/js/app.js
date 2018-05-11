
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import Layouts from './components/layouts'
import router from './router/routes'
import VueResource from 'vue-resource'
import VueClipboards from 'vue-clipboards';
import Web3 from 'web3'
import BigNumber from 'big-number'
import Bus from './lib'

Vue.use(Bus)
Vue.use(BigNumber)
Vue.use(VueClipboards)
Vue.use(Layouts)
Vue.use(Buefy)
Vue.use(VueResource)

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
const ipfsAPI = require('ipfs-api')


const app = new Vue({
    el: '#app',
    router,
    data: {
    	isSidebarOpen: true,
	    showLoading: false,
        fileAction: '',
        currentNode: {},
	    ipfsApi: ipfsAPI('localhost', '5001'),
	    web3: {},
        accounts: [
            {
                hash: '0xae1d4271debe23a4192a3488557d62ce2d2ac0ac',
                password: 'jonasbrother'
            },
            {
                hash: '0x151a8513a29464eb02fddf8a9fc184a28f5cf8f3',
                password: 'jonasbrother'
            }
        ]
    },
    created() {
        this.$bus.on('fileAction', action => {
            this.fileAction = action
        })
    },
    methods: {
        saveIntoTransaction(type, dataToSave, amountToSave) {
            let self = this

            delete dataToSave.isRename
            delete dataToSave.isSelected

            var previousBlockNumber = ''

            if(this.fileAction === 'create') {
                previousBlockNumber = null
            }
            else {
                for(let i = 0; i < dataToSave.name.length; i++) {
                    if(dataToSave.name[i] === '[')
                        continue
                    if(dataToSave.name[i] === ']')
                        break
                    previousBlockNumber += dataToSave.name[i]
                }
                dataToSave.name = this.removeNamePrefix(dataToSave.name)
            }

            dataToSave.actionType = type
            dataToSave.previousLocationOnBlockchain = previousBlockNumber
            dataToSave.nodeDidAction = this.currentNode.id

            let data = self.web3.utils.toHex(dataToSave)

            self.web3.eth.personal.unlockAccount(self.accounts[0].hash, self.accounts[0].password)
            .then(function (result) {
                self.web3.eth.sendTransaction({
                    from: self.accounts[0].hash,
                    to: self.accounts[1].hash,
                    value: amountToSave,
                    data: data
                })
                .then(function (receipt) {
                    console.log(receipt)
                    self.$bus.emit('blockMined', receipt)
                })
                .catch(function (error) { console.log("Error is:-", error); })
            })
            .catch(function (error) {
                console.log(" Error is:-", error);
            });
        },
        timeConverter(UNIX_timestamp){
            var a = new Date(UNIX_timestamp * 1000);
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var year = a.getFullYear();
            var month = months[a.getMonth()];
            var date = a.getDate();
            var hour = a.getHours();
            var min = a.getMinutes();
            var sec = a.getSeconds();
            var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
            return time;
        },
        removeNamePrefix(name) {
            var name_splice = name
            var index = 0
            for(var i = 0; i < name_splice.length; i++) {
              if(name_splice[i] === ']') {
              index = i
                    break
              }
            }
            var final_name = name_splice
            name_splice = name_splice.slice(0, index + 1)
            final_name = final_name.replace(name_splice, '')
            return final_name
        }
    },
    mounted() {
    	let web3 = new Web3();
        let eth_node_url = 'http://localhost:8545'; // TODO: remote URL
		web3.setProvider(new web3.providers.HttpProvider(eth_node_url));
        this.web3 = web3;

        let self = this
        self.ipfsApi.id(function(err, info) {
            if(err) {
                throw err
            }
            self.currentNode = info
        })
    }
});
