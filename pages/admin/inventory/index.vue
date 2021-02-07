<template>
    <div class="text-center">
        <b-container>
            <!-- <h1 class="red">Customer admin</h1> -->
            <div class="bg-white shadow rounded-8 p-2 text-left ">
                <div class="d-flex flex-row bd-highlight mb-3">
                    <div class="p-2 bd-highlight"><h1>Daftar Produk</h1></div>
                    <div class="p-2 bd-highlight float-right ml-auto "><b-button id="show-btn"  size="xl"  class="rounded-pill text-white w-100" variant="primary" @click="showModal">Tambah</b-button></div>
                    <!-- <div class="p-2 bd-highlight">Flex item 3</div> -->
                </div>
                
                <b-container fluid>
                    <!-- Main table element -->
                    <b-table
                    :items="items"
                    :fields="fields"
                    :current-page="currentPage"
                    :per-page="perPage"
                    stacked="md"
                    show-empty
                    small
                    >
                    // eslint-disable-next-line vue/no-unused-vars
                    <template #cell(no)="row">
                        {{row}}
                    </template>

                    <template #cell(name)="row">
                        {{ row.value.first }} {{ row.value.last }}
                    </template>

                    <!-- eslint-disable-next-line vue/no-unused-vars -->
                    <template #cell(actions)="row">
                        <b-button class="rounded-pill text-white" variant="success" size="xl"  @click="$router.push({name:'admin-inventory-detail-produk'})">
                        Lihat
                        </b-button>
                    </template>

                    <template #row-details="row">
                        <b-card>
                        <ul>
                            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
                        </ul>
                        </b-card>
                    </template>
                    </b-table>

                    <!-- Info modal -->
                    <b-modal :id="infoModal.id" title="Detail Customer" ok-only @hide="resetInfoModal">
                    <b-row>
                        <b-col>
                            
                            <b-img class="w-100" src="~/assets/img/person.png" fluid alt="Responsive image"></b-img>
                        </b-col>
                        <b-col md="8">
                            <div>
                                <table class="modalInfo">
                                    <tr>
                                        <td>
                                            Nama
                                        </td>
                                        <td>
                                            :
                                        </td>
                                        <td>
                                            {{currentItem ? currentItem.name.first : ''}} {{currentItem ? currentItem.name.first : ''}}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Email
                                        </td>
                                        <td>
                                            :
                                        </td>
                                        <td>
                                            hanafi@mail.com
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Nomor HP
                                        </td>
                                        <td>
                                            :
                                        </td>
                                        <td>
                                            081234567890
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Alamat
                                        </td>
                                        <td>
                                            :
                                        </td>
                                        <td>
                                            Jl. Rawa sawah III RT 06/02 No.5 Jakarta
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Tanggal Daftar
                                        </td>
                                        <td>
                                            :
                                        </td>
                                        <td>
                                            {{currentItem ? currentItem.date : ''}}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Terakhir Online
                                        </td>
                                        <td>
                                            :
                                        </td>
                                        <td>
                                            {{currentItem ? currentItem.date : ''}}
                                        </td>
                                    </tr>
                                </table>
                                <!-- <pre>Nama : {{currentItem ? currentItem.name.first : ''}} {{currentItem ? currentItem.name.first : ''}}</pre> -->
                            </div>
                        </b-col>
                    </b-row>
                    <!-- <pre>{{ infoModal.content.name }}</pre> -->
                    </b-modal>
                </b-container>
            </div>
            
            <b-modal ref="my-modal" hide-footer>
                <div class="d-block text-center">
                    <h5>Edit Status Pesanan</h5>
                    
                    <div class="mb-3">
                        <b-form-input class="rounded-pill mb-2" placeholder="Masukkan nama produk"></b-form-input>
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
                items: [
                    { isActive: true, id:122, name: { first: 'Dickerson', last: 'Macdonald' } },
                    { isActive: false, id:122, name: { first: 'Larsen', last: 'Shaw' } },
                    {
                        isActive: false,
                        id:122,
                        name: { first: 'Mini', last: 'Navarro' },
                        // _rowVariant: 'success'
                    },
                    { isActive: false, id:122, name: { first: 'Geneva', last: 'Wilson' } },
                    { isActive: true, id:122, name: { first: 'Jami', last: 'Carney' } },
                    { isActive: false, id:122, name: { first: 'Essie', last: 'Dunlap' } },
                    { isActive: true, id:122, name: { first: 'Thor', last: 'Macdonald' } },
                    {
                        isActive: true,
                        id:122,
                        name: { first: 'Larsen', last: 'Shaw' },
                        // _cellVariants: { date: 'danger', isActive: 'warning' }
                    },
                    { isActive: false, id:122, name: { first: 'Mitzi', last: 'Navarro' } },
                    { isActive: false, id:122, name: { first: 'Genevieve', last: 'Wilson' } },
                    { isActive: true, id:122, name: { first: 'John', last: 'Carney' } },
                    { isActive: false, id:122, name: { first: 'Dick', last: 'Dunlap' } },
                    
                    { isActive: false, id:122, name: { first: 'Mitzi', last: 'Navarro' } },
                    { isActive: false, id:122, name: { first: 'Genevieve', last: 'Wilson' } },
                    { isActive: true, id:122, name: { first: 'John', last: 'Carney' } },
                    { isActive: false, id:122, name: { first: 'Dick', last: 'Dunlap' } },
                    
                    { isActive: false, id:122, name: { first: 'Mitzi', last: 'Navarro' } },
                    { isActive: false, id:122, name: { first: 'Genevieve', last: 'Wilson' } },
                    { isActive: true, id:122, name: { first: 'John', last: 'Carney' } },
                    { isActive: false, id:122, name: { first: 'Dick', last: 'Dunlap' } },
                    
                    { isActive: false, id:122, name: { first: 'Mitzi', last: 'Navarro' } },
                    { isActive: false, id:122, name: { first: 'Genevieve', last: 'Wilson' } },
                    { isActive: true, id:122, name: { first: 'John', last: 'Carney' } },
                    { isActive: false, id:122, name: { first: 'Dick', last: 'Dunlap' } },
                    
                    { isActive: false, id:122, name: { first: 'Mitzi', last: 'Navarro' } },
                    { isActive: false, id:122, name: { first: 'Genevieve', last: 'Wilson' } },
                    { isActive: true, id:122, name: { first: 'John', last: 'Carney' } },
                    { isActive: false, id:122, name: { first: 'Dick', last: 'Dunlap' } },
                ],
                fields: [
                    {key:'no', label: 'No'},
                    { key: 'id', label: 'ID Produk', sortable: true, sortDirection: 'desc' },
                    { key: 'name', label: 'Nama Produk', sortable: true, sortDirection: 'desc' },
                    // { key: 'date', label: 'Tanggal Daftar', sortable: true, class: 'text-center' },
                    // { key: 'lastOnline', label: 'Terakhir Online', sortable: true, class: 'text-center' },
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
                { key: 'actions', label: 'Actions' }
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