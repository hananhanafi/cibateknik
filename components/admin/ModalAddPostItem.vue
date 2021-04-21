<template>
    <Modal extralarge :show="show" centered @clickOutside="close">

        <div class="modal-header border-bottom-0">
            <h5 id="exampleModalLabel" class="modal-title">Tambah Barang ke Katalog</h5>
            <button data-bs-dismiss="modal" class="btn-close btn text-danger" type="button" aria-label="Close" @click="close"><fa :icon="['fas','times']" /></button>
        </div>
        <div v-if="isSubmitStatus=='' || isSubmitStatus == submitStatus.pending">
            <div class="modal-body">
                <div class="w-100 text-left">
                        
                    <BaseSelect
                        v-model="formData.product"
                        label="Nama Produk"
                        :options="options.product"
                        placeholder="Pilih Produk"
                        dense
                        @input="productSelectHandler"
                    />
                    <BaseSelect
                        v-show="formData.product"
                        v-model="formData.item"
                        label="Nama Barang"
                        :options="options.item"
                        placeholder="Pilih Barang"
                        dense
                        @input="itemSelectHandler"
                    />


                    
                    <div v-show="formData.product && formData.item" class="row mb-3">
                        <div class="col-lg-4 col-md-12">
                            <div class="img-container">
                                <img :src="currentImage" class="" 
                                alt="Responsive image"> 
                            </div>
                            <!-- <img :src="currentImage" class="card-img-top" alt="item"> -->
                            
                            <div class="row mt-3">
                                <div v-for="(image,i) in imageArray" :key="i" class="col-xl-2 col-lg-3 col-sm-2 col-3 mb-2 d-flex justify-content-center">
                                    <img :src="photoURL(image)" class="card-img-top btn p-0" alt="item" @click="changeImage(image)">
                                </div>
                                <!-- <div class="col-xl-2 col-lg-3 col-sm-2 col-3 mb-2">
                                    <img src="~/assets/img/item.png" class="card-img-top" alt="item">
                                </div>
                                <div class="col-xl-2 col-lg-3 col-sm-2 col-3 mb-2">
                                    <img src="~/assets/img/item.png" class="card-img-top" alt="item">
                                </div>
                                <div class="col-xl-2 col-lg-3 col-sm-2 col-3 mb-2">
                                    <img src="~/assets/img/item.png" class="card-img-top" alt="item">
                                </div>
                                <div class="col-xl-2 col-lg-3 col-sm-2 col-3 mb-2">
                                    <img src="~/assets/img/item.png" class="card-img-top" alt="item">
                                </div> -->
                            </div>
                        </div>
                        <div class="col">
                            <div class="">
                                <div class="mb-3">
                                    <h2>{{currentItem && currentItem.name}}</h2>
                                    <h3>
                                        Rp {{ currentItem ? toFormatedNumber(currentItem.price) : '-'  }}
                                    </h3>
                                </div>
                                
                                <BaseTextarea
                                    v-model="data.description"
                                    label="Deskripsi"
                                    placeholder="Masukkan Deskripsi"
                                    height="200px"
                                />
                            </div>
                            
                            <div class="mb-3 ">
                                <div class="">
                                    <div class="text-muted mb-2">
                                        Stock : {{currentItem && currentItem.stock}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal-footer border-top-0 d-flex">
                <button type="button" class="btn btn-outline-danger flex-fill" data-bs-dismiss="modal" @click="close">Batal</button>
                <button type="button" class="btn btn-primary flex-fill" :disabled="!formData.product && !formData.item "  @click="onSubmit">Simpan</button>
            </div>
        </div>
        
        <!-- loading -->
        <LoadingSpinner :show="isSubmitStatus==submitStatus.loading"/>

        <!-- success -->
        <div v-show="isSubmitStatus==submitStatus.success" class="px-2">
            <div class="text-40 text-success">
                <fa :icon="['fas','check-circle']"/>
            </div>
            <div class="text-20">
                Berhasil menambah katalog data barang.
            </div>
            
            <div class="modal-footer border-top-0 d-flex">
                <button type="button" class="btn btn-outline-danger flex-fill" data-bs-dismiss="modal" @click="closeModal()">Tutup</button>
            </div>
        </div>

        <!-- error -->
        <div v-show="isSubmitStatus==submitStatus.error" class="px-2">
            <div class="text-40 text-danger">
                <fa :icon="['fas','times-circle']"/>
            </div>
            <div class="text-20">
                Gagal menambah katalog data barang.
            </div>
            
            <div class="modal-footer border-top-0 d-flex">
                <button type="button" class="btn btn-outline-danger flex-fill" data-bs-dismiss="modal" @click="closeModal()">Tutup</button>
            </div>
        </div>

    </Modal>
</template>

<script>
import { SUBMIT_STATUS } from '../../store/constants';
import { toFormatedNumber } from '../../store/helpers';
import ApiService from '~/common/api.service';
export default {
    props: {
        show: Boolean,
        data: {
            type: Object,
            default: null
        },
        options: {
            type: Object,
            default() {
                return {
                    product: [],
                    item: [],
                }
            }
        }
    },
    data() {
        return {
            additionalInformations: [{
                name: null,
            }],
            formData: {
                product: null,
                item: null,
                description: null,
            },
            currentItem: null,
            dataItems: null,

            isSubmitStatus: '',
            submitStatus: SUBMIT_STATUS,


            currentImage: process.env.baseUrl+"/_nuxt/assets/img/logo.png",
            imageArray : [],
        }
    },
    mounted() {
    },
    methods: {
        async onSubmit(){
            // console.log("onsubmit");
            this.isSubmitStatus = SUBMIT_STATUS.loading;
            await ApiService.post(`/product/${this.data.productID}/item/${this.data.id}/post`)
            .then(()=>{
                this.isSubmitStatus = SUBMIT_STATUS.success;
            })
            .catch(()=>{
                this.isSubmitStatus = SUBMIT_STATUS.error;
            })
        },
        close() {
            this.formData = {
                product: null,
                item: null,
                description: null,
            }
            this.$emit('close');
        },
        async productSelectHandler(){
            
            await ApiService.get(`/product/${this.formData.product.value}/data/items`)
            .then((Response)=>{
                
                this.dataItems = Response.data.data
                .filter(item => !item.isPosted );
                this.options.item = Response.data.data
                .filter(item => !item.isPosted )
                .map(function(item){
                    return {
                        label: item.name,
                        value: item.id,
                    }
                });
                console.log()
            })
            .catch(err=>{
                console.log("err",err);
            })
        },
        itemSelectHandler(){
            let data = null;
            if(this.formData.item){
                data = this.dataItems.find(item=>item.id===this.formData.item.value);
                this.imageArray = data.imagesItem || [];
                this.currentImage = this.photoURL(this.imageArray[0]);
            }

            this.currentItem = data;
            console.log("curritem",this.currentItem);
        },
        changeImage(image){
            this.currentImage = this.photoURL(image);
        },
        photoURL(image) {
            console.log("imaggeeee",image);
            const url = image ? image.imageUrl : process.env.baseUrl+"/_nuxt/assets/img/logo.png"
            return url;
        },

        // helpers
        toFormatedNumber
    }
};
</script>
