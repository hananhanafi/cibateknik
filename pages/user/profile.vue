<template>
    <div class="pt-5">
        <div class="container-fluid">
            <div class="bg-white mx-md-5 my-5 mx-sm-1">
                <div class="row">
                    <div class="col-lg-2 col-md-12">
                        <div class="shadow-main p-4 text-center mb-4">
                            <img src="~/assets/img/person.png" class="img-fluid rounded-circle w-100 mb-2"  alt="Responsive image"> 
                            <h3>Hanan Hanafi</h3>
                            <a class="btn text-black-50" @click="change('akun_saya')">Ubah Profile</a>
                        </div>
                        <div class="shadow-main text-left mb-4">
                            <div>
                                <a class="btn w-100 p-4 text-left" :class="activeComponent === 'akun_saya' ? 'bg-main-color text-white' : '' " @click="change('akun_saya')">Akun Saya</a>
                            </div>
                            <div>
                                <a class="btn w-100 p-4 text-left" :class="activeComponent === 'pesanan' ? 'bg-main-color text-white' : '' "  @click="change('pesanan')">Pesanan</a>
                            </div>
                            <div>
                                <a class="btn w-100 p-4 text-left" :class="activeComponent === 'notifikasi' ? 'bg-main-color text-white' : '' "  @click="change('notifikasi')">Notifikasi</a>
                            </div>
                            <div>
                                <a class="btn w-100 p-4 text-left" :class="activeComponent === 'main_address' ? 'bg-main-color text-white' : '' "  @click="change('main_address')">Alamat utama</a>
                            </div>
                            <div>
                                <a class="btn w-100 p-4 text-left" :class="activeComponent === 'wishlist' ? 'bg-main-color text-white' : '' "  @click="change('wishlist')">Wishlist Saya</a>
                            </div>
                            <div>
                                <a class="btn w-100 p-4 text-left" :class="activeComponent === 'password' ? 'bg-main-color text-white' : '' "  @click="change('password')">Atur Password</a>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <component :is="dynamic" v-if="dynamic"></component>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        middleware: 'notAuthenticated',
        // page properties go here
        layout: "user",
        data() {
            return {
                title: "Profile",
                items: new Array(5), 
                productsChecked: false,
                dynamic: null,
                activeComponent: 'akun_saya'
            }
        },

        mounted() {
            this.dynamic = () => import("./profile_components/akun_saya");
        },
        methods: {
            change(componentName) {
                this.dynamic = () => import(`./profile_components/${componentName}`);
                this.activeComponent = componentName;
            }
        },
        head() {
            return {
                title: "Profile",
                meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                {
                    hid: 'description',
                    name: 'description',
                    content: 'My custom description'
                }
                ],
                
                // link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
            }
        }
    }
</script>
