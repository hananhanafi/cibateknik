<template>
  <div class="h-100">
    <div class="h-100 parallax" :style="{minHeight: windowH.height+'px'}">
        <div class="container" style="height:100vh">
          <div class="row h-100 d-flex align-items-center">
            <div class="col">
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
                  </b-input-group>
                  <button type="button" class="btn btn-light px-4 ml-3" @click="searchHandler">Cari</button>
                </div>
            </div>
            
            <!-- <div class="col">
              <img class="w-50" src="~/assets/img/gear-ornament.png" fluid alt="ornament img"/>
            </div> -->
              <img class="position-absolute h-100" style="right:10px" src="~/assets/img/gear-ornamentv2.png" fluid alt="ornament img"/>
          </div>
        </div>

        
    </div>
    <div class="position-relative">
      <div class="container shadow-main p-4 position-absolute bg-white" style="top:-80px;left:0;right:0">
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
            <div slot="button-prev" class="swiper-button-prev btn btn-light rounded-pill" style="width:40px;height:40px">
              <fa class="" :icon="['fas','chevron-left']" />
            </div>
            <div slot="button-next" class="swiper-button-next btn btn-light rounded-pill" style="width:40px;height:40px">
              <fa class="" :icon="['fas','chevron-right']" />
            </div>
          </swiper>
        </div>
      </div>
      
    </div>

    <div class="py-5">
    </div>
    <div class="py-5">
    </div>
    <div class="py-5">
    </div>
    <div class= "py-sm-0 py-4">
    </div>
    
    <div class="container mb-5 mt-sm-5 mt-0 shadow-main p-4">
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
          <div slot="button-prev" class="swiper-button-prev btn btn-light rounded-pill" style="width:40px;height:40px">
            <fa class="" :icon="['fas','chevron-left']" />
          </div>
          <div slot="button-next" class="swiper-button-next btn btn-light rounded-pill" style="width:40px;height:40px">
            <fa class="" :icon="['fas','chevron-right']" />
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
          windowH: {
                  width: 0,
                  height: 0
              }
        }
      },
      computed: {
        swiper() {
          return this.$refs.mySwiper.$swiper
        },
      },
      created() {
          this.handleResize();
      },
      destroyed() {
          window.removeEventListener('resize', this.handleResize);
      },
      mounted() {
        // console.log('Current Swiper instance object', this.swiper)
        // this.swiper.slideTo(1, 1000, false);
        // this.swiper.
        window.addEventListener('resize', this.handleResize);
      },
      methods: {
        searchHandler() {
          this.$router.push('/cari');
          
        },
        handleResize() {
          console.log("RESIZE")
            this.windowH.width = window.innerWidth;
            this.windowH.height = window.innerHeight;
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
    
    .parallax {
      /* The image used */
      background-image: url("../assets/img/bgv1.png");

      /* Set a specific height */
      min-height: 100%; 

      /* Create the parallax scrolling effect */
      background-attachment: fixed;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
    
    .bg {
      /* The image used */
      background-image: url("../assets/img/bgv1.png");

      /* Full height */
      min-height: 100%; 

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