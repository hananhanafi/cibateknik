<template>
    <div class="text-center">
        <b-container>
            <!-- <h1 class="red">Customer admin</h1> -->
            <div class="bg-white shadow rounded-8 p-3 text-left ">
                <h1>Riwayat Pesanan Customer</h1>
                <table class="modalInfo">
                    <tr>
                        <td>
                            ID User
                        </td>
                        <td>
                            :
                        </td>
                        <td>
                            111
                        </td>
                    </tr>
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
                </table>
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
                        <template #cell(no)="row">
                            {{row}}
                        </template>

                        <template #cell(name)="row">
                            {{ row.value.first }} {{ row.value.last }}
                        </template>

                        <template #cell(actions)="row">
                            <b-button class="rounded-pill text-white" variant="success" size="xl"  @click="info(row.item, row.index, $event.target)">
                            Lihat
                            </b-button>
                            <b-button class="rounded-pill text-white" variant="warning" size="xl"  @click="$router.push({name:'admin-customer-history'})">
                            History
                            </b-button>
                            <b-button class="rounded-pill text-white" variant="warning" size="xl" @click="row.toggleDetails">
                            <!-- {{ row.detailsShowing ? 'Hide' : 'Show' }}  -->
                            History
                            </b-button>
                        </template>

                        <template #row-details="row">
                            <b-card>
                            <ul>
                                <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
                            </ul>
                            </b-card>
                        </template>

                        
                        <template #cell(status)="row">
                            <span v-if="row.item.status == 'selesai'" class="text-success">
                                Selesai
                            </span>
                            <span v-else class="text-warning">
                                Terkirim
                            </span>
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