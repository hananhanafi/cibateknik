<template>
    <div>
        <b-container class="align-middle">
            <b-row class="justify-content-md-center" :style="{height: windowH.height+'px'}">
                <b-col cols="12" lg="6" md="8"  sm="10" class="mx-auto my-auto"> 
                    <div>
                        <div class="text-center mb-5">
                            <img class="w-100 mb-3" src="~/assets/img/logov1.png" fluid alt="Responsive image"/>
                        </div>
                        <div>
                            <div class="bg-white shadow" 
                            >
                                <div class="p-5 text-medium">
                                    <h2 >Daftar</h2>
                                    
                                    <button type="button" class="btn btn-lg bg-main-color btn-dark w-100" >Daftar</button>
                                    <h4 class="my-3 text-center">
                                        Atau
                                    </h4>
                                    
                                    <button type="button" class="btn btn-lg bg-white border text-dark w-100" >
                                        <img class="mr-3 h-100" src="~/assets/img/media-social/google.png" fluid alt="Responsive image"/> Masuk Dengan Google    
                                    </button>

                                    <div class="py-2"></div>

                                    <button type="button" class="btn btn-lg text-white w-100"  style="background-color:#4267B2" >
                                        <img class="mr-3" src="~/assets/img/media-social/facebook-square.png" fluid alt="Responsive image"/> Masuk Dengan Facebook    
                                    </button>
                                    
                                    <div class="py-2"></div>

                                    <div class="d-flex">
                                        Sudah mempnyai akun ?   
                                            <router-link class="text-decoration-none text-dark ml-2" :to="{ name: 'user-login' }">
                                                Masuk
                                            </router-link>
                                    </div>


                                </div>
                            </div>
                        </div>
                        <div class="text-center">
                            
                        </div>
                    </div>
                </b-col>
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
                email: null,
                password: null,
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
