<template>
    <Modal :show="show" large centered>

        <div v-if="data.hasOwnProperty('title')" class="modal-header border-bottom-0">
            <h5 id="exampleModalLabel" class="modal-title">{{ data.title }}</h5>
            <button type="button" class="btn-close btn text-danger" data-bs-dismiss="modal" aria-label="Close"  @click="$emit('close')"><fa :icon="['fas','times']" /></button>
        </div>
        <div class="modal-body">
            {{ data.message }}
            <div class="float-right">
                <a class="btn text-primary" ><fa :icon="['fas','plus']" /> Tambah Alamat</a>
            </div>
            
            <BaseSelect
            v-model="formData.education"
            label="Label Alamat"
            :options="['Rumah', 'Apartemen']"
            placeholder="Pilih Label Alamat"
            dense/>
        </div>
        <div class="modal-footer border-top-0 d-flex">
            <button type="button" class="btn text-dark flex-fill" data-bs-dismiss="modal" @click="$emit('close')">Batal</button>
            <button type="button" class="btn bg-main-color text-white flex-fill">Simpan</button>
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
            
            formData: {
                label: null,
            }
        }
    },
};
</script>
