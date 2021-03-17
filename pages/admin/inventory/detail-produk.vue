<template>
    <div class="text-center">
        <b-container fluid>
            <!-- <h1 class="red">Customer admin</h1> -->
            <div class="bg-white shadow rounded-8 p-3 text-left "> 
                <div class="d-flex flex-row bd-highlight mb-3">
                    <div class="p-2 bd-highlight"><h1>Produk</h1></div>
                    <!-- <div class="p-2 bd-highlight">Flex item 3</div> -->
                </div>

                
                <!-- <b-row>
                    <b-col md="8">
                        <b-form-input class="rounded-pill mb-2" placeholder="Cari Nama Barang"></b-form-input>
                    </b-col>
                    <b-col md="2">
                        <b-form-select v-model="selectedMonth" class="rounded-pill mb-2" :options="optionsMonth"></b-form-select>
                    </b-col>
                    <b-col md="2">
                        <b-button  id="show-btn"  class="rounded-pill text-white w-100" variant="primary" @click="$router.push({name:'admin-inventory-tambah-barang'})">Tambah</b-button>
                    </b-col>
                </b-row> -->
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
                        :options="['Terbaru', 'Terlama']"
                        placeholder="Pilih Urutkan"
                        dense
                        class="rounded-pill"
                        />
                    </div>
                    <div class="ml-auto mb-2 text-right">
                        <button class="btn btn-primary" type="button" @click="$router.push({name:'admin-inventory-tambah-barang'})">Tambah Barang</button>
                    </div>
                </div>
                <table class="table table-responsive-lg w-100">
                    <tr class="w-100">
                        <td class="flex-fill mx-0 px-0">
                            <div class="flex-fill">
                                <!-- <table class="w-100 table mb-0">
                                    <tr>
                                        <td class="text-white" colspan="3">
                                            empty
                                        </td>
                                    </tr>
                                </table> -->
                                <table class="w-100 table">
                                    <tr>
                                        <td class="text-white" colspan="3">
                                            empty
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-white" colspan="3">
                                            empty
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Nama</td>
                                        <td>Merk</td>
                                        <td>Tipe</td>
                                    </tr>
                                    <tr v-for="item in productItems" :key="item">
                                        <td width="80px"><div style="min-height:31px">{{item.name}}</div></td>
                                        <td width="80px">{{item.brand}}</td>
                                        <td width="80px">{{item.type}}</td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                        <td class="mx-0 px-0 w-25" style="max-width:50%">
                                <!-- <table class="table  table-responsive mb-0 border-top">
                                    <tr>
                                        <td>Tanggal</td>
                                    </tr>
                                </table> -->
                                <div class="p-2 border-top" style="min-height:43px">
                                    Tanggal
                                </div>
                                <table class="w-100 table table-responsive" style="max-width:900px">
                                    <!-- <tr>
                                        <td colspan="100">Tanggal</td>
                                    </tr> -->
                                    <tr>
                                        <td v-for="date in dates" :key="date"  class="text-center border-right">{{date}}</td>
                                    </tr>
                                    <tr>
                                        <td v-for="date in dates" :key="date" class="border-right">
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
                                    <tr v-for="item in productItems" :key="item">
                                        <td  v-for="date in dates" :key="date" class="border-right">
                                            <div class="d-flex" style="min-width:160px">
                                                <div class="mr-2">
                                                    <BaseInput
                                                        id="in"
                                                        placeholder="IN"
                                                        small
                                                        numberonly
                                                        class="mb-0"
                                                    />
                                                </div>
                                                <div class="ml-2">
                                                    
                                                    <BaseInput
                                                        id="out"
                                                        placeholder="OUT"
                                                        small
                                                        numberonly
                                                        class="mb-0"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                        </td>
                        <td class="flex-fill mx-0 px-0">
                            <div class="flex-fill">
                                <table class="w-100 table">
                                    <tr>
                                        <td class="text-white" colspan="4">
                                            empty
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-white" colspan="4">
                                            empty
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="80px">Keluar</td>
                                        <td width="80px">Masuk</td>
                                        <td width="80px">Stok</td>
                                        <td width="200px">Aksi</td>
                                    </tr>
                                    <tr v-for="item in productItems" :key="item">
                                        <td><div style="min-height:31px">5</div></td>
                                        <td>2</td>
                                        <td>3</td>
                                        <td>
                                            <div class="d-flex flex-row bd-highlight">
                                                <div class="w-50 btn btn-success btn-sm text-white mr-2" @click="showModal">Catat Barang</div>
                                                <div class="w-50">
                                                    <NuxtLink to="/admin/inventory/edit-barang">
                                                        <div  class="btn btn-outline-warning btn-sm w-100">
                                                            Edit Barang
                                                        </div>
                                                    </NuxtLink>
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


                <b-modal ref="my-modal" hide-footer>
                    <div class="d-block text-center">
                        <h5>Tambahkan Catatan Hari ini</h5>
                        
                        <div class="mb-3 text-left">
                            <div class="mb-3">
                                <h6>Pilih Tipe</h6>
                                <b-form-select v-model="selected" :options="options"></b-form-select>
                            </div>

                            <div v-show="selected" class="mb-3">
                                <h6>Jumlah Barang</h6>
                                <b-form-input v-show="selected" v-model="selectedItem" placeholder="Masukkan jumlah"></b-form-input>
                            </div>
                            <!-- <b-form-select v-model="selected" :options="options" size="sm" class="mt-3"></b-form-select> -->
                            <!-- <div class="mt-3">Selected: <strong>{{ selected }}</strong></div> -->
                        </div>
                    </div>
                    <b-row>
                        <b-col>
                            <b-button variant="primary" block @click="hideModal">Batal</b-button>
                        </b-col>
                        <b-col>
                            <b-button variant="success" block @click="toggleModal">Simpan</b-button>
                        </b-col>
                    </b-row>
                </b-modal>
            
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
                dates: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
                productItems: [
                    { name:"McDonald",
                    brand:"Mitutoyo",
                    type:"Type 2" },
                    { name:"McDonald",
                    brand:"Mitutoyo",
                    type:"Type 2" },
                    { name:"McDonald",
                    brand:"Mitutoyo",
                    type:"Type 2" },
                    { name:"McDonald",
                    brand:"Mitutoyo",
                    type:"Type 2" },
                    { name:"McDonald",
                    brand:"Mitutoyo",
                    type:"Type 2" },
                    { name:"McDonald",
                    brand:"Mitutoyo",
                    type:"Type 2" },
                    { name:"McDonald",
                    brand:"Mitutoyo",
                    type:"Type 2" },
                    { name:"McDonald",
                    brand:"Mitutoyo",
                    type:"Type 2" },
                    { name:"McDonald",
                    brand:"Mitutoyo",
                    type:"Type 2" },
                    { name:"McDonald",
                    brand:"Mitutoyo",
                    type:"Type 2" },
                ],

                selectedMonth: null,
                optionsMonth: [
                    { value: null, text: 'Pilih Bulan' },
                    { value: 'a', text: 'November' },
                    { value: 'b', text: 'Desember' },
                ],

                
                
                text: '',
                selected: null,
                options: [
                    { value: null, text: 'Pilih Tipe' },
                    { value: 'a', text: 'Masuk' },
                    { value: 'b', text: 'Keluar' },
                ],
                selectedItem: null,
                optionsItem: [
                    { value: null, text: 'Pilih Barang' },
                    { value: 'a', text: 'Barang 1' },
                    { value: 'b', text: 'Barang 2' },
                ],
            }
        },
        
        mounted() {
        },
        methods: {
            showModal() {
            this.$refs['my-modal'].show()
            },
            hideModal() {
                this.$refs['my-modal'].hide()
            },
            toggleModal() {
                // We pass the ID of the button that we want to return focus to
                // when the modal has hidden
                this.$refs['my-modal'].toggle('#toggle-btn')
            },
        }
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