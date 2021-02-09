<template>
    <div class="text-center">
        <b-container fluid>
            <!-- <h1 class="red">Customer admin</h1> -->
            <div class="bg-white shadow rounded-8 p-3 text-left "> 
                <div class="d-flex flex-row bd-highlight mb-3">
                    <div class="p-2 bd-highlight"><h1>Produk</h1></div>
                    <!-- <div class="p-2 bd-highlight">Flex item 3</div> -->
                </div>

                
                <b-row>
                    <b-col md="8">
                        <b-form-input class="rounded-pill mb-2" placeholder="Cari Nama Barang"></b-form-input>
                    </b-col>
                    <b-col md="2">
                        <b-form-select v-model="selectedMonth" class="rounded-pill mb-2" :options="optionsMonth"></b-form-select>
                    </b-col>
                    <b-col md="2">
                        <b-button  id="show-btn"  class="rounded-pill text-white w-100" variant="primary" @click="$router.push({name:'admin-inventory-tambah'})">Tambah</b-button>
                    </b-col>
                </b-row>
                
                <div class="d-flex flex-row bd-highlight mb-3">
                    <b-table :items="topSellingItems" :fields="topSellingFields">
                        
                        <!-- eslint-disable-next-line vue/no-unused-vars -->
                        <template  #thead-top="data">
                            <b-tr class="text-white">
                                <b-th sticky-column colspan="32"> 1</b-th>
                            </b-tr>
                            <b-tr class="text-white" >
                                <b-th style="border-bottom:'0px'" sticky-column colspan="32">1-</b-th>
                            </b-tr>
                        </template>
                    </b-table>
                    <!-- <div class="p-2 bd-highlight">
                    </div> --> 
                    <b-table responsive :items="items">
                        <!-- eslint-disable-next-line vue/no-unused-vars -->
                        <template #thead-top="data">
                            <b-tr>
                                <b-th sticky-column colspan="32">Tanggal</b-th>
                            </b-tr>
                            <b-tr>
                                <b-th sticky-column colspan="2">1</b-th>
                                <b-th sticky-column colspan="2">2</b-th>
                                <b-th sticky-column colspan="2">3</b-th>
                                <b-th sticky-column colspan="2">4</b-th>
                                <b-th sticky-column colspan="2">5</b-th>
                                <b-th sticky-column colspan="2">6</b-th>
                                <b-th sticky-column colspan="2">7</b-th>
                                <b-th sticky-column colspan="2">8</b-th>
                                <b-th sticky-column colspan="2">9</b-th>
                                <b-th sticky-column colspan="2">10</b-th>
                                <b-th sticky-column colspan="2">11</b-th>
                                <b-th sticky-column colspan="2">12</b-th>
                            </b-tr>
                            <b-tr>
                                <b-th sticky-column>IN</b-th>
                                <b-th sticky-column>OUT</b-th>
                                <b-th sticky-column>IN</b-th>
                                <b-th sticky-column>OUT</b-th>
                                <b-th sticky-column>IN</b-th>
                                <b-th sticky-column>OUT</b-th>
                                <b-th sticky-column>IN</b-th>
                                <b-th sticky-column>OUT</b-th>
                                <b-th sticky-column>IN</b-th>
                                <b-th sticky-column>OUT</b-th>
                                <b-th sticky-column>IN</b-th>
                                <b-th sticky-column>OUT</b-th>
                                <b-th sticky-column>IN</b-th>
                                <b-th sticky-column>OUT</b-th>
                                <b-th sticky-column>IN</b-th>
                                <b-th sticky-column>OUT</b-th>
                                <b-th sticky-column>IN</b-th>
                                <b-th sticky-column>OUT</b-th>
                                <b-th sticky-column>IN</b-th>
                                <b-th sticky-column>OUT</b-th>
                                <b-th sticky-column>IN</b-th>
                                <b-th sticky-column>OUT</b-th>
                                <b-th sticky-column>IN</b-th>
                                <b-th sticky-column>OUT</b-th>
                            </b-tr>
                        </template>
                    </b-table>
                    <b-table  :items="topSellingItems2" :fields="topSellingFields2">
                        <!-- eslint-disable-next-line vue/no-unused-vars -->
                        <template  #thead-top="data">
                            <b-tr class="text-white">
                                <b-th sticky-column colspan="32"> 1</b-th>
                            </b-tr>
                            <b-tr class="text-white" >
                                <b-th style="border-bottom:'0px'" sticky-column colspan="32">1-</b-th>
                            </b-tr>
                        </template>

                        
                        <!-- eslint-disable-next-line vue/no-unused-vars -->
                        <template #cell(actions)="row">
                            <div class="d-flex flex-row bd-highlight">
                                <div class="w-50 bg-success rounded-pill text-center text-white" @click="showModal">Catat</div>
                                <div class="w-50">
                                    <NuxtLink to="/admin/inventory/edit-barang">
                                        <div  class="rounded-pill text-white bg-warning text-center w-100">
                                            Edit
                                        </div>
                                    </NuxtLink>
                                </div>
                            </div>
                        </template>
                    </b-table>
                </div>
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
        middleware: 'authenticated',
        data() {
            return {
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

                topSellingFields: ['Nomor', 'Nama', 'Merk', 'Tipe'],


                topSellingItems: [
                { Nomor: '1', Nama: 'Macdonald', Merk: 'Merk 1', Tipe: 'Tipe 1' },
                { Nomor: '2', Nama: 'Shaw', Merk: 'Merk 1', Tipe: 'Tipe 1'  },
                { Nomor: '3', Nama: 'Wilson', Merk: 'Merk 1', Tipe: 'Tipe 1'  },
                { Nomor: '4', Nama: 'Wilson', Merk: 'Merk 1', Tipe: 'Tipe 1'  },
                { Nomor: '5', Nama: 'Wilson', Merk: 'Merk 1', Tipe: 'Tipe 1'  },
                { Nomor: '6', Nama: 'Macdonald', Merk: 'Merk 1', Tipe: 'Tipe 1'  },
                { Nomor: '7', Nama: 'Shaw', Merk: 'Merk 1', Tipe: 'Tipe 1'  },
                { Nomor: '8', Nama: 'Wilson', Merk: 'Merk 1', Tipe: 'Tipe 1'  },
                { Nomor: '9', Nama: 'Wilson', Merk: 'Merk 1', Tipe: 'Tipe 1'  },
                { Nomor: '10', Nama: 'Wilson', Merk: 'Merk 1', Tipe: 'Tipe 1'  }
                ],

                

                topSellingFields2: ['Keluar', 'Masuk', 'Stock', 'actions'],


                topSellingItems2: [
                { Keluar: '1', Masuk: '1', Stock: '1'},
                { Keluar: '2', Masuk: '2', Stock: '1' },
                { Keluar: '3', Masuk: '3', Stock: '1' },
                { Keluar: '4', Masuk: '1', Stock: '1' },
                { Keluar: '5', Masuk: '1', Stock: '1' },
                { Keluar: '6', Masuk: '2', Stock: '1' },
                { Keluar: '7', Masuk: '3', Stock: '1' },
                { Keluar: '8', Masuk: '4', Stock: '1' },
                { Keluar: '9', Masuk: '1', Stock: '1' },
                { Keluar: '10', Masuk: '1', Stock: '1' }
                ],
                
                topSellingPerPage: 3,
                topSellingCurrentPage: 1,
                items: [
                            {
                                1: '1',
                                2: '2',
                                3: '3',
                                4: '4',
                                5: '5',
                                6: '6',
                                7: '7',
                                8: '8',
                                9: '9',
                                10: '10',
                                11: '11',
                                12: '12',
                                13: '0',
                                14: '0',
                                15: '0',
                                16: '0',
                                17: '0',
                                18: '0',
                                19: '0',
                                20: '0',
                                21: '0',
                                22: '0',
                                23: '0',
                                24: '0',
                            },
                            {
                                1: '0',
                                2: '0',
                                3: '0',
                                4: '0',
                                5: '0',
                                6: '0',
                                7: '0',
                                8: '0',
                                9: '0',
                                10: '0',
                                11: '0',
                                12: '0',
                                13: '0',
                                14: '0',
                                15: '0',
                                16: '0',
                                17: '0',
                                18: '0',
                                19: '0',
                                20: '0',
                                21: '0',
                                22: '0',
                                23: '0',
                                24: '0',
                            },
                            {
                                1: '0',
                                2: '0',
                                3: '0',
                                4: '0',
                                5: '0',
                                6: '0',
                                7: '0',
                                8: '0',
                                9: '0',
                                10: '0',
                                11: '0',
                                12: '0',
                                13: '0',
                                14: '0',
                                15: '0',
                                16: '0',
                                17: '0',
                                18: '0',
                                19: '0',
                                20: '0',
                                21: '0',
                                22: '0',
                                23: '0',
                                24: '0',
                            },
                            {
                                1: '0',
                                2: '0',
                                3: '0',
                                4: '0',
                                5: '0',
                                6: '0',
                                7: '0',
                                8: '0',
                                9: '0',
                                10: '0',
                                11: '0',
                                12: '0',
                                13: '0',
                                14: '0',
                                15: '0',
                                16: '0',
                                17: '0',
                                18: '0',
                                19: '0',
                                20: '0',
                                21: '0',
                                22: '0',
                                23: '0',
                                24: '0',
                            },
                            {
                                1: '0',
                                2: '0',
                                3: '0',
                                4: '0',
                                5: '0',
                                6: '0',
                                7: '0',
                                8: '0',
                                9: '0',
                                10: '0',
                                11: '0',
                                12: '0',
                                13: '0',
                                14: '0',
                                15: '0',
                                16: '0',
                                17: '0',
                                18: '0',
                                19: '0',
                                20: '0',
                                21: '0',
                                22: '0',
                                23: '0',
                                24: '0',
                            },
                            {
                                1: '0',
                                2: '0',
                                3: '0',
                                4: '0',
                                5: '0',
                                6: '0',
                                7: '0',
                                8: '0',
                                9: '0',
                                10: '0',
                                11: '0',
                                12: '0',
                                13: '0',
                                14: '0',
                                15: '0',
                                16: '0',
                                17: '0',
                                18: '0',
                                19: '0',
                                20: '0',
                                21: '0',
                                22: '0',
                                23: '0',
                                24: '0',
                            },
                            {
                                1: '0',
                                2: '0',
                                3: '0',
                                4: '0',
                                5: '0',
                                6: '0',
                                7: '0',
                                8: '0',
                                9: '0',
                                10: '0',
                                11: '0',
                                12: '0',
                                13: '0',
                                14: '0',
                                15: '0',
                                16: '0',
                                17: '0',
                                18: '0',
                                19: '0',
                                20: '0',
                                21: '0',
                                22: '0',
                                23: '0',
                                24: '0',
                            },
                            {
                                1: '0',
                                2: '0',
                                3: '0',
                                4: '0',
                                5: '0',
                                6: '0',
                                7: '0',
                                8: '0',
                                9: '0',
                                10: '0',
                                11: '0',
                                12: '0',
                                13: '0',
                                14: '0',
                                15: '0',
                                16: '0',
                                17: '0',
                                18: '0',
                                19: '0',
                                20: '0',
                                21: '0',
                                22: '0',
                                23: '0',
                                24: '0',
                            },
                            {
                                1: '0',
                                2: '0',
                                3: '0',
                                4: '0',
                                5: '0',
                                6: '0',
                                7: '0',
                                8: '0',
                                9: '0',
                                10: '0',
                                11: '0',
                                12: '0',
                                13: '0',
                                14: '0',
                                15: '0',
                                16: '0',
                                17: '0',
                                18: '0',
                                19: '0',
                                20: '0',
                                21: '0',
                                22: '0',
                                23: '0',
                                24: '0',
                            }
                        ]
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