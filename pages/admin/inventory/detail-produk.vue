<template>
    <div class="text-center">
        <div class="container-fluid">
            <div class="bg-white shadow rounded-8 p-3 text-left "> 
                <div class="mb-3 p-2">
                    <h1>Produk</h1>
                </div>
                <div class="d-md-flex mb-3">
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
                        :options="['Januari', 'Februari']"
                        placeholder="Pilih Bulan"
                        dense
                        class="rounded-pill"
                        />
                    </div>
                    <div class="ml-auto mb-2 text-right">
                        <button class="btn btn-primary" type="button" @click="$router.push({name:'admin-inventory-tambah-barang'})">Tambah Barang</button>
                    </div>
                </div>
                <table class="table table-responsive w-100">
                    <tr class="w-100">
                        <td class="flex-fill mx-0 px-0">
                            <div class="flex-fill">
                                <table class="w-100 table">
                                    <tr>
                                        <td class="text-white" colspan="3">
                                            empty
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-white" colspan="3">
                                            empty
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Nama</td>
                                        <td>Merk</td>
                                        <td>Tipe</td>
                                    </tr>
                                    <tr v-for="item in productItems" :key="item">
                                        <td width="80px"><div style="min-height:31px">{{item.name}}</div></td>
                                        <td width="80px">{{item.brand}}</td>
                                        <td width="80px">{{item.type}}</td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                        <td class="mx-0 px-0 w-25" style="max-width:50%">
                            <div class="p-2 border-top" style="min-height:43px">
                                Tanggal
                            </div>
                            <table class="w-100 table table-responsive" style="max-width:900px">
                                <tr>
                                    <td v-for="date in dates" :key="date"  class="text-center border-right">{{date}}</td>
                                </tr>
                                <tr>
                                    <td v-for="date in dates" :key="date" class="border-right">
                                        <div class="d-flex text-center" style="min-width:160px" >
                                            <div class="mr-2 w-50">
                                                IN
                                            </div>
                                            <div class="border-right">
                                            </div>
                                            <div class="ml-2 w-50">
                                                OUT
                                            </div>
                                        </div>
                                    </td>

                                </tr>
                                <tr v-for="item in productItems" :key="item">
                                    <td  v-for="date in dates" :key="date" class="border-right">
                                        <div class="d-flex" style="min-width:160px">
                                            <div class="mr-2">
                                                <BaseInput
                                                    id="in"
                                                    placeholder="IN"
                                                    small
                                                    numberonly
                                                    class="mb-0"
                                                />
                                            </div>
                                            <div class="ml-2">
                                                
                                                <BaseInput
                                                    id="out"
                                                    placeholder="OUT"
                                                    small
                                                    numberonly
                                                    class="mb-0"
                                                />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td class="flex-fill mx-0 px-0">
                            <div class="flex-fill">
                                <table class="w-100 table">
                                    <tr>
                                        <td class="text-white" colspan="4">
                                            empty
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-white" colspan="4">
                                            empty
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="80px">Keluar</td>
                                        <td width="80px">Masuk</td>
                                        <td width="80px">Stok</td>
                                        <td style="min-width:300px">Aksi</td>
                                    </tr>
                                    <tr v-for="item in productItems" :key="item">
                                        <td><div style="min-height:31px">5</div></td>
                                        <td>2</td>
                                        <td>3</td>
                                        <td>
                                            <div class="d-flex flex-row bd-highlight">
                                                <div class="w-50 btn btn-success btn-sm text-white mr-2" @click="showModalNoteInventory">Catat Barang</div>
                                                <div class="w-50">
                                                    <NuxtLink to="/admin/inventory/edit-barang">
                                                        <div  class="btn btn-outline-warning btn-sm w-100">
                                                            Edit Barang
                                                        </div>
                                                    </NuxtLink>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>

            <ModalNoteInventory :show="isShowModalNoteInventory" :data="{title:'Tambah Produk'}" @close="closeModalNoteInventory"/>
            
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
                dates: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
                productItems: [
                    { name:"McDonald",
                    brand:"Mitutoyo",
                    type:"Type 2" },
                    { name:"McDonald",
                    brand:"Mitutoyo",
                    type:"Type 2" },
                    { name:"McDonald",
                    brand:"Mitutoyo",
                    type:"Type 2" },
                    { name:"McDonald",
                    brand:"Mitutoyo",
                    type:"Type 2" },
                    { name:"McDonald",
                    brand:"Mitutoyo",
                    type:"Type 2" },
                    { name:"McDonald",
                    brand:"Mitutoyo",
                    type:"Type 2" },
                    { name:"McDonald",
                    brand:"Mitutoyo",
                    type:"Type 2" },
                    { name:"McDonald",
                    brand:"Mitutoyo",
                    type:"Type 2" },
                    { name:"McDonald",
                    brand:"Mitutoyo",
                    type:"Type 2" },
                    { name:"McDonald",
                    brand:"Mitutoyo",
                    type:"Type 2" },
                ],
                isShowModalNoteInventory: false,
            }
        },
        
        mounted() {
        },
        methods: {
            showModalNoteInventory() {
                this.isShowModalNoteInventory = true;
            },
            closeModalNoteInventory() {
                this.isShowModalNoteInventory = false;
            },
        }
    }
</script>
