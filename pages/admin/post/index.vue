<template>
    <div class="text-center">
        <div class="container">
            <Breadcrumb :data="breadCrumbList"/>
            <div class="bg-white shadow-sm rounded-8 p-2 text-left ">
                <div class="mb-3 p-2">
                    <h1>Katalog Barang</h1>
                </div>
                <div class="d-md-flex mb-3 px-2">
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
                        v-model="formData.product"
                        :options="['Produk 1', 'Produk 2']"
                        placeholder="Pilih Produk"
                        dense
                        />
                    </div>
                    <div class="ml-auto mb-2 mr-2" style="width:160px">
                        <BaseSelect
                        v-model="formData.sort"
                        :options="['Terbaru', 'Terlama']"
                        placeholder="Pilih Urutkan"
                        dense
                        />
                    </div>
                    <div class="ml-auto mb-2 text-right">
                        <button class="btn btn-primary mt-1" type="button" @click="showModalAddPostItem">Tambah Barang</button>
                    </div>
                </div>

                <div class="row px-2">
                    <div v-for="(i) in items" :key="i" class="col-xl-2 col-lg-3 col-md-4 col-6 mb-4">
                        <ItemCard/>
                    </div>
                    <div class="col-12 d-flex">
                        <div>
                            Menampilkan 1 - 10 dari 40 item
                        </div>
                    </div>
                    <div class="col-12 d-flex">
                        <div class="ml-auto">
                            <button class="btn btn-primary border w-100">Muat Lagi</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
        <ModalAddPostItem :show="isShowModalAddPostItem" :data="{title:'Tambah Barang ke Katalog'}" @close="closeModalAddPostItem"/>
    </div>
</template>

<script>
    export default {
        // page properties go here
        layout: "admin",
        data() {
            return {
                breadCrumbList: [
                    {name:"Katalog",link:"/admin/post"}
                ],
                
                items: new Array(18),
                formData: {
                    sort: null,
                    product: null,
                },
                isShowModalAddPostItem: false,
            }
        },
        methods: {
            showModalAddPostItem() {
                this.isShowModalAddPostItem = true;
            },
            closeModalAddPostItem() {
                this.isShowModalAddPostItem = false;
            },
        },
        head() {
            return {
                title: "Cibateknik Admin - Katalog",
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