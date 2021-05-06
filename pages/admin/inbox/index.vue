<template>
    <div class="text-center">
        <div class="container">
            <Breadcrumb :data="breadCrumbList"/>
            <div class="bg-white shadow-sm rounded-8 p-2 text-left ">
                <div class="mb-3 p-2 d-flex">
                    <h1>Pesan</h1>
                    
                    <div class="ml-2" style="width:160px">
                        <BaseSelect
                        v-model="filters.order"
                        :options="['Terbaru', 'Terlama']"
                        placeholder="Pilih Urutkan"
                        dense
                        @input="orderSelectHandler($event)"
                        />
                    </div>

                    <div class="ml-auto d-flex align-items-center">
                        <a class="btn btn-sm text-danger" @click="showModalDeleteMessage"><fa class="text-danger" :icon="['fas','trash']" /> Hapus Semua</a>

                    </div>
                </div>
                <div class="container-fluid">
                    
                    <div v-if="inboxMessages.length>0" class="row">
                        <div v-for="(message,i) in inboxMessages" :key="i" class="col-12" >
                            <div class="p-3 shadow-main mb-3 ">
                            <div class="row">
                                <div class="col">
                                <div class="d-flex">
                                    <div>
                                    <h5>{{ message.title }}</h5>
                                    </div>
                                    <div class="text-muted ml-2">
                                        {{ formatDate(message.createdAt._seconds) }}
                                    </div>
                                </div>
                                <!-- <div class="truncate-paragraph mb-md-0 mb-2">
                                    {{ message.body }}
                                    
                                </div> -->
                                </div>
                                <div class="col-lg-3 col-md-12 text-center d-flex align-self-center">
                                <a class="btn btn-sm text-primary mx-auto" @click="showModalDetailInbox(message)"><fa class="text-primary" :icon="['fas','eye']" /> Lihat</a>
                                <a class="btn btn-sm text-danger mx-auto" @click="showModalDeleteMessage(message)"><fa class="text-danger" :icon="['fas','trash']"/> Hapus</a>
                                </div>
                            </div>
                            
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="d-flex align-items-end flex-grow-1">
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
                        </div>
                    </div>
                    <div v-else-if="!isLoadingData" class="text-center my-5 py-5">
                        <div class="text-40 text-warning">
                            <fa :icon="['fas','exclamation-circle']"/>
                        </div>
                        <h3>Pesan tidak ada.</h3>
                    </div>
                    <LoadingSpinner v-if="isLoadingData" :show="isLoadingData"/>
                </div>
            </div>
            
            <ModalDetailInbox :show="isShowModalDetailInbox" :data="currentMessage" @close="closeModaldDetailInbox"/>
            
            <ModalDeleteMessage :show="isShowModalDeleteMessage" :data="currentMessage" @close="closeModalDeleteMessage" @update="deleteMessageHandler($event)"/>
            
        </div>
    </div>
</template>

<script>
import ApiService from '~/common/api.service';
import { formatDate } from '~/store/helpers';
    export default {
        // page properties go here
        layout: "admin",
        middleware: 'adminAuthenticated',
        data() {
            return {
                breadCrumbList: [
                    {name:"Inbox",link:"/admin/inbox"}
                ],
                currentItem : {
                        "isActive": true,
                        "date": "Kamis,21 Desember 2020",
                        "name": {
                            "first": "Dickerson",
                            "last": "Macdonald"
                        }
                },
                isShowModalDetailInbox: false,
                isShowModalDeleteMessage: false,

                inboxMessages: [],
                metaData: {
                    first_index: 0,
                    last_index: 0,
                    current_page: 1,
                    first_page: 1,
                    last_page: 1,
                    total: 0,
                },
                filters: {
                    oder: null
                },

                isLoadingData: true,
                currentMessage: {
                    title: '',
                    name: '',
                    body: '',
                    createdAt: {
                        _seconds: ''
                    }
                },
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
        },
        created() {
            this.loadData();
        },
        mounted() {
            // Set the initial number of items
        },
        methods: {
        orderSelectHandler(value){
            if(value){
                this.current_page = 1;
                this.loadData();
            }
        },
            deleteMessageHandler(messageDeleted){
                this.inboxMessages = this.inboxMessages.filter(message=>{ return message.id!==messageDeleted.id});
            },
            async loadData() {
                this.isLoadingData = true;
                await ApiService.query('/admin/messages',this.params)
                .then((response)=>{
                    this.inboxMessages = response.data.data;
                    this.metaData = response.data.meta

                })
                .catch(err=>{
                    console.log("err",err);
                })
                this.isLoadingData = false;
            },
            async loadMore() {
                this.metaData.current_page++;
                this.isLoadingData = true;
                await ApiService.query('/admin/messages',this.params)
                .then((response)=>{
                    this.inboxMessages = this.inboxMessages.concat(response.data.data);
                    this.metaData = response.data.meta

                })
                .catch(err=>{
                    console.log("err",err);
                })
                this.isLoadingData = false;
            },
            showModalDetailInbox(message) {
                this.currentMessage = Object.assign({},message);
                this.isShowModalDetailInbox = true;
            },
            closeModaldDetailInbox() {
                this.currentMessage = {
                    title: '',
                    name: '',
                    body: '',
                    createdAt: {
                        _seconds: ''
                    }
                };
                this.isShowModalDetailInbox = false;
            },
            showModalDeleteMessage(message) {
                this.currentMessage = Object.assign({},message);
                this.isShowModalDeleteMessage = true;
            },
            closeModalDeleteMessage() {
                this.currentMessage = {
                    title: '',
                    name: '',
                    body: '',
                    createdAt: {
                        _seconds: ''
                    }
                };
                this.isShowModalDeleteMessage = false;
            },
            // helpers
            formatDate
        },
        head() {
            return {
                title: "Cibateknik Admin - Inbox",
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