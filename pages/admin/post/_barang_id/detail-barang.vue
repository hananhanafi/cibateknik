<template>
    <div>
        <div class="container">
            <Breadcrumb :data="breadCrumbList"/>
            
            <LoadingSpinner :show="!isDataReady"/>

            <div v-if="isDataReady" class="bg-white shadow-sm rounded-8 p-3">
                <div class="row mb-3">
                    <div class="col-12">
                        <a class="btn mb-2" @click="$router.push({name:'admin-post'})"><fa class="" :icon="['fas','arrow-left']" /> Kembali ke Katalog </a>
                    </div>
                    <div class="col-12 text-right">
                        <a class="btn btn-primary" @click="editing">Edit</a>
                    </div>
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
                                <h2>{{ dataItem.name }}</h2>
                                <h3>
                                    Rp {{ toFormatedNumber(dataItem.price) }}
                                </h3>
                            </div>
                            <div class="mb-3 ">
                                <div class="">
                                    <div class="text-muted mb-2">
                                        Stock : {{ dataItem.stock }}
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3">
                                <table>
                                    <tr v-for="(text,i) in dataItem.additionalData" :key="i">
                                        <td>{{ i }} </td>
                                        <td> : </td>
                                        <td> {{ text }}</td>
                                    </tr>
                                </table>
                            </div>
                            <!-- // eslint-disable-next-line vue/no-v-html -->
                            <div v-if="!isEditing"  class="description" v-html="dataItem.description">
                            </div>
                            <div v-else>
                                
                                <div v-if="isSubmitStatus==submitStatuses.error" class="alert alert-danger">
                                    {{errorMessage || 'error'}}
                                </div>

                                <Editor :model="formData.description" @updateTextEditor="updateDescription($event)"/>
                                <div class="w-100 text-right mt-3">
                                    <ButtonLoading v-if="isSubmitStatus==submitStatuses.loading"/>
                                    <div v-else class="text-right">
                                        <a class="btn btn-outline-secondary" @click="editing">Batal</a>
                                        <b-button id="show-btn"  size="xl"  class=" text-white ml-auto" variant="primary" @click.prevent="onSubmit">Simpan</b-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { toFormatedNumber } from '../../../../store/helpers';
import ApiService from '~/common/api.service';
import { SUBMIT_STATUS } from '~/store/constants';
    export default {
        // page properties go here
        async asyncData ({ params }) {
            const postItem = await ApiService.get(`/item/posted/${params.barang_id}`);
            
            return {postItem};
        },
        layout: "admin",
        data() {
            return {
                breadCrumbList: [
                    {name:"Katalog",link:"/admin/post"},
                    {name:"Detail Katalog Barang",link:""},
                ],
                dataItem: null,
                isDataReady: false,
                currentImage: process.env.baseUrl+"/_nuxt/assets/img/logo.png",
                imageArray : [],

                isEditing: false,
                formData: {
                    description: null,
                },
                isSubmitStatus: '',
                submitStatuses: SUBMIT_STATUS,
            }
        },
        mounted() {
            this.dataItem = this.postItem.data;
            this.imageArray = this.dataItem.imagesItem || [];
            this.currentImage = this.photoURL(this.imageArray[0]);
            this.formData = Object.assign({},this.dataItem);
            this.isDataReady = true;
        },
        methods: {
            editing(){
                this.isEditing = !this.isEditing;
                this.formData.description = this.dataItem.description;
            },
            async onSubmit() {
                this.isSubmitStatus = SUBMIT_STATUS.loading;
                const formatData = {
                    description : this.formData.description
                }
                this.isSubmitStatus = SUBMIT_STATUS.loading;
                await ApiService.post(`/item/posted/${this.dataItem.id}/update`,formatData)
                .then((response)=>{
                    console.log("success",response);
                    this.dataItem.description = response.data.data.description;
                    this.isSubmitStatus = SUBMIT_STATUS.success;
                    this.isEditing = !this.isEditing;
                })
                .catch((err)=>{
                    console.log("error",err);
                    this.isSubmitStatus = SUBMIT_STATUS.error;
                    const response = {...err};
                    this.errorMessage = response.response.data.message;
                })
                
            },
            updateDescription(value){
                this.formData.description = value;
            },  
            changeImage(image){
                this.currentImage = this.photoURL(image);
            },
            photoURL(image) {
                const url = image ? image.imageUrl : process.env.baseUrl+"/_nuxt/assets/img/logo.png"
                return url;
            },
            
            toFormatedNumber
        },
        head() {
            return {
                title: "Cibateknik - Detail Barang",
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