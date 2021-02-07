<template>
    <div>
        <div>
            <b-navbar class="shadow-sm" style="background-color:white">
                <b-navbar-nav >
                    <b-nav-item>
                        
                        <b-button v-b-toggle.sidebar-no-header class="bg-primary-dark">Menu</b-button>
                    </b-nav-item>

                </b-navbar-nav>

                <b-navbar-nav class="ml-auto">

                    <b-nav-item-dropdown right>
                        <!-- Using 'button-content' slot -->
                        <template #button-content>
                            <b-avatar></b-avatar> Admin
                        </template>
                        <b-dropdown-item href="#">Profile</b-dropdown-item>
                        <b-dropdown-item href="#"><button @click="logout">Sign Out</button></b-dropdown-item>
                        </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-navbar>
        </div>


        <div>
            <b-sidebar id="sidebar-no-header" aria-labelledby="sidebar-no-header-title" no-header shadow>
                <template #default="{ hide }">
                    <div class="py-3 bg-primary-dark h-100">
                    
                        <div class="d-flex bd-highlight py-3">
                            <div class="p-2 w-100 bd-highlight text-white"><h2>Ciba Teknik</h2></div>
                            <div class="p-2 flex-shrink-1 bd-highlight"><b-button variant="dark" class="text-danger" block @click="hide"> X </b-button></div>
                        </div>
                        <ul class="ml-0 pl-0">
                            <li>
                                <div class="w-100 text-white ">
                                    <NuxtLink class="btn btn-block text-left menu-item-link py-3" to="/admin/dashboard"
                                    :class="{ 'active-menu' : isActive('admin-dashboard') }">
                                        Dashboard
                                    </NuxtLink>
                                </div>
                            </li>
                            <li>
                                <div class="w-100">
                                    <NuxtLink class="btn btn-block text-left menu-item-link py-3" to="/admin/inventory"
                                    :class="{ 'active-menu' : isActive('admin-inventory') }">
                                        Inventory
                                    </NuxtLink>
                                </div>
                            </li>
                            <li>
                                <div class="w-100">
                                    <NuxtLink class="btn btn-block text-left menu-item-link py-3" to="/admin/post"
                                    :class="{ 'active-menu' : isActive('admin-post') }">
                                        Post
                                    </NuxtLink>
                                </div>
                            </li>
                            <li>
                                <div class="w-100">
                                    <NuxtLink class="btn btn-block text-left menu-item-link py-3" to="/admin/customer"
                                    :class="{ 'active-menu' : isActive('admin-customer') }">
                                        Customer
                                    </NuxtLink>
                                </div>
                            </li>
                            <li>
                                <div class="w-100">
                                    <NuxtLink class="btn btn-block text-left menu-item-link py-3" to="/admin/inbox"
                                    :class="{ 'active-menu' : isActive('admin-inbox') }">
                                        Inbox
                                    </NuxtLink>
                                </div>
                            </li>
                        </ul>
                    </div>
                </template>
            </b-sidebar>
        </div>
        
        
        <div class="bg-primary-dark py-3" :style="{minHeight: windowH.height+'px'}">
            <Nuxt />
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
            console.log("routeparams",this.$route.name);
        },
        methods: {
            isActive(name){
                return this.$route.name === name;
            },
            handleResize() {
                this.windowH.width = window.innerWidth;
                this.windowH.height = window.innerHeight;
            },
            logout() {
            // Code will also be required to invalidate the JWT Cookie on external API
                Cookie.remove('auth')
                this.$store.commit('setAuth', null);
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
.menu-item-link:hover{
    text-decoration: none;
    background-color: white;
    color:#1A262B
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