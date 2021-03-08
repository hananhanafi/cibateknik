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

                                    <b-input-group>
                                    <b-form-input v-model="email" class="rounded-pill mb-2" placeholder="Email"></b-form-input>
                                    </b-input-group>

                                    
                                    <b-input-group class="mb-2">
                                        <!-- <b-form-input aria-label="Small text input with custom switch"></b-form-input> -->
                                        
                                        <b-form-input v-model="password" class="rounded-pill mb-2 w-100" placeholder="Password" :type="showPassword ? 'text' : 'password' ">
                                        </b-form-input>
                                        
                                        <div class="float-right position-absolute" style="right:0">
                                            <b-button pill variant="outline-lighr" @click="showPassword=!showPassword">
                                                <fa  :icon="['fas',showPassword ? 'eye-slash': 'eye']"  />
                                            </b-button>
                                        </div>
                                    </b-input-group>

                                    <div class="text-center mt-2">

                                        <b-button  class="rounded-pill w-50" style="background: linear-gradient(88.49deg, #41E296 0%, #3BB7B4 100%);" @click="postLogin">Masuk</b-button>
                                    </div>
                                    
                                    <div v-if="showError" class="text-danger">{{errorMessage}}</div>

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

import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5000/cibateknik-dev-api/us-central1/api',
    timeout: 50000
});

const Cookie = process.client ? require('js-cookie') : undefined;

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
            // window.addEventListener('resize', this.handleResize);
            this.handleResize();
        },
        destroyed() {
            window.removeEventListener('resize', this.handleResize);
        },
        methods: {
            handleResize() {
                this.windowH.width = window.innerWidth;
                this.windowH.height = window.innerHeight;
            },
            postLogin() {
                api.post("/admin/login",{email:this.email,password:this.password})
                .then((response)=>{
                    console.log("res",response);

                    
                    // we simulate the async request with timeout.
                    // const auth = {
                    // accessToken: response.data.token
                    // }
                    const auth = response.data.token;
                    this.$store.commit('setAuth', auth) // mutating to store for client rendering
                    Cookie.set('auth', auth) // saving token in cookie for server rendering
                    this.$router.push('/admin/dashboard');
                })
                .catch(({response})=>{
                    console.log("err",response);
                    this.showError = true;
                    this.errorMessage = response.data.general;
                    // setTimeout(() => {
                    //     this.showError = false;
                    // }, 5000)
                })
                // setTimeout(() => {
                //     // we simulate the async request with timeout.
                //     const auth = {
                //     accessToken: 'someStringGotFromApiServiceWithAjax'
                //     }
                //     this.$store.commit('setAuth', auth) // mutating to store for client rendering
                //     Cookie.set('auth', auth) // saving token in cookie for server rendering
                //     this.$router.push('/admin/dashboard')
                // }, 1000)
            }
        }
    }
</script>

<style>
    .red {
    color: red;
    }
    .form-control{
        background-color: #efefef;
    }
</style>