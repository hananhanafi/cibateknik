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
                                    <BaseInput
                                        id="Cari"
                                        placeholder="Cari Produk..."
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
                                </div>
                                <div class="ml-auto mb-2 mr-2" style="width:160px">
                                    <BaseSelect
                                    v-model="formData.order"
                                    :options="['Terbaru', 'Terlama']"
                                    placeholder="Pilih Urutkan"
                                    dense
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

                                <Pagination/>
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
                formData: {
                    order: null,
                },
                totalRows: 1,
                currentPage: 1,
                perPage: 20,
                products: [],

                isShowModalAddProduct: false,
                isLoadingData: false,
            }
        },
        
        mounted() {
            this.loadData();
        },
        methods: {
            async loadData() {
                this.isLoadingData = true;
                await ApiService.get('/products')
                .then((Response)=>{
                    console.log("res",Response);
                    this.products = Response.data;
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
