<template>
    <div class="py-5">
        <div class="container">
            <div class="d-md-none d-flex fixed-top bg-white p-3 border">
                <h4>Checkout</h4>
            </div>
            <div class="bg-white my-md-5">
                <h2 class="d-md-block d-none">Checkout</h2>
                <div>
                    <div v-if="isLoadingData" class="row">
                        <div class="col">
                            <LoadingSpinner :show="isLoadingData"/>
                        </div>
                    </div>
                    <div v-else class="shadow-main p-3 my-5 ">
                        <div class="row d-flex align-items-center">
                            <div class="col">
                                <div class="d-flex">
                                    <h5 class="mb-2">
                                        Alamat Pengiriman
                                    </h5>
                                </div>
                                <div v-if="currentMainAddress">
                                    <table class="text-nowrap">
                                        <tr>
                                            <td>Label</td>
                                            <td class="text-center" width="40px">:</td>
                                            <td>{{ currentMainAddress.label }} <span v-if="currentMainAddress.isMainAddress && currentMainAddress.isMainAddress === true" class="text-success font-weight-bolder"> (Alamat Utama)</span></td>
                                        </tr>
                                        <tr>
                                            <td>Nama</td>
                                            <td class="text-center">:</td>
                                            <td>{{ currentMainAddress.name }}</td>
                                        </tr>
                                        <tr>
                                            <td>No Telepon</td>
                                            <td class="text-center">:</td>
                                            <td>{{ currentMainAddress.phone }}</td>
                                        </tr>
                                        <tr>
                                            <td>Alamat</td>
                                            <td class="text-center">:</td>
                                            <td class="text-wrap">{{ currentMainAddress.address }}</td>
                                        </tr>
                                    </table>
                                </div>
                                <div v-else class="text-muted">
                                    Belum diatur
                                </div>
                            </div>
                            <div class="col-12">
                                <a class="btn text-primary float-right" @click="showUserModalSettingAddress">Atur Alamat Pengiriman</a>
                            </div>
                        </div>
                    </div>

                    <div class="shadow-main p-3 my-5 ">
                        <div class="row d-flex align-items-center">
                            <div class="col">
                                <div class="d-flex">
                                    <h5 class="mb-2">
                                        Metode Pembayaran
                                    </h5>
                                </div>
                                <div class="text-muted">
                                    Belum diatur
                                </div>
                            </div>
                            <div class="col-12">
                                <a class="btn text-primary float-right" @click="showUserModalChoosePaymentMethod">Atur Metode Pembayaran</a>
                            </div>
                        </div>
                    </div>


                    <h4>Barang yang dibeli :</h4>
                    <div class="shadow-main p-3 my-5 d-md-block d-none">
                        <div class="row d-flex align-items-center">
                            <div class="col">
                                Barang
                            </div>
                            <div class="col-2 text-center">
                                Harga
                            </div>
                            <div class="col-1 text-center">
                                Kuantitas
                            </div>
                            <div class="col-2 text-center">
                                Subtotal
                            </div>
                        </div>
                    </div>
                    
                    <div v-if="getCheckoutItem">
                        <div v-for="(item,i) in getCheckoutItem" :key="i" class="shadow-main p-3 my-3">
                            <div class="row d-flex align-items-center">
                                <div class="col">
                                    <div class="form-check d-flex align-items-center">
                                        <div class="d-flex align-items-center">
                                            <div>
                                                <img :src="photoURL(item.item)" style="width:80px" class="card-img-top d-inline" alt="item">
                                            </div>
                                            <div>
                                                <h5 class="ml-4">{{ item.item.name}}</h5>
                                                <div class="d-md-none d-block ml-4">
                                                    Rp {{ toFormatedNumber(item.item.price) }}
                                                    <div>
                                                        Jumlah : {{ item.cart.amount }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-2 text-center d-md-block d-none">
                                    Rp {{ toFormatedNumber(item.item.price) }}
                                </div>
                                <div class="col-1 text-center d-md-block d-none">
                                    {{ item.cart.amount }}
                                </div>
                                <div class="col-2 text-center d-md-block d-none">
                                    Rp {{ toFormatedNumber(item.item.price*item.cart.amount) }}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                
                <div class="shadow-main p-3 mt-5 mb-3 ">
                    <div class="row d-flex align-items-center font-weight-bold">
                        <div class="col-6">
                            Total :
                        </div>
                        <div class="col text-right">
                            Rp {{ toFormatedNumber(getTotalPrice) }}
                        </div>
                    </div>
                </div>

                <div class="text-right">
                    <a class="btn btn-primary">Checkout</a>
                </div>
            </div>
            

            
        </div>

        <UserModalSettingAddress
            :show="isShowUserModalSettingAddress"
            :data="currentMainAddress"
            :options="userAddresses"
            @close="closeUserModalSettingAddress"
            @add-address="showUserModalAddAddress()"
            @update-address="updateMainAddress($event)"
        />

        <UserModalAddAddress
            :show="isShowUserModalAddAddress"
            @close="closeUserModalAddAddress"
            @update="addNewAddress($event)"
        />

        <UserModalChoosePaymentMethod
            :show="isShowUserModalChoosePaymentMethod"
            @close="closeUserModalChoosePaymentMethod"
        />
    </div>
</template>

<script>
import axios from 'axios';
import ApiService from '~/common/api.service';
import { toFormatedNumber } from '~/store/helpers';
// import RajaOngkirApiservice from '~/common/rajaongkir.api.service';

    export default {
        middleware: 'authenticated',
        // page properties go here
        layout: "user",
        data() {
            return {
                items: new Array(5), 
                productsChecked: false,
                isShowUserModalSettingAddress: false,
                isShowUserModalAddAddress: false,
                isShowUserModalChoosePaymentMethod: false,
                dataModal: {
                    title: "Atur Alamat Pengiriman",
                    message: ""
                },

                isLoadingData: true,
                userAddresses: [],
                currentMainAddress: {},
            }
        },
        computed: {
            getCheckoutItem(){
                return this.$store.state.checkoutItem;
            },
            getTotalPrice() {
                let total = 0;
                
                this.getCheckoutItem.forEach(item => {
                    const currPrice = item.item.price*item.cart.amount;
                    total +=currPrice;
                });

                return total;
            },
            // getMainAddress(){
            //     const mainAddress = this.userAddresses.find(address=>address.isMainAddress===true);
                
            //     return mainAddress;
            // }
        },
        async created() {
            // eslint-disable-next-line nuxt/no-globals-in-created
            // window.addEventListener('beforeunload', this.deleteCheckoutItem);
            await this.loadData();
            this.getMainAddress();
            this.getShippingFee();
        },
        destroyed() {
            window.removeEventListener('beforeunload', this.deleteCheckoutItem)
        },
        methods: {
            getShippingFee() {
                console.log("AAAAAAAAAa");
                const config = {
                    headers: {
                        'key' : '22cc24097e57c6a74d45e881605e23d0'
                    }
                }
                axios.get(`https://api.rajaongkir.com/starter/province`, config)
                .then(response => {
                // JSON responses are automatically parsed.
                    // this.posts = response.
                    console.log("response",response);
                })
                .catch(e => {
                    console.error('e',e);
                })
                // RajaOngkirApiservice.get('/province')
                // .then(response=>{
                //     console.log("berhasil", response);
                // })
                // .catch(e => {
                //     console.error('e',e);
                // })
            },
            getMainAddress(){
                this.currentMainAddress = this.userAddresses.find(address=>address.isMainAddress===true);
            },
            updateMainAddress(value){
                this.currentMainAddress = value.value;
            },
            addNewAddress(value){
                this.userAddresses.push(value);
            },
            async loadData() {
                this.isLoadingData = true;
                await ApiService.query('/user/address')
                .then((response)=>{
                    this.userAddresses = response.data;

                })
                .catch(err=>{
                    console.log("err",err);
                })
                this.isLoadingData = false;
            },
            photoURL(item) {
                const url = item.imagesItem ? item.imagesItem[0].imageUrl : process.env.baseUrl+"/_nuxt/assets/img/logo.png"
                return url;
            },
            // deleteCheckoutItem() {
            //     this.$store.commit('purgeCheckoutItem');
            // },
            showUserModalSettingAddress() {
                this.isShowUserModalSettingAddress = true;
            },
            closeUserModalSettingAddress() {
                this.isShowUserModalSettingAddress = false;
            },
            async showUserModalAddAddress() {
                await this.closeUserModalSettingAddress();
                this.isShowUserModalAddAddress = true;
            },
            async closeUserModalAddAddress() {
                await this.closeAllModal();
                this.showUserModalSettingAddress();
            },
            showUserModalChoosePaymentMethod() {
                this.isShowUserModalChoosePaymentMethod = true;
            },
            closeUserModalChoosePaymentMethod() {
                this.isShowUserModalChoosePaymentMethod = false;
            },
            closeAllModal(){
                this.isShowUserModalSettingAddress= false;
                this.isShowUserModalAddAddress= false;
                this.isShowUserModalChoosePaymentMethod= false;
            },
            
            toFormatedNumber
        },
        head() {
            return {
                title: "Cibateknik - Checkout",
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
