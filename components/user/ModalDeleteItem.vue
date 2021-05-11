<template>
    <Modal :show="show" centered>

        <div v-if="data.hasOwnProperty('title')" class="modal-header border-bottom-0">
            <h5 id="exampleModalLabel" class="modal-title">{{ data.title }}</h5>
            <button type="button" class="btn-close btn text-danger" data-bs-dismiss="modal" aria-label="Close">x</button>
        </div>
        <div class="modal-body">
            {{ data.message || 'Yakin ingin menghapus?' }}
            
            
        </div>
        <div class="modal-footer border-top-0 d-flex">
            <button type="button" class="btn text-dark flex-fill" data-bs-dismiss="modal" @click="$emit('close')">Batal</button>
            <button type="button" class="btn btn-danger flex-fill" @click="$emit('delete')">Hapus</button>
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
    }
};
</script>
