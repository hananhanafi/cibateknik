<template>
    <Modal :show="show" centered @clickOutside="clickOutside">
        <div v-if="isSubmitStatus=='' || isSubmitStatus == submitStatus.pending">
            <div class="modal-body">
                <div class="w-100 text-left">
                    <div class="row">
                        <div class="col-12">
                            <div class="text-center">
                                <div class="text-40 text-warning">
                                    <fa :icon="['fas','exclamation-circle']"/>
                                </div>
                                <h6>
                                    Yakin ingin menghapus barang ?
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer border-top-0 d-flex">
                <button type="button" class="btn btn-sm btn-outline-primary flex-fill" data-bs-dismiss="modal" @click="$emit('close');">Batal</button>
                <button type="button" class="btn btn-sm btn-danger flex-fill" data-bs-dismiss="modal" @click="onSubmit">Iya</button>
            </div>
        </div>
        
        
        <!-- loading -->
        <LoadingSpinner :show="isSubmitStatus==submitStatus.loading"/>

        <!-- success -->
        <div v-show="isSubmitStatus==submitStatus.success" class="px-2 text-center">
            <div class="text-40 text-success">
                <fa :icon="['fas','check-circle']"/>
            </div>
            <div class="text-20">
                Berhasil menghapus data barang.
            </div>
            
            <div class="modal-footer border-top-0 d-flex">
                <button type="button" class="btn btn-outline-danger flex-fill" data-bs-dismiss="modal" @click="closeModal()">Tutup</button>
            </div>
        </div>

        <!-- error -->
        <div v-show="isSubmitStatus==submitStatus.error" class="px-2 text-center">
            <div class="text-40 text-danger">
                <fa :icon="['fas','times-circle']"/>
            </div>
            <div class="text-20">
                Gagal menghapus data barang.
            </div>
            
            <div class="modal-footer border-top-0 d-flex">
                <button type="button" class="btn btn-outline-danger flex-fill" data-bs-dismiss="modal" @click="closeModal()">Tutup</button>
            </div>
        </div>
    </Modal>
</template>

<script>
import { SUBMIT_STATUS } from '../../../store/constants';
import ApiService from '~/common/api.service';
export default {
    props: {
        show: Boolean,
        data: {
            type: Array,
            default: null
        }
    },
    data() {
        return {
            isSubmitStatus: '',
            submitStatus: SUBMIT_STATUS
        }
    },
    methods: {
        clickOutside() {
            this.$emit('close');
        },
        async onSubmit(){
            this.isSubmitStatus = SUBMIT_STATUS.loading;
            await ApiService.post(`/delete/item-posted-recommendation`,{items_id:this.data})
            .then(()=>{
                this.isSubmitStatus = SUBMIT_STATUS.success;
                this.$emit('update');
                this.$toast.success('Berhasil menghapus data barang dari dalam katalog barang direkomendasi.',{icon:'check'});
            })
            .catch(()=>{
                this.isSubmitStatus = SUBMIT_STATUS.error;
                this.$toast.error('Terjadi error, gagal menghapus data barang dari dalam katalog barang direkomendasi.',{icon:'error'});
            })
        },
        
        closeModal(){
            // reset data
            this.isSubmitStatus = '';
            this.$emit('close');
        }
    }
};
</script>
