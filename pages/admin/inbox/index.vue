<template>
    <div class="text-center">
        <b-container>
            <!-- <h1 class="red">Customer admin</h1> -->
            <div class="bg-white shadow rounded-8 p-2 text-left ">
                <h1>Pesan</h1>
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

                    <template #cell(actions)="row">
                        <b-button class="rounded-pill text-white" variant="success" size="xl"  @click="info(row.item, row.index, $event.target)">
                        Lihat
                        </b-button>

                        <b-button  id="show-btn"  class="rounded-pill text-white" variant="danger" @click="showModal">Hapus</b-button>
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
                    <b-modal :id="infoModal.id" title="Detail Pesan" ok-only @hide="resetInfoModal">
                        <b-row>
                            <b-col>
                                <h4>Title</h4>
                                <div>Dari : Sistem</div>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea, molestiae.</p>
                            </b-col>
                        </b-row>
                    <!-- <pre>{{ infoModal.content.name }}</pre> -->
                    </b-modal>

                    <b-modal ref="my-modal" hide-footer>
                        <div class="d-block text-center">
                            <h5>Apa Kamu yakin ingin menghapus pesan ini?</h5>
                        </div>
                        <b-row>
                            <b-col>
                                <b-button variant="primary" block @click="hideModal">Tidak</b-button>
                            </b-col>
                            <b-col>
                                <b-button variant="danger" block @click="toggleModal">Iya</b-button>
                            </b-col>
                        </b-row>
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
                    { isActive: true, date:'Kamis,21 Desember 2020', title:'Ini Judul Pesan', name: { first: 'Dickerson', last: 'Macdonald' } },
                    { isActive: false, date:'Kamis,21 Desember 2020', title:'Ini Judul Pesan', name: { first: 'Larsen', last: 'Shaw' } },
                    {
                        isActive: false,
                        date:'Kamis,21 Desember 2020', title:'Ini Judul Pesan',
                        name: { first: 'Mini', last: 'Navarro' },
                        // _rowVariant: 'success'
                    },
                    { isActive: false, date:'Kamis,21 Desember 2020', title:'Ini Judul Pesan', name: { first: 'Geneva', last: 'Wilson' } },
                    { isActive: true, date:'Kamis,21 Desember 2020', title:'Ini Judul Pesan', name: { first: 'Jami', last: 'Carney' } },
                    { isActive: false, date:'Kamis,21 Desember 2020', title:'Ini Judul Pesan', name: { first: 'Essie', last: 'Dunlap' } },
                    { isActive: true, date:'Kamis,21 Desember 2020', title:'Ini Judul Pesan', name: { first: 'Thor', last: 'Macdonald' } },
                    {
                        isActive: true,
                        date:'Kamis,21 Desember 2020', title:'Ini Judul Pesan',
                        name: { first: 'Larsen', last: 'Shaw' },
                        // _cellVariants: { date: 'danger', isActive: 'warning' }
                    },
                    { isActive: false, date:'Kamis,21 Desember 2020', title:'Ini Judul Pesan', name: { first: 'Mitzi', last: 'Navarro' } },
                    { isActive: false, date:'Kamis,21 Desember 2020', title:'Ini Judul Pesan', name: { first: 'Genevieve', last: 'Wilson' } },
                    { isActive: true, date:'Kamis,21 Desember 2020', title:'Ini Judul Pesan', name: { first: 'John', last: 'Carney' } },
                    { isActive: false, date:'Kamis,21 Desember 2020', title:'Ini Judul Pesan', name: { first: 'Dick', last: 'Dunlap' } },
                    
                    { isActive: false, date:'Kamis,21 Desember 2020', title:'Ini Judul Pesan', name: { first: 'Mitzi', last: 'Navarro' } },
                    { isActive: false, date:'Kamis,21 Desember 2020', title:'Ini Judul Pesan', name: { first: 'Genevieve', last: 'Wilson' } },
                    { isActive: true, date:'Kamis,21 Desember 2020', title:'Ini Judul Pesan', name: { first: 'John', last: 'Carney' } },
                    { isActive: false, date:'Kamis,21 Desember 2020', title:'Ini Judul Pesan', name: { first: 'Dick', last: 'Dunlap' } },
                    
                    { isActive: false, date:'Kamis,21 Desember 2020', title:'Ini Judul Pesan', name: { first: 'Mitzi', last: 'Navarro' } },
                    { isActive: false, date:'Kamis,21 Desember 2020', title:'Ini Judul Pesan', name: { first: 'Genevieve', last: 'Wilson' } },
                    { isActive: true, date:'Kamis,21 Desember 2020', title:'Ini Judul Pesan', name: { first: 'John', last: 'Carney' } },
                    { isActive: false, date:'Kamis,21 Desember 2020', title:'Ini Judul Pesan', name: { first: 'Dick', last: 'Dunlap' } },
                    
                    { isActive: false, date:'Kamis,21 Desember 2020', title:'Ini Judul Pesan', name: { first: 'Mitzi', last: 'Navarro' } },
                    { isActive: false, date:'Kamis,21 Desember 2020', title:'Ini Judul Pesan', name: { first: 'Genevieve', last: 'Wilson' } },
                    { isActive: true, date:'Kamis,21 Desember 2020', title:'Ini Judul Pesan', name: { first: 'John', last: 'Carney' } },
                    { isActive: false, date:'Kamis,21 Desember 2020', title:'Ini Judul Pesan', name: { first: 'Dick', last: 'Dunlap' } },
                    
                    { isActive: false, date:'Kamis,21 Desember 2020', title:'Ini Judul Pesan', name: { first: 'Mitzi', last: 'Navarro' } },
                    { isActive: false, date:'Kamis,21 Desember 2020', title:'Ini Judul Pesan', name: { first: 'Genevieve', last: 'Wilson' } },
                    { isActive: true, date:'Kamis,21 Desember 2020', title:'Ini Judul Pesan', name: { first: 'John', last: 'Carney' } },
                    { isActive: false, date:'Kamis,21 Desember 2020', title:'Ini Judul Pesan', name: { first: 'Dick', last: 'Dunlap' } },
                ],
                fields: [
                    {key:'no', label: 'No'},
                    { key: 'name', label: 'Name', sortable: true, sortDirection: 'desc' },
                    { key: 'title', label: 'Judul Pesan', sortable: true },
                    { key: 'date', label: 'Tanggal Masuk', sortable: true },
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
            this.totalRows = this.items.length;
            console.log("STORE",this.$store);
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