<template>
    <div class="shadow p-4 h-100 d-flex flex-column">
        
        <div class="row mb-4">
            <div class="col">
                <div class="flex-fill">
                <h3>Alamat Utama</h3>
                </div>
            </div>
            <div class="col-lg-6 col-md-12 text-right">
                <a class="btn text-primary" @click="showUserModalAddAddress" ><fa :icon="['fas','plus']" /> Tambah Alamat</a>
            </div>
        </div>

    
        <div class="row">
            <div v-for="(i,index) in items" :key="i" class="col-12" >
                <div class="p-3 shadow-main mb-3">
                    <div class="row">
                        <div class="col">
                            <table class="text-nowrap">
                                <tr>
                                    <td>Label</td>
                                    <td class="text-center" width="40px">:</td>
                                    <td>Rumah <span v-if="index==0" class="text-success"> (Alamat Utama)</span></td>
                                </tr>
                                <tr>
                                    <td>No Telepon</td>
                                    <td class="text-center">:</td>
                                    <td>0815158722120</td>
                                </tr>
                                <tr>
                                    <td>Nama</td>
                                    <td class="text-center">:</td>
                                    <td>Hanan Hanafi</td>
                                </tr>
                                <tr>
                                    <td>Alamat</td>
                                    <td class="text-center">:</td>
                                    <td class="text-wrap">Jl. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore inventore eius consequuntur molestias eos ducimus, pariatur dolorum quibusdam non rerum ullam nulla nobis sunt sit illum quidem sint libero dolores!</td>
                                </tr>
                            </table>
                        </div>
                        <div class="col-lg-3 col-md-12">
                            <div class="text-center d-flex flex-column h-100">
                                <a class="btn btn-light border">Jadikan Utama</a>
                                <div class="text-center mt-auto flex-grow-1 d-flex align-items-center">
                                    <a class="btn text-warning mx-auto"><fa class="text-warning" :icon="['fas','pencil-alt']" /> Edit</a>
                                    <a class="btn text-danger mx-auto" @click="showModalDeleteItem"><fa class="text-danger" :icon="['fas','trash']" /> Hapus</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
        <Pagination/>

        <UserModalAddAddress
            :show="isShowUserModalAddAddress"
            :data="dataModal"
            @close="closeUserModalAddAddress"
        />
        <ModalDeleteItem
            :show="isShowModalDeleteItem"
            :data="{}"
            @close="closeModalDeleteItem"
        />

    </div>
</template>

<script>
export default {
    data() {
        return {
        formData: {
            username: "hanafihanan",
            nama: "Hanan Hanafi",
            email: "hanafihanan@mail.id",
            sort : null,
            date: {
            day: null,
            month: null,
            year: null,
            }
        },
        
        items: new Array(5),
        dataModal: {
            title: "Atur Alamat Pengiriman",
            message: ""
        },
        isShowUserModalAddAddress: false,
        isShowModalDeleteItem: false,
            
        }
    },
    methods: {
        showUserModalAddAddress() {
            this.isShowUserModalAddAddress = true;
        },
        closeUserModalAddAddress() {
            this.isShowUserModalAddAddress = false;
        },
        showModalDeleteItem() {
            this.isShowModalDeleteItem = true;
        },
        closeModalDeleteItem() {
            this.isShowModalDeleteItem = false;
        }
    }
}
</script>
