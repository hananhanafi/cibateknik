<template>
    <div class="text-center">
        
        <div class="container">
            <Breadcrumb :data="breadCrumbList"/>
            <div class="bg-white shadow-sm rounded-8 p-2 text-left ">
                <div class="mb-3 p-2">
                    <h1>Daftar Supplier</h1>
                </div>
                <div class="container-fluid">
                    <div class="col">
                        <div class="d-md-flex">
                            <div class="flex-fill mb-2 mr-2">
                                <form @submit.prevent="loadData">
                                    <BaseInput
                                        id="Cari"    
                                        v-model="formData.search"
                                        placeholder="Cari Supplier..."
                                        class="mb-0"
                                    >
                                        <div slot="afterInput" class="position-absolute" style=" right:12px;
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
                                v-model="formData.order"
                                :options="['Terbaru', 'Terlama']"
                                placeholder="Pilih Urutkan"
                                dense
                                @input="orderSelectHandler($event)"
                                />
                            </div>
                            
                            <div class="ml-auto mb-2 text-right">
                                <a class="btn btn-primary  mt-1" type="button" @click.prevent="showModalAddSupplier">Tambah Supplier</a>
                            </div>
                        </div>
                        <div v-if="suppliers.length>0" >
                            <table class="table table-responsive-md">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Nama Supplier</th>
                                        <th scope="col" class="text-center" width="300px">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(supplier,i) in suppliers" :key="i">
                                        <th scope="row">{{ supplier.supplierUID || '-' }}</th>
                                        <td>{{supplier.name || '-'}}</td>
                                        <td class="text-center">
                                            <button class="btn btn-warning btn-sm" @click="showModalEditSupplier(supplier)" >
                                                <fa :icon="['fas','pencil-alt']"/> Edit
                                            </button>
                                            <button class="btn btn-outline-danger btn-sm" @click="showModalDeleteSupplier(supplier)" >
                                                <fa :icon="['fas','trash']"/> Hapus
                                            </button>
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
                            <h3>Supplier tidak ditemukan.</h3>
                        </div>
                    </div>
                </div>
            </div>

            
            <ModalAddSupplier :show="isShowModalAddSupplier" :data="{title:'Tambah Produk'}" @close="closeModalAddSupplier" @update="loadData"/>

            <ModalEditSupplier :show="isShowModalEditSupplier" :data="currentSupplier" @close="closeModalEditSupplier" @update="loadData"/>

            <ModalDeleteSupplier :show="isShowModalDeleteSupplier" :data="currentSupplier" @close="closeModalDeleteSupplier" @update="loadData"/>
            
            
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
                    {name:"Daftar Supplier",link:"/admin/data-master/supplier"}
                ],
                suppliers : [],
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


                isShowModalAddSupplier: false,
                isShowModalEditSupplier: false,
                isShowModalDeleteSupplier: false,
                currentSupplier:null,
                isLoadingData: false,
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
        mounted() {
            // Set the initial number of items
            this.loadData();
        },
        methods: {
            async loadData() {
                this.isLoadingData = true;
                await ApiService.query('/suppliers',this.params)
                .then((Response)=>{
                    this.suppliers = Response.data.data;
                    this.metaData = Response.data.meta
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
                console.log("Ganti",this.metaData);
            },
            showModalAddSupplier() {
                this.isShowModalAddSupplier = true;
            },
            closeModalAddSupplier() {
                this.isShowModalAddSupplier = false;
            },
            showModalEditSupplier(supplier) {
                this.currentSupplier = Object.assign({},supplier);
                this.isShowModalEditSupplier = true;
            },
            closeModalEditSupplier() {
                this.currentSupplier = null;
                this.isShowModalEditSupplier = false;
            },
            showModalDeleteSupplier(supplier) {
                this.currentSupplier = Object.assign({},supplier);
                this.isShowModalDeleteSupplier = true;
            },
            closeModalDeleteSupplier() {
                this.currentSupplier = null;
                this.isShowModalDeleteSupplier = false;
            },
        },
        head() {
            return {
                title: "Cibateknik Admin - Data Master Supplier",
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