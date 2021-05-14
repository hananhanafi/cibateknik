<template>
    <Modal :show="show" centered>

        <div class="modal-header border-bottom-0">
            <h5 id="exampleModalLabel" class="modal-title">Edit Status Pesanan</h5>
            <button data-bs-dismiss="modal" class="btn-close btn text-danger" type="button" aria-label="Close" @click="closeModal"><fa :icon="['fas','times']" /></button>
        </div>
        <div v-if="isSubmitStatus=='' || isSubmitStatus == submitStatus.pending">
            <div class="modal-body">
                <div class="w-100 text-left">
                    <div v-if="data && data.statusOrder=='PACKING'">
                        <div class="text-14 mb-2 border shadow-sm p-2">
                            <div class="text-danger">PENTING!!!</div>
                            Mengubah status pesanan menjadi <span class="text-primary">DIKIRIM</span>, pastikan barang sudah benar dikirim. <br> Silahkan masukkan nomor resi pengiriman di bawah ini! </div>
                        <BaseInput
                            id="receiptNumber"
                            v-model="formData.receiptNumber"
                            label="Nomor Resi"
                            placeholder="Nomor Resi"
                            large
                            dense
                            :error="
                                isSubmitStatus == submitStatus.pending
                                ? !$v.formData.receiptNumber.required 
                                    ? 'Nomor Resi harus diisi'
                                    : null
                                : null
                            "
                        />

                        <div class="alert alert-warning">
                            Pastikan nomor resi yang dimasukkan benar!
                        </div>
                        
                    </div>
                    <div v-else>
                        <div class="alert alert-warning">
                            Apakah Anda yakin ingin menyelesaikan pesanan ini ?
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer border-top-0 d-flex">
                <button type="button" class="btn btn-outline-danger flex-fill" data-bs-dismiss="modal" @click="closeModal">Batal</button>
                <button  v-if="data && data.statusOrder=='PACKING'" type="button" class="btn btn-primary flex-fill" @click="onSubmit">Simpan</button>
                <button v-else type="button" class="btn btn-primary flex-fill" @click="onSubmit">Iya</button>
            </div>
        </div>

        <!-- loading -->
        <LoadingSpinner :show="isSubmitStatus==submitStatus.loading"/>
        
    </Modal>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import ApiService from '~/common/api.service';
import { SUBMIT_STATUS } from '~/store/constants';
export default {
    mixins: [validationMixin],
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
                receiptNumber: null,
            }],
            isSubmitStatus: '',
            submitStatus: SUBMIT_STATUS

        }
    },
    
    validations() {

        const validate = {
            formData :{}
        }
        
        if(this.data && this.data.statusOrder === 'PACKING'){
            validate.formData.receiptNumber = { required };
        }
        
        return {
            ...validate
        }
    },
    mounted() {
    },
    methods: {
        formatFormData(data) {
            const resultData = {
                statusOrder: this.data.statusOrder === 'PACKING' ? 'SHIPPING' : 'DONE',
                receiptNumber: data.receiptNumber ? data.receiptNumber : '',
            }

            return resultData;
        },
        async onSubmit(){
            this.$v.$touch();
            if (this.$v.$invalid) {
                this.isSubmitStatus = SUBMIT_STATUS.pending;
            } else {
                this.isSubmitStatus = SUBMIT_STATUS.loading;
                const formattedFormData = this.formatFormData(this.formData);
                await ApiService.post(`admin/users-order/status/update/${this.data.id}`,formattedFormData)
                .then(data=>{
                    this.isSubmitStatus = SUBMIT_STATUS.success;
                    console.log("success",data);
                    this.$toast.success('Berhasil mengubah status pesanan.',{icon:'check'});

                    const newOrder = {
                        ...this.data,
                        ...formattedFormData
                    }
                    this.$emit('update',newOrder);
                    this.closeModal();
                })
                .catch(err=>{
                    this.isSubmitStatus = SUBMIT_STATUS.error;
                    console.log("error",err);
                    this.$toast.error('Terjadi error, gagal mengubah status pesanan.',{icon:'error'});
                    this.closeModal();
                })
            }
        },
        closeModal(){
            // reset data
            this.formData.receiptNumber = null;
            this.formData.statusOrder = null;
            this.isSubmitStatus = '';
            this.$emit('close');
        }
    }
};
</script>
