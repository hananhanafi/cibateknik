<template>
    <Modal :show="show" centered>
        <div v-if="isSubmitStatus=='' || isSubmitStatus == submitStatus.pending">
            <div class="modal-header border-bottom-0">
                <h5 id="modalAddProduct" class="modal-title">{{ data.title || 'Tambah Produk' }}</h5>
                <button data-bs-dismiss="modal" class="btn-close btn text-danger" type="button" aria-label="Close" @click="closeModal"><fa :icon="['fas','times']" /></button>
            </div>
            <div class="modal-body">
                <div class="w-100 text-left">
                    <BaseInput
                        v-model="formData.name"
                        label="Nama Produk"
                        placeholder="Nama Produk"
                        large
                        dense
                        :error="
                            isSubmitStatus == submitStatus.pending
                            ? !$v.formData.name.required 
                                ? 'Nama produk harus diisi'
                                : null
                            : null
                        "
                    />
                    <BaseSelect
                    v-model="formData.category"
                    :options="options.category"
                    label="Kategori"
                    placeholder="Pilih Kategori"
                    dense
                    />
                    
                    <BaseSelect
                    v-model="formData.brand"
                    :options="options.brand"
                    label="Brand/Merk"
                    placeholder="Pilih Brand/Merk"
                    dense
                    />

                    <BaseSelect
                    v-model="formData.supplier"
                    :options="options.supplier"
                    label="Supplier"
                    placeholder="Pilih Supplier"
                    dense
                    />

                    <label>Informasi Tambahan</label>
                    <div v-for="(info,i) in formData.additionalData" :key="i" class="d-flex">
                        <BaseInput
                            v-model="info.name"
                            placeholder="Informasi tambahan"
                            class="mr-2 flex-fill"
                            large
                            dense
                        />
                        <div class="mr-2">
                            <button type="button"  class="btn btn-primary" @click="addInfo()"><fa :icon="['fas','plus']" /></button>
                        </div>
                        <div>
                            <button type="button" class="btn btn-danger" @click="minInfo(i)"><fa :icon="['fas','minus']" /></button>
                        </div>
                    </div>
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
                Berhasil menambahkan data produk.
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
                Gagal menambahkan data produk.
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
import { SUBMIT_STATUS } from '../../store/constants';
import ApiService from '~/common/api.service';
export default {
    mixins: [validationMixin],
    props: {
        show: Boolean,
        data: {
            type: Object,
            default: null
        },
        options: {
            type: Object,
            default() {
                return {
                    category: [],
                    brand: [],
                    supplier: []
                }
            }
        }
    },
    data() {
        return {
            formData: {
                name :null,
                category: null,
                additionalData: [{
                    name: null,
                }],
            },
            isSubmitStatus: '',
            submitStatus: SUBMIT_STATUS

        }
    },
    validations: {
        formData :{
            name :{ required },
        }
    },
    methods: {
        addInfo(){
            this.formData.additionalData.push({name:null})
        },
        minInfo(index){
            if(this.formData.additionalData.length>1){
                this.formData.additionalData.splice(index,1);
            }
        },
        formatFormData(data) {
            const resultData = {
                name: data.name ? data.name : null,
                category: data.category ? {id:data.category.value,name:data.category.label} : null,
                brand: data.brand ? {id:data.brand.value,name:data.brand.label} : null,
                supplier: data.supplier ? {id:data.supplier.value,name:data.supplier.label} : null,
                additionalData: data.additionalData
                .filter(item=>item.name!=null)
                .map(function(item){
                    return item.name;
                })
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
                await ApiService.post("/product",formattedFormData)
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
            this.formData.category = null;
            this.formData.additionalData = [
                {name:null}
            ];
            this.isSubmitStatus = '';
            this.$emit('close');
        }
    }
};
</script>
