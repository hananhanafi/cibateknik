<template>
    <div class="py-5">
        <div class="container">
            <div class=" d-md-none d-flex fixed-top bg-white p-3 border">
                <h4>Keranjang</h4>
            </div>
            <div class="d-md-block d-none my-5">
                <h2>Keranjang</h2>
            </div>

            <div v-if="cartItems.length>0" class="bg-white my-5">
                <div>
                    <div class="d-md-block d-none">
                        <div class="shadow-main p-3 my-5">
                            <div class="row d-flex align-items-center">
                                <div class="col">
                                    <div class="form-check">
                                        <input id="checkall" v-model="checkAll" class="form-check-input" type="checkbox" value="all" @change="checkAllHandler()">
                                        <label class="form-check-label" for="checkall">
                                            Pilih Semua
                                        </label>
                                    </div>
                                </div>
                                <div class="col-2 text-center">
                                    Harga Satuan
                                </div>
                                <div class="col-2 text-center">
                                    Kuantitas
                                </div>
                                <div class="col-2 text-center">
                                    Total Harga
                                </div>
                                <div class="col-3 text-center">
                                    Aksi
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="d-md-none d-block">
                        <div class="form-check">
                            <input id="checkall" v-model="checkAll" class="form-check-input" type="checkbox" value="">
                            <label class="form-check-label" for="checkall">
                                Pilih Semua
                            </label>
                        </div>
                    </div>

                    <div>
                        <div v-for="(item,i) in cartItems" :key="i" class="shadow-main p-3 my-3">
                            <UserCartItemCard :data="item" :isChecked="checkAll"
                            @checkedItem="checkedItemHandler($event)"
                            @delete="deleteItemOnListCart($event)"/>
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
                    <button :disabled="checkedItemList.length<1" class="btn btn-primary" @click="checkoutHandler">Pesan</button>
                </div>
            </div>
        
            <div v-else-if="!isLoadingData" class="text-center my-5 py-5">
                <div class="text-40 text-warning">
                    <fa :icon="['fas','exclamation-circle']"/>
                </div>
                <h3>Tidak ada barang di keranjang.</h3>
                <div>
                    <h5>Ingin mencari barang ?</h5>
                    <a href="/cari" class="btn btn-primary">Cari Sekarang</a>
                </div>
            </div>
            <LoadingSpinner v-if="isLoadingData" :show="isLoadingData"/>
        
            
        </div>
    </div>
</template>

<script>
import ApiService from '~/common/api.service';
import { toFormatedNumber } from '~/store/helpers'
    export default {
        middleware: 'authenticated',
        // page properties go here
        layout: "user",
        data() {
            return {
                checkAll: false,

                cartItems: [],
                isLoadingData: true,
                metaData: {
                    first_index: 0,
                    last_index: 0,
                    current_page: 1,
                    first_page: 1,
                    last_page: 1,
                    total: 0,
                },
                checkedItemList : [],
            }
        },
        computed: {
            getTotalPrice() {
                let total = 0;
                
                this.cartItems.forEach(item => {
                    const currPrice = item.item.price*item.cart.amount;
                    total +=currPrice;
                });

                return total;
            }
        },
        created() {
            this.loadData();
        },
        methods: {
            checkAllHandler() {
                if(!this.checkAll){
                    this.checkedItemList =[];
                }
            },
            checkedItemHandler(data){
                console.log("data",data);
                if(data.isChecked){
                    this.checkedItemList.push(data.value);
                }else{
                    const index = this.checkedItemList.indexOf(data.value);
                    if (index > -1) {
                        this.checkedItemList.splice(index, 1);
                    }
                }
            },
            async loadData() {
                this.isLoadingData = true;
                await ApiService.get('/user/cart/items')
                .then((data)=>{
                    this.cartItems = data.data.data;

                })
                .catch(err=>{
                    console.log("err",err);
                })
                this.isLoadingData = false;
            },
            deleteItemOnListCart(deletedItem){
                this.cartItems = this.cartItems.filter(item=> {
                    return item.item.itemID !== deletedItem.item.itemID;
                })
            },
            checkoutHandler(){
                this.$store.commit('setCheckoutItem', this.checkedItemList);
                this.$router.push({name:'keranjang-checkout'});
            },
            toFormatedNumber
        },
        head() {
            return {
                title: "Cibateknik - Keranjang",
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
