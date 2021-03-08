<template>
    <div class="text-center">
        <div class="container-fluid px-md-5">

            <div class="row">
                <div class="col-lg-3 col-md-6 col-sm-12">
                    <div style="background: linear-gradient(75.38deg, #1AE3D9 3.3%, #5C7CE9 100%);height:200px" class="w-100 shadow text-white rounded-8 p-3 mb-4">
                        <div class="row h-100 align-items-center">
                            <div  class="col text-left">
                                <div style="font-size:4em">
                                    100
                                </div>
                                <div class="font-weight-bold font-weight-bold">
                                    <div>Total Pesanan</div>
                                </div>
                            </div>
                            <div class="col">
                                <fa  style="font-size:500%" :icon="['fas','shopping-cart']"  />
                            </div>
                        </div>  
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-12">
                    <div style="background: linear-gradient(75.38deg, #F5509F 3.3%, #FE6F70 100%);height:200px" class="w-100 shadow text-white rounded-8 p-3 mb-4">
                        <div class="row h-100 align-items-center">
                            <div  class="col text-left">
                                <div style="font-size:4em">
                                    100
                                </div>
                                <div class="font-weight-bold font-weight-bold">
                                    <div>Total Pendapatan</div>
                                </div>
                            </div>
                            <div class="col">
                                <fa  style="font-size:500%" :icon="['fas','donate']"  />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-12">
                    <div style="background: linear-gradient(75.38deg, #41E296 3.3%, #3BB5B5 100%);height:200px" class="w-100 shadow text-white rounded-8 p-3 mb-4">
                        <div class="row h-100 align-items-center">
                            <div  class="col text-left">
                                <div style="font-size:4em">
                                    100
                                </div>
                                <div class="font-weight-bold font-weight-bold">
                                    <div>Total Pengeluaran</div>
                                </div>
                            </div>
                            <div class="col">
                                <fa  style="font-size:500%" :icon="['fas','coins']"  />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-12">
                    <div style="background: linear-gradient(75.38deg, #FFD941 3.3%, #FF8154 100%);height:200px" class="w-100 shadow text-white rounded-8 p-3 mb-4">
                        <div class="row h-100 align-items-center">
                            <div  class="col text-left">
                                <div style="font-size:4em">
                                    100
                                </div>
                                <div class="font-weight-bold font-weight-bold">
                                    <div>Total Pengguna</div>
                                </div>
                            </div>
                            <div class="col">
                                <fa  style="font-size:500%" :icon="['fas','users']"  />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="row">
                <div class="col-12 mb-3">
                    <div class="bg-white p-3 text-left rounded-8 h-100">
                        <h1>Pendapatan</h1>

                        <div class="m-3 mt-5 ">
                            <line-chart id="revenue-chart" :data="revenueChartData" :options="revenueChartOptions" :height="160" class="w-100" />
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-12 mb-3">
                    <div class="bg-white p-3 text-left rounded-8 h-100">
                        <h1 class="mb-3">Top Selling Item</h1>
                        <table class="table">
                            <thead>
                                <tr>
                                <th scope="col">Nomor</th>
                                <th scope="col">Barang</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Larry</td>
                                </tr>
                                <tr>
                                    <th scope="row">4</th>
                                    <td>Mark</td>
                                </tr>
                                <tr>
                                    <th scope="row">5</th>
                                    <td>Jacob</td>
                                </tr>
                                <tr>
                                    <th scope="row">6</th>
                                    <td>Larry</td>
                                </tr>
                                <tr>
                                    <th scope="row">7</th>
                                    <td>Mark</td>
                                </tr>
                                <tr>
                                    <th scope="row">8</th>
                                    <td>Jacob</td>
                                </tr>
                                <tr>
                                    <th scope="row">9</th>
                                    <td>Larry</td>
                                </tr>
                                <tr>
                                    <th scope="row">10</th>
                                    <td>Larry</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="col-lg-9 col-12 mb-3">
                    <div class="bg-white p-3 text-left rounded-8 h-100">
                        <div class="d-flex">
                            <div class="flex-fill">
                                <h1>Penjualan Tahun 2020</h1>
                            </div>
                            <div>
                                <BaseSelect
                                :options="['Terbaru', 'Terlama']"
                                placeholder="Pilih Urutkan"
                                />
                            </div>
                        </div>

                        <div class="m-3 mt-5 ">
                            <line-chart :data="barChartData" :options="barChartOptions" :height="140" class="w-100" />
                        </div>
                    </div>
                </div>
            </div>


            <b-row class="mt-3 pb-5">
                <b-col>
                    <div class="bg-white shadow rounded-8 p-2 text-left pl-4">
                        <h1>Daftar Pesanan</h1>

                        <div class="m-3">
                            <template>
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
                                        <!-- <template #cell(no)="row">
                                            {{row}}
                                        </template> -->

                                        <template #cell(name)="row">
                                            {{ row.value.first }} {{ row.value.last }}
                                        </template>
                                        <template #cell(status)="row">
                                            <span v-if="row.item.status" class="text-success">
                                                Selesai
                                            </span>
                                            <span v-else class="text-warning">
                                                Terkirim
                                            </span>
                                        </template>

                                        <template #cell(actions)="row">
                                            <b-button class="rounded-pill text-white" variant="success" size="sm"  @click="info(row.item, row.index, $event.target)">
                                            Lihat
                                            </b-button>
                                            

                                            <b-button  id="show-btn"  class="rounded-pill text-white" variant="warning"  size="sm" @click="showModal">Edit Status</b-button>
                                        </template>
                                    </b-table>

                                    
                                </b-container>
                                </template>
                        </div>
                        <div class="w-50 mx-auto">
                            <b-pagination
                            v-model="currentPage"
                            :total-rows="totalRows"
                            :per-page="perPage"
                            align="fill"
                            size="sm"
                            class="my-0"
                            ></b-pagination>
                        </div>
                    </div>
                </b-col>
            </b-row>



            <!-- Info modal -->
            <b-modal :id="infoModal.id" title="Detail Order" ok-only @hide="resetInfoModal">
                
                <b-row>
                    <!-- <b-col>
                        
                        <b-img class="w-100" src="~/assets/img/person.png" fluid alt="Responsive image"></b-img>
                    </b-col> -->
                    <b-col>
                        <div>
                            <table class="modalInfo">
                                <tr>
                                    <td style="width:50%">
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
                                        Tanggal Order
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
                                        Status Order
                                    </td>
                                    <td>
                                        :
                                    </td>
                                    <td>
                                        {{currentItem ? currentItem.status : ''}}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="vertical-align:top">
                                        Pesanan
                                    </td>
                                    <td style="vertical-align:top">
                                        :
                                    </td>
                                    <td>
                                        <ul>
                                            <li>
                                                Endmill 20 buah
                                            </li>
                                            <li>
                                                Endmill 20 buah
                                            </li>
                                            <li>
                                                Endmill 20 buah
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                                
                            </table>
                            <!-- <pre>Nama : {{currentItem ? currentItem.name.first : ''}} {{currentItem ? currentItem.name.first : ''}}</pre> -->
                        </div>
                    </b-col>
                </b-row>
            <!-- <pre>{{ infoModal.content.name }}</pre> -->
            </b-modal>

            <b-modal ref="my-modal" hide-footer>
                <div class="d-block text-center">
                    <h5>Edit Status Pesanan</h5>
                    
                    <div class="mb-3">
                        <b-form-select v-model="selected" :options="options"></b-form-select>
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
        </div>
    </div>
</template>

<script>
    export default {
        // page properties go here
        layout: "admin",
        middleware: 'adminAuthenticated',
        data() {
            return {

                chartHeight : 200,

                windowH: {
                    width: 0,
                    height: 0
                },
                
                selected: null,
                options: [
                    { value: null, text: 'Selesai' },
                    { value: 'a', text: 'Dikirim' },
                    { value: 'b', text: 'Diproses' },
                    // { value: { C: '3PO' }, text: 'This is an option with object value' },
                    // { value: 'd', text: 'This one is disabled', disabled: true }
                ],
                topSellingFields: ['Nomor', 'Item'],


                topSellingItems: [
                    { Nomor: '1', Item: 'Macdonald' },
                    { Nomor: '2', Item: 'Shaw' },
                    { Nomor: '3', Item: 'Wilson' },
                    { Nomor: '4', Item: 'Wilson' },
                    { Nomor: '5', Item: 'Wilson' },
                    { Nomor: '6', Item: 'Macdonald' },
                    { Nomor: '7', Item: 'Shaw' },
                    { Nomor: '8', Item: 'Wilson' },
                    { Nomor: '9', Item: 'Wilson' },
                    { Nomor: '10', Item: 'Wilson' }
                ],
                
                topSellingPerPage: 3,
                topSellingCurrentPage: 1,

                // orderListFields: [
                //     {key:'no', label: 'No'},
                //     { key: 'name', label: 'Nama'},
                //     { key: 'date', label: 'Tanggal'},
                //     { key: 'status', label: 'Status'},
                //     { key: 'action', label: 'Aksi'},
                // ],


                // orderListItems: [
                // { no: '1', name: 'Macdonald', date:'Kamis,21 Desember 2020', status:'Pesan' },
                // { no: '2', name: 'Shaw', date:'Kamis,21 Desember 2020', status:'Pesan' },
                // { no: '3', name: 'Wilson', date:'Kamis,21 Desember 2020', status:'Pesan' },
                // { no: '4', name: 'Wilson', date:'Kamis,21 Desember 2020', status:'Pesan' },
                // { no: '5', name: 'Wilson', date:'Kamis,21 Desember 2020', status:'Pesan' },
                // { no: '6', name: 'Macdonald', date:'Kamis,21 Desember 2020', status:'Pesan' },
                // { no: '7', name: 'Shaw', date:'Kamis,21 Desember 2020', status:'Pesan' },
                // { no: '8', name: 'Wilson', date:'Kamis,21 Desember 2020', status:'Pesan' },
                // { no: '9', name: 'Wilson', date:'Kamis,21 Desember 2020', status:'Pesan' },
                // { no: '10', name: 'Wilson', date:'Kamis,21 Desember 2020', status:'Pesan' }
                // ],
                
                orderListPerPage: 3,
                orderListCurrentPage: 1,

                revenueChartData: {
                    labels: ['1 Jan', '2 Jan', '3 Jan', '4 Jan', '5 Jan', '6 Jan', '7 Jan'],
                    datasets: [
                        {
                            label: 'Penjualan',
                            fill: false,
                            data: [100000,800000,500000,200000,800000,200000,800000,],
                            backgroundColor: '#5C7CE9',
                            borderColor: '#5C7CE9',
                            // lineTension: 0,
                            pointBorderWidth: 10,
                            // borderWidth: .5
                        },
                        {
                            label: 'Pengeluaran',
                            fill: false,
                            data: [300000,600000,400000,600000,200000,400000,600000,],
                            backgroundColor: '#FE6F70',
                            borderColor: '#FE6F70',
                            // lineTension: 0,
                            pointBorderWidth: 10,
                            // borderWidth: .5
                        },
                    ]
                },
                revenueChartOptions: {
                    responsive: true,
                    scales: {
                    xAxes: [{
                        gridLines: {
                            display: false
                        },
                        barPercentage: 1,
                        categoryPercentage: 0.6,
                        ticks: {
                            fontColor: "#707070",
                            fontFamily: "Source Sans Pro"
                        },
                    }],
                    yAxes: [{
                        gridLines: {
                            color: '#AAC93F',
                            lineWidth: .3,
                            drawBorder: false,
                            zeroLineColor: '#AAC93F'
                        },
                        ticks: {
                            beginAtZero: true,
                            // max: 1000,
                            min: 0,
                            stepSize: 100000,
                            fontColor: "#707070",
                            fontFamily: "Source Sans Pro"
                        },
                    }]
                    },
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            boxWidth: 12,
                            fontSize: 14,
                            fontColor: "#707070",
                            fontFamily: "Source Sans Pro"
                        }
                    }
                },

                barChartData: {
                    labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
                    datasets: [
                        {
                            label: 'Penjualan',
                            fill: false,
                            data: [100, 135, 159, 115, 200, 175, 135, 215, 175, 135, 215, 175],
                            backgroundColor: '#DC0C17',
                            borderColor: '#DC0C17',
                            lineTension: 0,
                            pointBorderWidth: 10,
                            borderWidth: .5
                        },
                        // {
                        //     label: 'Perempuan',
                        //     fill: false,
                        //     data: [125, 75, 175, 165, 210, 100, 225, 225, 175, 225, 225, 175],
                        //     backgroundColor: '#FCAF17',
                        //     borderColor: '#FCAF17',
                        //     lineTension: 0,
                        //     pointBorderWidth: 10,
                        //     borderWidth: .5
                        // }
                    ]
                },
                barChartOptions: {
                    responsive: true,
                    scales: {
                    xAxes: [{
                        gridLines: {
                            display: false
                        },
                        barPercentage: 1,
                        categoryPercentage: 0.6,
                        ticks: {
                            fontColor: "#707070",
                            fontFamily: "Source Sans Pro"
                        },
                    }],
                    yAxes: [{
                        gridLines: {
                            color: '#AAC93F',
                            lineWidth: .3,
                            drawBorder: false,
                            zeroLineColor: '#AAC93F'
                        },
                        ticks: {
                            beginAtZero: true,
                            // max: 1000,
                            min: 0,
                            stepSize: 50,
                            fontColor: "#707070",
                            fontFamily: "Source Sans Pro"
                        },
                    }]
                    },
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            boxWidth: 12,
                            fontSize: 14,
                            fontColor: "#707070",
                            fontFamily: "Source Sans Pro"
                        }
                    }
                },

                items: [
                    { qty:5, price:"Rp.100.000", customer:'Hanafi', status: true, date:'Kamis,21 Desember 2020', name: { first: 'Dickerson', last: 'Macdonald' } },
                    { qty:5, price:"Rp.100.000", customer:'Hanafi', status: false, date:'Kamis,21 Desember 2020', name: { first: 'Larsen', last: 'Shaw' } },
                    {
                        qty:5, price:"Rp.100.000", customer:'Hanafi', status: false,
                        date:'Kamis,21 Desember 2020',
                        name: { first: 'Mini', last: 'Navarro' },
                        // _rowVariant: 'success'
                    },
                    { qty:5, price:"Rp.100.000", customer:'Hanafi', status: false, date:'Kamis,21 Desember 2020', name: { first: 'Geneva', last: 'Wilson' } },
                    { qty:5, price:"Rp.100.000", customer:'Hanafi', status: true, date:'Kamis,21 Desember 2020', name: { first: 'Jami', last: 'Carney' } },
                    { qty:5, price:"Rp.100.000", customer:'Hanafi', status: false, date:'Kamis,21 Desember 2020', name: { first: 'Essie', last: 'Dunlap' } },
                    { qty:5, price:"Rp.100.000", customer:'Hanafi', status: true, date:'Kamis,21 Desember 2020', name: { first: 'Thor', last: 'Macdonald' } },
                    {
                        qty:5, price:"Rp.100.000", customer:'Hanafi', status: true,
                        date:'Kamis,21 Desember 2020',
                        name: { first: 'Larsen', last: 'Shaw' },
                        // _cellVariants: { date: 'danger', status: 'warning' }
                    },
                    {  qty:5, price:"Rp.100.000", customer:'Hanafi', status: false, date:'Kamis,21 Desember 2020', name: { first: 'Mitzi', last: 'Navarro' } },
                    {  qty:5, price:"Rp.100.000", customer:'Hanafi', status: false, date:'Kamis,21 Desember 2020', name: { first: 'Genevieve', last: 'Wilson' } },
                    {  qty:5, price:"Rp.100.000", customer:'Hanafi', status: true, date:'Kamis,21 Desember 2020', name: { first: 'John', last: 'Carney' } },
                    {  qty:5, price:"Rp.100.000", customer:'Hanafi', status: false, date:'Kamis,21 Desember 2020', name: { first: 'Dick', last: 'Dunlap' } },
                ],
                fields: [
                    // {key:'no', label: 'No'},
                    { key: 'name', label: 'Name', sortable: true, sortDirection: 'desc' },
                    { key: 'qty', label: 'Jumlah', sortable: true, sortDirection: 'desc' },
                    { key: 'price', label: 'Harga', sortable: true, sortDirection: 'desc' },
                    { key: 'date', label: 'Tanggal Order', sortable: true, class: 'text-center' },
                    { key: 'customer', label: 'Customer', sortable: true, sortDirection: 'desc' },
                    {
                        key: 'status',
                        label: 'Status',
                        formatter: (value, _key, _item) => {
                        return value ? 'Selesai' : 'Dikirim'
                        },
                        sortable: true,
                        sortByFormatted: true,
                        filterByFormatted: true
                    },
                    { key: 'actions', label: 'Actions', class: 'text-md-center text-left' }
                ],
                totalRows: 1,
                currentPage: 1,
                perPage: 10,
                
                infoModal: {
                    id: 'info-modal',
                    title: '',
                    content: ''
                },
                currentItem : {
                    "status": true,
                    "date": "Kamis,21 Desember 2020",
                    "name": {
                        "first": "Dickerson",
                        "last": "Macdonald"
                    }
                }
            }
        },

    computed: {
    },
    created() {
        this.handleResize();
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
    },
    methods: {
        handleResize() {
            this.windowH.width = window.innerWidth;
            this.windowH.height = window.innerHeight;
        },
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

    tr td{
        vertical-align: top;
    }
</style>