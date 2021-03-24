<template>
    <div class="text-center">
        
        <div class="container">
            <Breadcrumb :data="breadCrumbList"/>
            <div class="bg-white shadow-light rounded-8 p-2 text-left ">
                <div class="mb-3 p-2">
                    <h1>Daftar Customer</h1>
                </div>
                <div class="container-fluid">
                    <div class="col">
                        <div class="d-md-flex">
                            <div class="flex-fill mb-2 mr-2">
                                <BaseInput
                                    id="Cari"
                                    placeholder="Cari Produk..."
                                    class="mb-0"
                                    
                                >
                                    <div slot="afterInput" class="position-absolute"
                                        style=" right:12px;
                                                top: 50%;
                                                -ms-transform: translateY(-50%);
                                                transform: translateY(-50%);
                                                z-index:99"
                                    >
                                        <fa class="" :icon="['fas','search']" /> 
                                    </div>
                                </BaseInput>
                            </div>
                            <div class="ml-auto mb-2 mr-2" style="width:160px">
                                <BaseSelect
                                :options="['Terbaru', 'Terlama']"
                                placeholder="Pilih Urutkan"
                                dense
                                />
                            </div>
                        </div>
                        <table class="table table-responsive-md">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Nama</th>
                                    <th scope="col">Tanggal Order</th>
                                    <th scope="col">Tanggal Terakhir Online</th>
                                    <th scope="col" class="text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(customer,i) in customers" :key="i">
                                    <th scope="row">{{i}}</th>
                                    <td>Mark</td>
                                    <td>Kamis, 21 Desember 2021</td>
                                    <td>Kamis, 21 Desember 2021</td>
                                    
                                    <td class="text-center">
                                        <button class="btn btn-primary btn-sm" @click="showModaldDetailCustomer" >
                                            Detail Customer
                                        </button>
                                        <button class="btn btn-outline-warning btn-sm" @click="$router.push({name:'admin-customer-history'})" >
                                            Riwayat Pesanan
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <Pagination/>
                    </div>
                </div>
            </div>
            
            <ModalDetailCustomer :show="isShowModaldDetailCustomer" :data="{...currentItem}" @close="closeModaldDetailCustomer"/>
            
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
                breadCrumbList: [
                    {name:"Daftar Customer",link:"/admin/customer"}
                ],
                customers : new Array(10),
                currentItem : {
                        "isActive": true,
                        "date": "Kamis,21 Desember 2020",
                        "name": {
                            "first": "Dickerson",
                            "last": "Macdonald"
                        }
                },
                isShowModaldDetailCustomer: false,
            }
        },
        
        mounted() {
            // Set the initial number of items
        },
        methods: {
            showModaldDetailCustomer() {
                this.isShowModaldDetailCustomer = true;
            },
            closeModaldDetailCustomer() {
                this.isShowModaldDetailCustomer = false;
            },
        },
        head() {
            return {
                title: "Cibateknik Admin - Customer",
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