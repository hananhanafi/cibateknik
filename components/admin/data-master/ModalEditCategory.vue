<template>
    <Modal :show="show" centered>
        <div v-if="isSubmitStatus=='' || isSubmitStatus == submitStatus.pending">
            <div class="modal-header border-bottom-0">
                <h5 id="modalAddProduct" class="modal-title">Tambah Kategori</h5>
                <button data-bs-dismiss="modal" class="btn-close btn text-danger" type="button" aria-label="Close" @click="closeModal"><fa :icon="['fas','times']" /></button>
            </div>
            <div class="modal-body">
                <div class="w-100 text-left">
                    <BaseInput
                        id="name"
                        v-model="formData.name"
                        label="Nama Kategori"
                        placeholder="Nama Kategori"
                        large
                        dense
                        :error="
                            isSubmitStatus == submitStatus.pending
                            ? !$v.formData.name.required 
                                ? 'Nama Kategori harus diisi'
                                : null
                            : null
                        "
                    />
                </div>
            </div>
            <div class="modal-footer border-top-0 d-flex">
                <button type="button" class="btn btn-outline-danger flex-fill" data-bs-dismiss="modal" @click="closeModal">Batal</button>
                <a class="btn btn-primary flex-fill" @click.prevent="onSubmit">Simpan</a>
            </div>
        </div>

        <!-- loading -->
        <LoadingSpinner :show="isSubmitStatus==submitStatus.loading"/>

        <!-- success -->
        <div v-show="isSubmitStatus==submitStatus.success" class="px-2">
            <div class="text-40 text-success">
                <fa :icon="['fas','check-circle']"/>
            </div>
            <div class="text-20">
                Berhasil memperbarui data Kategori.
            </div>
            
            <div class="modal-footer border-top-0 d-flex">
                <button type="button" class="btn btn-outline-danger flex-fill" data-bs-dismiss="modal" @click="closeModal">Tutup</button>
            </div>
        </div>

        <!-- error -->
        <div v-show="isSubmitStatus==submitStatus.error" class="px-2">
            <div class="text-40 text-danger">
                <fa :icon="['fas','times-circle']"/>
            </div>
            <div class="text-20">
                Gagal memperbarui data Kategori.
            </div>
            
            <div class="modal-footer border-top-0 d-flex">
                <button type="button" class="btn btn-outline-danger flex-fill" data-bs-dismiss="modal" @click="closeModal">Tutup</button>
            </div>
        </div>

    </Modal>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { SUBMIT_STATUS } from '~/store/constants';
import ApiService from '~/common/api.service';
export default {
    mixins: [validationMixin],
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
                name :null,
            },
            isSubmitStatus: '',
            submitStatus: SUBMIT_STATUS

        }
    },
    validations: {
        formData :{
            name :{ required }
        }
    },
    watch: {
        show(){
            if(this.show && this.data){
                this.formData = this.data;
            }
        }
    },
    mounted() {
        console.log("SUBMIT_STATUS",this.submitStatus);
    },
    methods: {
        formatFormData(data) {
            const resultData = {
                name: data.name ? data.name : null,
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
                await ApiService.put(`/category/${this.data.categoryID}`,formattedFormData)
                .then(data=>{
                    this.isSubmitStatus = SUBMIT_STATUS.success;
                    console.log("success",data);
                    this.$emit('update');
                })
                .catch(err=>{
                    this.isSubmitStatus = SUBMIT_STATUS.error;
                    console.log("error",err);
                })
            }
        },
        closeModal(){
            // reset data
            this.formData.name = null;
            this.isSubmitStatus = '';
            this.$emit('close');
        }
    }
};
</script>
