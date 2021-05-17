<template>
    <div class="row mb-3">
        <div class="col-md-7 col-lg-9 col-12 bg-white shadow-sm rounded-8 p-3 text-left">
            <div class="d-flex p-2">
                <h1>Daftar Pesanan</h1>
                <div class="ml-auto mb-2 mr-2 float-right" style="width:160px">
                    <BaseSelect
                    v-model="filters.order"
                    :options="['Terbaru', 'Terlama']"
                    placeholder="Pilih Urutkan"
                    dense
                    @input="orderSelectHandler($event)"
                    />
                </div>
            </div>
            
            <div v-if="usersOrder.length>0"  class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Nomor</th>
                            <th scope="col">User ID</th>
                            <th scope="col">Tanggal Pesanan Dibuat</th>
                            <th scope="col">Harga Pesanan Barang</th>
                            <th scope="col">Status Pesanan</th>
                            <th scope="col">Status Pembayaran</th>
                            <th scope="col" class="text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(order,i) in usersOrder" :key="i" :class="{ 'bg-light':order.statusOrder==='DONE' }"  >
                            <th scope="row">{{ metaData.first_index+i }}</th>
                            <td>{{ order.userID }}</td>
                            <td>{{ formatDate(order.createdAt._seconds) }}</td>
                            <td>Rp {{ toFormatedNumber(order.detailOrder.totalItemsPrice) }}</td>
                            
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
                            <td class="text-center">
                                <button title="Lihat detail pesanan" class="btn btn-sm btn-outline-primary btn-sm" @click="showAdminModalDetailOrder(order)" >
                                    <fa :icon="['fas','eye']"/> Detail
                                </button>
                                <!-- <button v-if=" order && order.statusOrder!='DONE' && order.invoice.status == 'PAID'" class="btn btn-outline-warning btn-sm" @click="showModalEditStatusOrder" >
                                    Edit Status
                                </button> -->
                                <button v-if=" order && order.statusOrder=='PACKING' && order.invoice.status == 'PAID'" class="btn btn-warning btn-sm" @click="showModalEditStatusOrder(order)" >
                                    <fa :icon="['fas','shipping-fast']"/> Barang dikirim
                                </button>
                                <button v-if=" order && order.statusOrder=='SHIPPING' && order.invoice.status == 'PAID'" class="btn btn-success btn-sm" @click="showModalEditStatusOrder(order)" >
                                    <fa :icon="['fas','check']"/> Pesanan selesai
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-else-if="!isLoadingData" class="text-center my-5 py-5">
                <div class="text-40 text-warning">
                    <fa :icon="['fas','exclamation-circle']"/>
                </div>
                <h3>Tidak ada pesanan.</h3>
            </div>
            
            <LoadingSpinner v-if="isLoadingData" :show="isLoadingData"/>
            
            <AdminModalDetailOrder
                :show="isShowAdminModalDetailOrder"
                :data="currentOrder"
                @close="closeAdminModalDetailOrder"
            />

            <ModalEditStatusOrder
                :show="isShowModalEditStatusOrder"
                :data="currentOrder"
                @update="updateStatusOrderHandler($event)"
                @close="closeModalEditStatusOrder"
            />

        
            <PaginationData :data="metaData" @page-update="pageUpdateHandler($event)"/>
        </div>    
    
        <div class="col-md-5 col-lg-3 col-12">
            <div class="bg-white shadow-sm rounded-8 p-3 ">
                <div class="row h-100 align-items-center">
                    <div  class="col-md-6 col-12 text-left">
                        <div class="font-weight-bold text-16">
                            <div>Total Pesanan</div>
                        </div>
                    </div>
                    <div class="col font-weight-bolder text-24">:</div>
                    <div class="col">
                        <div style="font-size:2rem">
                            100
                        </div>
                    </div>
                </div>
                <div style="height:100px" class="w-100 shadow-sm text-white rounded-8 p-3 mb-4 bg-success">
                    <div class="row h-100 align-items-center">
                        <div  class="col-md-6 col-12 text-left">
                            <div class="font-weight-bold text-16">
                                <div>Total Pesanan Selesai</div>
                            </div>
                        </div>
                        <div class="col font-weight-bolder text-24">:</div>
                        <div class="col">
                            <div style="font-size:2rem">
                                100
                            </div>
                        </div>
                    </div>
                </div>
                <div style="height:100px" class="w-100 shadow-sm text-white rounded-8 p-3 mb-4 bg-info">
                    <div class="row h-100 align-items-center">
                        <div  class="col-md-6 col-12 text-left">
                            <div class="font-weight-bold text-16">
                                <div>Total Pesanan Dikirim</div>
                            </div>
                        </div>
                        <div class="col font-weight-bolder text-24">:</div>
                        <div class="col">
                            <div style="font-size:2rem">
                                100
                            </div>
                        </div>
                    </div>
                </div>
                <div style="height:100px" class="w-100 shadow-sm text-white rounded-8 p-3 mb-4 bg-primary">
                    <div class="row h-100 align-items-center">
                        <div  class="col-md-6 col-12 text-left">
                            <div class="font-weight-bold text-16">
                                <div>Total Pesanan Dikemas</div>
                            </div>
                        </div>
                        <div class="col font-weight-bolder text-24">:</div>
                        <div class="col">
                            <div style="font-size:2rem">
                                100
                            </div>
                        </div>
                    </div>
                </div>
                <div style="height:100px" class="w-100 shadow-sm text-white rounded-8 p-3 mb-4 bg-warning">
                    <div class="row h-100 align-items-center">
                        <div  class="col-md-6 col-12 text-left">
                            <div class="font-weight-bold text-16">
                                <div>Total Pesanan Belum Dibayar</div>
                            </div>
                        </div>
                        <div class="col font-weight-bolder text-24">:</div>
                        <div class="col">
                            <div style="font-size:2rem">
                                100
                            </div>
                        </div>
                    </div>
                </div>
                <div style="height:100px" class="w-100 shadow-sm text-white rounded-8 p-3 mb-4 bg-danger">
                    <div class="row h-100 align-items-center">
                        <div  class="col-md-6 col-12 text-left">
                            <div class="font-weight-bold text-16">
                                <div>Total Pesanan Expired</div>
                            </div>
                        </div>
                        <div class="col font-weight-bolder text-24">:</div>
                        <div class="col">
                            <div style="font-size:2rem">
                                100
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>

</template>

<script>
import ApiService from '~/common/api.service';
import { formatDate, toFormatedNumber } from '~/store/helpers';
export default {
    props: {
    },
    data() {
        return {
            usersOrder: [],
            currentOrder: null,
            isLoadingData: true,
            metaData: {
                first_index: 0,
                last_index: 0,
                current_page: 1,
                first_page: 1,
                last_page: 1,
                total: 0,
            },
            
            filters: {
                order: null,
            },
            isShowAdminModalDetailOrder: false, 
            isShowModalEditStatusOrder: false, 

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
    mounted() {
        // Set the initial datas
        this.loadData();
    },
    methods: {
        updateStatusOrderHandler(value) {
            const updatedOrder = this.usersOrder.find(order=>{return order.id === value.id});

            updatedOrder.statusOrder = value.statusOrder;
            if(value.receiptNumber){
                updatedOrder.receiptNumber = value.receiptNumber
            }
        },
        pageUpdateHandler(page){
            this.metaData.current_page = page;
            this.loadData();
        },
        async loadData() {
            this.isLoadingData = true;
            await ApiService.query('/admin/users-order',this.params)
            .then((Response)=>{
                this.usersOrder = Response.data.data;
                this.metaData = Response.data.meta
            })
            .catch(err=>{
                console.log("err",err);
            })
            this.isLoadingData = false;
        },
        resetData() {
            this.metaData.current_page = 1;
            this.usersOrder = [];
            this.loadData();
        },

        
        showAdminModalDetailOrder(order) {
            this.currentOrder = Object.assign({},order);
            this.isShowAdminModalDetailOrder = true;
        },
        closeAdminModalDetailOrder() {
            this.currentOrder = {};
            this.isShowAdminModalDetailOrder = false;
        },
        
        showModalEditStatusOrder(order) {
            this.currentOrder = Object.assign({},order);
            this.isShowModalEditStatusOrder = true;
        },
        closeModalEditStatusOrder() {
            this.currentOrder = {};
            this.isShowModalEditStatusOrder = false;
        },

        orderSelectHandler(value){
            if(value){
                this.resetData();
            }
        },
        
        // helpers
        formatDate,
        toFormatedNumber
    },
}
</script>
