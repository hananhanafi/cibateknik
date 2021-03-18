<template>
    <Modal :show="show" centered>

        <div class="modal-header border-bottom-0">
            <h5 id="exampleModalLabel" class="modal-title">{{ data.title || 'Edit Status Order' }}</h5>
            <button data-bs-dismiss="modal" class="btn-close btn text-danger" type="button" aria-label="Close" @click="$emit('close')"><fa :icon="['fas','times']" /></button>
        </div>
        <div class="modal-body">
            <div class="w-100 text-left">
                <BaseSelect
                    v-model="formData.category"
                    label="Kategori"
                    :options="['Keluar', 'Masuk']"
                    placeholder="Pilih Kategori"
                    dense
                />
                <BaseInput
                    v-show="formData.category"
                    id="ammount"
                    v-model="formData.ammount"
                    label="Jumlah Barang"
                    placeholder="Jumlah Barang"
                    class="mr-2 flex-fill"
                    large
                    dense
                />
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
            formData: [{
                category: null,
                ammount: null,
            }],

        }
    },
    mounted() {
    },
    methods: {
    }
};
</script>
