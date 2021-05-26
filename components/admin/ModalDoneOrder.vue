<template>
    <Modal :show="show" centered>

        <div class="modal-header border-bottom-0">
            <h5 id="exampleModalLabel" class="modal-title">Edit Status Pesanan</h5>
            <button data-bs-dismiss="modal" class="btn-close btn text-danger" type="button" aria-label="Close" @click="closeModal"><fa :icon="['fas','times']" /></button>
        </div>
        <div v-if="isSubmitStatus=='' || isSubmitStatus == submitStatus.pending">
            <div class="modal-body">
                <div class="w-100 text-left">
                    <div>
                        <div class="alert alert-warning">
                            Apakah Anda yakin ingin menyelesaikan pesanan ini ?
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer border-top-0 d-flex">
                <button type="button" class="btn btn-outline-danger flex-fill" @click="closeModal">Batal</button>
                <button type="button" class="btn btn-primary flex-fill" @click="onSubmit">Iya</button>
            </div>
        </div>

        <!-- loading -->
        <LoadingSpinner :show="isSubmitStatus==submitStatus.loading"/>
        
    </Modal>
</template>

<script>
import ApiService from '~/common/api.service';
import { SUBMIT_STATUS } from '~/store/constants';
export default {
    props: {
        show: Boolean,
        data: {
            type: Object,
            default: null
        },
    },
    data() {
        return {
            formData: [{
                statusOrder: null,
            }],
            isSubmitStatus: '',
            submitStatus: SUBMIT_STATUS

        }
    },
    
    mounted() {
    },
    methods: {
        formatFormData() {
            const resultData = {
                statusOrder: 'DONE',
            }

            return resultData;
        },
        async onSubmit(){
            this.isSubmitStatus = SUBMIT_STATUS.loading;
            const formattedFormData = this.formatFormData(this.formData);
            await ApiService.post(`/user/order/status/done/${this.data.id}`,formattedFormData)
            .then(data=>{
                this.isSubmitStatus = SUBMIT_STATUS.success;
                console.log("success",data);
                this.$toast.success('Berhasil menyelesaikan pesanan.',{icon:'check'});

                this.$emit('update',data.data.data);
            })
            .catch(err=>{
                this.isSubmitStatus = SUBMIT_STATUS.error;
                console.log("error",err);
                this.$toast.error('Terjadi error, gagal menyelesaikan pesanan.',{icon:'error'});
                this.closeModal();
            })
        },
        closeModal(){
            // reset data
            this.formData.statusOrder = null;
            this.isSubmitStatus = '';
            this.$emit('close');
        },
        closeAllModal(){
            // reset data
            this.formData.statusOrder = null;
            this.isSubmitStatus = '';
            this.$emit('close-all',this.data);
        }
    }
};
</script>
