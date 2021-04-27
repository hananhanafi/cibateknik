<template>
    <div class="pt-md-5">
        
        <div class=" d-md-none d-flex fixed-top bg-white p-3 border">
            <BaseInput
                id="Cari"
                placeholder="Cari..."
                class="mb-0 flex-fill"
                rounded
            >
                <div slot="afterInput" class="position-absolute"
                    style=" right:12px;
                            top: 50%;
                            -ms-transform: translateY(-50%);
                            transform: translateY(-50%);"
                >
                    <fa class="" :icon="['fas','search']" /> 
                </div>
            </BaseInput>
            <button type="button" class="btn bg-main-color text-white px-4 ml-3 rounded-pill">Cari</button>
        </div>

        <div class="container mt-md-5 pt-md-0 pt-5">
            
            
            <LoadingSpinner :show="!isDataReady"/>

            <div v-if="isDataReady" class="bg-white my-5">
                <div class="row mb-3">
                    <div class="col-12">
                        <a class="btn mb-2" @click="searchHandler"><fa class="" :icon="['fas','arrow-left']" /> Kembali ke Pencarian </a>
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
                            <div class="description" v-html="dataItem.description">
                            </div>
                        </div>
                        
                        <div class="mb-3 ">
                            <div class="">
                                <div class="text-muted mb-2">
                                    Stock : 100
                                </div>
                                <div class="d-flex mb-3">
                                    <a class="btn btn-sm btn-dark rounded-pill"> <fa :icon="['fas','minus']" /> </a>
                                    
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

                                    <a class="btn btn-sm btn-dark rounded-pill"> <fa :icon="['fas','plus']" /> </a>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col pr-1 mb-3">
                                    <a class="btn btn-dark text-white w-100"> <fa :icon="['fas','plus']" /> Keranjang </a>
                                </div>
                                <div class="col pl-1 mb-3">
                                    <a class="btn btn-outline-dark w-100"> Beli Langsung </a>
                                </div>
                                <div class="col-md col-12">
                                    <a class="btn btn-outline-danger w-100" @click="wished()"><fa class="" :icon="[ formData.isWished ? 'fas' : 'far','heart']" /> Wishlist </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
        <div class="container my-5 shadow-main p-4">
            <div class="">
                <div>
                <a href="#" class="float-right" @click="$router.push({name:'cari',query:{productID: dataItem.productID}})">Lihat semua  <fa :icon="['fas','eye']" /></a>
                <h3 class="mb-4" >Produk Terkait</h3>
                </div>
                <swiper ref="mySwiper" class="swiper" :options="swiperOption">
                <swiper-slide v-for="(item,i) in dataItemsRelated" :key="i">
                    <UserItemCard :data="item"/>
                </swiper-slide>
                <div slot="pagination" class="swiper-pagination"></div>
                <!-- <div slot="button-prev" class="swiper-button-prev btn btn-light rounded-pill" style="width:40px;height:40px">
                    <fa class="" :icon="['fas','chevron-left']" />
                </div>
                <div slot="button-next" class="swiper-button-next btn btn-light rounded-pill" style="width:40px;height:40px">
                    <fa class="" :icon="['fas','chevron-right']" />
                </div> -->
                </swiper>
                

                <div v-if="dataItemsRelated.length<1" class="text-center my-4 py-4">
                    <div class="text-40 text-warning">
                        <fa :icon="['fas','exclamation-circle']"/>
                    </div>
                    <h3>Barang tidak ada.</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { toFormatedNumber } from '../../../store/helpers';
import ApiService from '~/common/api.service';
    export default {
        // page properties go here
        async asyncData ({ params }) {
            const postItem = await ApiService.get(`/item/posted/${params.barang_id}`);
            
            return {postItem};
        },
        layout: "user",
        data() {
            return {
                formData: {
                    amount: 0,
                    max: null,
                    isWished: false,
                },
                swiperOption: {
                    slidesPerView: 6,
                    spaceBetween: 10,
                    autoplay: {
                    delay: 2500,
                    disableOnInteraction: true
                    },
                    pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                    },
                    navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                    },
                    breakpoints: {
                    1024: {
                        slidesPerView: 6,
                        spaceBetween: 10
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 10
                    },
                    // 576: {
                    //   slidesPerView: 3,
                    //   spaceBetween: 10
                    // },
                    480: {
                        slidesPerView: 3,
                        spaceBetween: 10
                    },
                    0: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    }
                    }
                
                
                },
                dataItem: [],
                isDataReady: false,
                currentImage: process.env.baseUrl+"/_nuxt/assets/img/logo.png",
                imageArray : [],
                dataItemsRelated: []
            }
        },
        mounted() {
            this.dataItem = this.postItem.data;
            this.imageArray = this.dataItem.imagesItem || [];
            this.currentImage = this.photoURL(this.imageArray[0]);
            this.formData = Object.assign({},this.dataItem);
            this.isDataReady = true;

            this.loadDataRelatedItems();
        },
        methods: {
            async loadDataRelatedItems() {
                await ApiService.query('/items-posted/'+this.dataItem.productID)
                .then((Response)=>{
                    this.dataItemsRelated = Response.data.data.filter(item=>{
                        return item.itemID !== this.dataItem.itemID;
                    });
                })
                .catch(err=>{
                    console.log("err",err);
                })

            },
            searchHandler() {
            this.$router.push('/cari');
            
            },
            wished(){
                this.formData.isWished = !this.formData.isWished;
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

<style>

.swiper-button-prev::after
{
    content: '';
}
.swiper-button-next::after
{
    content: '';
}
</style>
