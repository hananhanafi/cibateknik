<template>
    <Modal :show="show" centered>
        <div v-if="isSubmitStatus=='' || isSubmitStatus == submitStatus.pending">
            <div class="modal-header border-bottom-0">
                <h5 id="modalAddProduct" class="modal-title">Edit Produk</h5>
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
                    name="category"
                    class="select-category"
                    :options="options.category"
                    label="Kategori"
                    placeholder="Pilih Kategori"
                    dense
                    />
                    <BaseSelect
                    v-model="formData.brand"
                    name="category"
                    class="select-category"
                    :options="options.brand"
                    label="Merek"
                    placeholder="Pilih Merek"
                    dense
                    />

                    <BaseSelect
                    v-model="formData.supplier"
                    name="supplier"
                    class="select-supplier"
                    :options="options.supplier"
                    label="Supplier"
                    placeholder="Pilih Supplier"
                    dense
                    />

                    <label>Informasi Tambahan</label>
                    <div v-for="(info,i) in formData.additionalData" :key="i" class="d-flex">
                        <BaseInput
                            v-model="formData.additionalData[i]"
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
                Berhasil Memperbarui data produk.
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
                Gagal Memperbarui data produk.
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

const emptyData ={
                name :null,
                category :null,
                additionalData: [],
            };

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
                brand: null,
                supplier: null,
                additionalData: [],
            },
            isSubmitStatus: '',
            submitStatus: SUBMIT_STATUS,

            deletedAddditionalData: null,
            newAdditionalData: null,

        }
    },
    validations: {
        formData :{
            name :{ required },
        }
    },
    watch: {
        data(){
            if(!this.data){
                this.formData = emptyData;
            }else{
                this.formData = Object.assign({},this.data);
                if(this.data.additionalData.length<1){
                    this.formData.additionalData.push('');
                }
                if(this.data.category){
                    this.formData.category = {
                        label: this.data.category.name,
                        value: this.data.category.id,
                    }
                }
                if(this.data.brand){
                    this.formData.brand = {
                        label: this.data.brand.name,
                        value: this.data.brand.id,
                    }
                }
                if(this.data.supplier){
                    this.formData.supplier = {
                        label: this.data.supplier.name,
                        value: this.data.supplier.id,
                    }
                }
            }
        }
    },
    mounted() {
    },
    methods: {
        addInfo(){
            this.formData.additionalData.push('');
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
                .filter(item=>item!=='')
                .map(function(item){
                    return item;
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
                await ApiService.put(`/product/${this.data.productID}`,formattedFormData)
                .then(data=>{
                    this.isSubmitStatus = SUBMIT_STATUS.success;
                    console.log("success",data);
                    this.$emit('update');
                    this.$toast.success('Berhasil memperbarui data produk.',{icon:'check'});
                })
                .catch(err=>{
                    this.isSubmitStatus = SUBMIT_STATUS.error;
                    console.log("error",err);
                    this.$toast.error('Terjadi error, gagal memperbarui data barang.',{icon:'error'});
                })
            }
        },
        closeModal(){
            // reset data
            this.isSubmitStatus = '';
            this.$emit('close');
        }
    }
};
</script>
