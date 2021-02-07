<template>
    <div class="pt-5">
        <div class="container-fluid">
            <div class="bg-white mx-md-5 my-5 mx-sm-1">
                <div class="row">
                    <div class="col-2">
                        <div class="shadow-main p-4 text-center mb-4">
                            <img src="~/assets/img/person.png" class="img-fluid rounded-circle w-100 mb-2"  alt="Responsive image"> 
                            <h2>Hanan Hanafi</h2>
                            <a class="btn text-black-50" @click="change('akun_saya')">Ubah Profile</a>
                        </div>
                        <div class="shadow-main text-left">
                            <div>
                                <a class="btn w-100 p-4 text-left" :class="activeComponent === 'akun_saya' ? 'bg-main-color text-white' : '' " @click="change('akun_saya')">Akun Saya</a>
                            </div>
                            <div>
                                <a class="btn w-100 p-4 text-left" :class="activeComponent === 'notifikasi' ? 'bg-main-color text-white' : '' "  @click="change('notifikasi')">Notifikasi</a>
                            </div>
                            <div>
                                <a class="btn w-100 p-4 text-left">Alamat utama</a>
                            </div>
                            <div>
                                <a class="btn w-100 p-4 text-left">Whistlist Saya</a>
                            </div>
                            <div>
                                <a class="btn w-100 p-4 text-left">Atur Password</a>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <component v-if="dynamic" :is="dynamic"></component>
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
