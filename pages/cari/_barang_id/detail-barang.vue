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

        <div class="container mt-md-5 pt-md-0 pt-5 card">
            
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
                            <div class="mb-3">
                                <table>
                                    <tr v-for="(text,i) in dataItem.additionalData" :key="i">
                                        <td>{{ i }} </td>
                                        <td> : </td>
                                        <td> {{ text }}</td>
                                    </tr>
                                </table>
                            </div>
                            <div class="mb-3 ">
                                <div class="">
                                    <div class="text-muted mb-2">
                                        Stock : {{ dataItem.stock }}
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3 ">
                                <div class="">
                                    <div class="text-muted mb-2">
                                        Berat : {{ dataItem.weight ? toFormatedNumber(dataItem.weight) + ' gram' : '-' }}
                                    </div>
                                </div>
                            </div>
                            <!-- // eslint-disable-next-line vue/no-v-html -->
                            <div class="description" v-html="dataItem.description">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-4 col-md-12">
                    </div>
                    <div class="col">
                        <div class="mb-3 ">
                            <div class="row">
                                <div class="col pr-1 mb-3">
                                    <a class="btn btn-dark text-white w-100" @click.prevent="showModalAddCart"> <fa :icon="['fas','plus']" /> Keranjang </a>
                                </div>
                                <div class="col pl-1 mb-3">
                                    <a class="btn btn-outline-dark w-100" @click.prevent="showModalAddCartDirectBuy"> Beli Langsung </a>
                                </div>
                                <div class="col-md col-12">
                                    <button v-if="isWished==false" :disabled="isLoadingWishlistButton" class="btn text-danger w-100" @click.prevent="addWishlist"><fa class="" :icon="[ 'far','heart']" /> Wishlist </button>
                                    <button v-else :disabled="isLoadingWishlistButton" class="btn text-danger w-100" @click.prevent="deleteWishlist"><fa class="" :icon="[ 'fas','heart']" /> Wishlist </button>
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
        

        <ModalAddCart :show="isShowModalAddCart" :data="dataItem"  @close="closeModalAddCart"/>
        
        <ModalAddCartDirectBuy :show="isShowModalAddCartDirectBuy" :data="dataItem"  @close="closeModalAddCartDirectBuy"/>
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
                isWished: false,
                isLoadingWishlistButton: false,
                dataWishlistItem: [],

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
                dataItemsRelated: [],
                
                isShowModalAddCart: false,
                isShowModalAddCartDirectBuy: false,
            }
        },
        computed: {
            getUserInfo(){
                return this.$store.state.userInfo;
            },
        },
        mounted() {
            this.dataItem = this.postItem.data;
            this.imageArray = this.dataItem.imagesItem || [];
            this.currentImage = this.photoURL(this.imageArray[0]);
            this.formData = Object.assign({},this.dataItem);
            this.isDataReady = true;

            this.loadWishlistItem();
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
            async loadWishlistItem() {
                this.isLoadingWishlistButton = true;
                await ApiService.query('/user/wishlist')
                .then((Response)=>{
                    this.dataWishlistItem = Response.data.listItemID;
                    
                    const isItemWished = this.dataWishlistItem.find(item=>{return item === this.dataItem.id});
                    if(isItemWished){
                        this.isWished = true;
                    }else{
                        this.isWished = false;
                    }
                })
                .catch(err=>{
                    console.log("err",err);
                })
                this.isLoadingWishlistButton = false;

            },
            searchHandler() {
            this.$router.push('/cari');
            
            },
            async addWishlist(){
                if(this.getUserInfo){
                    this.isLoadingWishlistButton = true;
                    await ApiService.post('/user/wishlist/add',{itemID: this.dataItem.id})
                    .then((data)=>{
                        this.isWished = true;
                        console.log("success",data)
                        this.$toast.success('Berhasil menambahkan barang ke dalam wishlist.',{icon:'check'});
                    })
                    .catch(err=>{
                        console.error("error",err);
                        this.$toast.error('Terjadi error, gagal menambahkan barang ke dalam wishlist.',{icon:'error'});
                    })
                    this.isLoadingWishlistButton = false;
                } else{
                    this.$toast.error('Silahkan login terlebih dahulu.',{icon:'error'});
                    this.$router.push({name:'user-login'});
                }
            },
            async deleteWishlist(){
                this.isLoadingWishlistButton = true;
                await ApiService.post('/user/wishlist/delete',{itemID: this.dataItem.id})
                .then((data)=>{
                    this.isWished = false;
                    console.log("success",data)
                    this.$toast.success('Berhasil menghapus barang dari wishlist.',{icon:'check'});
                })
                .catch(err=>{
                    console.error("error",err);
                    this.$toast.error('Terjadi error, gagal menghapus barang dari wishlist.',{icon:'error'});
                })
                this.isLoadingWishlistButton = false;
            },
            changeImage(image){
                this.currentImage = this.photoURL(image);
            },
            photoURL(image) {
                const url = image ? image.imageUrl : process.env.baseUrl+"/_nuxt/assets/img/logo.png"
                return url;
            },
            showModalAddCart() {
                this.isShowModalAddCart = true;
            },
            closeModalAddCart() {
                this.isShowModalAddCart = false;
            },
            
            showModalAddCartDirectBuy() {
                this.isShowModalAddCartDirectBuy = true;
            },
            closeModalAddCartDirectBuy() {
                this.isShowModalAddCartDirectBuy = false;
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
