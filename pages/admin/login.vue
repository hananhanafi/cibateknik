<template>
    <div>
        <b-container class="align-middle">
            <b-row class="justify-content-md-center" :style="{height: windowH.height+'px'}">
                <b-col cols="12" lg="6" md="8"  sm="10" class="mx-auto my-auto"> 
                    <div >
                        <div>
                            <div class="py-2" style="box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);border-radius:40px">
                                <div class="my-5 mx-5 text-medium">
                                    <h2 class="font-weight-bold text-" >Login</h2>
                                    <form>
                                        <b-input-group>
                                            <b-form-input v-model="email" type="email" class="rounded-pill mb-2" :class="submitStatus == 'ERROR' && !$v.email.required ? 'is-invalid' : ''" placeholder="Email"></b-form-input>
                                            </b-input-group>
                                        <div v-if="submitStatus == 'ERROR' && !$v.email.required" class="text-danger mb-2">Email harus diisi</div>
                                        
                                        <b-input-group>
                                            <b-form-input v-model="password" class="rounded-pill mb-2 w-100"  :class="submitStatus == 'ERROR' && !$v.password.required ? 'is-invalid' : ''" placeholder="Password" :type="showPassword ? 'text' : 'password' ">
                                            </b-form-input>
                                            
                                            <div class="float-right position-absolute" style="right:0;z-index:999">
                                                <b-button pill variant="outline-lighr" @click="showPassword=!showPassword">
                                                    <fa  :icon="['fas',showPassword ? 'eye-slash': 'eye']"  />
                                                </b-button>
                                            </div>
                                        </b-input-group>
                                        <div v-if="submitStatus == 'ERROR' && !$v.password.required" class="text-danger mb-2">Password harus diisi</div>

                                        <div class="text-center my-2">
                                            <b-button v-if="!isLoadingSubmit" type="submit"  class="rounded-pill w-50" style="background: linear-gradient(88.49deg, #41E296 0%, #3BB7B4 100%);" @click.prevent="postLogin">Masuk</b-button>
                                            
                                            <ButtonLoading v-else class="rounded-pill w-50 text-white" style="background: linear-gradient(88.49deg, #41E296 0%, #3BB7B4 100%);"/>
                                        </div>
                                        
                                        <div v-if="showError" class="text-danger">{{errorMessage}}</div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </b-container>

        <!-- <section class="section has-text-centered">
            <h1 class="title is-1">
                Your Window
            </h1>
            <h3 class="title is-3">
                Width: {{ windowH.width }} px<br/>
                Height: {{ windowH.height }} px
            </h3>
        </section> -->
        
    </div>
    
</template>

<script>


import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import ApiService from '~/apis/api.service';

const Cookie = process.client ? require('js-cookie') : undefined;

    export default {
        mixins: [validationMixin],
        middleware: 'notAdminAuthenticated',
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
                isLoadingSubmit: false,
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
            async postLogin() {
                console.log('submit!')
                this.$v.$touch()
                if (this.$v.$invalid) {
                    console.log("invalid",this.$v);
                    this.submitStatus = 'ERROR'
                } else {
                    this.submitStatus = 'PENDING'
                    this.isLoadingSubmit = true;
                    await ApiService.post("/admin/login",{email:this.email,password:this.password})
                    .then((response)=>{
                        console.log("res",response);
                        const auth = response.data.token;
                        this.$store.commit('setAuthAdmin', auth) // mutating to store for client rendering
                        Cookie.set('auth', auth) // saving token in cookie for server rendering
                        this.$router.push('/admin/dashboard');
                        this.submitStatus = 'SUCCESS'
                    })
                    .catch(({response})=>{
                        console.log("err",response);
                        this.submitStatus = 'ERROR'
                        this.showError = true;
                        this.errorMessage = response.data.message;
                    })
                    this.isLoadingSubmit = false;
                }
            }
        },
        head() {
            return {
                title: "Cibateknik - Login Admin",
                meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                {
                    hid: 'Login Admin',
                    name: 'Login Admin',
                    content: 'Login Admin'
                }
                ],
                
                // link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
            }
        }
    }
</script>

<style>
    .form-control{
        background-color: #efefef;
    }
</style>