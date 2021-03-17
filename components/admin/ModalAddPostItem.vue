<template>
    <Modal extralarge :show="show" centered>

        <div class="modal-header border-bottom-0">
            <h5 id="exampleModalLabel" class="modal-title">{{ data.title || '' }}</h5>
            <button data-bs-dismiss="modal" class="btn-close btn text-danger" type="button" aria-label="Close" @click="$emit('close')"><fa :icon="['fas','times']" /></button>
        </div>
        <div class="modal-body">
            <div class="w-100 text-left">
                    
                <BaseSelect
                    v-model="formData.product"
                    label="Nama Produk"
                    :options="['Produk 1', 'Produk 2']"
                    placeholder="Pilih Produk"
                    dense
                />
                <BaseSelect
                    v-show="formData.product"
                    v-model="formData.item"
                    label="Nama Barang"
                    :options="['Barang 1', 'Barang 2']"
                    placeholder="Pilih Barang"
                    dense
                />


                
            <div v-show="formData.product && formData.item" class="row mb-3">
                <div class="col-lg-4 col-md-12">
                    <img src="~/assets/img/item.png" class="card-img-top" alt="item">
                    
                    <div class="row mt-3">
                        <div class="col-xl-2 col-lg-3 col-sm-2 col-3 mb-2">
                            <img src="~/assets/img/item.png" class="card-img-top" alt="item">
                        </div>
                        <div class="col-xl-2 col-lg-3 col-sm-2 col-3 mb-2">
                            <img src="~/assets/img/item.png" class="card-img-top" alt="item">
                        </div>
                        <div class="col-xl-2 col-lg-3 col-sm-2 col-3 mb-2">
                            <img src="~/assets/img/item.png" class="card-img-top" alt="item">
                        </div>
                        <div class="col-xl-2 col-lg-3 col-sm-2 col-3 mb-2">
                            <img src="~/assets/img/item.png" class="card-img-top" alt="item">
                        </div>
                        <div class="col-xl-2 col-lg-3 col-sm-2 col-3 mb-2">
                            <img src="~/assets/img/item.png" class="card-img-top" alt="item">
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="">
                        <div class="mb-3">
                            <h2>Ini Judul ItemCard</h2>
                            <h3>
                                Rp 100.000
                            </h3>
                        </div>
                        
                        <BaseTextarea
                            v-model="data.description"
                            label="Deskripsi"
                            placeholder="Masukkan Deskripsi"
                            height="200px"
                        />
                    </div>
                    
                    <div class="mb-3 ">
                        <div class="">
                            <div class="text-muted mb-2">
                                Stock : 100
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            </div>
            
            
        </div>
        <div class="modal-footer border-top-0 d-flex">
            <button type="button" class="btn btn-outline-danger flex-fill" data-bs-dismiss="modal" @click="$emit('close')">Batal</button>
            <button type="button" class="btn btn-primary flex-fill" @click="$emit('delete')">Simpan</button>
        </div>

    </Modal>
</template>

<script>
export default {
    props: {
        show: Boolean,
        data: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            additionalInformations: [{
                name: null,
            }],
            formData: {
                product: null,
                item: null,
                description: null,
            }

        }
    },
    mounted() {
    },
    methods: {
        addInfo(){
            // this.additionalInformations = this.additionalInformations+1;
            this.additionalInformations.push({name:null})
        },
        minInfo(index){
            if(this.additionalInformations.length>1){
                // this.additionalInformations = this.additionalInformations-1;
                this.additionalInformations.splice(index,1);
            }
        },
    }
};
</script>
