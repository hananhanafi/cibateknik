<template>
    <div class="text-center">
        <div class="container">
            <div class="bg-white shadow-sm rounded-8 p-3 text-left ">
                <div class="mb-3 p-2">
                    <h1>Tambah Katalog Barang</h1>
                </div>
                
                <div class="w-100 text-left">
                        
                    <BaseSelect
                        v-model="formData.product"
                        label="Nama Produk"
                        :options="options.product"
                        placeholder="Pilih Produk"
                        dense
                        :error="
                            isSubmitStatus == submitStatuses.pending
                            ? !$v.formData.product.required 
                                ? 'Produk harus dipilih'
                                : null
                            : null
                        "
                        @input="productSelectHandler"
                    />

                    <BaseSelect
                        v-show="formData.product"
                        v-model="formData.item"
                        label="Nama Barang"
                        :options="options.item"
                        placeholder="Pilih Barang"
                        dense
                        :error="
                            isSubmitStatus == submitStatuses.pending
                            ? !$v.formData.item.required 
                                ? 'Barang harus dipilih'
                                : null
                            : null
                        "
                        @input="itemSelectHandler"
                    />
                    
                    <div v-show="formData.product && formData.item" class="row mb-3">
                        <div class="col-lg-4 col-md-12">
                            <div class="img-container">
                                <img :src="currentImage" class="" 
                                alt="Responsive image"> 
                            </div>
                            
                            <div class="row mt-3">
                                <div v-for="(image,i) in imageArray" :key="i" class="col-xl-3 col-lg-3 col-sm-2 col-3 mb-2 d-flex justify-content-center">
                                    <img :src="photoURL(image)" class="card-img-top btn p-0 border" alt="item" @click="changeImage(image)">
                                </div>
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
                                <div class="mb-3 ">
                                    <div class="">
                                        <div class="text-muted mb-2">
                                            Stock : {{currentItem && currentItem.stock}}
                                        </div>
                                    </div>
                                </div>
                                
                                <BaseInput
                                    id="weight"
                                    v-model="formData.weight"
                                    numberonly
                                    label="Berat(gram)"
                                    placeholder="Masukkan berat(gram)"
                                    large
                                    dense
                                    :error="
                                        isSubmitStatus == submitStatuses.pending
                                        ? !$v.formData.weight.required 
                                            ? 'Berat(gram) harus diisi'
                                            : null
                                        : null
                                    "
                                />

                                <Editor :model="formData.description" @updateTextEditor="updateDescription($event)"/>
                            </div>
                            
                        </div>
                    </div>

                    <div v-if="isSubmitStatus==submitStatuses.error" class="alert alert-danger">
                        {{errorMessage || 'error'}}
                    </div>
                    
                    <div class="w-100 text-right">
                        <ButtonLoading v-if="isSubmitStatus==submitStatuses.loading"/>
                        <div v-else class="text-right">
                            <a class="btn btn-outline-secondary" @click="$router.push({name:'admin-post'})">Batal</a>
                            <b-button id="show-btn"  size="xl"  class=" text-white ml-auto" variant="primary" @click.prevent="onSubmit">Simpan</b-button>
                        </div>
                    </div>

                </div>

            </div>
            
        </div>
    </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { toFormatedNumber } from '../../../store/helpers';
import { SUBMIT_STATUS } from '~/store/constants';
import ApiService from '~/common/api.service';
    export default {
        mixins: [validationMixin],
        // page properties go hereexport default {
        // page properties go here
        layout: "admin",
        middleware: 'adminAuthenticated',
        data() {
            return {
                breadCrumbList: [
                    {name:"Katalog",link:"/admin/post"},
                    {name:"Tambah Katalog Barang",link:""},
                ],
                formData: {
                    product: null,
                    item: null,
                    weight: null,
                    description: '',
                },
                options: {
                    product: [],
                    item: [],
                },
                currentItem: null,
                dataItems: null,

                isSubmitStatus: '',
                submitStatuses: SUBMIT_STATUS,
                currentImage: process.env.baseUrl+"/_nuxt/assets/img/logo.png",
                imageArray : [],
            }
        },
    validations: {
        formData :{
            product :{ required },
            item :{ required },
            weight: {required}
        }
    },
        mounted() {
            this.loadOptions();
        },
        methods: {
            async loadOptions() {
                await ApiService.get('/products')
                .then((Response)=>{
                    this.options.product = Response.data.data.map(function(product){
                        return {
                            label: product.name,
                            value: product.productID,
                        }
                    });
                })
                .catch(err=>{
                    console.log("err",err);
                })
            },
            updateDescription(value) {
                this.formData.description = value;
            },
            async onSubmit(){
                this.$v.$touch();
                if (this.$v.$invalid) {
                    this.isSubmitStatus = SUBMIT_STATUS.pending;
                } else {
                    this.isSubmitStatus = SUBMIT_STATUS.loading;
                    const description = {
                        weight : this.formData.weight,
                        description : this.formData.description
                    }
                    this.isSubmitStatus = SUBMIT_STATUS.loading;
                    await ApiService.post(`/product/${this.formData.product.value}/item/${this.formData.item.value}/post`,description)
                    .then((response)=>{
                        console.log("success",response);
                        this.isSubmitStatus = SUBMIT_STATUS.success;
                        this.$router.push({name:'admin-post'});
                        this.$toast.success('Berhasil memasukkan data barang ke dalam katalog semua barang.',{icon:'check'});
                    })
                    .catch((err)=>{
                        console.log("error",err);
                        this.isSubmitStatus = SUBMIT_STATUS.error;
                        const response = {...err};
                        this.errorMessage = response.response.data.message;
                        this.$toast.error('Terjadi error, gagal memasukkan data barang ke dalam katalog semua barang.',{icon:'error'});
                    })
                    
                }
            },
            async productSelectHandler(){
                this.formData.item = null;
                if(this.formData.product){
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
                    })
                    .catch(err=>{
                        console.log("err",err);
                    })
                }
            },
            itemSelectHandler(){
                let data = null;
                if(this.formData.item){
                    data = this.dataItems.find(item=>item.id===this.formData.item.value);
                    this.imageArray = data.imagesItem || [];
                    this.currentImage = this.photoURL(this.imageArray[0]);
                }

                this.currentItem = data;
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
        },
        head() {
            return {
                title: "Cibateknik Admin - Tambah Katalog Barang",
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
