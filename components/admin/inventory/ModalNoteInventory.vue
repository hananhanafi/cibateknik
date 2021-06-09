<template>
    <Modal :show="show" centered>
        <LoadingSpinner v-if="isSubmitStatus==submitStatuses.loading" :show="isSubmitStatus==submitStatuses.loading"/>
        <!-- success -->
        <div v-show="isSubmitStatus==submitStatuses.success" class="px-2">
            <div class="text-40 text-success">
                <fa :icon="['fas','check-circle']"/>
            </div>
            <div class="text-20">
                Berhasil mencatat barang.
            </div>
            
            <div class="modal-footer border-top-0 d-flex">
                <button type="button" class="btn btn-outline-danger flex-fill" data-bs-dismiss="modal" @click="close">Tutup</button>
            </div>
        </div>

        <!-- error -->
        <div v-show="isSubmitStatus==submitStatuses.error" class="px-2">
            <div class="text-40 text-danger">
                <fa :icon="['fas','times-circle']"/>
            </div>
            <div class="text-20">
                Gagal mencatat barang.
            </div>
            
            <div class="modal-footer border-top-0 d-flex">
                <button type="button" class="btn btn-outline-danger flex-fill" data-bs-dismiss="modal" @click="close">Tutup</button>
            </div>
        </div>
        <div v-if="isSubmitStatus=='' || isSubmitStatus == submitStatuses.pending">
            <div class="modal-header border-bottom-0">
                <h5 id="exampleModalLabel" class="modal-title">Catat Barang</h5>
                <button data-bs-dismiss="modal" class="btn-close btn text-danger" type="button" aria-label="Close" @click="close"><fa :icon="['fas','times']" /></button>
            </div>
            <div class="modal-body">
                <div class="w-100 text-left">
                    <div class="mb-3">
                        <h3>
                            {{ data && data.name }}
                        </h3>
                    </div>
                    <div class="mb-3">
                        <div>Tanggal</div>
                        <vue2-datepicker v-model="formData.selectedDate" class="w-100" placeholder="Pilih Bulan Tanggal"
                        :disabled-date="(date) => date > disabledAfter || date < disabledBefore"></vue2-datepicker>
                    </div>
                    <BaseInput
                        id="in"
                        v-model="formData.in"
                        label="Jumlah Barang Masuk"
                        placeholder="Jumlah Barang Masuk"
                        class="mr-2 flex-fill"
                        large
                        dense
                        type="number"
                    />

                    
                    <BaseInput
                        id="out"
                        v-model="formData.out"
                        label="Jumlah Barang Keluar"
                        placeholder="Jumlah Barang Keluar"
                        class="mr-2 flex-fill"
                        large
                        dense
                        type="number"
                    />
                            
                    <BaseTextarea
                        v-model="formData.description"
                        label="Catatan"
                        placeholder="Masukkan Catatan"
                        height="200px"
                    />
                </div>
                <div v-show="isSubmitStatus == submitStatuses.pending && !$v.formData.inAndOut.required " class="alert alert-danger">
                    Jumlah barang masuk atau barang keluar tidak boleh kosong
                </div>
                
            </div>
            <div class="modal-footer border-top-0 d-flex">
                <button type="button" class="btn btn-outline-danger flex-fill" data-bs-dismiss="modal" @click="close">Batal</button>
                <button type="button" class="btn btn-primary flex-fill" @click="onSubmit">Simpan</button>
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
            default: null,
        }
    },
    data() {
        return {
            formData: {
                in: 0,
                out: 0,
                description: "",
                selectedDate: new Date(),
            },
            disabledAfter: new Date(),
            disabledBefore: new Date(2020,12,1),
            isSubmitStatus: '',
            submitStatuses: SUBMIT_STATUS

        }
    },
    validations: {
        formData :{
            selectedDate: {required},
            inAndOut: {
                required() {
                    return (
                        (this.formData.in !== "" || this.formData.out !== "") && ( this.formData.in !== 0 || this.formData.out !== 0 )
                    );
                }
            }
        }
    },
    watch: {
        "formData.out"(){
            if(this.data){
                if(this.formData.out>this.data.stock){
                    this.formData.out = this.data.stock;
                this.$toast.error('Jumlah barang keluar tidak dapat melebihi stok.',{icon:'error'});
                }
                if(this.formData.out<1){
                    this.formData.out = 0;
                }
            }
        },
        "formData.in"(){
            if(this.data){
                if(this.formData.in<1){
                    this.formData.in = 0;
                }
            }
        }
    },
    methods: {
        close() {
            this.formData= {
                in: '',
                out: '',
                description: "",
                selectedDate: new Date(),
            }
            this.isSubmitStatus = '';
            this.$emit('close');
        },
        formatFormData(formData){
            const resultData = {
                date: formData.selectedDate.getDate(),
                month: formData.selectedDate.getMonth()+1,
                year: formData.selectedDate.getFullYear(),
                in: formData.in ? formData.in : 0,
                out: formData.out ? formData.out : 0,
                description: formData.description ? formData.description : '',
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
                await ApiService.post(`/product/${this.$route.params.produk_id}/item/${this.data.id}/stock/update`,formattedFormData)
                .then(data=>{
                    this.isSubmitStatus = SUBMIT_STATUS.success;
                    console.log("success",data);
                    // this.$router.push({name:'admin-inventory-detail-produk-produk_id-barang',params:{produk_id:this.$route.params.produk_id}})
                    this.$emit('update');
                    this.$toast.success('Berhasil mencatat stok barang.',{icon:'check'});
                })
                .catch(err=>{
                    this.isSubmitStatus = SUBMIT_STATUS.error;
                    console.log("error",err);
                    this.$toast.error('Terjadi error, gagal mencatat stok barang.',{icon:'error'});
                })
            }
        },
    }
};
</script>
