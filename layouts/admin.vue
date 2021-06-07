<template>
    <div>

        <div class="position-fixed w-100" style="z-index:999">
            <b-navbar toggleable="md" type="dark" class="bg-main-color">
                <b-navbar-brand href="/">
                    <div class="bg-white p-1" style="height:40px">
                        <b-img class="h-100" src="~/assets/img/logov1.png" fluid alt="Responsive image"></b-img>
                    </div>
                </b-navbar-brand>
                <div class="vertical-separator"></div>
                <b-navbar-nav >
                    <b-nav-item>
                        <b-button v-b-toggle.sidebar-no-header class="bg-primary-dark"><fa :icon="['fas','bars']"/></b-button>
                    </b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav class="ml-auto">
                    <AdminNotifications/>
                    <b-nav-item-dropdown right>
                        <template #button-content>
                            <img src="~/assets/img/logo-square-white.png" class="img-fluid rounded-circle h-100" style="width:40px" alt="Responsive image"> Admin
                        </template>
                        <b-dropdown-item href="#" @click="logout">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>

            </b-navbar>
        </div>


        <div class="w-100">
            <b-sidebar id="sidebar-no-header" aria-labelledby="sidebar-no-header-title" no-header shadow>
                <template #default="{ hide }" class="as" >
                    <div class="py-3 bg-primary-dark h-100">
                    
                        <div class="d-flex bd-highlight py-3">
                            <div class="p-2 w-100 bd-highlight text-white"><h2>Ciba Teknik</h2></div>
                            <div class="p-2 flex-shrink-1 bd-highlight">
                                <a  class="btn btn-danger rounded-pill" block @click="hide"> <fa :icon="['fas','times']"/> </a>
                            </div>
                        </div>
                        <ul class="ml-0 pl-0">
                            <li>
                                <div class="w-100 text-white ">
                                    <NuxtLink class="btn btn-block text-left menu-item-link py-3" to="/admin/dashboard"
                                    :class="{ 'active-menu' : isActive('admin-dashboard') }">
                                        <fa :icon="['fas','chart-bar']"/> Dashboard
                                    </NuxtLink>
                                </div>
                            </li>
                            <li>
                                <div class="w-100">
                                    <NuxtLink class="btn btn-block text-left menu-item-link py-3" to="/admin/inventory"
                                    :class="{ 'active-menu' : isActive('admin-inventory') }">
                                        <fa :icon="['fas','boxes']"/> Persediaan
                                    </NuxtLink>
                                </div>
                            </li>
                            <li>
                                <div v-b-toggle.collapse-1 class="w-100 text-white" style="outline: none;box-shadow: none;" >
                                    <a class="btn btn-block text-left menu-item-link py-3 w-100" :class="{ 'active-menu' : isActive('admin-data-master') }">
                                        <fa :icon="['fas','database']"/> Data Master 
                                        <fa class="ml-2" :icon="['fas','chevron-down']"/>
                                    </a>
                                </div>

                                <b-collapse id="collapse-1" class="ml-5 mb-2">
                                    <div class="w-100">
                                        <NuxtLink class="btn btn-block text-left menu-item-link py-3" to="/admin/data-master/brand"
                                        :class="{ 'active-menu' : isActive('admin-data-master-brand') }">
                                            Data Brand <span class="float-right"><fa :icon="['fas','arrow-right']"/></span>
                                        </NuxtLink>
                                    </div>
                                    <div class="w-100">
                                        <NuxtLink class="btn btn-block text-left menu-item-link py-3" to="/admin/data-master/kategori"
                                        :class="{ 'active-menu' : isActive('admin-data-master-kategori') }">
                                            Data Kategori <span class="float-right"><fa :icon="['fas','arrow-right']"/></span>
                                        </NuxtLink>
                                    </div>
                                    <div class="w-100">
                                        <NuxtLink class="btn btn-block text-left menu-item-link py-3" to="/admin/data-master/supplier"
                                        :class="{ 'active-menu' : isActive('admin-data-master-supplier') }">
                                            Supplier <span class="float-right"><fa :icon="['fas','arrow-right']"/></span>
                                        </NuxtLink>
                                    </div>
                                </b-collapse>
                            </li>
                            <li>
                                <div class="w-100">
                                    <NuxtLink class="btn btn-block text-left menu-item-link py-3" to="/admin/post"
                                    :class="{ 'active-menu' : isActive('admin-post') }">
                                        <fa :icon="['fas','columns']"/> Katalog
                                    </NuxtLink>
                                </div>
                            </li>
                            <li>
                                <div class="w-100">
                                    <NuxtLink class="btn btn-block text-left menu-item-link py-3" to="/admin/customer"
                                    :class="{ 'active-menu' : isActive('admin-customer') }">
                                        <fa :icon="['fas','users']"/> Customer
                                    </NuxtLink>
                                </div>
                            </li>
                            <li>
                                <div class="w-100">
                                    <NuxtLink class="btn btn-block text-left menu-item-link py-3" to="/admin/inbox"
                                    :class="{ 'active-menu' : isActive('admin-inbox') }">
                                        <fa :icon="['fas','inbox']"/> Inbox
                                    </NuxtLink>
                                </div>
                            </li>
                        </ul>
                    </div>
                </template>
            </b-sidebar>
        </div>
        
        
        <div class="py-5 bg-main-light" :style="{minHeight: windowH.height+'px'}">
            <div class="pt-5">
                <Nuxt />
            </div>
        </div>

    </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined;
    export default {
        data() {
        return {
            windowH: {
                    width: 0,
                    height: 0
                }
            }
        },
        created() {
            // window.addEventListener('resize', this.handleResize);
            this.handleResize();
        },
        destroyed() {
            window.removeEventListener('resize', this.handleResize);
        },
        mounted() {
            window.addEventListener('resize', this.handleResize);
            console.log("cookie",Cookie.get('auth'));
            console.log("state",this.$store.state);
            console.log("rt",this.$route);
            if(this.$store.state.auth){
                const expiredDate = new Date(this.$store.state.auth.expirationTime);
                const dateNow = new Date();

                if(dateNow>expiredDate){
                    this.logout();
                }
            }
        },
        methods: {
            isActive(name){
                return this.$route.name.includes(name);
            },
            handleResize() {
                this.windowH.width = window.innerWidth;
                this.windowH.height = window.innerHeight;
            },
            logout() {
            // Code will also be required to invalidate the JWT Cookie on external API
                Cookie.remove('auth')
                this.$store.commit('purgeAuth');
                this.$router.push('/admin/login');
            }
        }
    }
</script>
<style scoped>
.menu-item-link{
    color:white;
    border-radius: 0;
}
.menu-item-link:focus{
    outline: none;
    box-shadow: none;
}
.menu-item-link:hover{
    text-decoration: none;
    background-color: white;
    color:#1A262B;
}
.active-menu {
    background-color: white;
    color: #1A262B;
    font-weight: bold;
}


ul {
    list-style-type: none;
}

</style>