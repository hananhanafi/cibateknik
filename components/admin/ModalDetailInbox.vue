<template>
    <Modal :show="show" centered @clickOutside="clickOutside">

        <div class="modal-header border-bottom-0">
            <h5 id="exampleModalLabel" class="modal-title">Detail Pesan</h5>
            <button data-bs-dismiss="modal" class="btn-close btn text-danger" type="button" aria-label="Close" @click="$emit('close')"><fa :icon="['fas','times']" /></button>
        </div>
        <div class="modal-body">
            <div class="w-100 text-left">
                <div class="row">
                    <div class="col">
                        <div class="d-flex">
                            <h4>{{ data.title }}</h4>
                            
                            <div class="flex-fill text-muted ml-4 text-right">
                                {{ formatDateTime(data.createdAt._seconds) }}
                            </div>
                        </div>
                        <div>Dari : {{ data.data && data.data.name || data.notification_type === 'message' ? 'Anonim' : 'Sistem'}}</div>
                        <p>{{ data.description }}</p>

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
import { formatDateTime } from '~/store/helpers';
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
        },
        // helpers
        formatDateTime
    }
};
</script>
