<template>
  <div class=" ">
    <div class="h-100 bg" style="min-height:1080px">
      
        <div class="align-middle container">
            <div class="row justify-content-md-center" style="height:1080px">
                <div class="mx-auto my-auto col"> 
                  <div class="text-center">
                      <h1 class="font-weight-bold text-white" >Cari Barang dan Alat Teknikmu di sini</h1>
                  </div>
                  <div class="d-flex">
                    <b-input-group class="d-flex">
                      <b-form-input class="mb-2 w-100 bg-transparent h-100 text-white search-input" placeholder="Cari ..."  type="text"></b-form-input>
                    
                      <div class="float-right position-absolute" style="right:0">
                          <b-button pill variant="outline">
                              
                              <fa class="text-white" :icon="['fas','search']" /> 
                          </b-button>
                      </div>
                      <!-- <b-form-input v-model="email" class="rounded-pill mb-2" placeholder="Email"></b-form-input> -->
                      <!-- <b-button  class=""  @click="postLogin">Masuk</b-button> -->
                    </b-input-group>

                    <button type="button" class="btn btn-light px-4 ml-3" @click="searchHandler">Cari</button>

                  </div>
                  
                </div>
            </div>
        </div>


    </div>

    <div class="container my-5 shadow-main p-4">
      <div class="">
        <div>
          <div class="float-right">Lihat semua  <fa :icon="['fas','eye']" /></div>
          <h3 class="mb-4" >Rekomendasi</h3>
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
    
    <div class="container my-5 shadow-main p-4">
      <div class="">
        <div>
          <div class="float-right">Lihat semua  <fa :icon="['fas','eye']" /></div>
          <h3 class="mb-4" >Produk Terlaris</h3>
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

    
    <!-- <div class="container-fluid my-5">
      <div class="row bg-white mx-5 p-2 py-5 shadow">
        <div class="col-12 d-flex">
            <h2 class="font-weight-bold mb-4" >Rekomendasi</h2>
            <div class="ml-auto">Lihat semua  <fa :icon="['fas','eye']" /></div>
        </div>
        <div class="col-lg-2 col-md-4 col-sm-6">
          
          <ItemCard/>
        </div>
        
        <div class="col-lg-2 col-md-4 col-sm-6">
          
          <ItemCard/>
        </div>
        
        <div class="col-lg-2 col-md-4 col-sm-6">
          
          <ItemCard/>
        </div>
        
        <div class="col-lg-2 col-md-4 col-sm-6">
          
          <ItemCard/>
        </div>
        
        <div class="col-lg-2 col-md-4 col-sm-6">
          
          <ItemCard/>
        </div>
        
        <div class="col-lg-2 col-md-4 col-sm-6">
          
          <ItemCard/>
        </div>
      </div>
    </div> -->

    <!-- <div class="container">
      <div class="row flex-row flex-nowrap overflow-auto">
        <div class="col-lg-2 col-md-4 col-sm-6">
          
          <ItemCard/>
        </div>
        
        <div class="col-lg-2 col-md-4 col-sm-6">
          
          <ItemCard/>
        </div>
        
        <div class="col-lg-2 col-md-4 col-sm-6">
          
          <ItemCard/>
        </div>
        
        <div class="col-lg-2 col-md-4 col-sm-6">
          
          <ItemCard/>
        </div>
        
        <div class="col-lg-2 col-md-4 col-sm-6">
          
          <ItemCard/>
        </div>
        
        <div class="col-lg-2 col-md-4 col-sm-6">
          
          <ItemCard/>
        </div>
        
        <div class="col-lg-2 col-md-4 col-sm-6">
          
          <ItemCard/>
        </div>
        
        <div class="col-lg-2 col-md-4 col-sm-6">
          
          <ItemCard/>
        </div>
        
        <div class="col-lg-2 col-md-4 col-sm-6">
          
          <ItemCard/>
        </div>
      </div>
    </div> -->


  </div>
</template>

<script>
    export default {
      middleware: 'notAuthenticated',
      // page properties go here
      layout: "user",
      data() {
        return {
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
      computed: {
        swiper() {
          return this.$refs.mySwiper.$swiper
        },
      },
      mounted() {
        // console.log('Current Swiper instance object', this.swiper)
        // this.swiper.slideTo(1, 1000, false);
        // this.swiper.
      },
      methods: {
        searchHandler() {
          this.$router.push('/cari');
          
        },
      }
    }
</script>

<style>
    .swiper-button-prev::after

    /* .swiper-container-rtl .swiper-button-prev::after  */
    
    {
      content: '';
    }
    .swiper-button-next::after 
    
    /* .swiper-container-rtl .swiper-button-prev::after  */
    
    {
      content: '';
    }
    
    .red {
    color: red;
    }
    
    .bg {
      /* The image used */
      background-image: url("../assets/img/new-bg.png");

      /* Full height */
      height: 100%; 

      /* Center and scale the image nicely */

      background-position:top;
      background-repeat: no-repeat;
      background-size: cover;

    }

    .search-input::-webkit-input-placeholder { /* Chrome/Opera/Safari */
      color: white;
    }
    .search-input::-moz-placeholder { /* Firefox 19+ */
      color: white;
    }
    .search-input:-ms-input-placeholder { /* IE 10+ */
      color: white;
    }
    .search-input:-moz-placeholder { /* Firefox 18- */
      color: white;
    }
</style>