<template>
    <div class="text-center">
        <b-container>
            <!-- <h1 class="red">Customer admin</h1> -->
            <div class="bg-white shadow rounded-8 p-3 text-left ">
                <h1>Edit Barang</h1>

                <div class="form-group">
                    <div class="mb-3">
                        <h6>Nama Produk</h6>
                        <b-form-input disabled class=" mb-2" placeholder="Masukkan nama produk" value="Produk 1"></b-form-input>
                    </div>
                    <div class="mb-3">
                        <h6>Nama Barang</h6>
                        <b-form-input v-model="barang.nama" class=" mb-2" placeholder="Masukkan nama barang"></b-form-input>
                    </div>
                    <div class="mb-3">
                        <h6>Informasi Barang</h6>
                        <b-row>
                            <b-col>
                                <!-- eslint-disable-next-line vue/no-template-shadow -->
                                <div v-for="(info,i) in infoCount" :key="i" class="d-flex">
                                    <div class="mr-2 col-1">
                                        {{info.name}}
                                    </div>
                                    <div class="flex-fill">
                                        <b-form-input class=" mb-2" placeholder="Masukkan keterangan informasi barang"></b-form-input>
                                    </div>
                                </div>
                            </b-col>
                        </b-row>
                    </div>
                    <div class="mb-3">
                        <h6>Stock Barang</h6>
                        <b-form-input v-model="barang.stock" class=" mb-2" placeholder="Masukkan stock barang"></b-form-input>
                    </div>
                    <div class="mb-3">
                        <h6>Minimum Stock</h6>
                        <b-form-input v-model="barang.minimumStock" class=" mb-2" placeholder="Masukkan minimum stock barang"></b-form-input>
                    </div>
                    <div class="mb-3">
                        <h6>Harga</h6>
                        <b-form-input v-model="barang.harga" class=" mb-2" placeholder="Masukkan harga barang"></b-form-input>
                    </div>
                    <div class="mb-3">
                        <h6>Foto Barang</h6>
                        <b-form-file multiple>
                            <template slot="file-name" slot-scope="{ names }">
                                <b-badge variant="dark">{{ names[0] }}</b-badge>
                                <b-badge v-if="names.length > 1" variant="dark" class="ml-1">
                                + {{ names.length - 1 }} More files
                                </b-badge>
                            </template>
                        </b-form-file>
                    </div>

                    
                    <div class="w-100">
                        <div class="text-right">
                            <b-button id="show-btn"  size="xl"  class=" ml-auto" variant="outline-dark">Batal</b-button>
                            <b-button id="show-btn"  size="xl"  class=" text-white ml-auto" variant="success">Simpan</b-button>
                        </div>
                    </div>
                </div>
            </div>
            
            
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
                barang: {
                    nama: 'Endmill',
                    addInfo : {
                        title: 'Type',
                        value: 'Endas'
                    },
                    stock: 10,
                    minimumStock: 5,
                    harga: '100.000'
                },
                infoCount: [
                    {name:'Type'},
                    {name:'Ukuran'},
                    {name:'Diameter'},
                    {name:'Jenis'},
                ],

            }
        },
    }
</script>

<style>
    .red {
    color: red;
    }
    table.modalInfo>tr>td{
        vertical-align: top;
    }
</style>