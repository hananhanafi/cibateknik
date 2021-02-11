<template>
    <div class="pt-5">
        <div class="container">
            <div class="bg-white my-5">
                <h2>Checkout</h2>
                <div>
                    <div class="shadow-main p-3 my-5 ">
                        <div class="row d-flex align-items-center mb-3">
                            <div class="col">
                                <h5 class="mb-2">
                                    Alamat Pengiriman
                                </h5>
                                <div class="text-muted">
                                    Belum diatur
                                </div>
                            </div>
                            <div class="col text-right">
                                <a class="btn text-primary" @click="showUserModalSettingAddres">Atur Alamat Pengiriman</a>
                            </div>
                        </div>
                        <div class="row d-flex align-items-center">
                            <div class="col">
                                <h5 class="mb-2">
                                    Metode Pembayaran
                                </h5>
                                <div class="text-muted">
                                    Belum diatur
                                </div>
                            </div>
                            <div class="col text-right">
                                <a class="btn text-primary">Atur Metode Pembayaran</a>
                            </div>
                        </div>
                    </div>


                    <h4>Barang yang dibeli :</h4>
                    <div class="shadow-main p-3 my-5 ">
                        <!-- <div class="row d-flex align-items-center mb-3">
                            <div class="col">
                                Barang yang dibeli :
                            </div>
                        </div> -->

                        <div class="row d-flex align-items-center">
                            <div class="col">
                                Barang
                            </div>
                            <div class="col-2 text-center">
                                Harga
                            </div>
                            <div class="col-1 text-center">
                                Kuantitas
                            </div>
                            <div class="col-2 text-center">
                                Subtotal
                            </div>
                        </div>
                    </div>

                    
                    <div v-for="(i) in items" :key="i" class="shadow-main p-3 my-3">
                        <div class="row d-flex align-items-center">
                            <div class="col">
                                <div class="form-check d-flex align-items-center">
                                    <div class="d-flex align-items-center">
                                        <div>
                                            <img src="~/assets/img/item.png" style="width:80px" class="card-img-top d-inline" alt="item">
                                        </div>
                                        <div>
                                            <h5 class="ml-4">Produk Bagus Banget</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-2 text-center">
                                Rp 100.000
                            </div>
                            <div class="col-1 text-center">
                                2
                            </div>
                            <div class="col-2 text-center">
                                Rp 200.000
                            </div>
                        </div>
                    </div>
                </div>

                
                <div class="shadow-main p-3 mt-5 mb-3 ">
                    <div class="row d-flex align-items-center font-weight-bold">
                        <div class="col-6">
                            Total :
                        </div>
                        <div class="col text-right">
                            Rp 1.000.000
                        </div>
                    </div>
                </div>

                <div class="text-right">
                    <a class="btn btn-primary">Checkout</a>
                </div>
            </div>
            

            
        </div>

        <UserModalSettingAddres
            :show="isShowUserModalSettingAddres"
            :data="dataModal"
            @close="closeUserModalSettingAddres"
        />
    </div>
</template>

<script>
    export default {
        middleware: 'notAuthenticated',
        // page properties go here
        layout: "user",
        data() {
            return {
                items: new Array(5), 
                productsChecked: false,
                isShowUserModalSettingAddres: false,
                dataModal: {
                    title: "Atur Alamat Pengiriman",
                    message: ""
                },
            }
        },
        methods: {
            showUserModalSettingAddres() {
                this.isShowUserModalSettingAddres = true;
            },
            closeUserModalSettingAddres() {
                this.isShowUserModalSettingAddres = false;
            },
        },
        head() {
            return {
                title: "Cibateknik - Checkout",
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
