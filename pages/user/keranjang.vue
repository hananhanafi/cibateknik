<template>
    <div class="py-5">
        <div class="container">
            <div class="bg-white my-md-5">
                <h2>Keranjang</h2>
                <div>
                    <div class="shadow-main p-3 my-5 ">
                        <div class="row d-flex align-items-center">
                            <div class="col-6">
                                <div class="form-check">
                                    <input id="flexCheckDefault" v-model="productsChecked" class="form-check-input" type="checkbox" value="">
                                    <label class="form-check-label" for="flexCheckDefault">
                                        Produk
                                    </label>
                                </div>
                            </div>
                            <div class="col-2 text-center">
                                Harga Satuan
                            </div>
                            <div class="col-1 text-center">
                                Kuantitas
                            </div>
                            <div class="col-2 text-center">
                                Total Harga
                            </div>
                            <div class="col-1 text-center">
                                Aksi
                            </div>
                        </div>
                    </div>

                    
                    <div v-for="(i) in items" :key="i" class="shadow-main p-3 my-3">
                        <div class="row d-flex align-items-center">
                            <div class="col-6">
                                <div class="form-check d-flex align-items-center">
                                    <input id="item1" :checked="productsChecked" class="form-check-input align-self-center my-auto" type="checkbox" value="">
                                    <div class="d-flex align-items-center">
                                        <div>
                                            <img src="~/assets/img/item.png" style="width:80px" class="card-img-top d-inline" alt="item">
                                        </div>
                                        <div>
                                            <h5 class="ml-2">Produk Bagus Banget</h5>
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
                            <div class="col-lg-1 col-md-12  text-center">
                                <a class="btn text-warning">Edit</a>
                                <a class="btn text-danger">Hapus</a>
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
                    <a href="/user/checkout" class="btn btn-primary">Checkout</a>
                </div>
            </div>
            

            
        </div>
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
            }
        },
        head() {
            return {
                title: "Cibateknik - Keranjang",
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
