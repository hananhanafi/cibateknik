<template>
    <div class="text-center">
        <div class="container-fluid px-md-5">
            
            <Breadcrumb :data="breadCrumbList"/>
            
            <div class="row w-100" style="overflow-x:auto">
                <div class="col-lg-3 col-md-6 col-sm-12">
                    <div style="background: linear-gradient(75.38deg, #1AE3D9 3.3%, #5C7CE9 100%);height:200px" class="w-100 shadow-sm text-white rounded-8 p-3 mb-4">
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
                <!-- <div class="col-lg-3 col-md-6 col-sm-12">
                    <div style="background: linear-gradient(75.38deg, #8E2DE2 3.3%, #4A00E0 100%);height:200px" class="w-100 shadow-sm text-white rounded-8 p-3 mb-4">
                        <div class="row h-100 align-items-center">
                            <div  class="col text-left">
                                <div style="font-size:4em">
                                    100
                                </div>
                                <div class="font-weight-bold font-weight-bold">
                                    <div>Total Barang Terjual</div>
                                </div>
                            </div>
                            <div class="col">
                                <fa  style="font-size:500%" :icon="['fas','coins']"  />
                            </div>
                        </div>
                    </div>
                </div> -->
                <div class="col-lg-3 col-md-6 col-sm-12">
                    <div style="background: linear-gradient(75.38deg, #41E296 3.3%, #3BB5B5 100%);height:200px" class="w-100 shadow-sm text-white rounded-8 p-3 mb-4">
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
                <!-- <div class="col-lg-3 col-md-6 col-sm-12">
                    <div style="background: linear-gradient(75.38deg, #F5509F 3.3%, #FE6F70 100%);height:200px" class="w-100 shadow-sm text-white rounded-8 p-3 mb-4">
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
                </div> -->
                <div class="col-lg-3 col-md-6 col-sm-12">
                    <div style="background: linear-gradient(75.38deg, #FFD941 3.3%, #FF8154 100%);height:200px" class="w-100 shadow-sm text-white rounded-8 p-3 mb-4">
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
                <div class="col-lg-3 col-md-6 col-sm-12">
                    <div style="background: linear-gradient(75.38deg, #F5509F 3.3%, #FE6F70 100%);height:200px" class="w-100 shadow-sm text-white rounded-8 p-3 mb-4">
                        <div class="row h-100 align-items-center">
                            <div  class="col text-left">
                                <div style="font-size:4em">
                                    100
                                </div>
                                <div class="font-weight-bold font-weight-bold">
                                    <div>Total Pengguna Online</div>
                                </div>
                            </div>
                            <div class="col">
                                <fa  style="font-size:500%" :icon="['fas','coins']"  />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-8 col-12 mb-4">
                    <div class="bg-white p-3 text-left rounded-8 h-100 shadow-sm">
                        <div class="d-flex">
                            <div class="flex-fill">
                                <h2>Pendapatan</h2>
                            </div>
                            <div class="w-50">

                                <!-- <v-calendar />
                                <v-date-picker v-model="date_today" /> -->
                                <vue2-datepicker v-model="date_range" class="w-100" placeholder="Pilih rentang waktu" range @change="datePickerRangeChangedHandler($event)"></vue2-datepicker>
                                <!-- <vue2-daterangepicker
                                ref="picker" v-model="dateRange"  class="w-100" placeholder="Pilih rentang waktu">
                                    <template v-slot:input="picker" style="min-width: 350px;">
                                            aaaaa
                                        {{ picker.startDate  }} - {{ picker.endDate  }}
                                    </template>
                                </vue2-daterangepicker> -->
                            </div>
                        </div>

                        <div class="m-3 mt-5 ">
                            <line-chart id="revenue-chart" :data="revenueChartData" :options="revenueChartOptions" class="w-100" />
                        </div>
                    </div>
                </div>

                <div class="col-lg-4 col-12 mb-4">
                    <div class="bg-white p-3 rounded-8 shadow-sm">
                        <h2>Hari Ini</h2>
                        <div class="mb-3">
                            Senin, 21 Desember 2021
                        </div>
                        <div class="row text-left">
                            <div class="col-12 text-20 text-primary">
                                <div class="border-bottom">
                                    <fa :icon="['fas','shopping-cart']"  /> Pesanan 
                                </div>
                                <div class="text-28 font-weight-bold text-right mb-2">
                                    10
                                </div>
                            </div>
                            <div class="col-12 text-20 text-success">
                                <div class="border-bottom">
                                    <fa :icon="['fas','donate']"  /> Pemasukan 
                                </div>
                                
                                <div class="text-28 font-weight-bold text-right  mb-2" >
                                    Rp 1.000.000
                                </div>
                            </div>
                            <div class="col-12 text-20 text-danger">
                                <div class="border-bottom">
                                    <fa :icon="['fas','coins']"  /> Penjualan 
                                </div>
                                
                                <div class="text-28 font-weight-bold text-right  mb-2" >
                                    Rp 500.000
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="row">

                <div class="col-lg-3 col-12 mb-4">
                    <div class="bg-white p-3 text-left rounded-8 h-100 shadow-sm">
                        <h2 class="mb-3">Top Selling Item</h2>
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
                <div class="col-lg-9 col-12 mb-4">
                    <div class="bg-white p-3 text-left rounded-8 h-100 shadow-sm">
                        <div class="d-flex">
                            <div class="flex-fill">
                                <h2>Grafik Penjualan</h2>
                            </div>
                            <div class="w-50">
                                <vue2-datepicker v-model="date_range" class="w-100" placeholder="Pilih rentang waktu" range @change="datePickerRangeChangedHandler($event)"></vue2-datepicker>
                            </div>
                        </div>

                        <div class="m-3 mt-5 ">
                            <line-chart :data="barChartData" :options="barChartOptions" class="w-100" />
                        </div>
                    </div>
                </div>
            </div>


            <AdminListUserOrder/>
            
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
            breadCrumbList: [],

            date_range: null,
            dateRange: {
                startDate: null,
                endDate: null,
            },
            
            isShowModaldDetailOrder: false,
            isShowModalEditStatusOrder: false,

            chartHeight : 200,

            selected: null,
            options: [
                { value: null, text: 'Selesai' },
                { value: 'a', text: 'Dikirim' },
                { value: 'b', text: 'Diproses' },
                // { value: { C: '3PO' }, text: 'This is an option with object value' },
                // { value: 'd', text: 'This one is disabled', disabled: true }
            ],

            revenueChartData: {
                labels: ['1 Jan', '2 Jan', '3 Jan', '4 Jan', '5 Jan', '6 Jan', '7 Jan'],
                datasets: [
                    {
                        label: 'Pemasukan',
                        fill: false,
                        data: [100000,800000,500000,200000,800000,200000,800000,],
                        backgroundColor: '#41E296',
                        borderColor: '#41E296',
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
                maintainAspectRatio:false,
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
                // labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
                
                labels: ['1 Jan', '2 Jan', '3 Jan', '4 Jan', '5 Jan', '6 Jan', '7 Jan'],
                datasets: [
                    {
                        label: 'Penjualan',
                        fill: false,
                        data: [10, 13, 15, 11, 20, 17, 13],
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
                maintainAspectRatio:false,
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
                        stepSize: 10,
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
    mounted() {
    },
    methods: {
        datePickerRangeChangedHandler(e){
            console.log("eeee",e[0]);
        },
        dateDiffInDays(a, b) {
            const _MS_PER_DAY = 1000 * 60 * 60 * 24;
            // Discard the time and time-zone information.
            const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
            const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

            return Math.floor((utc2 - utc1) / _MS_PER_DAY);
        },
        showModaldDetailOrder() {
            this.isShowModaldDetailOrder = true;
        },
        closeModaldDetailOrder() {
            this.isShowModaldDetailOrder = false;
        },
        showModalEditStatusOrder() {
            this.isShowModalEditStatusOrder = true;
        },
        closeModalEditStatusOrder() {
            this.isShowModalEditStatusOrder = false;
        },
    },
    head() {
        return {
            title: "Cibateknik Admin - Dashboard",
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

<style>
    .red {
    color: red;
    }

    tr td{
        vertical-align: top;
    }
</style>