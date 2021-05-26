<template>
  <div class="shadow p-4 h-100 d-flex flex-column">
    
    <div class="row mb-4">
      <div class="col">
        <div class="flex-fill">
          <h3>Notifikasi <fa :icon="['fas','bell']" /> </h3>
        </div>
      </div>
      <!-- <div class="col-lg-6 col-md-12 text-right">
        <a class="btn btn-sm text-danger" @click="showModalDeleteAllItem">
          Tandai baca semua  
        </a>
      </div> -->
    </div>

    <LoadingSpinner v-if="isLoadingData" :show="isLoadingData"/>
    <div v-else-if="userNotifications.length>0" class="row">
      <div v-for="(notification,i) in userNotifications" :key="i" class="col-12" >
        <div class="p-3 shadow-main mb-3 " style="max-height:160px;min-height:120px">
          <div class="row">
            <div class="col">
              <div class="d-flex">
                <div>
                  <h5>{{ notification.title }}</h5>
                </div>
                <div class="text-muted ml-4">
                  {{ formatDateTime(notification.createdAt._seconds) }}
                </div>
              </div>
              <div class="truncate-paragraph mb-md-0 mb-2">
                {{ notification.description }}
              </div>
              
              <div v-if="notification.notification_type==='order' && notification.data && notification.data.statusOrder==='SHIPPING'" class="alert alert-warning">
                Nomor Resi : {{ notification.data.receiptNumber }}
              </div>
              <a v-if="notification.notification_type==='order' && notification.data && notification.data.invoice.status=='PENDING'" class="btn btn-sm btn-primary w-100" @click.prevent="goToPayment(notification)">Bayar</a>
            </div>
            <div class="col-lg-3 col-md-12 text-center d-flex align-self-center">
              <!-- <a class="btn btn-sm text-primary mx-auto"><fa class="text-primary" :icon="['fas','eye']" /> Lihat</a> -->
              <a class="btn btn-sm text-danger mx-auto"  @click="showUserModalDeleteMessage(notification)" ><fa class="text-danger" :icon="['fas','trash']"/> Hapus</a>
            </div>
          </div>
          
        </div>
      </div>
    </div>
    <div v-else-if="!isLoadingData" class="text-center my-5 py-5 w-100">
        <div class="text-40 text-warning">
            <fa :icon="['fas','exclamation-circle']"/>
        </div>
        <h5>Tidak ada notifikasi.</h5>
    </div>
    
    
    <PaginationData :data="metaData" @page-update="pageUpdateHandler($event)"/>

    

      <UserModalDeleteMessage
          :show="isShowUserModalDeleteMessage"
          :data="currentNotification"
          @close="closeUserModalDeleteMessage"
          @update="deleteNotificationHandler($event)"
      />
    

      <UserModalDeleteMessage
          :show="isShowModalDeleteAllItem"
          :data="{message:'Yakin ingin menghapus semua?'}"
          @close="closeModalDeleteAllItem"
      />
  </div>
</template>

<script>
import ApiService from '~/common/api.service';
import { formatDateTime } from '~/store/helpers';
export default {
  data() {
    return {
      formData: {
        username: "hanafihanan",
        nama: "Hanan Hanafi",
        email: "hanafihanan@mail.id",
        sort : null,
        date: {
          day: null,
          month: null,
          year: null,
        },
      },
      
      isShowUserModalDeleteMessage: false, 
      isShowModalDeleteAllItem: false, 

      
      userNotifications: [],
      currentNotification: {},
      isLoadingData: false,
      metaData: {
          first_index: 0,
          last_index: 0,
          current_page: 1,
          first_page: 1,
          last_page: 1,
          total: 0,
      },
      errors: null
    }
  },
  computed: {
    getUserInfo(){
        return this.$store.state.userInfo;
    },
    params() {
        return {
            page: this.metaData.current_page, 
            limit: 5
        }
    },
  },
  mounted() {
    this.loadNotif();
  },
  methods: {
      deleteNotificationHandler(notificationDeleted){
          this.userNotifications = this.userNotifications.filter(notification=>{ return notification.id!==notificationDeleted.id});
      },
      goToPayment(notification){
          window.open(notification.data.invoice.invoice_url, '_blank');
      },
      pageUpdateHandler(page){
          this.metaData.current_page = page;
          this.loadNotif();
      },
      async loadNotif(){
          this.isLoadingData = true;
          await ApiService.query(`/user/notifications/${this.getUserInfo.userID}`,this.params).then(response=>{
              this.userNotifications = response.data.data;
              this.metaData = response.data.meta
          })
          .catch((err)=>{
              this.errors=err;
          })
          this.isLoadingData = false;
      },
      showUserModalDeleteMessage(notification) {
          this.currentNotification = Object.assign({},notification);
          this.isShowUserModalDeleteMessage = true;
      },
      closeUserModalDeleteMessage() {
          this.currentNotification = {};
          this.isShowUserModalDeleteMessage = false;
      },
      showModalDeleteAllItem() {
          this.isShowModalDeleteAllItem = true;
      },
      closeModalDeleteAllItem() {
          this.isShowModalDeleteAllItem = false;
      },
      // helpers
      formatDateTime

  }
}
</script>
