<template>
    <div class="text-center">
        <div class="container">
            <Breadcrumb :data="breadCrumbList"/>
            <div class="bg-white shadow-sm rounded-8 p-2 text-left ">
                <div class="mb-3 p-2">
                    <h1>Daftar Produk</h1>
                </div>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col">
                            <div class="d-md-flex">
                                <div class="flex-fill mb-2 mr-2">
                                    <form @submit.prevent="loadData">
                                        <BaseInput
                                            id="Cari"
                                            v-model="filters.search"
                                            placeholder="Cari Produk..."
                                            class="mb-0"
                                            
                                        >
                                            <div slot="afterInput" style=" right:12px;
                                                        top: 50%;
                                                        -ms-transform: translateY(-50%);
                                                        transform: translateY(-50%);
                                                        z-index:99" class="position-absolute"
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
                                    <button class="btn btn-outline-primary  mt-1 mr-2" type="button" @click.prevent="showModalFilterSearchProduct">Filter</button>
                                </div>
                                <div class="ml-auto mb-2 text-right">
                                    <button class="btn btn-primary  mt-1" type="button" @click.prevent="showModalAddProduct">Tambah Produk</button>
                                </div>
                            </div>
                            <div v-if="products.length>0">
                                <table class="table table-responsive-md">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID Produk</th>
                                            <th scope="col">Nama Produk</th>
                                            <th scope="col">Kategori Produk</th>
                                            <th scope="col">Merek</th>
                                            <th scope="col">Supplier</th>
                                            <th scope="col" class="text-center" width="300px">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(product,i) in products" :key="i">
                                            <th scope="row">{{product.productID}}</th>
                                            <td>{{product.name}}</td>
                                            <td>{{product.category ? product.category.name : '-'}}</td>
                                            <td>{{product.brand ? product.brand.name : '-'}}</td>
                                            <td>{{product.supplier ? product.supplier.name : '-'}}</td>
                                            <td class="text-center">
                                                <b-button variant="success" size="sm"  @click="$router.push({name:'admin-inventory-detail-produk-produk_id-barang',params:{produk_id:product.productID}})">
                                                    <fa :icon="['fas','eye']"/> Inventaris
                                                </b-button>
                                                <b-button variant="outline-warning" size="sm"  @click.prevent="showAdminModalEditProduct(product)">
                                                    <fa :icon="['fas','pencil-alt']"/> Edit
                                                </b-button>
                                                <b-button variant="outline-danger" size="sm"  @click.prevent="showModaldeleteProduct(product)">
                                                    <fa :icon="['fas','trash']"/> Hapus
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

            <ModalAddProduct :show="isShowModalAddProduct" :data="{title:'Tambah Produk'}" :options="options" 
            @close="closeModalAddProduct" @update="loadData"/>
            
            <AdminModalEditProduct :show="isShowAdminModalEditProduct" :data="currentProduct" :options="options" 
            @close="closeAdminModalEditProduct" @update="loadData"/>

            <ModalDeleteProduct :show="isShowModalDeleteProduct" :data="currentProduct" 
            @close="closeModalDeleteProduct" @update="loadData"/>

            <ModalFilterSearchProduct :show="isShowModalFilterSearchProduct" :data="currentProduct" :options="options" @close="closeModalFilterSearchProduct" @update="filterHandler($event)"/>
            
        </div>
    </div>
</template>

<script>
import ApiService from '~/common/api.service';
    export default {
        // page properties go here
        layout: "admin",
        middleware: 'adminAuthenticated',
        data() {
            return {
                breadCrumbList: [
                    {name:"Inventory",link:"/admin/inventory"}
                ],
                products: [],
                filters: {
                    search: null,
                    order: null,
                    category: null,
                    supplier: null,
                    brand: null,
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
                isShowAdminModalEditProduct: false,
                isShowModalDeleteProduct: false,
                isShowModalFilterSearchProduct: false,
                currentProduct:null,
                isLoadingData: false,

                options:{
                    category: [],
                    brand: [],
                    supplier: []
                }
            }
        },
        computed: {
            params() {
                return {
                    search: this.filters.search || null, 
                    category: this.filters.category ? this.filters.category : null, 
                    supplier: this.filters.supplier ? this.filters.supplier : null, 
                    brand: this.filters.brand ? this.filters.brand : null, 
                    page: this.metaData.current_page, 
                    order: this.filters.order ? (this.filters.order === 'Terbaru' ? 'desc' : 'asc') : null, 
                }
            }
        },
        created() {
            this.loadOptions();
        },
        async mounted() {
            await this.loadData();
        },
        methods: {
            orderSelectHandler(value){
                if(value){
                    this.loadData();
                }
            },
            filterHandler(value){
                this.filters.category = value.category ? value.category.value : null;
                this.filters.supplier = value.supplier ? value.supplier.value : null;
                this.filters.brand = value.brand ? value.brand.value : null;
                this.loadData();
            },
            pageUpdateHandler(page){
                this.metaData.current_page = page;
                this.loadData();
            },
            async loadData() {
                this.isLoadingData = true;
                await ApiService.query('/products',this.params)
                .then((Response)=>{
                    this.products = Response.data.data;
                    this.metaData = Response.data.meta
                })
                .catch(err=>{
                    console.log("err",err);
                })
                this.isLoadingData = false;
            },
            async loadOptions() {
                await ApiService.get('/categories')
                .then((Response)=>{
                    this.options.category = Response.data.data.map(function(category){
                        return {
                            label: category.name,
                            value: category.categoryID,
                        }
                    });
                })
                .catch(err=>{
                    console.log("err",err);
                })
                await ApiService.get('/brands')
                .then((Response)=>{
                    this.options.brand = Response.data.data.map(function(brand){
                        return {
                            label: brand.name,
                            value: brand.brandID,
                        }
                    });
                })
                .catch(err=>{
                    console.log("err",err);
                })
                await ApiService.get('/suppliers')
                .then((Response)=>{
                    this.options.supplier = Response.data.data.map(function(supplier){
                        return {
                            label: supplier.name,
                            value: supplier.supplierID,
                        }
                    });
                })
                .catch(err=>{
                    console.log("err",err);
                })
            },
            showModalAddProduct() {
                this.isShowModalAddProduct = true;
            },
            closeModalAddProduct() {
                this.isShowModalAddProduct = false;
            },
            showAdminModalEditProduct(product) {
                this.currentProduct = Object.assign({},product);
                this.isShowAdminModalEditProduct = true;
            },
            closeAdminModalEditProduct() {
                this.currentProduct = null;
                this.isShowAdminModalEditProduct = false;
            },
            showModaldeleteProduct(product) {
                this.currentProduct = Object.assign({},product);
                this.isShowModalDeleteProduct = true;
            },
            closeModalDeleteProduct() {
                this.currentProduct = null;
                this.isShowModalDeleteProduct = false;
            },
            showModalFilterSearchProduct() {
                this.isShowModalFilterSearchProduct = true;
            },
            closeModalFilterSearchProduct() {
                this.isShowModalFilterSearchProduct = false;
            },
        },
        head() {
            return {
                title: "Cibateknik Admin - Inventory",
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
