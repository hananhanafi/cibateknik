<template>
    <div>
        <Modal v-if="isLoadingData"  :show="show" centered >
            <LoadingSpinner :show="isLoadingData"/>
        </Modal>

        <Modal v-else-if="isLoggedIn == null"  :show="show" centered >
            <div class="px-2 text-center">
                <div class="text-40 text-danger">
                    <fa :icon="['fas','exclamation-circle']"/>
                </div>
                <div class="text-20">
                    Silahkan masuk terlebih dahulu untuk meyimpan barang dalam keranjang.
                </div>
                
                <div class="modal-footer border-top-0 d-flex">
                    <button type="button" class="btn btn-outline-danger flex-fill" data-bs-dismiss="modal" @click="close">Tutup</button>
                </div>
            </div>
        </Modal>

        <Modal v-else extralarge :show="show" centered >
            <div class="modal-header border-bottom-0">
                <h5 id="exampleModalLabel" class="modal-title">Tambah Barang ke Keranjang</h5>
                <button data-bs-dismiss="modal" class="btn-close btn text-danger" type="button" aria-label="Close" @click="close"><fa :icon="['fas','times']" /></button>
            </div>
            <div v-if="isSubmitStatus=='' || isSubmitStatus == submitStatus.pending">
                <div class="modal-body">
                    <div class="w-100 text-left">

                        
                        <div v-show="data" class="row mb-3">
                            <div class="col-lg-4 col-md-12">
                                <div class="img-container">
                                    <img :src="currentImage" class="" 
                                    alt="Responsive image"> 
                                </div>
                                
                                <div class="row mt-3">
                                    <div v-for="(image,i) in imageArray" :key="i" class="col-xl-2 col-lg-3 col-sm-2 col-3 mb-2 d-flex justify-content-center">
                                        <img :src="photoURL(image)" class="card-img-top btn p-0" alt="item" @click="changeImage(image)">
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="">
                                    <div class="mb-3">
                                        <h2>{{data && data.name}}</h2>
                                        <h3>
                                            Rp {{ data ? toFormatedNumber(data.price) : '-'  }}
                                        </h3>
                                    </div>
                                    <div class="mb-3">
                                        <table>
                                            <tr v-for="(text,i) in data.additionalData" :key="i">
                                                <td>{{ i }} </td>
                                                <td> : </td>
                                                <td> {{ text }}</td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="mb-3 ">
                                        <div class="">
                                            <div class="text-muted mb-2">
                                                Stock : {{ data.stock }}
                                            </div>
                                        </div>
                                    </div>

                                    <!-- // eslint-disable-next-line vue/no-v-html -->
                                    <div class="description mb-3" v-html="data.description">
                                    </div>

                                    <div class="mb-2">Jumlah : </div>
                                    <div class="d-flex mb-3">
                                        <a class="btn btn-sm btn-dark rounded-pill" @click.prevent="minusAmount"> <fa :icon="['fas','minus']" /> </a>
                                        
                                        <BaseInput
                                            id="amount"
                                            v-model="formData.amount"
                                            placeholder="Jumlah"
                                            small
                                            center
                                            numberonly
                                            class="mb-0 mx-2 text-center"
                                            style="width:80px"
                                        />

                                        <a class="btn btn-sm btn-dark rounded-pill" @click.prevent="plusAmount"> <fa :icon="['fas','plus']" /> </a>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer border-top-0 d-flex">
                    <button type="button" class="btn btn-outline-danger flex-fill" data-bs-dismiss="modal" @click="close">Batal</button>
                    <button type="button" class="btn btn-primary flex-fill" :disabled="!formData.amount"  @click="onSubmit">Beli Langsung</button>
                </div>
            </div>
            
            <!-- loading -->
            <LoadingSpinner :show="isSubmitStatus==submitStatus.loading"/>


        </Modal>
    </div>
</template>

<script>
import { SUBMIT_STATUS } from '~/store/constants';
import { toFormatedNumber } from '~/store/helpers';
import ApiService from '~/common/api.service';
export default {
    props: {
        show: Boolean,
        data: {
            type: [Object,Array],
            default: null
        },
    },
    data() {
        return {
            formData: {
                amount: 0,
            },

            isSubmitStatus: '',
            submitStatus: SUBMIT_STATUS,
            dataUserCart: [],
            isLoadingData: true,

            currentImage: process.env.baseUrl+"/_nuxt/assets/img/logo.png",
            imageArray : [],
            isAlreadyInCart: false,
        }
    },
    computed: {
        isLoggedIn(){
            return this.$store.state.auth;
        },
        getUserInfo(){
            return this.$store.state.userInfo;
        },
    },
    watch: {
        async show() {
            if(this.show){
                this.imageArray = this.data.imagesItem || [];
                this.currentImage = this.photoURL(this.imageArray[0]);
                console.log("show",this.getUserInfo);
                if(this.getUserInfo){
                    await ApiService.query('user/cart',{userID: this.getUserInfo.userID}).then(data=>{

                        this.dataUserCart = data.data.itemList;
                        const itemInCart = this.dataUserCart.find(item=>{ return item.itemID === this.data.itemID});
                        
                        this.formData.amount = itemInCart!==undefined ? itemInCart.amount : 0;
                        this.isAlreadyInCart = itemInCart!==undefined;
                    }).catch(err=>{
                        console.error("error",err);
                    })

                    this.isLoadingData = false;
                }else{
                    this.isLoadingData = false;
                    this.$toast.error('Silahkan login terlebih dahulu.',{icon:'error'});
                    this.$router.push({name:'user-login'});
                }
            }
        }
    },
    mounted() {
    },
    methods: {
        plusAmount() {
            if(this.formData.amount<this.data.stock){
                this.formData.amount++;
            }
        },
        minusAmount() {
            if(this.formData.amount>0){
                this.formData.amount--;
            }
        },
        formatFormData(){
            return {
                userID: this.getUserInfo.userID,
                itemID: this.data.itemID,
                amount: this.formData.amount
            }
        },
        onSubmit(){
            const formattedFormData = this.formatFormData();
            this.$store.commit('setCheckoutItem', [{
                    cart: {
                        amount: formattedFormData.amount,
                        itemID: formattedFormData.itemID
                    },
                    item: this.data
                }]);
            this.$router.push({name:'keranjang-checkout'});
        },
        close() {
            this.formData = {
                amount: 0,
            }
            this.isLoadingData=true;
            this.isSubmitStatus='';
            this.isAlreadyInCart= false;
            this.$emit('close');
        },
        changeImage(image){
            this.currentImage = this.photoURL(image);
        },
        photoURL(image) {
            const url = image ? image.imageUrl : process.env.baseUrl+"/_nuxt/assets/img/logo.png"
            return url;
        },

        // helpers
        toFormatedNumber
    }
};
</script>
