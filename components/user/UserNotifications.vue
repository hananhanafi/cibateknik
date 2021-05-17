<template>
    <div class="notif-container">
        <a class="btn notif-btn p-3" @click.prevent="toggleShowNotif">
            <fa class="text-20 text-primary" :icon="['fas','bell']"/>
            <fa v-if="unReadNotificationCounter>0" class="text-8 text-danger position-absolute" :icon="['fas','circle']"/>
        </a>
        <div class="notif-parent">
            <!-- <div v-show="showNotification" class="position-absolute"> -->
            <div v-show="showNotification" class="position-absolute shadow-main mb-3 bg-white notif-box" style="min-width:400px;
            -ms-transform: translateX(-50%);
            transform: translateX(-50%);">
                <div class="p-3 border-bottom">
                    <span class="text-20">Notifikasi</span> 
                    <a class="ml-auto float-right c-pointer" @click.prevent="setReadAllNotification">Tandai baca semua</a>
                </div>
                <!-- loading -->
                <LoadingSpinner :show="isLoadingData"/>
                <div class="container">
                    <div v-if="unReadNotificationCounter>0" class="row" style="max-height:300px;overflow-y:auto">
                        <div v-for="(notification,i) in userNotifications" :key="i" class="col-12 ml-0 notif border-bottom border-top">
                            <div class="p-2 py-3" @click.prevent="setReadNotification(notification)">
                                <fa v-if="notification.isRead===false" class="text-8 text-danger position-absolute" :icon="['fas','circle']" style="right:10px"/>
                                <div class="d-flex">
                                    <div class="mx-2">
                                        <fa class="text-20 text-primary" :icon="['fas','shopping-cart']"/>
                                    </div>
                                    <div>
                                        <h6 class="font-weight-bold">{{ notification.title }}</h6>
                                        <div>
                                            {{ notification.description }}
                                        </div>
                                        <a v-if="notification.notification_type==='order' && notification.data && notification.data.invoice.status=='PENDING'" class="btn btn-sm btn-primary w-100" @click.prevent="goToPayment(notification)">Bayar</a>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="text-muted text-12 text-right my-2">
                                {{ formatDateTime(notification.createdAt._seconds) }}
                            </div>
                        </div>
                    </div>
                    <div v-else-if="!isLoadingData" class="text-center my-5 py-5 w-100">
                        <div class="text-40 text-warning">
                            <fa :icon="['fas','exclamation-circle']"/>
                        </div>
                        <h5>Tidak ada notifikasi.</h5>
                    </div>
                </div>
                
                
                

                <div class="p-3 text-center border-top">
                    <!-- <a class="btn btn-sm">Lihat Semua</a>  -->
                    <router-link class="btn btn-sm" :to="{ name: 'user-profile', query: { tab: 'notification' } }">
                        Lihat Semua
                    </router-link>
                </div>
            </div>
        <!-- </div> -->
            
        </div>
    </div>
</template>

<style scoped>
/* .notif-container{

} */

@media only screen and (max-width: 760px) {
    .notif-parent{
        width: 100%;
    }
    .notif-container{
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        z-index: 9999;

    }
    .notif-box{
        -ms-transform: translateX(0%) !important;
        transform: translateX(0%) !important;
        width: 100%;
        min-width: unset !important;
    }
    .notif-btn{
        position: fixed;
        right: 0;
        bottom: 70px;
        color: #0F2027 imp !important;
    }
}
.notif{
    cursor: pointer;
}
.notif:hover{
    background-color: #efefef;
}
</style>

<script>
import ApiService from '~/common/api.service';
import { formatDateTime } from '~/store/helpers';
export default {
    props: {
        data: {
            type: Object,
            default: null
        },
    },
    data() {
        return {
            showNotification: false,
            items: new Array(10),
            userNotifications: [],
            isLoadingData: false,
            errors: null,
            unReadNotificationCounter: 0,
        }
    },
    computed: {
        photoURL() {
            const url = this.getUserInfo && this.getUserInfo.photoURL || process.env.baseUrl+"/_nuxt/assets/img/dummy.png"
            return url;
        },
        getUserInfo(){
            return this.$store.state.userInfo;
        },
    },
    watch: {
        "$route.fullPath"() {
            this.showNotification=false;
        }
    },
    created() {
        // eslint-disable-next-line nuxt/no-globals-in-created
        window.addEventListener('beforeunload', this.loadNotif);
    },
    mounted() {
        this.loadNotif();
        console.log("NONOTif");
    },
    destroyed() {
        window.removeEventListener('beforeunload', this.loadNotif)
    },
    methods: {
        goToPayment(notification){
            window.open(notification.data.invoice.invoice_url, '_blank');
        },
        async setReadNotification(notification){
            console.log("READ");
            await ApiService.post(`/user/${this.getUserInfo.userID}/notification/${notification.id}/read`)
            .then((data)=>{
                console.log("success",data);
                notification.isRead = true;
                this.unReadNotificationCounter--;
            })
            .catch((err)=>{
                console.log("error",err);
            })
        },
        async setReadAllNotification(){
            await ApiService.post(`/user/${this.getUserInfo.userID}/notification/read`)
            .then(()=>{
                this.userNotifications = this.userNotifications.map(notification=>{
                    return {
                        ...notification,
                        isRead: true
                    }
                });
                this.unReadNotificationCounter = 0;
            })
            .catch((err)=>{
                console.log("error",err);
            })
        },
        toggleShowNotif(){
            console.log("route",this.$route)
            this.showNotification = !this.showNotification;
            if(this.showNotification){
                this.loadNotif();
            }
            console.log("shonotif",this.showNotification);
        },
        async loadNotif(){
            this.isLoadingData = true;
            console.log("LOADNOTIF");

            await ApiService.get(`/user/unread-notifications/${this.getUserInfo.userID}`).then(data=>{
                this.userNotifications = data.data;
                this.unReadNotificationCounter = this.userNotifications.length;
            })
            .catch((err)=>{
                this.errors=err;
            })
            this.isLoadingData = false;
        },
        // helpers
        formatDateTime
    },
    
}
</script>