<template>
    <div class="text-center">
        <b-container>
            <!-- <h1 class="red">Customer admin</h1> -->
            <div class="bg-white shadow rounded-8 p-2 text-left ">
                <div class="d-flex flex-row bd-highlight mb-3">
                    <div class="p-2 bd-highlight"><h1>Daftar Produk</h1></div>
                    <!-- <div class="p-2 bd-highlight float-right ml-auto "><b-button id="show-btn"  size="xl"  class="rounded-pill text-white w-100" variant="primary" @click="isShowModalAddProduct">Tambah</b-button></div> -->
                    <!-- <div class="p-2 bd-highlight">Flex item 3</div> -->
                </div>

                <div class="container-fluid">
                    <div class="row">
                        <div class="col">
                            <div class="d-md-flex mb-3">
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
                                    v-model="formData.sort"
                                    :options="['Terbaru', 'Terlama']"
                                    placeholder="Pilih Urutkan"
                                    dense
                                    />
                                </div>
                                <div class="ml-auto mb-2 text-right">
                                    <button class="btn btn-primary  mt-1" type="button" @click="showModalAddProduct">Tambah Produk</button>
                                </div>
                            </div>
                            <table class="table">
                                <thead>
                                    <tr>
                                    <th scope="col">ID Produk</th>
                                    <th scope="col">Nama Produk</th>
                                    <th scope="col" width="300px">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item,i) in items" :key="i">
                                        <th scope="row">ITEMID{{i+1}}</th>
                                        <td>Mark</td>
                                        <td>
                                            <b-button variant="success" size="sm"  @click="$router.push({name:'admin-inventory-detail-produk'})">
                                            Lihat Inventaris
                                            </b-button>
                                            <b-button variant="outline-primary" size="sm"  @click="$router.push({name:'admin-inventory-tambah-barang'})">
                                            Tambah Barang
                                            </b-button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <Pagination/>
                        </div>
                    </div>
                </div>
            </div>

            <ModalAddProduct :show="isShowModalAddProduct" :data="{title:'Tambah Produk'}" @close="closeModalAddProduct"/>
            
            
        </b-container>
    </div>
</template>

<script>
    export default {
        // page properties go here
        layout: "admin",
        middleware: 'adminAuthenticated',
        data() {
            return {
                formData: {
                    sort: null,
                },
                totalRows: 1,
                currentPage: 1,
                perPage: 20,
                items: new Array(10),

                isShowModalAddProduct: false,
                
            }
        },
        
        mounted() {
        },
        methods: {
            showModalAddProduct() {
                this.isShowModalAddProduct = true;
            },
            closeModalAddProduct() {
                this.isShowModalAddProduct = false;
            },
        }
    }
</script>
