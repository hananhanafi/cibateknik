<template>
    <div>
        <b-container class="align-middle">
            <b-row class="justify-content-md-center" :style="{height: windowH.height+'px'}">
                <b-col cols="12" lg="6" md="8"  sm="10" class="mx-auto my-auto">
                    
                    <div>
                        <div class="text-center mb-5">
                            <b-img class="w-100 mb-3" src="~/assets/img/logov1.png" fluid alt="Responsive image"></b-img>
                        </div>
                        <div>
                            <a href="/" class="btn btn-lg">
                                <fa class="" :icon="['fas','arrow-left']"/>  Kembali ke Beranda
                            </a>
                        </div> 
                        <div>
                            <div class="bg-white shadow" 
                            >
                                <div class="p-md-5 p-4 text-medium">
                                    <h2 class="font-weight-bold" >Login</h2>

                                    <form>
                                        <b-input-group>
                                            <b-form-input v-model="email" type="email" class="mb-2" :class="submitStatus == 'ERROR' && !$v.email.required ? 'is-invalid' : ''"  placeholder="Email"></b-form-input>
                                        </b-input-group>
                                        <div v-if="submitStatus == 'ERROR' && !$v.email.required" class="text-danger mb-2">Email harus diisi</div>

                                        
                                        <b-input-group>
                                            <b-form-input v-model="password" class="mb-2 w-100" :class="submitStatus == 'ERROR' && !$v.password.required ? 'is-invalid' : ''" placeholder="Password" :type="showPassword ? 'text' : 'password' ">
                                            </b-form-input>
                                            
                                            <div class="float-right position-absolute" style="right:0;z-index:999">
                                                <b-button pill variant="outline-lighr" @click="showPassword=!showPassword">
                                                    <fa  :icon="['fas',showPassword ? 'eye-slash': 'eye']"  />
                                                </b-button>
                                            </div>
                                        </b-input-group>
                                        <div v-if="submitStatus == 'ERROR' && !$v.password.required" class="text-danger mb-2">Password harus diisi</div>

                                        <div class="text-center mt-2 mb-2">
                                            <ButtonLoading v-if="submitStatus=='PENDING'" class="btn btn-lg bg-main-color btn-dark w-100"/>

                                            <button v-else type="submit" class="btn btn-lg bg-main-color btn-dark w-100" @click.prevent="login()" >Masuk</button>
                                        </div>
                                        
                                        <div v-if="showError" class="text-danger">{{errorMessage}}</div>

                                    </form>

                                    <div class="py-2"></div>

                                    <div class="d-flex">
                                        Belum mempunyai akun ?   
                                            <router-link class="text-decoration-none text-dark ml-2" :to="{ name: 'user-register' }">
                                                Daftar
                                            </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center">
                            <h4 class="my-5">
                                Atau
                            </h4>
                            
                            <button type="button" class="btn bg-white border text-dark w-100" >
                                <img class="mr-3 h-100" src="~/assets/img/media-social/google.png" fluid alt="Responsive image"/> Masuk Dengan Google    
                            </button>

                            <div class="py-2"></div>

                            <button type="button" class="btn text-white w-100"  style="background-color:#4267B2" >
                                <img class="mr-3" src="~/assets/img/media-social/facebook-square.png" fluid alt="Responsive image"/> Masuk Dengan Facebook    
                            </button>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </b-container>
        
        
    </div>
    
</template>


<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import ApiService from '~/apis/api.service';
const Cookie = process.client ? require('js-cookie') : undefined;
    export default {
        mixins: [validationMixin],
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
                errorMessage :null,
                submitStatus: '',
            }
        },
        validations: {
            email: {
                required,
            },
            password: {
                required,
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
            async login(){
                console.log('submit!')
                this.$v.$touch()
                if (this.$v.$invalid) {
                    console.log("invalid",this.$v);
                    this.submitStatus = 'ERROR'
                } else {
                    this.submitStatus = 'PENDING'
                    await ApiService.post("/user/login",{email:this.email,password:this.password})
                    .then( async (response)=>{
                        console.log("res",response);
                        const auth = response.data.token;
                        this.$store.commit('setAuthUser', auth) // mutating to store for client rendering
                        Cookie.set('auth', auth) // saving token in cookie for server rendering
                        ApiService.setHeader();
                        await ApiService.get("/user").then(data=>{
                            console.log('data',data);
                            this.$store.commit('setUserInfo', data.data.userCredentials);
                        })
                        this.$router.push('/');
                        this.submitStatus = 'SUCCESS'
                    })
                    .catch(({response})=>{
                        console.log("err",response);
                        this.submitStatus = 'ERROR'
                        this.showError = true;
                        this.errorMessage = response.data.message;
                    })
                    
                }
            }
        },
        head() {
            return {
                title: "Cibateknik - Login",
                meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                {
                    hid: 'Login',
                    name: 'Login',
                    content: 'Login'
                }
                ],
                
                // link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
            }
        }
    }
</script>