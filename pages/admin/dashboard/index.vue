<template>
    <div class="text-center">
        <!-- <h1 class="red">Dashboard admin</h1> -->
        <b-container fluid class="px-5">

            <b-row class="mb-3 pt-5">
                <b-col lg="3" md="6">
                    <div style="background: linear-gradient(75.38deg, #1AE3D9 3.3%, #5C7CE9 100%);height:200px" class="w-100 shadow text-white rounded-8 p-3 my-2">
                        <b-row class="h-100">
                            <b-col class="text-left">
                                <div style="font-size:4em" class="h-75">
                                    100
                                </div>
                                <div class="h-25">
                                    <div>Total Order</div>
                                </div>
                            </b-col>
                        </b-row>
                    </div>
                </b-col>
                <b-col  lg="3" md="6">
                    <div style="background: linear-gradient(75.38deg, #F5509F 3.3%, #FE6F70 100%);height:200px" class="w-100 shadow text-white rounded-8 p-3 my-2">
                        <b-row class="h-100">
                            <b-col class="text-left">
                                <div style="font-size:4em" class="h-75">
                                    100
                                </div>
                                <div class="h-25">
                                    <div>Total Order</div>
                                </div>
                            </b-col>
                        </b-row>
                    </div>
                </b-col>
                <b-col  lg="3" md="6"> 
                    <div style="background: linear-gradient(75.38deg, #41E296 3.3%, #3BB5B5 100%);height:200px" class="w-100 shadow text-white rounded-8 p-3 my-2">
                        <b-row class="h-100">
                            <b-col class="text-left">
                                <div style="font-size:4em" class="h-75">
                                    100
                                </div>
                                <div class="h-25">
                                    <div>Total Order</div>
                                </div>
                            </b-col>
                        </b-row>
                    </div>
                </b-col>
                <b-col  lg="3" md="6">
                    <div style="background: linear-gradient(75.38deg, #FFD941 3.3%, #FF8154 100%);height:200px" class="w-100 shadow text-white rounded-8 p-3 my-2">
                        <b-row class="h-100">
                            <b-col class="text-left">
                                <div style="font-size:4em" class="h-75">
                                    100
                                </div>
                                <div class="h-25">
                                    <div>Total Order</div>
                                </div>
                            </b-col>
                        </b-row>
                    </div>
                </b-col>
            </b-row>


            <b-row class="my-3">
                <b-col class="mb-3" md="6" sm="12">
                    <div class="bg-white shadow rounded-8 p-2 text-left pl-4">
                        <h1>Top Selling Item</h1>

                        <div class="m-3">
                            <b-table :items="items" :fields="fields">
                            <!-- <template #table-caption>This is a table caption.</template> -->
                            </b-table>
                        </div>
                    </div>
                </b-col>
                <b-col class="mb-3" md="6" sm="12">
                    <div class="bg-white shadow rounded-8 p-2 text-left pl-4 h-100">
                        <div class="mb-2" style="height:12%">
                            <h1>Penjualan Tahun 2020</h1>
                        </div>
                        <div class="m-3 h-75">
                            <b-img class="w-100 pr-5 pb-5" src="~/assets/img/graph.png" fluid alt="Responsive image"></b-img>
                        </div>
                    </div>

                </b-col>
            </b-row>


            <b-row class="mt-3 pb-5">
                <b-col>
                    <div class="bg-white shadow rounded-8 p-2 text-left pl-4">
                        <h1>Daftar Pesanan</h1>

                        <div class="m-3">
                            <b-table :items="items" :fields="fields">
                            <!-- <template #table-caption>This is a table caption.</template> -->
                            </b-table>
                        </div>
                        <div>
                            <b-pagination 
                                v-model="currentPage"
                                class="justify-content-center"
                                :total-rows="rows"
                                :per-page="perPage"
                                aria-controls="my-table"
                            ></b-pagination>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    export default {
        // page properties go here
        layout: "admin",
        data() {
            return {
                fields: ['Nomor', 'Item'],
                items: [
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
                
                perPage: 3,
                currentPage: 1,
            }
        }
    }
</script>

<style>
    .red {
    color: red;
    }
</style>