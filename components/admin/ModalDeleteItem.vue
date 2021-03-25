<template>
    <Modal :show="show" centered @clickOutside="clickOutside">
    
        <div class="modal-body">
            <div class="w-100 text-left">
                <div class="row">
                    <div class="col-12">
                        <div class="text-center">
                            <div class="text-40 text-warning">
                                <fa :icon="['fas','exclamation-circle']"/>
                            </div>
                            <h6>
                                Yakin ingin menghapus ?
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer border-top-0 d-flex">
            <button type="button" class="btn btn-sm btn-outline-primary flex-fill" data-bs-dismiss="modal" @click="$emit('close');">Batal</button>
            <button type="button" class="btn btn-sm btn-danger flex-fill" data-bs-dismiss="modal" @click="clickOutside">Iya</button>
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
        }
    },
    mounted() {
    },
    methods: {
        clickOutside() {
            this.$emit('close');
        }
    }
};
</script>
