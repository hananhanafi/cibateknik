<template>
  <div id="user-order" class="shadow p-4 h-100 d-flex flex-column">
    
    <div class="row mb-4">
      <div class="col">
        <div class="flex-fill">
          <h3>Pesanan</h3>
        </div>
      </div>
      <!-- <div class="col-lg-3 col-md-12">
        <BaseSelect
        v-model="filters.statusOrder"
        :options="statusOrderOptions"
        placeholder="Pilih Status Pesanan"
        dense
        @input="orderSelectHandler($event)"
        />
      </div> -->
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
                <span v-if="order.statusOrder=='PENDING'" class="font-weight-bold text-warning">Memesan</span>
                <span v-else-if="order.statusOrder=='EXPIRED'" class="font-weight-bold text-danger">Pesanan Expired</span>
                <span v-else-if="order.statusOrder=='PACKING'" class="font-weight-bold text-primary">Dikemas</span>
                <span v-else-if="order.statusOrder=='SHIPPING'" class="font-weight-bold text-info">Dikirim</span>
                <span v-else-if="order.statusOrder=='DONE'" class="font-weight-bold text-success">Selesai</span>
              </td>
              <td>
                <span v-if="order.invoice.status=='PENDING'" class="font-weight-bold text-warning">Belum dibayar</span>
                <span v-else-if="order.invoice.status=='EXPIRED'" class="font-weight-bold text-danger">Invoice Expired</span>
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

    <UserModalDetailOrder
        :show="isShowUserModalDetailOrder"
        :data="currentOrder"
        @close="closeUserModalDetailOrder"
        @done-order="showModalDoneOrder()"
    />
    <ModalDoneOrder
        :show="isShowModalDoneOrder"
        :data="currentOrder"
        @close="closeModalDoneOrder"
        @update="doneOrderHandler($event)"
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
          order: null,
          statusOrder: null,
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

      statusOrderOptions: [
        {
          label: 'Memesan',
          value: 'PENDING',
        },
        {
          label: 'Dikemas',
          value: 'PACKING',
        },
        {
          label: 'Dikirim',
          value: 'SHIPPING',
        },
        {
          label: 'Selesai',
          value: 'DONE',
        },
        {
          label: 'Expired',
          value: 'EXPIRED',
        },
      ],
      
      items: new Array(10),
      isShowUserModalDetailOrder: false, 
      isShowModalDoneOrder: false, 
    }
  },
  computed: {
    params() {
        return {
            page: this.metaData.current_page, 
            order: this.filters.order ? (this.filters.order === 'Terbaru' ? 'desc' : 'asc') : null, 
            statusOrder: this.filters.statusOrder ? this.filters.statusOrder.value : null, 
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
          this.isShowUserModalDetailOrder = false;
      },
      async showModalDoneOrder() {
          await this.closeAllModal();
          this.isShowModalDoneOrder = true;
      },
      async closeModalDoneOrder() {
        await this.closeAllModal();
        this.showUserModalDetailOrder(this.currentOrder);
      },
      closeAllModal(){
          this.isShowUserModalDetailOrder = false;
          this.isShowModalDoneOrder = false;
      },
      doneOrderHandler(newOrder){
          this.isShowUserModalDetailOrder = false;
          this.isShowModalDoneOrder = false;
          
          const updatedOrder = this.userOrders.find((order)=>{ return order.id === newOrder.id});

          updatedOrder.statusOrder = newOrder.statusOrder;
          updatedOrder.invoice = newOrder.invoice;
      },
        // helpers
        formatDate

  }
}
</script>
