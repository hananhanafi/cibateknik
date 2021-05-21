<template>
    <div>
        <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-12">
                <div style="background: linear-gradient(75.38deg, #1AE3D9 3.3%, #5C7CE9 100%);height:200px" class="w-100 shadow-sm text-white rounded-8 p-3 mb-4 shadow">
                    <div class="row h-100 align-items-center">
                        <div class="col-12">
                            <img src="~/assets/img/admin/order.png" class="img-fluid" alt="total-orders">
                        </div>
                        <div v-if="isLoadingData" class="col-12 text-center">
                            <LoadingSpinner :show="isLoadingData"/>
                        </div>
                        <div v-else class="col text-center">
                            <div style="font-size:2rem">
                                {{ dataTotal && dataTotal.order || '-' }}
                            </div>
                            <div class="font-weight-bold text-20">
                                <div>Total Pesanan</div>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12">
                <div style="background: linear-gradient(75.38deg, #41E296 3.3%, #3BB5B5 100%);height:200px" class="w-100 shadow-sm text-white rounded-8 p-3 mb-4 shadow">
                    <div class="row h-100 align-items-center">
                        <div class="col-12">
                            <img src="~/assets/img/admin/revenue.png" class="img-fluid" alt="total-revenue">
                        </div>
                        <div v-if="isLoadingData" class="col-12 text-center">
                            <LoadingSpinner :show="isLoadingData"/>
                        </div>
                        <div v-else class="col text-center">
                            <div style="font-size:2rem">
                                Rp {{ dataTotal && toFormatedNumber(dataTotal.revenue) || '-'}}
                            </div>
                            <div class="font-weight-bold text-20">
                                <div>Total Pendapatan</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12">
                <div style="background: linear-gradient(75.38deg, #FFD941 3.3%, #FF8154 100%);height:200px" class="w-100 shadow-sm text-white rounded-8 p-3 mb-4 shadow">
                    <div class="row h-100 align-items-center">
                        <div class="col-12">
                            <img src="~/assets/img/admin/users.png" class="img-fluid" alt="total-users">
                        </div>
                        <div v-if="isLoadingData" class="col-12 text-center">
                            <LoadingSpinner :show="isLoadingData"/>
                        </div>
                        <div v-else class="col text-center">
                            <div style="font-size:2rem">
                                {{dataTotal && dataTotal.users || '-'}}
                            </div>
                            <div class="font-weight-bold text-20">
                                <div>Total Pengguna</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="col-lg-3 col-md-6 col-sm-12">
                <div style="background: linear-gradient(75.38deg, #F5509F 3.3%, #FE6F70 100%);height:200px" class="w-100 shadow-sm text-white rounded-8 p-3 mb-4">
                    <div class="row h-100 align-items-center">
                        <div class="col-12">
                            <img src="~/assets/img/admin/user-online.png" class="img-fluid" alt="total-user-online">
                        </div>
                        <div  class="col text-center">
                            <div style="font-size:2rem">
                                100
                            </div>
                            <div class="font-weight-bold">
                                <div>Total Pengguna Online</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->
        </div>

    </div>

</template>

<script>
import ApiService from '~/common/api.service';
import { formatDate, toFormatedNumber } from '~/store/helpers';
export default {
    props: {
    },
    data() {
        return {
            dataTotal: null,
            isLoadingData: true,

        }
    },
    mounted() {
        // Set the initial datas
        this.loadData();
    },
    methods: {
        async loadData() {
            this.isLoadingData = true;
            await ApiService.get('/admin/data/total')
            .then((Response)=>{
                this.dataTotal = Response.data;
            })
            .catch(err=>{
                console.log("err",err);
            })
            this.isLoadingData = false;
        },
        
        // helpers
        formatDate,
        toFormatedNumber
    },
}
</script>
