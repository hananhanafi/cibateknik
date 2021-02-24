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
            <div class="bg-white my-5">
                <div class="row mb-3">
                    <div class="col-12">
                        <a class="btn mb-2" @click="searchHandler"><fa class="" :icon="['fas','arrow-left']" /> Kembali ke Pencarian </a>
                    </div>
                    <div class="col-lg-4 col-md-12">
                        <img src="~/assets/img/item.png" class="card-img-top" alt="item">
                        
                        <div class="row mt-3">
                            <div class="col-xl-2 col-lg-3 col-sm-2 col-3 mb-2">
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
                            </div>
                            <div class="col-xl-2 col-lg-3 col-sm-2 col-3 mb-2">
                                <img src="~/assets/img/item.png" class="card-img-top" alt="item">
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="">
                            <div class="mb-3">
                                <h2>Ini Judul ItemCard</h2>
                                <h3>
                                    Rp 100.000
                                </h3>
                            </div>
                            <p>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda eum distinctio accusantium. Veritatis, quos numquam? Praesentium culpa quos quia dicta, reiciendis cumque vero repellendus deserunt beatae expedita commodi at earum consequuntur maiores quibusdam! Qui eaque ipsum voluptate vitae, soluta maiores illum ut alias quia. Quisquam doloremque labore quibusdam facere ea nesciunt. Eligendi quo corporis aperiam architecto provident odit nam id eos asperiores unde consequuntur, veritatis porro sapiente suscipit, illum quia ipsa. Vitae ipsam deserunt ipsum libero sed explicabo culpa cumque autem repellat necessitatibus molestiae natus commodi voluptates sequi quaerat error eos possimus optio consequatur delectus fugit ad, cupiditate voluptatum sint.
                            </p>
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
                <div class="float-right">Lihat semua  <fa :icon="['fas','eye']" /></div>
                <h3 class="mb-4" >Produk Terkait</h3>
                </div>
                <swiper ref="mySwiper" class="swiper" :options="swiperOption">
                <swiper-slide><ItemCard/></swiper-slide>
                <swiper-slide><ItemCard/></swiper-slide>
                <swiper-slide><ItemCard/></swiper-slide>
                <swiper-slide><ItemCard/></swiper-slide>
                <swiper-slide><ItemCard/></swiper-slide>
                <swiper-slide><ItemCard/></swiper-slide>
                <swiper-slide><ItemCard/></swiper-slide>
                <swiper-slide><ItemCard/></swiper-slide>
                <swiper-slide><ItemCard/></swiper-slide>
                <swiper-slide><ItemCard/></swiper-slide>
                <div slot="pagination" class="swiper-pagination"></div>
                <!-- <div slot="button-prev" class="swiper-button-prev btn btn-light rounded-pill" style="width:40px;height:40px">
                    <fa class="" :icon="['fas','chevron-left']" />
                </div>
                <div slot="button-next" class="swiper-button-next btn btn-light rounded-pill" style="width:40px;height:40px">
                    <fa class="" :icon="['fas','chevron-right']" />
                </div> -->
                </swiper>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        middleware: 'notAuthenticated',
        // page properties go here
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
            }
        },
        methods: {
            searchHandler() {
            this.$router.push('/cari');
            
            },
            wished(){
                this.formData.isWished = !this.formData.isWished;
            }
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
