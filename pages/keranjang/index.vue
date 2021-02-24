<template>
    <div class="py-5">
        <div class="container">
            <div class=" d-md-none d-flex fixed-top bg-white p-3 border">
                <h4>Keranjang</h4>
            </div>
            <div class="bg-white my-5">
                <div>
                    <div class="d-md-block d-none">
                        <h2>Keranjang</h2>
                        <div class="shadow-main p-3 my-5 ">
                            <div class="row d-flex align-items-center">
                                <div class="col">
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
                                <div class="col-2 text-center">
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
                    </div>
                    
                    <div class="d-md-none d-block">
                        <div class="form-check">
                            <input id="flexCheckDefault" v-model="productsChecked" class="form-check-input" type="checkbox" value="">
                            <label class="form-check-label" for="flexCheckDefault">
                                Pilih Semua
                            </label>
                        </div>
                    </div>

                    
                    <div v-for="(i) in items" :key="i" class="shadow-main p-3 my-3">
                        <div class="row d-flex align-items-center">
                            <div class="col-md col-12">
                                <div class="form-check d-flex align-items-center">
                                    <input id="item1" :checked="productsChecked" class="form-check-input align-self-center my-auto" type="checkbox" value="">
                                    <div class="d-flex align-items-center">
                                        <div>
                                            <img src="~/assets/img/item.png" style="width:80px" class="card-img-top d-inline" alt="item">
                                        </div>
                                        <div>
                                            <h5 class="ml-2 mb-1">Produk Bagus Banget</h5>
                                            <div class="d-md-none d-block ml-2">
                                                Rp 100.000
                                                <div class="d-flex">
                                                    <a class="btn btn-sm btn-dark rounded-pill"> <fa :icon="['fas','minus']" /> </a>
                                                    
                                                    <BaseInput
                                                        id="amount"
                                                        placeholder="Jumlah"
                                                        small
                                                        center
                                                        numberonly
                                                        class="mb-0 mx-2 text-center"
                                                        style="width:80px"
                                                    />

                                                    <a class="btn btn-sm btn-dark rounded-pill"> <fa :icon="['fas','plus']" /> </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-2 text-center d-md-block d-none">
                                Rp 100.000
                            </div>
                            <div class="col-2 text-center d-md-block d-none">
                                <div class="d-flex">
                                    <a class="btn btn-sm btn-dark rounded-pill"> <fa :icon="['fas','minus']" /> </a>
                                    
                                    <BaseInput
                                        id="amount"
                                        placeholder="Jumlah"
                                        small
                                        center
                                        numberonly
                                        class="mb-0 mx-2 text-center"
                                        style="width:80px"
                                    />

                                    <a class="btn btn-sm btn-dark rounded-pill"> <fa :icon="['fas','plus']" /> </a>
                                </div>
                            </div>
                            <div class="col-2 text-center d-md-block d-none">
                                Rp 200.000
                            </div>
                            <div class="col-md-1 col-12  text-right">
                                <!-- <a class="btn text-warning" @click="showModalEditItem">Edit</a> -->
                                <a class="btn text-danger"  @click="showModalDeleteItem"><fa class="text-danger" :icon="['fas','trash']" /> Hapus</a>
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
                    <a href="/keranjang/checkout" class="btn btn-primary">Checkout</a>
                </div>
            </div>
            
        </div>
        
        <ModalDeleteItem
            :show="isShowModalDeleteItem"
            :data="{}"
            @close="closeModalDeleteItem"
        />
        <ModalEditItem
            :show="isShowModalEditItem"
            :data="{}"
            @close="closeModalEditItem"
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
                isShowModalDeleteItem: false, 
                isShowModalEditItem: false, 
            }
        },
        methods: {
                
            showModalDeleteItem() {
                this.isShowModalDeleteItem = true;
            },
            closeModalDeleteItem() {
                this.isShowModalDeleteItem = false;
            },
                
            showModalEditItem() {
                this.isShowModalEditItem = true;
            },
            closeModalEditItem() {
                this.isShowModalEditItem = false;
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
