<template>
    <div class="text-center">
        
        <div class="container">
            <Breadcrumb :data="breadCrumbList"/>
            <div class="bg-white shadow-sm rounded-8 p-2 text-left ">
                <div class="mb-3 p-2">
                    <h1>Daftar Supplier</h1>
                </div>
                <div class="container-fluid">
                    <div class="col">
                        <div class="d-md-flex">
                            <div class="flex-fill mb-2 mr-2">
                                <BaseInput
                                    id="Cari"
                                    placeholder="Cari Supplier..."
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
                            <div class="ml-auto mb-2 text-right">
                                <button class="btn btn-primary  mt-1" type="button">Tambah Supplier</button>
                            </div>
                        </div>
                        <table class="table table-responsive-md">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Nama Supplier</th>
                                    <th scope="col" class="text-center" width="300px">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(supplier,i) in suppliers" :key="i">
                                    <th scope="row">{{i}}</th>
                                    <td>Mark</td>
                                    <td class="text-center">
                                        <button class="btn btn-danger btn-sm" @click="showAdminModalDeleteItem" >
                                            Hapus Supplier
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <Pagination/>
                    </div>
                </div>
            </div>
            
            <AdminModalDeleteItem :show="isShowAdminModalDeleteItem" @close="closeAdminModalDeleteItem"/>
            
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
                    {name:"Daftar Supplier",link:"/admin/data-master/supplier"}
                ],
                suppliers : new Array(10),
                currentItem : {
                        "isActive": true,
                        "date": "Kamis,21 Desember 2020",
                        "name": {
                            "first": "Dickerson",
                            "last": "Macdonald"
                        }
                },
                isShowAdminModalDeleteItem: false,
            }
        },
        
        mounted() {
            // Set the initial number of items
        },
        methods: {
            showAdminModalDeleteItem() {
                this.isShowAdminModalDeleteItem = true;
            },
            closeAdminModalDeleteItem() {
                this.isShowAdminModalDeleteItem = false;
            },
        },
        head() {
            return {
                title: "Cibateknik Admin - Data Master Supplier",
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