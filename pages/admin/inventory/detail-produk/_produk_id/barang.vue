<template>
    <div class="text-center">
        <div class="container-fluid">
            <Breadcrumb :data="breadCrumbList"/>
            <LoadingSpinner v-if="!isDataReady" :show="!isDataReady" />
            <div v-else class="bg-white shadow-sm rounded-8 p-3 text-left"> 
                <div class="mb-3">
                    <vue2-datepicker v-model="selectedDate" class="h-100 float-right" placeholder="Pilih Bulan"
                    type="month"  
                    :disabled-date="(date) => date > disabledAfter || date < disabledBefore"
                    @change="datePickerHandler($event)"></vue2-datepicker>
                    <h1>{{ dataProduct.name }}</h1>

                </div>

                
                <h4 class="font-italic">
                    {{ toMonthYearDate(selectedDate) }}
                </h4>

                <div class="d-md-flex">
                    <div class="flex-fill mb-2 mr-2">
                        <form @submit.prevent="loadData">
                            <BaseInput
                                id="Cari"
                                v-model="filters.search"
                                placeholder="Cari Barang..."
                                class="mb-0"
                                
                            >
                                <div slot="afterInput" 
                                    class="position-absolute"
                                    style=" right:12px;
                                        top: 50%;
                                        -ms-transform: translateY(-50%);
                                        transform: translateY(-50%);
                                        z-index:99"
                                    @click.prevent="loadData"
                                >
                                    <fa class="" :icon="['fas','search']" /> 
                                </div>
                            </BaseInput>
                        </form>
                    </div>
                    
                    <div class="ml-auto mb-2 mr-2" style="width:160px">
                        <BaseSelect
                        v-model="filters.order"
                        :options="['Terbaru', 'Terlama']"
                        placeholder="Pilih Urutkan"
                        dense
                        @input="orderSelectHandler($event)"
                        />
                    </div>

                    <div class="ml-auto mb-2 text-right">
                        <a class="btn btn-primary"  @click="$router.push({name:'admin-inventory-detail-produk-produk_id-tambah-barang',params:{produk_id:$route.params.produk_id}})">Tambah Barang</a>
                    </div>
                </div>

                
                
                <table class="table table-responsive w-100">
                    <tr class="w-100">
                        <td class="flex-fill mx-0 px-0 border-top-0">
                            <div class="flex-fill">
                                <table class="w-100 table table-bordered">
                                    <tr>
                                        <td :colspan="dataProduct.additionalData.length+1">
                                            Barang
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-white border-top-0" :colspan="dataProduct.additionalData.length+1">
                                            empty
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Nama</td>
                                        <td v-for="(additionalLabel,i) in dataProduct.additionalData" :key="i" class="text-center">{{additionalLabel}}</td>
                                    </tr>
                                    <tr v-for="(item,i) in dataItem" :key="i">
                                        <td><div style="min-height:18px;white-space:nowrap">{{item.name}}</div></td>
                                        <td v-for="(additional,j) in dataProduct.additionalData" :key="j" class="text-center">{{item.additionalData[additional] || '-'}}</td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                        <td class="mx-0 px-0 w-25  border-top-0" style="max-width:50%">
                            <div class="p-2 border-top" style="min-height:43px">
                                Tanggal
                            </div>
                            <table class="w-100 table table-responsive" style="max-width:996px">
                                <tr>
                                    <td v-for="(date,i) in dateArray" :key="i"  class="text-center border-right">{{i+1}}</td>
                                </tr>
                                <tr>
                                    <td v-for="(date,i) in dateArray" :key="i" class="border-right">
                                        <div class="d-flex text-center" style="min-width:160px" >
                                            <div class="mr-2 w-50">
                                                IN
                                            </div>
                                            <div class="border-right">
                                            </div>
                                            <div class="ml-2 w-50">
                                                OUT
                                            </div>
                                        </div>
                                    </td>

                                </tr>
                                <tr v-for="(item,i) in dataItem" :key="i">
                                    <td  v-for="(date,j) in dateArray" :key="j" class="border-right">
                                        
                                        <div class="d-flex text-center" style="min-width:160px" >
                                            <div class="mr-2 w-50">
                                                {{ getDailyStockItem(item.id,j+1) ? getDailyStockItem(item.id,j+1).in : '-' }}
                                            </div>
                                            <div class="border-right">
                                            </div>
                                            <div class="ml-2 w-50">
                                                {{ getDailyStockItem(item.id,j+1) ? getDailyStockItem(item.id,j+1).out : '-' }}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td class="flex-fill mx-0 px-0  border-top-0">
                            <div class="flex-fill">
                                <table class="w-100 table table-bordered">
                                    <tr>
                                        <td colspan="4">
                                            Total
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-white border-top-0" colspan="4">
                                            empty
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="80px">Masuk</td>
                                        <td width="80px">Keluar</td>
                                        <td width="80px">Stok</td>
                                        <td style="width:100px">Aksi</td>
                                    </tr>
                                    <tr v-for="(item,i) in dataItem" :key="i">
                                        <td>{{ getMonthlyStockItem(item.id) ? getMonthlyStockItem(item.id).in : '-'}}</td>
                                        <td>{{ getMonthlyStockItem(item.id) ? getMonthlyStockItem(item.id).out : '-'}}</td>
                                        <td>{{ item ? item.stock : '-'}}</td>
                                        <td class="p-1">
                                            <div class="d-flex flex-row bd-highlight">
                                                <!-- <div class="btn btn-success btn-sm text-white mr-2" @click="showModalNoteInventory(item)">Catat</div>
                                                <div class="mr-2">
                                                    <a @click="$router.push({name:'admin-inventory-detail-produk-produk_id-edit-barang-barang_id',params:{produk_id:$route.params.produk_id,barang_id:item.id}})">
                                                        <div  class="btn btn-outline-warning btn-sm w-100">
                                                            Edit
                                                        </div>
                                                    </a>
                                                </div>
                                                <div class="btn btn-danger btn-sm text-white mr-2" @click="showModalDeleteItem(item)">Hapus</div> -->
                                                <div>
                                                    <b-dropdown id="dropdown-1" variant="primary" size="sm" text="Aksi">
                                                        <b-dropdown-item>
                                                            <div class="btn btn-success btn-sm text-white w-100" @click="showModalNoteInventory(item)">Catat</div>
                                                        </b-dropdown-item>
                                                        <b-dropdown-item>
                                                            <div class="w-100">
                                                                <a @click="$router.push({name:'admin-inventory-detail-produk-produk_id-edit-barang-barang_id',params:{produk_id:$route.params.produk_id,barang_id:item.id}})">
                                                                    <div  class="btn btn-outline-warning btn-sm w-100">
                                                                        Edit
                                                                    </div>
                                                                </a>
                                                            </div>
                                                        </b-dropdown-item>
                                                        <b-dropdown-item>
                                                            <div class="btn btn-outline-info btn-sm w-100" @click="showModalPostItem(item)">Post</div>
                                                        </b-dropdown-item>
                                                        <b-dropdown-item>
                                                            <div class="btn btn-danger btn-sm text-white w-100" @click="showModalDeleteItem(item)">Hapus</div>
                                                        </b-dropdown-item>
                                                        <!-- <b-dropdown-divider></b-dropdown-divider>
                                                        <b-dropdown-item active>Active action</b-dropdown-item>
                                                        <b-dropdown-item disabled>Disabled action</b-dropdown-item> -->
                                                    </b-dropdown>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>
                </table>

            </div>

            <ModalNoteInventory :show="isShowModalNoteInventory" :data="currentItem" @close="closeModalNoteInventory" @update="loadData"/>
            
            <AdminModalDeleteItem :show="isShowModalDeleteItem" :data="currentItem" @close="closeModalDeleteItem" @update="loadData"/>
            <AdminModalPostItem :show="isShowModalPostItem" :data="currentItem" @close="closeModalPostItem" @update="loadData"/>

            
        </div>
    </div>
</template>

<script>
import { toMonthYearDate } from '../../../../../store/helpers';
import ApiService from '~/common/api.service';
    export default {
        // page properties go hereexport default {
        async asyncData ({ params }) {
            const dateNow = new Date();
            const month = dateNow.getMonth()+1;
            const year = dateNow.getFullYear();
            const postProductItems = await ApiService.query(`/product/${params.produk_id}/items`,{month,year});
            // return { id: params.produk_id }
            return {postProductItems};
        },
        layout: "admin",
        middleware: 'adminAuthenticated',
        data() {
            return {
                breadCrumbList: [
                    {name:"Inventory",link:"/admin/inventory"},
                    {name:"Inventaris Produk",link:""},
                ],
                selectedDate: new Date(),
                firstDate: null,
                lastDate: null,
                dateArray : [],

                isShowModalNoteInventory: false,
                isShowModalDeleteItem: false,
                isShowModalPostItem: false,
                disabledAfter: new Date(),
                disabledBefore: new Date(2020,12,1),
                dataItem: null,
                dataProduct: null,
                dataItemMonthlyStock: null,
                dataItemDailyStock: null,
                isDataReady: false,
                currentItem: null,

                filters: {
                    search: null,
                    order: null,
                }


            }
        },
        computed: {
            params() {
                return {
                    month: this.selectedDate.getMonth()+1,
                    year: this.selectedDate.getFullYear(),
                    search: this.filters.search || null,
                    order: this.filters.order ? (this.filters.order === 'Terbaru' ? 'desc' : 'asc') : null, 
                }
            }
        },
        watch: {
            // selectedDate() {
            //     const date = this.selectedDate;
            //     // this.setDate(date);
            //     console.log("date",date)
            // }
        },
        created() {
            this.setDate();
        },
        mounted() {
            this.dataItem = this.postProductItems.data.data.items;
            this.dataProduct = this.postProductItems.data.data.product;
            this.dataItemMonthlyStock = this.postProductItems.data.data.items_monthly_stock;
            this.dataItemDailyStock = this.postProductItems.data.data.items_daily_stock;
            this.isDataReady = true;
        },
        methods: {
            orderSelectHandler(value){
                if(value){
                    this.loadData();
                }
            },
            async loadData() {
                const postProductItems = await ApiService.query(`/product/${this.$route.params.produk_id}/items`,this.params);
                // return { id: params.produk_id }
                // return {postProductItems};
                this.postProductItems = postProductItems;
                this.dataItem = this.postProductItems.data.data.items;
                this.dataProduct = this.postProductItems.data.data.product;
                this.dataItemMonthlyStock = this.postProductItems.data.data.items_monthly_stock;
                this.dataItemDailyStock = this.postProductItems.data.data.items_daily_stock;
            },
            setDate(dateParams) {
                
                if(dateParams){
                    this.selectedDate = new Date(dateParams);
                }else {
                    this.selectedDate = new Date();
                }
                this.firstDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), 1);
                this.lastDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + 1, 0);
                this.dateArray = new Array(this.lastDate.getDate());

            },
            getMonthlyStockItem(itemID) {
                const item = this.dataItemMonthlyStock.find(item=>item.itemID === itemID);
                return item;
            },
            getDailyStockItem(itemID,date) {
                const item = this.dataItemDailyStock.find(item=>item.itemID === itemID && item.date === date);
                return item;
            },
            showModalNoteInventory(item) {
                this.currentItem = Object.assign({},item);
                this.isShowModalNoteInventory = true;
            },
            closeModalNoteInventory() {
                this.currentItem = null;
                this.isShowModalNoteInventory = false;
            },
            showModalDeleteItem(item) {
                this.currentItem = Object.assign({},item);
                this.isShowModalDeleteItem = true;
            },
            closeModalDeleteItem() {
                this.currentItem = null;
                this.isShowModalDeleteItem = false;
            },
            showModalPostItem(item) {
                this.currentItem = Object.assign({},item);
                this.isShowModalPostItem = true;
            },
            closeModalPostItem() {
                this.currentItem = null;
                this.isShowModalPostItem = false;
            },
            async datePickerHandler(value){
                this.isDataReady = false;
                await this.setDate(value);
                await this.loadData();
                this.isDataReady = true;
            },
            // helpers
            toMonthYearDate
        },
        head() {
            return {
                title: "Cibateknik Admin - Inventaris Produk",
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
