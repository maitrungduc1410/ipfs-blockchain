<template>
	<div id="sidebar-page" class="sidebar" data-color="purple" :style="$root.isSidebarOpen ? 'width: 260px;' : 'width: 64px;'">
        <div id="sidebar-wrapper-id" class="sidebar-wrapper" :style="$root.isSidebarOpen ? 'width: 260px;' : 'width: 64px;'">
            <div class="logo" style="padding: 5px;">
                <router-link class="simple-text" to="/pages">
                    <img v-if="$root.isSidebarOpen" src="/images/landingpage/logo_horizontal.png" style="height: 42px;">
                    <img v-else src="/images/landingpage/logo.png" style="height: 42px;">
                </router-link>
            </div>

            <ul class="nav nav-show" v-if="$root.isSidebarOpen">
                <li>
                    <router-link to="/" exact>
                        <i class="pe-7s-helm"></i>
                        <p>Dashboard</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/connections" exact>
                        <i class="pe-7s-global"></i>
                        <p>Connections</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/files">
                        <i class="pe-7s-file"></i>
                        <p>Files</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/search">
                        <i class="pe-7s-search"></i>
                        <p>Search</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/config">
                        <i class="pe-7s-config"></i>
                        <p>Config</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/blockchain/view">
                        <i class="pe-7s-graph1"></i>
                        <p>View blockchain</p>
                    </router-link>
                </li>
                <li class="active-pro">
                    <div class="account">
                        <img src="https://scontent.fhan2-2.fna.fbcdn.net/v/t31.0-8/11026281_639066069528859_2857659621106787279_o.jpg?_nc_cat=0&_nc_eui2=v1%3AAeGHteR0e0vd-ugy9g19Pac4KWM-iKNgiV-B9pliiUOiOgty0bVAmH-8RpLJl98PMgHIC5CJGWp8VKrvdAHF3D_SbP4I-YHXDapZd3px5zielg&oh=4075cbafd2b4529ecee85b3193d82db1&oe=5B31A663">
                        <p>
                            Mai Trung Đức <br>
                            <small>
                                <a href="/logout">Đăng xuất</a>
                            </small>
                        </p>
                    </div>
                </li>
            </ul>
            <ul class="nav nav-hide" v-else>
                <li>
                    <router-link to="/" class="hide-sidebar" exact>
                        <i class="pe-7s-helm"></i>
                    </router-link>
                </li>
                <li>
                    <router-link to="/connections" class="hide-sidebar" exact>
                        <i class="pe-7s-global"></i>
                    </router-link>
                </li>
                <li>
                    <router-link to="/files" class="hide-sidebar">
                        <i class="pe-7s-file"></i>
                    </router-link>
                </li>
                <li>
                    <router-link to="/search" class="hide-sidebar">
                        <i class="pe-7s-search"></i>
                    </router-link>
                </li>
                <li>
                    <router-link to="/config">
                        <i class="pe-7s-config"></i>
                    </router-link>
                </li>
                <li>
                    <router-link to="/blockchain/view" class="hide-sidebar">
                        <i class="pe-7s-graph1"></i>
                    </router-link>
                </li>
                <li class="active-pro">
                	<router-link to="/ass" class="hide-sidebar">
                            <i class="pe-7s-power"></i>
                    </router-link>
                </li>
            </ul>
        </div> 
        <div class="toggle-sidebar" @click="toggleSidebar">
        	<!-- <b-tooltip label="Tooltip right" position="is-right"> -->
	                <button class="button-toggle" :class="$root.isSidebarOpen ? 'is-show' : 'is-hide'"></button>
	        <!-- </b-tooltip> -->
        </div> 
    </div>
</template>

<script>
export default {
    data() {
        return {
            text: this.$root.isSidebarOpen ? 'Thu gọn' : 'Mở rộng',
        }
    },
    methods: {
        toggleSidebar() {
            if(this.$root.isSidebarOpen) {
                this.$root.isSidebarOpen = false
            }
            else {
                this.$root.isSidebarOpen = true
            }
        }
    },
    watch: {
        '$root.isSidebarOpen': function() {
            if(this.$root.isSidebarOpen) {
                this.text = 'Thu gọn'
            }
            else {
                this.text = 'Mở rộng'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .sidebar .sidebar-wrapper {
        padding-bottom: 0;
    }
    .logo {
        transition: all ease 200ms;
    }
    .account {
        position: relative;
        padding: 5px !important;
        img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-left: 10px;
            margin-top: 5px;
        }
        p {
            position: absolute;
            left: 35px;
            top: 15px;
            line-height: 20px;
        }
    }
    .sidebar {
        min-height: 665px;
        background-image: url('/images/img/sidebar-5.jpg');
        transition: width 200ms;
        z-index: 999;
        .hide-sidebar {
            display: flex;
        }
        .sidebar-wrapper {
            .nav-hide > li > a {
                padding: 10px 5px;
                margin: 5px 7px;
                i {
                    margin-left: 5px;
                }
            }
        }
        .toggle-sidebar {
            cursor: ew-resize;
            height: 100%;
            position: absolute;
            right: -16px;
            width: 16px;
            top: 0;
            &:hover {
                .button-toggle {
                    &:before { 
                        opacity: 1;
                    }
                    &:after { 
                        opacity: 1;
                    }
                }
            }
            &:hover:before {
                background: #4C9AFF;
            }
            &:before {
                content: '';
                width: 2px;
                height: 100%;
                position: absolute;
                left: -1px;
            }
            .is-hide {
                &:hover:before {
                    transform: rotate(-40deg);
                }
                &:hover:after {
                    transform: rotate(40deg);
                }
            }
            .is-show {
                &:hover:before {
                    transform: rotate(40deg);
                }
                &:hover:after {
                    transform: rotate(-40deg);
                }
            }
            .button-toggle {
                position: relative;
                top: -webkit-calc(50% - 18px);
                top: -moz-calc(50% - 18px);
                top: calc(50% - 18px);
                height: 36px;
                background: none;
                border: none;
                color: transparent;
                width: 24px;
                left: -1px;
                cursor: pointer;
                outline: none;
                &:before {
                    top: 10px;
                    transform-origin: 1px 7px;
                    -ms-transform-origin: 1px 7px;
                    -webkit-transform-origin: 1px 7px;
                    content: '';
                    background-color: #4C9AFF;
                    width: 2px;
                    border-radius: 16px;
                    height: 8px;
                    position: absolute;
                    left: 8px;
                    opacity: 0;
                    transition: -ms-transform 200ms ease-in-out,-webkit-transform 200ms ease-in-out,transform 200ms ease-in-out, opacity 300ms ease-in-out;
                    -webkit-transition: -webkit-transform 200ms ease-in-out,transform 200ms ease-in-out, opacity 300ms ease-in-out;
                    transform: rotate(0deg);
                    -ms-transform: rotate(0deg);
                    -webkit-transform: rotate(0deg);
                }
                &:after {
                    top: 16px;
                    transform-origin: 1px 1px;
                    -ms-transform-origin: 1px 1px;
                    -webkit-transform-origin: 1px 1px;
                    content: '';
                    background-color: #4C9AFF;
                    width: 2px;
                    border-radius: 16px;
                    height: 8px;
                    position: absolute;
                    left: 8px;
                    opacity: 0;
                    transition: -ms-transform 200ms ease-in-out,-webkit-transform 200ms ease-in-out,transform 200ms ease-in-out, opacity 300ms ease-in-out;
                    -webkit-transition: -webkit-transform 200ms ease-in-out,transform 200ms ease-in-out, opacity 300ms ease-in-out;
                    transform: rotate(0deg);
                    -ms-transform: rotate(0deg);
                    -webkit-transform: rotate(0deg);
                }
            }
        }
        .nav > li.active-pro {
    	    position: absolute;
		    width: 100%;
		    bottom: 15px;
        }
    }
    .nav > li > a {
        padding: 10px 15px;
        &.active {
            color: #fff;
            opacity: 1;
            background: rgba(255,255,255,.23);
        }
    }
    li > a > p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        vertical-align: middle;
    }
    .nav-mobile-menu {
        display: none !important;
    }
    .collapse {
        height: 64px;
    }
    .collapsed-in {
        background-image: url(/images/img/sidebar-5.jpg);
        background-size: cover;
        background-position: center center;
    }
    .collapsing-in {
        animation: collapsingIn .5s;
        background-image: url(/images/img/sidebar-5.jpg);
        background-size: cover;
        background-position: center center;
    }
    @keyframes collapsingIn {
        from {height: 64px;}
        to {height: 100%;}
    }
    .collapsing-out {
        animation: collapsingOut .5s;
        background-image: url(/images/img/sidebar-5.jpg);
        background-size: cover;
        background-position: center center;
    }
    @keyframes collapsingOut {
        from {height: 100%;}
        to {height: 64px;}
    }
    li > a > p {
	    white-space: nowrap;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    vertical-align: middle;
	}
	ul >li {
		width: 100%;
	}
	a {
		text-decoration: none;
	}
	.sidebar .nav>li.active-pro .account {
	    background: hsla(0,0%,100%,.14);
	    opacity: .85;
	    color: #fff;
	    padding: 10px 15px;
	    margin: 5px 15px;
	    border-radius: 4px;
	    display: block;
        position: relative;
	    padding: 5px!important;
	    &:hover {
	    	opacity: 1;
	    }
	}
</style>