<template>
    <div class="pt-5">
        <div class="container mt-5">
            <div class="bg-white my-5">
                <div class="row">
                    <div class="col-lg-4 col-md-12">
                        <img src="~/assets/img/item.png" class="card-img-top" alt="item">
                        
                        <div class="row mt-3">
                            <div class="col-xl-2 col-lg-3 col-sm-2 mb-2">
                                <img src="~/assets/img/item.png" class="card-img-top" alt="item">
                            </div>
                            <div class="col-xl-2 col-lg-3 col-sm-2 mb-2">
                                <img src="~/assets/img/item.png" class="card-img-top" alt="item">
                            </div>
                            <div class="col-xl-2 col-lg-3 col-sm-2 mb-2">
                                <img src="~/assets/img/item.png" class="card-img-top" alt="item">
                            </div>
                            <div class="col-xl-2 col-lg-3 col-sm-2 mb-2">
                                <img src="~/assets/img/item.png" class="card-img-top" alt="item">
                            </div>
                            <div class="col-xl-2 col-lg-3 col-sm-2 mb-2">
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
                        

                        <div class="mt-auto">
                            <div class="text-muted mb-2">
                                Stock : 100
                            </div>
                            <div class="d-flex">
                                <a class="btn bg-main-color text-white"> - </a>
                                
                                <BaseInput
                                    id="amount"
                                    v-model="formData.amount"
                                    placeholder="Jumlah"
                                    large
                                    dense
                                    numberonly
                                    class="mb-0 mx-2"
                                    style="width:80px"
                                />

                                <a class="btn bg-main-color text-white"> + </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3 d-flex justify-content-end">
                    <div class=" col-lg-8 col-md-12">
                        <a class="btn bg-main-color text-white flex-fill ml-0"> Masukkan Keranjang </a>
                        <a class="btn bg-main-color text-white flex-fill mx-2"> Beli Langsung </a>
                        <div class="vertical-separator mx-2 d-inline h-100" style="border-color:black"></div>
                        <a class="btn text-danger"> Wishlist </a>
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
                <div slot="button-prev" class="swiper-button-prev btn bg-white p-4 rounded-pill" style="width:40px">
                    <fa class="" :icon="['fas','arrow-left']" />
                </div>
                <div slot="button-next" class="swiper-button-next btn bg-white p-4 rounded-pill" style="width:40px">
                    <fa class="" :icon="['fas','arrow-right']" />
                </div>
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
                    last_education: null,
                },
                last_educationOptions: [],
                items: new Array(18),
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
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    },
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 10
                    }
                    }
                },
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
