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
                    <div v-else>
                        <div class="shadow-main p-3 my-5 ">
                            <div class="row d-flex align-items-center">
                                <div class="col">
                                    <div class="d-flex">
                                        <h5 class="mb-2">
                                            Alamat Pengiriman
                                        </h5>
                                    </div>
                                    <div v-if="checkoutStatus==submitStatus.pending && !$v.currentMainAddress.required "  class="alert alert-danger" role="alert">
                                        Alamat pengiriman belum diatur.
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
                                            <tr>
                                                <td>Provinsi</td>
                                                <td class="text-center">:</td>
                                                <td class="text-wrap">{{ currentMainAddress.province ?currentMainAddress.province.label : '-' }}</td>
                                            </tr>
                                            <tr>
                                                <td>Kota</td>
                                                <td class="text-center">:</td>
                                                <td class="text-wrap">{{ currentMainAddress.city ? currentMainAddress.city.label : '-' }}</td>
                                            </tr>
                                            <tr>
                                                <td>Kode Pos</td>
                                                <td class="text-center">:</td>
                                                <td class="text-wrap">{{ currentMainAddress.zipCode }}</td>
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
                    </div>

                    <div class="shadow-main p-3 mb-3 ">
                        <h4>Barang yang dibeli :</h4>
                        <div class="border p-3 d-md-block d-none">
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
                            <div v-for="(item,i) in getCheckoutItem" :key="i" class="border p-3 my-3">
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

                        <div class="border p-3 mb-3 ">
                            <div class="row d-flex align-items-center font-weight-bold">
                                <div class="col-6">
                                    Total :
                                </div>
                                <div class="col text-right">
                                    Rp {{ toFormatedNumber(getTotalPrice) }}
                                </div>
                            </div>
                        </div>
                    </div>

                    
                    <div class="shadow-main p-3 my-5 ">
                        <div class="row d-flex align-items-center">
                            <div class="col">
                                <div class="d-flex">
                                    <h5 class="mb-2">
                                        Jasa Pengiriman
                                    </h5>
                                </div>
                                <div v-if="checkoutStatus==submitStatus.pending && !$v.shipmentCost.required "  class="alert alert-danger" role="alert">
                                    Jasa pengiriman belum diatur.
                                </div>
                                <div class="float-right">
                                    Berat pengiriman : {{ getTotalWeight }} gram
                                </div>
                                <div>
                                    <BaseSelect
                                    v-model="courier"
                                    :disabled="!currentMainAddress || isLoadingChangeMainAddress || isLoadingData"
                                    label="Jasa Pengiriman"
                                    :options="ShipmentOptions"
                                    placeholder="Pilih Jasa Pengiriman"
                                    dense
                                    @input="getShippingFee"
                                    />
                                </div>

                                <div>
                                    <div v-if="isLoadingGetShipmentServices">
                                        <LoadingSpinner :show="isLoadingGetShipmentServices"/>
                                    </div>
                                    <div v-else-if="shipmentServices">
                                        <div v-for="(service,i) in shipmentServices" :key="i">
                                            <div class="mb-2">
                                                Nama Jasa Pengiriman : {{ service.name }}
                                            </div>
                                            <div>
                                                <div v-for="(cost,j) in service.costs" :key="j" class="form-check">
                                                    <input :id="'cost-'+j" v-model="shipmentCost" class="form-check-input" type="radio" :name="'cost-'+j" :value="cost">
                                                    <label class="form-check-label mb-2" :for="'cost-'+j">
                                                        {{ cost.service }} ( {{ cost.description }} )
                                                        <div>Estimasi : {{ cost.cost[0].etd.includes("HARI") || cost.cost[0].etd.includes("Hari") || cost.cost[0].etd.includes("hari")  ? cost.cost[0].etd : cost.cost[0].etd + " Hari"  }} </div>
                                                        <div>Harga : Rp {{ toFormatedNumber(cost.cost[0].value) }}</div>
                                                    </label>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            
                    <div class="shadow-main p-3 my-5 ">
                        <div class="row d-flex align-items-center">
                            <div class="col">
                                <div class="d-flex">
                                    <h5 class="mb-2">
                                        Total Tagihan
                                    </h5>
                                </div>
                                <div class="row d-flex align-items-center mb-2">
                                    <div class="col-6">
                                        Total Harga Barang ( {{ getTotalOrderItem }} Barang ) :
                                    </div>
                                    <div class="col text-right">
                                        Rp {{ toFormatedNumber(getTotalPrice) }}
                                    </div>
                                </div>
                                <div class="row d-flex align-items-center mb-2">
                                    <div class="col-6">
                                        Biaya Pengiriman :
                                    </div>
                                    <div class="col text-right">
                                        <span v-if="getValueShipmentCost">RP {{ toFormatedNumber(getValueShipmentCost) }} </span>
                                        <span v-else class="text-danger">Belum diatur</span>
                                    </div>
                                </div>
                                <div class="w-100 border-bottom"></div>
                                <div class="row d-flex align-items-center mb-2 font-weight-bold">
                                    <div class="col-6">
                                        Total
                                    </div>
                                    <div class="col text-right">
                                        <span v-if="getTotalBill">RP {{ toFormatedNumber(getTotalBill) }} </span>
                                        <span v-else class="text-danger"> - </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="text-right">
                        <a class="btn btn-primary" @click="checkout">Checkout</a>
                    </div>
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

        <UserModalCheckout
            :show="isShowUserModalCheckout"
            :data="dataCheckout"
            :checkoutStatus="checkoutStatus"
            @close="closeUserModalCheckout"
        />

    </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { SUBMIT_STATUS } from '~/store/constants';
import ApiService from '~/common/api.service';
import { toFormatedNumber } from '~/store/helpers';

    export default {
        mixins: [validationMixin],
        middleware: 'authenticated',
        // page properties go here
        layout: "user",
        data() {
            return {
                items: new Array(5), 
                productsChecked: false,
                isShowUserModalSettingAddress: false,
                isShowUserModalAddAddress: false,
                isShowUserModalCheckout: false,
                dataModal: {
                    title: "Atur Alamat Pengiriman",
                    message: ""
                },
                isLoadingData: true,
                userAddresses: [],
                currentMainAddress: {},
                isLoadingChangeMainAddress: false,

                courier: null,
                ShipmentOptions: [
                    {label: 'JNE', value: 'jne'},
                    {label: 'TIKI', value: 'tiki'},
                    {label: 'POS Indonesia', value: 'pos'},
                ],
                shipmentServices: null,
                shipmentCost: null,
                isLoadingGetShipmentServices: false,

                checkoutStatus: '',
                dataCheckout: {},
                submitStatus: SUBMIT_STATUS
            }
        },
        validations: {
            currentMainAddress: {required},
            shipmentCost: {required},
        },
        computed: {
            getCheckoutItem(){
                return this.$store.state.checkoutItem;
            },
            getTotalOrderItem() {
                let total = 0;
                
                this.getCheckoutItem.forEach(item => {
                    const currAmount = parseInt(item.cart.amount) || 0;
                    total +=currAmount;
                });

                return total;
            },
            getTotalPrice() {
                let total = 0;
                
                this.getCheckoutItem.forEach(item => {
                    const currPrice = item.item.price*item.cart.amount;
                    total +=currPrice;
                });

                return total;
            },
            getTotalWeight() {
                let total = 0;
                
                this.getCheckoutItem.forEach(item => {
                    const currWeight = parseInt(item.item.weight) || 0;
                    total +=currWeight;
                });

                return total;
            },
            getValueShipmentCost() {
                if(this.shipmentCost){
                    return this.shipmentCost.cost[0].value
                }
                return false;
            },
            getTotalBill() {
                if(this.getTotalPrice && this.getValueShipmentCost){
                    return this.getTotalPrice+this.getValueShipmentCost
                }

                return false;
            },
            getUserInfo(){
                return this.$store.state.userInfo;
            },
            formatCheckoutData(){
                const result = {
                    address : this.currentMainAddress,
                    shipment: this.shipmentCost,
                    courier: this.courier,
                    amount: this.getTotalBill,
                    items: this.getCheckoutItem,
                    totalItemsWeight: this.getTotalWeight,
                    totalItemsPrice: this.getTotalPrice,
                    totalItemsOrder: this.getTotalOrderItem,
                    payer_email: this.getUserInfo.email
                }
                return result;
            },
        },
        async created() {
            // eslint-disable-next-line nuxt/no-globals-in-created
            // window.addEventListener('beforeunload', this.deleteCheckoutItem);
            await this.loadData();
            this.getMainAddress();
            // this.getShippingFee();
        },
        destroyed() {
            window.removeEventListener('beforeunload', this.deleteCheckoutItem)
        },
        methods: {
            async checkout() {
                this.$v.$touch();
                if (this.$v.$invalid) {
                    this.checkoutStatus = SUBMIT_STATUS.pending;
                } else {
                    this.checkoutStatus = SUBMIT_STATUS.loading;
                    this.showUserModalCheckout();
                    const formattedCheckoutData = this.formatCheckoutData;
                    await ApiService.post(`/user/checkout/invoice/create/${this.getUserInfo.userID}`,formattedCheckoutData)
                    .then((response)=>{
                        this.$toast.success('Berhasil memesan barang, periksa pesanan Anda di menu profil',{icon:'check'});
                        this.dataCheckout = response.data.data;
                        this.checkoutStatus = SUBMIT_STATUS.success;
                    })
                    .catch((err)=>{
                        console.log("failed",err);
                        this.checkoutStatus = SUBMIT_STATUS.error;
                    })
                }
            },
            async getShippingFee() {
                if(this.courier){
                    this.isLoadingGetShipmentServices = true;
                    const origin = 152; 
                    const destination = this.currentMainAddress.city.value; 
                    const weight = this.getTotalWeight;
                    const courier = this.courier.value;
                    const costOptions = {
                        origin,
                        destination,
                        weight,
                        courier
                    }

                    await ApiService.query('/rajaongkir/cost',costOptions)
                    .then((response)=>{
                        this.shipmentServices = response.data.rajaongkir.results;
                    })
                    this.isLoadingGetShipmentServices = false;
                }
            },
            getMainAddress(){
                this.currentMainAddress = this.userAddresses.find(address=>address.isMainAddress===true);
            },
            updateMainAddress(value){
                this.isLoadingChangeMainAddress = true;
                this.courier = null;
                this.shipmentServices = null;
                this.shipmentCost = null;
                this.currentMainAddress = value.value;
                this.isLoadingChangeMainAddress = false;
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
            showUserModalSettingAddress() {
                this.isShowUserModalSettingAddress = true;
            },
            closeUserModalSettingAddress() {
                this.isShowUserModalSettingAddress = false;
            },
            showUserModalCheckout() {
                this.isShowUserModalCheckout = true;
            },
            closeUserModalCheckout() {
                this.isShowUserModalCheckout = false;
            },
            async showUserModalAddAddress() {
                await this.closeUserModalSettingAddress();
                this.isShowUserModalAddAddress = true;
            },
            async closeUserModalAddAddress() {
                await this.closeAllModal();
                this.showUserModalSettingAddress();
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
