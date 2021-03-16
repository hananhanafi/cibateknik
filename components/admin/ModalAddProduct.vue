<template>
    <Modal :show="show" centered>

        <div class="modal-header border-bottom-0">
            <h5 id="exampleModalLabel" class="modal-title">{{ data.title || '' }}</h5>
            <button data-bs-dismiss="modal" class="btn-close btn text-danger" type="button" aria-label="Close" @click="$emit('close')"><fa :icon="['fas','times']" /></button>
        </div>
        <div class="modal-body">
            <div class="w-100 text-left">
                <BaseInput
                    id="name"
                    label="Nama Produk"
                    placeholder="Nama Produk"
                    large
                    dense
                />

                <label>Informasi Tambahan</label>
                <div v-for="(info,i) in infoCount" :key="i" class="d-flex">
                    <BaseInput
                        id="name"
                        placeholder="Informasi tambahan"
                        class="mr-2 flex-fill"
                        large
                        dense
                    />
                    <div class="mr-2">
                        <button type="button"  class="btn btn-primary" @click="addInfo()"><fa :icon="['fas','plus']" /></button>
                    </div>
                    <div>
                        <button type="button" class="btn btn-danger" @click="minInfo()"><fa :icon="['fas','minus']" /></button>
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
            infoCount: 1,

        }
    },
    mounted() {
    },
    methods: {
        addInfo(){
            this.infoCount = this.infoCount+1;
        },
        minInfo(){
            if(this.infoCount>1){
                this.infoCount = this.infoCount-1;
            }
        },
    }
};
</script>
