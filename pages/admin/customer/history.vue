<template>
    <div class="text-center">
        <div class="container">
            <!-- <h1 class="red">Customer admin</h1> -->
            <div class="bg-white shadow rounded-8 p-3 text-left ">
                <div class="mb-3 p-2">
                    <h1>Riwayat Customer</h1>
                </div>
                
                
                <div class="container-fluid">
                    <div class="row mb-3">
                        <div class="col-md-2 col-12">
                            <b-img class="w-100" src="~/assets/img/person.png" fluid alt="Responsive image"></b-img>
                        </div>
                        <div class="col">
                            <table>
                                <tr>
                                    <td>
                                        Nama
                                    </td>
                                    <td>
                                        :
                                    </td>
                                    <td>
                                        Hanan Hanafi
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
                                        Kamis, 21 Desember 2021
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
                                        Kamis, 21 Desember 2021
                                    </td>
                                </tr>
                            </table>

                        </div>
                    </div>
                    <div class="row">
                        
                        <div class="col">
                            <div class="d-md-flex">
                                <div class="flex-fill mb-2 mr-2">
                                    <BaseInput
                                        id="Cari"
                                        placeholder="Cari Pesanan..."
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
                                        <th scope="col">Nomor Invoice</th>
                                        <th scope="col">Nama Barang</th>
                                        <th scope="col">Tanggal Order</th>
                                        <th scope="col">Status</th>
                                        <th scope="col" class="text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(customer,i) in customers" :key="i">
                                        <td>INV {{i}}</td>
                                        <td>Mark</td>
                                        <td>Kamis, 21 Desember 2021</td>
                                        <td><span class="text-success">Selesai</span></td>
                                        
                                        <td class="text-center">
                                            <button class="btn btn-primary btn-sm" @click="showModaldDetailOrder" >
                                                Detail Pesanan
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <Pagination/>
                        </div>
                    </div>
                </div>
            </div>
            
            
            <ModalDetailOrder :show="isShowModaldDetailOrder" :data="{...currentItem}" @close="closeModaldDetailOrder"/>
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
                customers : new Array(10),
                isShowModaldDetailOrder: false,

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
        
        mounted() {
        },
        methods: {
            showModaldDetailOrder() {
                this.isShowModaldDetailOrder = true;
            },
            closeModaldDetailOrder() {
                this.isShowModaldDetailOrder = false;
            },
        }
    }
</script>