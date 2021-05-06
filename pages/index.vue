<template>
  <div class="h-100">
    <div class="h-100 parallax" :style="{minHeight: windowH.height+'px'}">
        <div class="container" style="height:100vh">
          <div class="row h-100 d-flex align-items-center">
            <div class="col">
                <div class="text-center">
                    <h1 class="font-weight-bold text-white d-md-block d-none" >Cari Barang dan Alat Teknikmu di sini</h1>
                    
                    <h2 class="font-weight-bold text-white d-md-none d-block" >Cari Barang dan Alat Teknikmu di sini</h2>
                </div>
                <div class="d-flex">
                  <BaseInput
                      id="Cari"
                      v-model="query.search"
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
                  <button class="btn bg-main-color text-white px-4 ml-3 rounded-pill" type="button" @click="searchHandler">Cari</button>

                </div>
            </div>
            
          </div>
        </div>

        
    </div>
    <div class="position-relative">
      <div class="container shadow-main p-4 position-absolute bg-white" style="top:-80px;left:0;right:0">
        <div class="">
          <div>
            <a href="/cari/rekomendasi" class="float-right">Lihat semua  <fa :icon="['fas','eye']" /></a>
            <h3 class="mb-4" >Rekomendasi</h3>
          </div>
          
          <LoadingSpinner :show="isLoadingData.recommendation"/>
          <swiper ref="mySwiper" class="swiper" :options="swiperOption">
            <swiper-slide v-for="(item,i) in itemsData.recommendation" :key="i">
              <UserItemCard :data="item"/>
            </swiper-slide>
            <div slot="pagination" class="swiper-pagination"></div>
          </swiper>

          <div v-if="error.recommendation.status" class="text-center my-4 py-4">
              <div class="text-40 text-warning">
                  <fa :icon="['fas','exclamation-circle']"/>
              </div>
              <h3>{{error.recommendation.message || 'error'}}</h3>
          </div>
        </div>
      </div>
    </div>

    <div class="py-5">
    </div>
    <div class="py-5">
    </div>
    <div class="py-5">
    </div>
    
    <div class="container mb-5 mt-sm-5 mt-0 p-4 bg-white shadow-main">
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
          <!-- <div slot="button-prev" class="swiper-button-prev btn btn-light rounded-pill" style="width:40px;height:40px">
            <fa class="" :icon="['fas','chevron-left']" />
          </div>
          <div slot="button-next" class="swiper-button-next btn btn-light rounded-pill" style="width:40px;height:40px">
            <fa class="" :icon="['fas','chevron-right']" />
          </div> -->
        </swiper>
      </div>
    </div>
    
    <div class="container mb-5 mt-sm-5 mt-0 p-4 bg-white shadow-main">
      <div class="">
        <div>
          <a href="/cari/terbaru" class="float-right">Lihat semua  <fa :icon="['fas','eye']" /></a>
          <h3 class="mb-4" >Terbaru</h3>
        </div>
        <LoadingSpinner :show="isLoadingData.newest"/>
        <swiper ref="mySwiper" class="swiper" :options="swiperOption">
          <swiper-slide v-for="(item,i) in itemsData.newest" :key="i">
            <UserItemCard :data="item"/>
          </swiper-slide>
          <div slot="pagination" class="swiper-pagination"></div>
        </swiper>

        <div v-if="error.newest.status" class="text-center my-4 py-4">
            <div class="text-40 text-warning">
                <fa :icon="['fas','exclamation-circle']"/>
            </div>
            <h3>{{error.newest.message || 'error'}}</h3>
        </div>
        
      </div>
    </div>


  </div>
</template>

<script>
import ApiService from '~/common/api.service';
    export default {
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
          },

          query: {
            search: ''
          },

          itemsData : {
            newest: [],
            recommendation: [],
            bestSeller: []
          },
          isLoadingData : {
            newest: true,
            recommendation: true,
            bestSeller: true
          },
          error: {
            newest: {
              status: false,
              message: ''
            },
            recommendation: {
              status: false,
              message: ''
            },
            bestSeller: {
              status: false,
              message: ''
            }
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
          this.loadData();
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
          async loadData() {

              await ApiService.query('/items-posted-newest',{limit:10})
              .then((Response)=>{ 
                this.itemsData.newest = Response.data.data
                this.isLoadingData.newest = false;
              })
              .catch(err=>{
                console.log("err",err);
                this.isLoadingData.newest = false;
                const response = {...err};
                this.error.newest.status = true;
                this.error.newest.message = response.response.data.message;
              })
              
              await ApiService.query('/items-posted-recommendation',{limit:10})
              .then((Response)=>{ 
                this.itemsData.recommendation = Response.data.data
                this.isLoadingData.recommendation = false;
              })
              .catch(err=>{
                console.log("err",err);
                this.isLoadingData.recommendation = false;
                const response = {...err};
                this.error.recommendation.status = true;
                this.error.recommendation.message = response.response.data.message;
              })
          },

        searchHandler() {
          this.$router.push({name:'cari',query:{search: this.query.search}});
          
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