<template>
  <div class="shadow p-4 h-100 d-flex flex-column">
    
    <div class="row mb-4">
      <div class="col">
        <div class="flex-fill">
          <h3>Wishlist Saya</h3>
        </div>
      </div>
    </div>

    <div v-if="wishlistItems.length>0">
      <div class="row">
          <div v-for="(item,i) in wishlistItems" :key="i" class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 mb-4">
              <UserItemCard :data="item"/>
          </div>
      </div>
    </div>
    <div v-if="wishlistItems.length>0" class="d-flex align-items-end flex-grow-1">
      <div class="w-100">
        <div class="row justify-content-center">
          <div class="col-12 d-flex">
              <div>
                  Menampilkan 1 - {{ metaData.last_index || '0' }} dari {{ metaData.total || '0' }} item
              </div>
              <div class="ml-auto">
                  <button v-show="!isLastPage" :disabled="isLoadingData" class="btn btn-primary border w-100 rounded-pill" @click.prevent="loadMore">Muat Lagi</button>
              </div>
          </div>
        </div> 
      </div>
    </div>

    <div v-else-if="!isLoadingData" class="text-center my-5 py-5">
        <div class="text-40 text-warning">
            <fa :icon="['fas','exclamation-circle']"/>
        </div>
        <h3>Wishlist barang tidak ada.</h3>
    </div>
    <LoadingSpinner v-if="isLoadingData" :show="isLoadingData"/>

  </div>
</template>

<script>
import ApiService from '~/common/api.service';
export default {
  data() {
    return {
      wishlistItems: [],
      isLoadingData: true,
      metaData: {
          first_index: 0,
          last_index: 0,
          current_page: 1,
          first_page: 1,
          last_page: 1,
          total: 0,
      },

      items: new Array(18)
    }
  },
  computed: {
    params() {
        return {
            page: this.metaData.current_page, 
        }
    },
    isLastPage() {
        return this.metaData.current_page === this.metaData.last_page;
    },
  },
  created() {
      this.loadData();
  },
  methods: {
    async loadData() {
        this.isLoadingData = true;
        await ApiService.query('/user/wishlist/items',this.params)
        .then((response)=>{
            console.log("ct",response.data);
            this.wishlistItems = response.data.data;
            this.metaData = response.data.meta
            console.log("this.wishlistItems",this.wishlistItems);

        })
        .catch(err=>{
            console.log("err",err);
        })
        this.isLoadingData = false;
    },
    async loadMore() {
        this.metaData.current_page++;
        this.isLoadingData = true;
        await ApiService.query('/user/wishlist/items',this.params)
        .then((response)=>{
            this.wishlistItems = this.wishlistItems.concat(response.data.data);
            this.metaData = response.data.meta

        })
        .catch(err=>{
            console.log("err",err);
        })
        this.isLoadingData = false;
    },
  }
}
</script>
