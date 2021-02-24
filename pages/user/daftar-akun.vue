<template>
    <div>
        <b-container class="align-middle">
            <b-row class="justify-content-md-center" :style="{height: windowH.height+'px'}">
                <b-col cols="12" class="mx-auto my-auto"> 
                    <div>
                        <div class="text-center">
                            <img class="w-50 mb-3" src="~/assets/img/logov1.png" fluid alt="Responsive image"/>
                        </div>
                    </div>
                </b-col>
                
                    <div class="bg-white w-100 shadow">
                        <div class="p-3 text-medium">
                            <h2 class="font-weight-bold" >Daftar</h2>
                            <BaseInput
                                id="firstName"
                                v-model="formData.firstName"
                                label="Nama Depan"
                                placeholder="Masukkan nama depan Anda"
                            />
                            <BaseInput
                                id="lastName"
                                v-model="formData.lastName"
                                label="Nama Akhir"
                                placeholder="Masukkan nama akhir Anda"
                            />
                            <BaseInput
                                id="email"
                                v-model="formData.email"
                                label="Email"
                                type="email"
                                placeholder="Masukkan email Anda"
                            />
                            
                            <BaseInput
                                id="phone"
                                v-model="formData.phone"
                                label="No Telepon"
                                placeholder="Masukkan nomor telepon Anda"
                            />

                            <BaseTextarea
                                v-model="formData.address"
                                label="Alamat"
                                placeholder="Masukkan alamat"
                                height="200px"
                            />
                            
                            <BaseInput
                                id="password"
                                v-model="formData.password"
                                label="Password"
                                placeholder="Masukkan password Anda"
                                type="password"
                            />

                            
                            <BaseInput
                                id="passwordConfirmation"
                                v-model="formData.passwordConfirmation"
                                label="Konfirmasi Password"
                                placeholder="Masukkan konfirmasi password"
                                type="password"
                            />
                            
                            <div class="d-flex mt-5 my-3">
                                <a href="/user/register" type="button" class="btn btn-outline-dark flex-fill mx-2">Batal</a>
                                <button type="button" class="btn bg-main-color text-white flex-fill mx-2">Daftar</button>
                            </div>

                        </div>
                    </div>
            </b-row>
        </b-container>
        
    </div>
    
</template>

<script>



    export default {
        middleware: 'notAuthenticated',
        // page properties go here
        data() {
            return {
                showPassword: false,
                windowH: {
                    width: 0,
                    height: 0
                },
                formData: {
                    firstName: null,
                    lastName: null,
                    email: null,
                    phone: null,
                    address: null,
                    password: null,
                    passwordConfirmation: null,
                },
                showError: false,
                errorMessage :null
            }
        },
        created() {
            this.handleResize();
        },
        destroyed() {
            window.removeEventListener('resize', this.handleResize);
        },
        mounted() {
            window.addEventListener('resize', this.handleResize);
        },
        methods: {
            handleResize() {
                this.windowH.width = window.innerWidth;
                this.windowH.height = window.innerHeight;
            },
        },
        head() {
            return {
                title: "Cibateknik - Daftar",
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
