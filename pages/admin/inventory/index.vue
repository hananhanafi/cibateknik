<template>
    <div class="text-center">
        <div class="container">
            <!-- <h1 class="red">Customer admin</h1> -->
            <div class="bg-white shadow rounded-8 p-2 text-left ">
                <div class="mb-3 p-2">
                    <h1>Daftar Produk</h1>
                </div>

                <div class="container-fluid">
                    <div class="row">
                        <div class="col">
                            <div class="d-md-flex">
                                <div class="flex-fill mb-2 mr-2">
                                    <form v-on:submit.prevent="loadData">
                                        <BaseInput
                                            id="Cari"
                                            v-model="formData.search"
                                            placeholder="Cari Produk..."
                                            class="mb-0"
                                            
                                        >
                                            <div @click="loadData" slot="afterInput" class="position-absolute"
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
                                <div class="ml-auto mb-2 text-right">
                                    <button class="btn btn-primary  mt-1" type="button" @click="showModalAddProduct">Tambah Produk</button>
                                </div>
                            </div>
                            <div v-if="products.length>0">
                                <table class="table">
                                    <thead>
                                        <tr>
                                        <th scope="col">ID Produk</th>
                                        <th scope="col">Nama Produk</th>
                                        <th scope="col" class="text-center" width="300px">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item,i) in products" :key="i">
                                            <th scope="row">{{item.productID}}</th>
                                            <td>{{item.name}}</td>
                                            <td class="text-center">
                                                <b-button variant="success" size="sm"  @click="$router.push({name:'admin-inventory-detail-produk-id',params:{id:item.productID}})">
                                                Lihat Inventaris
                                                </b-button>
                                                <b-button variant="outline-primary" size="sm"  @click="$router.push({name:'admin-inventory-tambah-barang-id',params:{id:item.productID}})">
                                                Tambah Barang
                                                </b-button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <PaginationData :data="metaData" @page-update="pageUpdateHandler($event)"/>
                            </div>

                            <LoadingSpinner v-else-if="isLoadingData" :show="isLoadingData"/>

                            <div v-else class="text-center my-5 py-5">
                                <div class="text-40 text-warning">
                                    <fa :icon="['fas','exclamation-circle']"/>
                                </div>
                                <h3>Produk tidak ditemukan.</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ModalAddProduct :show="isShowModalAddProduct" :data="{title:'Tambah Produk'}" @close="closeModalAddProduct" @update="loadData"/>
            
            
        </div>
    </div>
</template>

<script>
import ApiService from '~/apis/api.service';
    export default {
        // page properties go here
        layout: "admin",
        middleware: 'adminAuthenticated',
        data() {
            return {
                products: [],
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

                isShowModalAddProduct: false,
                isLoadingData: false,
            }
        },
        computed: {
            params() {
                return {
                    search: this.formData.search || null, 
                    page: this.metaData.current_page, 
                    order: this.formData.order ? (this.formData.order == 'Terbaru' ? 'desc' : 'asc') : null, 
                }
            }
        },
        mounted() {
            this.loadData();
        },
        methods: {
            orderSelectHandler(value){
                if(value){
                    this.loadData();
                }
            },
            pageUpdateHandler(page){
                this.metaData.current_page = page;
                this.loadData();
                console.log("Ganti",this.metaData);
            },
            async loadData() {
                this.isLoadingData = true;
                await ApiService.query('/products',this.params)
                .then((Response)=>{
                    this.products = Response.data.data;
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
            showModalAddProduct() {
                this.isShowModalAddProduct = true;
            },
            closeModalAddProduct() {
                this.isShowModalAddProduct = false;
            },
        }
    }
</script>
