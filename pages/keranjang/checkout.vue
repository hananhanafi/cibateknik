<template>
    <div class="py-5">
        <div class="container">
            <div class="d-md-none d-flex fixed-top bg-white p-3 border">
                <h4>Checkout</h4>
            </div>
            <div class="bg-white my-md-5">
                <h2 class="d-md-block d-none">Checkout</h2>
                <div>
                    <div class="shadow-main p-3 my-5 ">
                        <div class="row d-flex align-items-center">
                            <div class="col">
                                <div class="d-flex">
                                    <h5 class="mb-2">
                                        Alamat Pengiriman
                                    </h5>
                                </div>
                                <div class="text-muted">
                                    Belum diatur
                                </div>
                            </div>
                            <div class="col-12">
                                <a class="btn text-primary float-right" @click="showUserModalSettingAddress">Atur Alamat Pengiriman</a>
                            </div>
                        </div>
                    </div>
                    <div class="shadow-main p-3 my-5 ">
                        <div class="row d-flex align-items-center">
                            <div class="col">
                                <div class="d-flex">
                                    <h5 class="mb-2">
                                        Metode Pembayaran
                                    </h5>
                                </div>
                                <div class="text-muted">
                                    Belum diatur
                                </div>
                            </div>
                            <div class="col-12">
                                <a class="btn text-primary float-right" @click="showUserModalChoosePaymentMethod">Atur Metode Pembayaran</a>
                            </div>
                        </div>
                    </div>


                    <h4>Barang yang dibeli :</h4>
                    <div class="shadow-main p-3 my-5 d-md-block d-none">
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
                                            <div class="d-md-none d-block ml-4">
                                                Rp 100.000
                                                <div>
                                                    Jumlah : 2
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-2 text-center d-md-block d-none">
                                Rp 100.000
                            </div>
                            <div class="col-1 text-center d-md-block d-none">
                                2
                            </div>
                            <div class="col-2 text-center d-md-block d-none">
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

        <UserModalSettingAddress
            :show="isShowUserModalSettingAddress"
            :data="dataModal"
            @close="closeUserModalSettingAddress"
            @add-address="showUserModalAddAddress()"
        />

        <UserModalAddAddress
            :show="isShowUserModalAddAddress"
            :data="dataModal"
            @close="closeUserModalAddAddress"
        />


        <UserModalChoosePaymentMethod
            :show="isShowUserModalChoosePaymentMethod"
            @close="closeUserModalChoosePaymentMethod"
        />
    </div>
</template>

<script>
    export default {
        middleware: 'authenticated',
        // page properties go here
        layout: "user",
        data() {
            return {
                items: new Array(5), 
                productsChecked: false,
                isShowUserModalSettingAddress: false,
                isShowUserModalAddAddress: false,
                isShowUserModalChoosePaymentMethod: false,
                dataModal: {
                    title: "Atur Alamat Pengiriman",
                    message: ""
                },
            }
        },
        methods: {
            showUserModalSettingAddress() {
                this.isShowUserModalSettingAddress = true;
            },
            closeUserModalSettingAddress() {
                this.isShowUserModalSettingAddress = false;
            },
            async showUserModalAddAddress() {
                await this.closeUserModalSettingAddress();
                this.isShowUserModalAddAddress = true;
            },
            async closeUserModalAddAddress() {
                await this.closeAllModal();
                this.showUserModalSettingAddress();
            },
            showUserModalChoosePaymentMethod() {
                this.isShowUserModalChoosePaymentMethod = true;
            },
            closeUserModalChoosePaymentMethod() {
                this.isShowUserModalChoosePaymentMethod = false;
            },
            closeAllModal(){
                this.isShowUserModalSettingAddress= false;
                this.isShowUserModalAddAddress= false;
                this.isShowUserModalChoosePaymentMethod= false;
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
