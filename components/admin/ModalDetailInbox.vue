<template>
    <Modal :show="show" centered @clickOutside="clickOutside">

        <div class="modal-header border-bottom-0">
            <h5 id="exampleModalLabel" class="modal-title">{{ data.title || 'Detail Pesan' }}</h5>
            <button data-bs-dismiss="modal" class="btn-close btn text-danger" type="button" aria-label="Close" @click="$emit('close')"><fa :icon="['fas','times']" /></button>
        </div>
        <div class="modal-body">
            <div class="w-100 text-left">
                <div class="row">
                    <div class="col">
                        <h4>Title</h4>
                        <div>Dari : Sistem</div>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea, molestiae.</p>

                    </div>
                </div>
            </div>
            
        </div>
        <div class="modal-footer border-top-0 d-flex">
            <button type="button" class="btn btn-outline-danger flex-fill" data-bs-dismiss="modal" @click="$emit('close')">Tutup</button>
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
