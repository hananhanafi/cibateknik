<template>
    <div  class="col-lg-8 col-12 mb-4">
        <div class="bg-white p-3 text-left rounded-8 h-100 shadow-sm">
            <div class="d-flex">
                <div class="flex-fill">
                    <h2>Grafik Pendapatan</h2>
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
                <line-chart id="revenue-chart" :data="revenueChartData" :options="revenueChartOptions" class="w-100" />
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
            revenuedata: null,
            isLoadingData: false,
            dateNow: new Date(),
            
            disabledAfter: new Date(),
            disabledBefore: new Date(2020,12,1),

            chartLabel: [],
            chartData:  [],
            revenueChartData: {
                labels: [],
                datasets: [
                    {
                        label: 'Pendapatan',
                        fill: true,
                        data: [],
                        backgroundColor: '#41E296',
                        borderColor: '#3BB5B5',
                        lineTension: 0.4,
                        pointBorderWidth: 10,
                        borderWidth: .5
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
                            stepSize: 1000000,
                            fontColor: "#707070",
                            fontFamily: "Source Sans Pro",
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
            await ApiService.query('/admin/data/paid-order/by/date',formDate)
            .then((Response)=>{
                this.revenuedata = Response.data.data;

                let loop = new Date(e[0]);
                while(loop <= new Date(e[1])){
                    const currentDate = new Date(loop);
                    const nextDate = new Date(currentDate);
                    nextDate.setDate(nextDate.getDate()+1); 
                    currentDate.setHours(0,0,0,0);
                    nextDate.setHours(0,0,0,0);
                    this.chartLabel.push(this.toLongDate(loop));

                    const currentRevenue = this.revenuedata.filter((revenue)=>{
                        return new Date(revenue.paidAt._seconds*1000) > currentDate && new Date(revenue.paidAt._seconds*1000) < nextDate;
                    })
                    this.chartData.push(this.getTotalAmount(currentRevenue));

                    const newDate = loop.setDate(loop.getDate() + 1);
                    loop = new Date(newDate);
                }

                this.revenueChartData.labels = this.chartLabel;
                this.revenueChartData.datasets[0].data = this.chartData;
                const maxRevenue = Math.max(...this.chartData);
                this.revenueChartOptions.scales.yAxes[0].ticks.stepSize = Math.round(maxRevenue/10);
            })
            .catch(err=>{
                console.log("err",err);
            })
            this.isLoadingData = false;
        },
        getTotalAmount(revenue) {
            let total = 0;
            
            revenue.forEach(item => {
                const currPrice = item.amount;
                total +=currPrice;
            });

            return total;
        },
        // helpers
        toLongDate,
        toFormatedNumber
    },
}
</script>
