<template>
    <div class="bg-white shadow-sm rounded-8 p-3 text-left">
        <div class="mb-3 p-2">
            <h3>Riwayat Barang</h3>
        </div>

        <div v-if="items.length>0" class="row px-2">
            <div v-for="(item,i) in items" :key="i" class="col-12 mb-3">
                <div class="card p-3">
                    <div class="d-flex">
                        <div>
                        <h5>{{ item.data.item.name }}</h5>
                        </div>
                        <div class="text-muted ml-4">
                        {{ formatDateTime(item.createdAt._seconds) }}
                        </div>
                    </div>
                    <div class="d-md-flex d-block mb-3">
                        <!-- <table class="text-nowrap table-align-top">
                            <tr>
                                <td>
                                    <tr class="text-success">
                                        <td>Barang Masuk</td>
                                        <td class="text-center" width="40px">:</td>
                                        <td>{{ item.data.in }}</td>
                                    </tr>
                                </td>
                                <td>
                                    <tr class="text-danger">
                                        <td>Barang Keluar</td>
                                        <td class="text-center" width="40px">:</td>
                                        <td>{{ item.data.out }}</td>
                                    </tr>
                                </td>
                            </tr>
                        </table> -->
                        <div class="d-flex text-success mr-3">
                            <div>Barang Masuk</div>
                            <div class="text-center font-weight-bold mx-3" width="40px">:</div>
                            <div>{{ item.data.in || '0' }}</div>
                        </div>
                        <div class="d-flex text-danger mr-3">
                            <div>Barang Keluar</div>
                            <div class="text-center font-weight-bold mx-3" width="40px">:</div>
                            <div>{{ item.data.out || '0' }}</div>
                        </div>
                        <div class="d-flex">
                            <div>Deskripsi</div>
                            <div class="text-center font-weight-bold mx-3" width="40px">:</div>
                            <div>{{ item.description || '-' }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 d-flex">
                <div>
                    Menampilkan 1 - {{ metaData.last_index || '0' }} dari {{ metaData.total || '0' }} item
                </div>
            </div>
            <div class="col-12 d-flex">
                <div class="ml-auto">
                    <button v-show="!isLastPage" :disabled="isLoadingData" class="btn btn-primary border w-100" @click.prevent="loadMore">Muat Lagi</button>
                </div>
            </div>
        </div>
        <div v-else-if="!isLoadingData" class="text-center my-5 py-5">
            <div class="text-40 text-warning">
                <fa :icon="['fas','exclamation-circle']"/>
            </div>
            <h3>Tidak ada riwayat barang.</h3>
        </div>
        
        <LoadingSpinner v-if="isLoadingData" :show="isLoadingData"/>
        
    </div>
</template>

<script>
import ApiService from '~/common/api.service';
import { formatDateTime } from '~/store/helpers';
export default {
    props: {
        isDataRefreshed: Boolean
    },
    data() {
        return {
            items: [],
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
                order: null
            }
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
    watch: {
        isDataRefreshed(){
            if(this.isDataRefreshed){
                this.loadData();
            }
        }
    },
        mounted() {
            // Set the initial datas
            this.loadData();
        },
        methods: {
            async loadMore(){
                this.metaData.current_page++;
                this.isLoadingData = true;
                await ApiService.query('/product/'+this.$route.params.produk_id+'/history',this.params)
                .then((Response)=>{
                    if(!this.items){
                        this.items = Response.data.data;
                    }else{
                        this.items = this.items.concat(Response.data.data);
                    }
                    this.metaData = Response.data.meta
                })
                .catch(err=>{
                    console.log("err",err);
                })

                this.isLoadingData = false;
            },
            async loadData() {
                this.metaData.current_page = 1;
                this.isLoadingData = true;
                await ApiService.query('/product/'+this.$route.params.produk_id+'/history',this.params)
                .then((Response)=>{
                    this.items = Response.data.data;
                    this.metaData = Response.data.meta
                })
                .catch(err=>{
                    console.log("err",err);
                })

                this.isLoadingData = false;
            },
            resetData() {
                this.metaData.current_page = 1;
                this.items = [];
                this.loadData();
            },

            // helpers
            formatDateTime
        },
}
</script>
