<template>
    <div class="text-center">
        <div class="container">
            <div class="bg-white shadow rounded-8 p-2 text-left ">
                <div class="mb-3 p-2 d-flex">
                    <h1>Pesan</h1>
                    <div class="ml-auto d-flex align-items-center">
                        <a class="btn btn-sm text-danger" @click="showModalDeleteItem"><fa class="text-danger" :icon="['fas','trash']" /> Hapus Semua</a>

                    </div>
                </div>
                <div class="container-fluid">
                    
                    <div class="row">
                        <div v-for="(i) in items" :key="i" class="col-12" >
                            <div class="p-3 shadow-main mb-3 " style="max-height:160px;min-height:120px">
                            <div class="row">
                                <div class="col">
                                <div class="d-flex">
                                    <div>
                                    <h5>Title Notifikasi</h5>
                                    </div>
                                    <div class="text-muted ml-4">
                                    Senin, 8 Februari 2021
                                    </div>
                                </div>
                                <div class="truncate-paragraph mb-md-0 mb-2">
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque deleniti eveniet pariatur ut, asperiores quas, optio nostrum amet error inventore esse, placeat ipsa architecto quam voluptatum consectetur odio? Tempore nesciunt adipisci beatae culpa, quam repellendus? Deleniti odit itaque, soluta officiis neque et nesciunt nisi beatae a dignissimos amet accusamus quis aperiam molestias earum quae nemo id qui consequatur hic harum laudantium vitae. Voluptatem, vel? Ducimus, nesciunt eaque at voluptatibus eos iusto. Facilis, odit sapiente vero iste autem qui dicta delectus quas maxime illum perferendis accusamus dignissimos at! Incidunt, eum nisi! Delectus magnam, vel dignissimos cumque praesentium voluptatem corporis ut nemo.
                                </div>
                                </div>
                                <div class="col-lg-3 col-md-12 text-center d-flex align-self-center">
                                <a class="btn btn-sm text-primary mx-auto" @click="showModalDetailInbox"><fa class="text-primary" :icon="['fas','eye']" /> Lihat</a>
                                <a class="btn btn-sm text-danger mx-auto" @click="showModalDeleteItem"><fa class="text-danger" :icon="['fas','trash']"/> Hapus</a>
                                </div>
                            </div>
                            
                            </div>
                        </div>
                        <div class="col-12">
                            <Pagination/>
                        </div>
                    </div>
                </div>
            </div>
            
            <ModalDetailInbox :show="isShowModalDetailInbox" :data="{...currentItem}" @close="closeModaldDetailInbox"/>
            
            <ModalDeleteItem :show="isShowModalDeleteItem" :data="{...currentItem}" @close="closeModaldDeleteItem"/>
            
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
                items : new Array(10),
                currentItem : {
                        "isActive": true,
                        "date": "Kamis,21 Desember 2020",
                        "name": {
                            "first": "Dickerson",
                            "last": "Macdonald"
                        }
                },
                isShowModalDetailInbox: false,
                isShowModalDeleteItem: false,
            }
        },
        
        mounted() {
            // Set the initial number of items
        },
        methods: {
            showModalDetailInbox() {
                this.isShowModalDetailInbox = true;
            },
            closeModaldDetailInbox() {
                this.isShowModalDetailInbox = false;
            },
            showModalDeleteItem() {
                this.isShowModalDeleteItem = true;
            },
            closeModaldDeleteItem() {
                this.isShowModalDeleteItem = false;
            },
        }
    }
</script>