<template>
    <div  class="col-lg-9 col-12 mb-4">
        <div class="bg-white p-3 text-left rounded-8 h-100 shadow-sm">
            <div class="d-flex">
                <div class="flex-fill">
                    <h2>Grafik Pesanan</h2>
                </div>
                <div class="w-50">

                    <!-- <v-calendar />
                    <v-date-picker v-model="date_today" /> -->
                    <vue2-datepicker v-model="date_range" class="w-100" placeholder="Pilih rentang waktu" range  :disabled-date="(date) => date > disabledAfter || date < disabledBefore" @change="datePickerRangeChangedHandler($event)"></vue2-datepicker>
                    <!-- <vue2-daterangepicker
                    ref="picker" v-model="dateRange"  class="w-100" placeholder="Pilih rentang waktu">
                        <template v-slot:input="picker" style="min-width: 350px;">
                                aaaaa
                            {{ picker.startDate  }} - {{ picker.endDate  }}
                        </template>
                    </vue2-daterangepicker> -->
                </div>
            </div>

            <div v-if="isLoadingData" class="h-100 d-flex align-items-center justify-content-center">
                <LoadingSpinner :show="isLoadingData"/>
            </div>

            <div v-else class="m-3 mt-5 ">
                <line-chart :data="barChartData" :options="barChartOptions" class="w-100" />
            </div>

        </div>
    </div>

</template>

<script>
import ApiService from '~/common/api.service';
import { toLongDate, toFormatedNumber } from '~/store/helpers';
export default {
    props: {
    },
    data() {
        return {
            date_range: [
                new Date(new Date().setDate(new Date().getDate()-6)),
                new Date(new Date()),
            ],
            orderData: null,
            isLoadingData: false,
            dateNow: new Date(),
            
            disabledAfter: new Date(),
            disabledBefore: new Date(2020,12,1),

            chartLabel: [],
            chartData:  [],
            barChartData: {
                labels: [],
                datasets: [
                    {
                        label: 'Pesanan Selesai',
                        fill: true,
                        data: [],
                        backgroundColor: 'rgba(40,167,79,0.8)',
                        borderColor: '#28a745',
                        lineTension: 0.4,
                        pointBorderWidth: 10,
                        borderWidth: .5
                    },
                    {
                        label: 'Pesanan Dikirim',
                        fill: true,
                        data: [],
                        backgroundColor: 'rgba(23,162,184,0.8)',
                        borderColor: '#17a2b8',
                        lineTension: 0.4,
                        pointBorderWidth: 10,
                        borderWidth: .5
                    },
                    {
                        label: 'Pesanan Dikemas',
                        fill: true,
                        data: [],
                        backgroundColor: 'rgba(0,123,255,0.8)',
                        borderColor: '#007bff',
                        lineTension: 0.4,
                        pointBorderWidth: 10,
                        borderWidth: .5
                    },
                    {
                        label: 'Pesanan Belum Dibayar',
                        fill: true,
                        data: [],
                        backgroundColor: 'rgba(255,193,7,0.8)',
                        borderColor: '#ffc107',
                        lineTension: 0.4,
                        pointBorderWidth: 10,
                        borderWidth: .5
                    },
                    {
                        label: 'Pesanan Expired',
                        fill: true,
                        data: [],
                        backgroundColor: 'rgba(220,53,69,0.8)',
                        borderColor: '#dc3545',
                        lineTension: 0.4,
                        pointBorderWidth: 10,
                        borderWidth: .5
                    },
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
        }
    },
    created() {
        // Set the initial datas
        this.datePickerRangeChangedHandler(this.date_range);
    },
    methods: {
        async datePickerRangeChangedHandler(e){
            const start = new Date(e[0]);
            const end = new Date(e[1]);
            this.chartLabel = [];
            this.chartData = [];

            this.isLoadingData = true;
            const formDate = {
                fromDate : start,
                toDate : new Date(end.setDate(end.getDate()+1)),
            }
            await ApiService.query('/admin/data/order/by/date',formDate)
            .then((Response)=>{
                this.orderData = Response.data.data;
                let currentOrder;
                let loop = new Date(e[0]);
                while(loop <= new Date(e[1])){
                    const currentDate = new Date(loop);
                    const nextDate = new Date(currentDate);
                    nextDate.setDate(nextDate.getDate()+1); 
                    currentDate.setHours(0,0,0,0);
                    nextDate.setHours(0,0,0,0);
                    this.chartLabel.push(this.toLongDate(loop));

                    currentOrder = this.orderData.filter((order)=>{
                        
                        return new Date(order.createdAt._seconds*1000) > currentDate && new Date(order.createdAt._seconds*1000) < nextDate;
                    })

                    const finishedOrder =  currentOrder.filter((order)=>{
                        return order.statusOrder === 'DONE';
                    });
                    this.barChartData.datasets[0].data.push(finishedOrder.length);

                    const shippedOrder = currentOrder.filter((order)=>{
                        return order.statusOrder === 'SHIPPING';
                    });
                    this.barChartData.datasets[1].data.push(shippedOrder.length);
                    
                    const packedOrder = currentOrder.filter((order)=>{
                        return order.statusOrder === 'PACKING';
                    });
                    this.barChartData.datasets[2].data.push(packedOrder.length);

                    const unPaidOrder = currentOrder.filter((order)=>{
                        return order.statusOrder === 'PENDING';
                    });
                    this.barChartData.datasets[3].data.push(unPaidOrder.length);

                    const expiredOrder = currentOrder.filter((order)=>{
                        return order.statusOrder === 'EXPIRED';
                    });
                    this.barChartData.datasets[4].data.push(expiredOrder.length);

                    

                    const newDate = loop.setDate(loop.getDate() + 1);
                    loop = new Date(newDate);
                }
                
                const maxData = Math.max(
                    ...this.barChartData.datasets[0].data,
                    ...this.barChartData.datasets[1].data,
                    ...this.barChartData.datasets[3].data,
                    ...this.barChartData.datasets[3].data,
                    ...this.barChartData.datasets[4].data,
                );
                this.barChartOptions.scales.yAxes[0].ticks.stepSize = Math.round(maxData/10);

                this.barChartData.labels = this.chartLabel;
                // this.barChartData.datasets[0].data = this.chartData;
            })
            .catch(err=>{
                console.log("err",err);
            })
            this.isLoadingData = false;
        },
        // helpers
        toLongDate,
        toFormatedNumber
    },
}
</script>
