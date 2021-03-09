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
                                id="username"
                                v-model="formData.username"
                                label="Username"
                                placeholder="Masukkan nama username Anda"
                                :error="
                                    submitStatus == 'ERROR'
                                    ? !$v.formData.username.required
                                    ? 'Username harus diisi'
                                    : null
                                    : null
                                "
                            />
                            <BaseInput
                                id="firstName"
                                v-model="formData.firstName"
                                label="Nama Depan"
                                placeholder="Masukkan nama depan Anda"
                                :error="
                                    submitStatus == 'ERROR'
                                    ? !$v.formData.firstName.required
                                    ? 'Nama Depan harus diisi'
                                    : null
                                    : null
                                "
                            />
                            <BaseInput
                                id="lastName"
                                v-model="formData.lastName"
                                label="Nama Akhir"
                                placeholder="Masukkan nama akhir Anda"
                                :error="
                                    submitStatus == 'ERROR'
                                    ? !$v.formData.lastName.required
                                    ? 'Nama Akhir harus diisi'
                                    : null
                                    : null
                                "
                            />
                            <BaseInput
                                id="email"
                                v-model="formData.email"
                                label="Email"
                                type="email"
                                placeholder="Masukkan email Anda"
                                :error="
                                    submitStatus == 'ERROR'
                                    ? !$v.formData.email.required
                                    ? 'Email harus diisi'
                                    : null
                                    : null
                                "
                            />
                            
                            <BaseInput
                                id="phoneNumber"
                                v-model="formData.phoneNumber"
                                label="No Telepon"
                                placeholder="Masukkan nomor telepon Anda"
                                :error="
                                    submitStatus == 'ERROR'
                                    ? !$v.formData.phoneNumber.required
                                    ? 'No Telepon harus diisi'
                                    : null
                                    : null
                                "
                            />

                            <BaseTextarea
                                v-model="formData.address"
                                label="Alamat"
                                placeholder="Masukkan alamat"
                                height="200px"
                                :error="
                                    submitStatus == 'ERROR'
                                    ? !$v.formData.address.required
                                    ? 'Alamat harus diisi'
                                    : null
                                    : null
                                "
                            />
                            
                            <BaseInput
                                id="password"
                                v-model="formData.password"
                                label="Password"
                                placeholder="Masukkan password Anda"
                                type="password"
                                :error="
                                    submitStatus == 'ERROR'
                                    ? !$v.formData.password.required
                                    ? 'Password harus diisi'
                                    : null
                                    : null
                                "
                            />
                            
                            <BaseInput
                                id="confirmPassword"
                                v-model="formData.confirmPassword"
                                label="Konfirmasi Password"
                                placeholder="Masukkan konfirmasi password"
                                type="password"
                                :error="
                                    submitStatus == 'ERROR'
                                    ? !$v.formData.confirmPassword.required
                                    ? 'Konfirmasi Password harus diisi'
                                    : null
                                    : null
                                "
                            />
                            
                            <div class="d-flex mt-5 my-3">
                                <a href="/user/register" type="button" class="btn btn-outline-dark flex-fill mx-2">Batal</a>
                                <button class="btn bg-main-color text-white flex-fill mx-2" type="button" @click="register()">Daftar</button>
                            </div>

                        </div>
                    </div>
            </b-row>
        </b-container>
        
    </div>
    
</template>

<script>


import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import ApiService from '~/apis/api.service'

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
                formData: {
                    username: null,
                    firstName: null,
                    lastName: null,
                    email: null,
                    phoneNumber: null,
                    address: null,
                    password: null,
                    confirmPassword: null,
                },
                showError: false,
                errorMessage :null,
                submitStatus: '',
            }
        },
        validations: {
            formData: {
                username: {required},
                firstName: {required},
                lastName: {required},
                email: {required},
                phoneNumber: {required},
                address: {required},
                password: {required},
                confirmPassword: {required},
            },
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
            async register(){
                console.log('submit!')
                this.$v.$touch()
                if (this.$v.$invalid) {
                    console.log("invalid",this.$v);
                    this.submitStatus = 'ERROR'
                } else {
                    // do your submit logic here
                    // console.log("submit");
                    this.submitStatus = 'PENDING'
                    // setTimeout(() => {
                    // this.submitStatus = 'OK'
                    // }, 500)
                    await ApiService.post("/user/signup",this.formData)
                    .then((response)=>{
                        console.log("res",response); 
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
