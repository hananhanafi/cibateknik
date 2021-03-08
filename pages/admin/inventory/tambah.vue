<template>
    <div class="text-center">
        <b-container>
            <!-- <h1 class="red">Customer admin</h1> -->
            <div class="bg-white shadow rounded-8 p-3 text-left ">
                <h1>Tambah Barang</h1>

                <div class="form-group">
                    <div class="mb-3">
                        <h6>Nama Barang</h6>
                        <b-form-input class="rounded-pill mb-2" placeholder="Masukkan nama barang"></b-form-input>
                    </div>
                    <div class="mb-3">
                        <h6>Informasi Barang</h6>
                        <b-row>
                            <b-col>
                                <!-- eslint-disable-next-line vue/no-template-shadow -->
                                <b-row v-for="(info,i) in infoCount" :key="i">
                                    <b-col>
                                        <b-form-input class="rounded-pill mb-2" placeholder="Masukkan nama informasi"></b-form-input>
                                    </b-col>
                                    <b-col>
                                        <b-form-input class="rounded-pill mb-2" placeholder="Masukkan keterangan informasi barang"></b-form-input>
                                    </b-col>
                                </b-row>
                            </b-col>
                            <b-col md="1">
                                <b-button id="show-btn"  size="xl"  class="rounded-pill text-white w-100" variant="primary" @click="addInfo()">+</b-button>
                            </b-col>
                            <b-col md="1">
                                <b-button id="show-btn"  size="xl"  class="rounded-pill text-white w-100" variant="danger" @click="minInfo()">-</b-button>
                            </b-col>
                        </b-row>
                    </div>
                    <div class="mb-3">
                        <h6>Stock Barang</h6>
                        <b-form-input class="rounded-pill mb-2" placeholder="Masukkan stock barang"></b-form-input>
                    </div>
                    <div class="mb-3">
                        <h6>Minimum Stock</h6>
                        <b-form-input class="rounded-pill mb-2" placeholder="Masukkan minimum stock barang"></b-form-input>
                    </div>
                    <div class="mb-3">
                        <h6>Harga</h6>
                        <b-form-input class="rounded-pill mb-2" placeholder="Masukkan harga barang"></b-form-input>
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
                            <b-button id="show-btn"  size="xl"  class="rounded-pill ml-auto" variant="outline-dark">Batal</b-button>
                            <b-button id="show-btn"  size="xl"  class="rounded-pill text-white ml-auto" variant="success">Simpan</b-button>
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
                infoCount: 1,

                items: [
                    {  status: 'selesai', isActive: true, date:'Kamis,21 Desember 2020', invoice:12123321, name: { first: 'Dickerson', last: 'Macdonald' } },
                    {  status: 'selesai', isActive: false, date:'Kamis,21 Desember 2020', invoice:12123321, name: { first: 'Larsen', last: 'Shaw' } },
                    {
                        status: 'selesai', isActive: false,
                        date:'Kamis,21 Desember 2020', invoice:12123321,
                        name: { first: 'Mini', last: 'Navarro' },
                        // _rowVariant: 'success'
                    },
                    {  status: 'selesai', isActive: false, date:'Kamis,21 Desember 2020', invoice:12123321, name: { first: 'Geneva', last: 'Wilson' } },
                    {  status: 'selesai', isActive: true, date:'Kamis,21 Desember 2020', invoice:12123321, name: { first: 'Jami', last: 'Carney' } },
                    {  status: 'selesai', isActive: false, date:'Kamis,21 Desember 2020', invoice:12123321, name: { first: 'Essie', last: 'Dunlap' } },
                    {  status: 'selesai', isActive: true, date:'Kamis,21 Desember 2020', invoice:12123321, name: { first: 'Thor', last: 'Macdonald' } },
                    {
                        status: 'Pending', isActive: true,
                        date:'Kamis,21 Desember 2020', invoice:12123321,
                        name: { first: 'Larsen', last: 'Shaw' },
                        // _cellVariants: { date: 'danger', isActive: 'warning' }
                    },
                    { status:'gagal', isActive: false, date:'Kamis,21 Desember 2020', invoice:12123321, name: { first: 'Mitzi', last: 'Navarro' } },
                    { status:'gagal', isActive: false, date:'Kamis,21 Desember 2020', invoice:12123321, name: { first: 'Genevieve', last: 'Wilson' } },
                    { status:'gagal', isActive: true, date:'Kamis,21 Desember 2020', invoice:12123321, name: { first: 'John', last: 'Carney' } },
                    { status:'gagal', isActive: false, date:'Kamis,21 Desember 2020', invoice:12123321, name: { first: 'Dick', last: 'Dunlap' } },
                    
                    { status:'gagal', isActive: false, date:'Kamis,21 Desember 2020', invoice:12123321, name: { first: 'Mitzi', last: 'Navarro' } },
                    { status:'gagal', isActive: false, date:'Kamis,21 Desember 2020', invoice:12123321, name: { first: 'Genevieve', last: 'Wilson' } },
                    { status:'gagal', isActive: true, date:'Kamis,21 Desember 2020', invoice:12123321, name: { first: 'John', last: 'Carney' } },
                    { status:'gagal', isActive: false, date:'Kamis,21 Desember 2020', invoice:12123321, name: { first: 'Dick', last: 'Dunlap' } },
                    
                    { status:'gagal', isActive: false, date:'Kamis,21 Desember 2020', invoice:12123321, name: { first: 'Mitzi', last: 'Navarro' } },
                    { status:'gagal', isActive: false, date:'Kamis,21 Desember 2020', invoice:12123321, name: { first: 'Genevieve', last: 'Wilson' } },
                    { status:'gagal', isActive: true, date:'Kamis,21 Desember 2020', invoice:12123321, name: { first: 'John', last: 'Carney' } },
                    { status:'gagal', isActive: false, date:'Kamis,21 Desember 2020', invoice:12123321, name: { first: 'Dick', last: 'Dunlap' } },
                    
                    { status:'gagal', isActive: false, date:'Kamis,21 Desember 2020', invoice:12123321, name: { first: 'Mitzi', last: 'Navarro' } },
                    { status:'gagal', isActive: false, date:'Kamis,21 Desember 2020', invoice:12123321, name: { first: 'Genevieve', last: 'Wilson' } },
                    { status:'gagal', isActive: true, date:'Kamis,21 Desember 2020', invoice:12123321, name: { first: 'John', last: 'Carney' } },
                    { status:'gagal', isActive: false, date:'Kamis,21 Desember 2020', invoice:12123321, name: { first: 'Dick', last: 'Dunlap' } },
                    
                    { status:'gagal', isActive: false, date:'Kamis,21 Desember 2020', invoice:12123321, name: { first: 'Mitzi', last: 'Navarro' } },
                    { status:'gagal', isActive: false, date:'Kamis,21 Desember 2020', invoice:12123321, name: { first: 'Genevieve', last: 'Wilson' } },
                    { status:'gagal', isActive: true, date:'Kamis,21 Desember 2020', invoice:12123321, name: { first: 'John', last: 'Carney' } },
                    { status:'gagal', isActive: false, date:'Kamis,21 Desember 2020', invoice:12123321, name: { first: 'Dick', last: 'Dunlap' } },
                ],
                fields: [
                    {key:'no', label: 'No'},
                    { key: 'name', label: 'Nama Barang', sortable: true, sortDirection: 'desc' },
                    { key: 'date', label: 'Tanggal Order', sortable: true },
                    { key: 'invoice', label: 'Nomor Invocie', sortable: true },
                    { key: 'status', label: 'Status', sortable: true },
                    // {
                    //     key: 'isActive',
                    //     label: 'Status',
                    //     formatter: (value, key, item) => {
                    //     return value ? 'Yes' : 'No'
                    //     },
                    //     sortable: true,
                    //     sortByFormatted: true,
                    //     filterByFormatted: true
                    // },
                // { key: 'actions', label: 'Actions' }
                ],
                totalRows: 1,
                currentPage: 1,
                perPage: 20,
                
                infoModal: {
                id: 'info-modal',
                title: '',
                content: ''
                },
                currentItem : {
                        "isActive": true,
                        "date": "Kamis,21 Desember 2020",
                        "name": {
                            "first": "Dickerson",
                            "last": "Macdonald"
                        }
                }
            }
        },
        
        mounted() {
            // Set the initial number of items
            this.totalRows = this.items.length
        },
        methods: {
            addInfo(){
                this.infoCount = this.infoCount+1;
            },
            minInfo(){
                if(this.infoCount>1){
                    this.infoCount = this.infoCount-1;
                }
            },
            info(item, index, button) {
                this.infoModal.title = `Row index: ${index}`;
                this.infoModal.content = JSON.stringify(item, null, 2);
                this.$root.$emit('bv::show::modal', this.infoModal.id, button);
                this.currentItem = item;
            },
            resetInfoModal() {
                this.infoModal.title = ''
                this.infoModal.content = ''
            },
            onFiltered(filteredItems) {
                // Trigger pagination to update the number of buttons/pages due to filtering
                this.totalRows = filteredItems.length
                this.currentPage = 1
            }
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