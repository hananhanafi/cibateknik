<template>
    <div class="text-center">
        
        <div class="container">
            <Breadcrumb :data="breadCrumbList"/>
            <div class="bg-white shadow-sm rounded-8 p-2 text-left ">
                <div class="mb-3 p-2">
                    <h1>Daftar Customer</h1>
                </div>
                <div class="container-fluid">
                    <div class="col">
                        <div class="d-md-flex">
                            <div class="flex-fill mb-2 mr-2">
                                <form @submit.prevent="loadData">
                                <BaseInput
                                    id="Cari"
                                    v-model="formData.search"
                                    placeholder="Cari Customer..."
                                    class="mb-0"
                                    
                                >
                                    <div slot="afterInput" class="position-absolute"
                                        style=" right:12px;
                                                top: 50%;
                                                -ms-transform: translateY(-50%);
                                                transform: translateY(-50%);
                                                z-index:99"
                                    >
                                        <fa class="" :icon="['fas','search']" /> 
                                    </div>
                                </BaseInput>
                                </form>
                            </div>
                            <div class="ml-auto mb-2 mr-2" style="width:160px">
                                <BaseSelect
                                v-model="formData.order"
                                :options="['Terbaru', 'Terlama']"
                                placeholder="Pilih Urutkan"
                                dense
                                @input="orderSelectHandler($event)"
                                />
                            </div>
                        </div>
                        <table class="table table-responsive-md">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Photo</th>
                                    <th scope="col">Nama</th>
                                    <th scope="col">Tanggal Daftar</th>
                                    <th scope="col">Tanggal Terakhir Online</th>
                                    <th scope="col" class="text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(customer,i) in customers" :key="i">
                                    <th scope="row">{{customer.userID}}</th>
                                    <td>
                                        <img src="~/assets/img/person.png" class="img-fluid" style="width:40px" alt="Responsive image"> 
                                    </td>
                                    <td>{{customer.firstName + " " + customer.lastName}}</td>
                                    <!-- <td>{{ new Date(customer.createdAt._seconds)}}</td> -->
                                    <td>{{ formatDate(customer.createdAt._seconds) }}</td>
                                    <td>{{ formatDate(customer.lastLogin._seconds) || '-' }}</td>
                                    
                                    <td class="text-center">
                                        <button class="btn btn-primary btn-sm" @click="showModaldDetailCustomer(customer)" >
                                            Detail Customer
                                        </button>
                                        <button class="btn btn-outline-warning btn-sm" @click="$router.push({name:'admin-customer-history'})" >
                                            Riwayat Pesanan
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <PaginationData :data="metaData" @page-update="pageUpdateHandler($event)"/>
                    </div>
                </div>
            </div>
            
            <ModalDetailCustomer :show="isShowModaldDetailCustomer" :data="currentCustomer" @close="closeModaldDetailCustomer"/>
            
        </div>
    </div>
</template>

<script>
import { formatDate } from '../../../store/helpers';
import ApiService from '~/common/api.service';
    export default {
        // page properties go here
        layout: "admin",
        middleware: 'adminAuthenticated',
        data() {
            return {
                breadCrumbList: [
                    {name:"Daftar Customer",link:"/admin/customer"}
                ],
                customers : [],
                isLoadingData: false,
                currentItem : {
                        "isActive": true,
                        "date": "Kamis,21 Desember 2020",
                        "name": {
                            "first": "Dickerson",
                            "last": "Macdonald"
                        }
                },
                isShowModaldDetailCustomer: false,
                formData: {
                    search: null,
                    order: null,
                },
                metaData: {
                    first_index: 0,
                    last_index: 0,
                    current_page: 1,
                    first_page: 1,
                    last_page: 1,
                    total: 0,
                },
                currentCustomer: null,

            }
        },
        computed: {
            params() {
                return {
                    search: this.formData.search || null, 
                    page: this.metaData.current_page, 
                    order: this.formData.order ? (this.formData.order === 'Terbaru' ? 'desc' : 'asc') : null, 
                }
            }
        },
        
        async mounted() {
            await this.loadData();
            console.log("cus",this.customers)
        },
        methods: {
            async loadData() {
                this.isLoadingData = true;
                await ApiService.query('/users',this.params)
                .then((Response)=>{
                    this.customers = Response.data.data;
                    this.metaData = Response.data.meta
                    // this.first_index = this.meta.first_index;
                    // this.last_index = this.meta.last_index;
                    // this.current_page = this.meta.current_page;
                    // this.first_page = this.meta.first_page;
                    // this.last_page = this.meta.last_page;
                    // this.total = this.meta.total;
                })
                .catch(err=>{
                    console.log("err",err);
                })
                this.isLoadingData = false;
            },
            orderSelectHandler(value){
                if(value){
                    this.loadData();
                }
            },
            pageUpdateHandler(page){
                this.metaData.current_page = page;
                this.loadData();
            },
            showModaldDetailCustomer(customer) {
                this.currentCustomer = Object.assign({},customer);
                this.isShowModaldDetailCustomer = true;
            },
            closeModaldDetailCustomer() {
                this.currentCustomer = null;
                this.isShowModaldDetailCustomer = false;
            },

            // helpers
            formatDate
        },
        head() {
            return {
                title: "Cibateknik Admin - Customer",
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