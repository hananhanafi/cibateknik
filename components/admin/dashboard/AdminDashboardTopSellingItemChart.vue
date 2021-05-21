<template>
    <div  class="col-lg-4 col-12 mb-4">
        <div class="bg-white p-3 text-left rounded-8 h-100 shadow-sm">
            <h2 class="mb-3">Top Selling Item</h2>

            <div v-if="isLoadingData" class="h-100 d-flex align-items-center justify-content-center">
                <LoadingSpinner :show="isLoadingData"/>
            </div>

            <div v-else class="m-3 mt-5 ">
                <horizontal-bar-chart id="top-selling-chart" :data="topSellingChartData" :options="topSellingChartOptions" class="w-100" />
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
            isLoadingData: false,

            chartLabel: [],
            chartData:  [],
            topSellingChartData: {
                labels: [],
                datasets: [
                    {
                        label: 'Penjualan',
                        fill: false,
                        data: [],
                        backgroundColor: '#5685E8',
                        borderColor: '#5685E8',
                        // lineTension: 0,
                        pointBorderWidth: 10,
                        // borderWidth: .5
                    },
                ]
            },
            topSellingChartOptions: {
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
                        stepSize: 2,
                        fontColor: "#707070",
                        fontFamily: "Source Sans Pro",
                    },
                }]
                },
                legend: {
                    display: false,
                }
            },

        }
    },
    created() {
        // Set the initial datas
        this.loadData();
    },
    methods: {
        async loadData() {
            this.isLoadingData = true;
            await ApiService.get('/admin/data/top-selling-item')
            .then((Response)=>{
                this.dataTotal = Response.data;
            })
            .catch(err=>{
                console.log("err",err);
            })
            this.dataTotal.forEach((item)=>{
                this.topSellingChartData.labels.push(item.name);
                this.topSellingChartData.datasets[0].data.push(item.itemSold);
            })
            this.isLoadingData = false;
        },
        // helpers
        toLongDate,
        toFormatedNumber
    },
}
</script>
