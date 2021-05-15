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
                            <a href="/" class="btn btn-lg">
                                <fa class="" :icon="['fas','arrow-left']"/>  Kembali ke Beranda
                            </a>
                        </div> 
                        <div>
                            <div class="bg-white shadow" 
                            >
                                <div class="p-md-5 p-4 text-medium">
                                    <h2 class="font-weight-bold" >Daftar</h2>
                                    
                                    <a href="/user/daftar-akun" type="button" class="btn btn-lg bg-main-color btn-dark w-100" >Daftar Akun</a>
                                    <h4 class="my-3 text-center">
                                        Atau
                                    </h4>
                                    
                                    
                                    <button type="button" class="btn bg-white shadow text-dark w-100" @click="googleSignIn" >
                                        <img class="mr-3 h-100" src="~/assets/img/media-social/google.png" fluid alt="Responsive image"/> Masuk Dengan Google    
                                    </button>

                                    <!-- <div class="py-2"></div>

                                    <button type="button" class="btn shadow text-white w-100"  style="background-color:#4267B2" @click="facebookSignIn" >
                                        <img class="mr-3" src="~/assets/img/media-social/facebook-square.png" fluid alt="Responsive image"/> Masuk Dengan Facebook    
                                    </button> -->
                                    
                                    <div class="py-2"></div>

                                    <div class="d-flex">
                                        Sudah mempunyai akun ?   
                                            <router-link class="text-decoration-none text-dark ml-2" :to="{ name: 'user-login' }">
                                                Masuk
                                            </router-link>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </b-container>
        
    </div>
    
</template>

<script>

import firebase from 'firebase'
import ApiService from '~/common/api.service';

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
                errorMessage :null,
                provider: null,
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
            formatDataUser(user){
                const dataUser = {
                    name: user.displayName,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    photoURL: user.photoURL,
                }

                return dataUser;
            },
            googleSignIn () {
                this.provider = new firebase.auth.GoogleAuthProvider()
                firebase.auth()
                .signInWithPopup(this.provider)
                .then(async (result) => {
                    /** @type {firebase.auth.OAuthCredential} */
                    const credential = result.credential;
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const token = credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;
                    // ...
                    console.log("credential",credential);
                    console.log("token",token);
                    console.log("user",user);
                    console.log("this.provider",this.provider);

                    let newAuth;
                    await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
                        // Send token to your backend via HTTPS
                        // ...
                        const dateNow = new Date();
                        newAuth = {
                            token: idToken,
                            signInProvider: credential.signInMethod,
                            authTime: dateNow,
                            
                        }
                    }).catch(function(error) {
                        // Handle error
                        console.log("Err",error);
                        this.$toast.error('Error while authenticating',{icon:'error'})
                    });

                    const dataUser = this.formatDataUser(user);
                    await ApiService.post(`/user/signin/google/${user.uid}`,dataUser)
                    .then(async(response)=>{
                        this.$store.commit('setAuthUser', newAuth);
                        ApiService.setHeader();
                        await ApiService.get("/user").then(data=>{
                            this.$store.commit('setUserInfo', data.data);
                            this.$toast.success('Successfully authenticated',{icon:'check'})
                            this.$router.push('/');
                        })
                        .catch(({response})=>{
                            console.log("err",response);
                            this.$store.commit('purgeAuth');
                            this.$toast.error('Error while authenticating',{icon:'error'})
                        })


                        console.log('success',response);
                    })
                    .catch(({response})=>{
                        console.log("err",response);
                        this.$store.commit('purgeAuth');
                        this.$toast.error('Error while authenticating',{icon:'error'})
                    })
                }).catch((error) => {
                    // Handle Errors here.
                    // const errorCode = error.code;
                    const errorMessage = error.message;
                    // // The email of the user's account used.
                    // const email = error.email;
                    // // The firebase.auth.AuthCredential type that was used.
                    // const credential = error.credential;
                    // // ...

                    console.log("Err",error);
                    this.$toast.error(errorMessage,{icon:'error'})
                });
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
