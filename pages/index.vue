<template>
  <div class=" ">
    <div class="h-100 bg" style="min-height:1080px">
      
        <b-container class="align-middle">
            <b-row class="justify-content-md-center" style="height:1080px">
                <b-col cols="12" lg="12" class="mx-auto my-auto"> 
                  <div class="text-center">
                      <h1 class="font-weight-bold text-white" >Cari Barang dan Alat Teknikmu di sini</h1>
                  </div>
                  <div class="d-flex">
                    <b-input-group class="d-flex">
                      <b-form-input v-model="password" class="mb-2 w-100 bg-transparent h-100 text-white search-input" placeholder="Cari ..."  type="text"></b-form-input>
                    
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
                  
                </b-col>
            </b-row>
        </b-container>


    </div>

    <div class="container-fluid my-5">
      <div class="row bg-white mx-5 p-2 py-5 shadow">
        <div class="col-12 d-flex">
            <h2 class="font-weight-bold mb-4" >Produk Terlaris</h2>
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
    </div>

    
    <div class="container-fluid my-5">
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
    </div>

  </div>
</template>

<script>
    export default {
        middleware: 'notAuthenticated',
        // page properties go here
        layout: "user",
        methods: {
          searchHandler() {
            this.$router.push('/cari');
            
          }
        }
    }
</script>

<style>
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