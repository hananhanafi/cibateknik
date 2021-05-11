<template>
  <div class="shadow p-4 h-100 d-flex flex-column">
    
    <div class="row mb-4">
      <div class="col">
        <div class="flex-fill">
          <h3>Pesanan</h3>
        </div>
      </div>
      <div class="col-lg-2 col-md-12">
        <BaseSelect
        v-model="filters.order"
        :options="['Terbaru', 'Terlama']"
        placeholder="Pilih Urutkan"
        dense
        @input="orderSelectHandler($event)"
        />
      </div>
    </div>

  
    <div v-if="userOrders.length>0" class="row">
      <div class="col">
        <table class="table table-responsive-lg">
          <thead>
            <tr>
              <th scope="col">ID Pesanan</th>
              <th scope="col">Tanggal Pesanan Dibuat</th>
              <th scope="col">Status Pesanan</th>
              <th scope="col">Status Pembayaran</th>
              <th scope="col">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order,i) in userOrders" :key="i">
              <th scope="row">{{ order.id }}</th>
              <td>{{ formatDate(order.createdAt._seconds) }}</td>
              <td>
                <span v-if="order.statusOrder=='PENDING'" class="font-weight-bold text-danger">Memesan</span>
                <span v-else-if="order.statusOrder=='PACKING'" class="font-weight-bold text-warning">Dikemas</span>
                <span v-else-if="order.statusOrder=='SHIPPING'" class="font-weight-bold text-info">Dikirim</span>
                <span v-else-if="order.statusOrder=='DONE'" class="font-weight-bold text-success">Selesai</span>
              </td>
              <td>
                <span v-if="order.invoice.status=='PENDING'" class="font-weight-bold text-danger">Belum dibayar</span>
                <span v-else-if="order.invoice.status=='PAID'" class="font-weight-bold text-success">Sudah dibayar</span>
              </td>
              <td width="20%">
                <a class="btn btn-sm text-primary mx-auto" @click="showUserModalDetailOrder(order)"  ><fa class="text-primary" :icon="['fas','eye']" /> Lihat</a>
                <!-- <a class="btn btn-sm text-danger mx-auto"  @click="showModalDeleteItem" ><fa class="text-danger" :icon="['fas','trash']"/> Hapus</a> -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else-if="!isLoadingData" class="text-center my-5 py-5">
        <div class="text-40 text-warning">
            <fa :icon="['fas','exclamation-circle']"/>
        </div>
        <h3>Pesanan tidak ada.</h3>
    </div>
    <LoadingSpinner v-if="isLoadingData" :show="isLoadingData"/>

    
    <PaginationData :data="metaData" @page-update="pageUpdateHandler($event)"/>

    <ModalDeleteItem
        :show="isShowModalDeleteItem"
        :data="{}"
        @close="closeModalDeleteItem"
    />
    <UserModalDetailOrder
        :show="isShowUserModalDetailOrder"
        :data="currentOrder"
        @close="closeUserModalDetailOrder"
    />

  </div>
</template>

<script>
import ApiService from '~/common/api.service';
import { formatDate } from '~/store/helpers';
export default {
  data() {
    return {
      filters: {
          oder: null
      },
      userOrders: [],
      currentOrder: {},
      metaData: {
          first_index: 0,
          last_index: 0,
          current_page: 1,
          first_page: 1,
          last_page: 1,
          total: 0,
      },
      isLoadingData: true,

      
      items: new Array(10),
      isShowUserModalDetailOrder: false, 
      isShowModalDeleteItem: false, 
    }
  },
  computed: {
    params() {
        return {
            page: this.metaData.current_page, 
            order: this.filters.order ? (this.filters.order === 'Terbaru' ? 'desc' : 'asc') : null, 
        }
    },
    isLastPage() {
        return this.metaData.current_page === this.metaData.last_page;
    },
    getUserInfo(){
        return this.$store.state.userInfo;
    },
  },
  created() {
      this.loadData();
  },
  methods: {
      orderSelectHandler(value){
          if(value){
              this.current_page = 1;
              this.loadData();
          }
      },
      pageUpdateHandler(page){
          this.metaData.current_page = page;
          this.loadData();
      },
      async loadData() {
          this.isLoadingData = true;
          await ApiService.query(`/user/order/${this.getUserInfo
          .userID}`,this.params)
          .then((response)=>{
              this.userOrders = response.data.data;
              this.metaData = response.data.meta

          })
          .catch(err=>{
              console.log("err",err);
          })
          this.isLoadingData = false;
      },
      showUserModalDetailOrder(order) {
          this.currentOrder = Object.assign({},order);
          this.isShowUserModalDetailOrder = true;
      },
      closeUserModalDetailOrder() {
          this.currentOrder = {};
          this.isShowUserModalDetailOrder = false;
      },
      showModalDeleteItem() {
          this.isShowModalDeleteItem = true;
      },
      closeModalDeleteItem() {
          this.isShowModalDeleteItem = false;
      },

        // helpers
        formatDate

  }
}
</script>
