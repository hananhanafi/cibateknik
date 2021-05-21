<template>
    <div class="col-lg-4 col-12 mb-4">
        <div>
            <div class="bg-white p-3 rounded-8 shadow-sm">
                <h2>Hari Ini</h2>
                <div class="mb-3">
                    {{ toLongDateWithDay(dateNow) }}
                </div>
                <div v-if="isLoadingData">
                    <LoadingSpinner :show="isLoadingData"/>
                </div>

                <div v-else class="row text-left">
                    <div class="col-12 text-20 text-primary">
                        <div style="background: linear-gradient(75.38deg, #F5509F 3.3%, #FE6F70 100%);min-height:100px" class="w-100 shadow-sm text-white rounded-8 p-3 mb-4 shadow">
                            <div class="row h-100 align-items-center px-3">
                                <div class="col-12 justify-content-start d-flex align-items-end border-white border-bottom pb-3">
                                    <img src="~/assets/img/admin/user-online.png" class="img-fluid mr-2" alt="total-user-online">
                                    <div class="font-weight-bold flex-fill text-right">
                                        <div>Pengguna online</div>
                                    </div>
                                </div>
                                <div  class="col text-right">
                                    <div style="font-size:2rem">
                                        {{ dataToday && dataToday.usersOnline || '-' }}
                                    </div>
                                </div>
                            </div>  
                        </div>
                    </div>
                    <div class="col-12 text-20 text-primary">
                        <div style="background: linear-gradient(75.38deg, #1AE3D9 3.3%, #5C7CE9 100%);min-height:100px" class="w-100 shadow-sm text-white rounded-8 p-3 mb-4 shadow">
                            <div class="row h-100 align-items-center px-3">
                                <div class="col-12 justify-content-start d-flex align-items-end border-white border-bottom pb-3">
                                    <img src="~/assets/img/admin/order.png" class="img-fluid mr-2" alt="total-orders">
                                    <div class="font-weight-bold flex-fill text-right">
                                        <div>Pesanan Hari ini</div>
                                    </div>
                                </div>
                                <div  class="col text-right">
                                    <div style="font-size:2rem">
                                        {{ dataToday && dataToday.todayOrder || '-' }}
                                    </div>
                                </div>
                            </div>  
                        </div>
                    </div>
                    <div class="col-12 text-20 text-primary">
                        <div style="background: linear-gradient(75.38deg, #41E296 3.3%, #3BB5B5 100%);min-height:100px" class="w-100 shadow-sm text-white rounded-8 p-3 mb-4 shadow">
                            <div class="row h-100 align-items-center px-3">
                                <div class="col-12 justify-content-start d-flex align-items-end border-white border-bottom pb-3">
                                    <img src="~/assets/img/admin/revenue.png" class="img-fluid mr-2" alt="total-revenues">
                                    <div class="font-weight-bold flex-fill text-right">
                                        <div>Pendapatan Hari ini</div>
                                    </div>
                                </div>
                                <div  class="col text-right">
                                    <div style="font-size:2rem">
                                        Rp {{ dataToday && toFormatedNumber(dataToday.todayRevenue) || '-'}}
                                    </div>
                                </div>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import ApiService from '~/common/api.service';
import { toLongDateWithDay, toFormatedNumber } from '~/store/helpers';
export default {
    props: {
    },
    data() {
        return {
            dataToday: null,
            isLoadingData: true,
            dateNow: new Date(),
            

        }
    },
    mounted() {
        // Set the initial datas
        this.loadData();
    },
    methods: {
        async loadData() {
            const dateYesterday = new Date(new Date().setHours(7,0,0,0));
            const dateTomorrow = new Date(new Date().setHours(31,0,0,0));
            const dateParams= {
                dateYesterday,
                dateTomorrow
            }
            this.isLoadingData = true;
            await ApiService.query('/admin/data/today',dateParams)
            .then((Response)=>{
                this.dataToday = Response.data;
            })
            .catch(err=>{
                console.log("err",err);
            })
            this.isLoadingData = false;
        },
        
        // helpers
        toLongDateWithDay,
        toFormatedNumber
    },
}
</script>
