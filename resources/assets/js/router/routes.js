import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
	mode: 'history',
    // base: '/app',
    linkActiveClass: 'active',
	routes: [
	    // { path: '/', redirect: '/pages' },
	    {
	      path: '/',
	      name: 'dashboard',
	      component: require('../components/pages/Dashboard.vue')
	    },
	    {
	      path: '/connections',
	      name: 'connections',
	      component: require('../components/pages/Connections.vue')
	    },
	    {
	      path: '/files',
	      name: 'files',
	      component: require('../components/pages/files/File.vue')
	    },
	    {
	      path: '/search/:objectHash?',
	      name: 'search',
	      component: require('../components/pages/Search.vue')
	    },
	    {
	      path: '/config',
	      name: 'config',
	      component: require('../components/pages/Config.vue')
	    },
	    {
	      path: '/blockchain/view',
	      name: 'blockchain',
	      component: require('../components/pages/blockchain/Blockchain.vue')
	    },
	    {
	      path: '/block/:blockId',
	      name: 'block',
	      component: require('../components/pages/blockchain/Block.vue')
	    },
	    {
	      path: '/transaction/:transactionId',
	      name: 'transaction',
	      component: require('../components/pages/blockchain/Transaction.vue')
	    },
	    {
	      path: '/address/:address',
	      name: 'address',
	      component: require('../components/pages/blockchain/Address.vue')
	    },
    ]
})