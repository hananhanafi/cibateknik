<template>
    <Modal :show="show" reference="add_address" large centered>

        <div v-if="isSubmitStatus=='' || isSubmitStatus == submitStatus.pending">
            <div class="modal-header border-bottom-0">
                <h5 id="exampleModalLabel" class="modal-title">Tambah Alamat Pengiriman</h5>
                <button type="button" class="btn-close btn text-danger" data-bs-dismiss="modal" aria-label="Close"  @click="$emit('close')"><fa :icon="['fas','times']" /></button>
            </div>
            <div  class="modal-body">
                <BaseInput
                    id="label"
                    v-model="formData.label"
                    label="Label Alamat"
                    placeholder="Label Alamat"
                    :error="
                        isSubmitStatus == submitStatus.pending
                        ? !$v.formData.label.required 
                            ? 'Label alamat harus diisi'
                            : null
                        : null
                    "
                />
                
                <div class="row">
                    <div class="col-lg-6 col-sm-12">
                        <BaseInput
                            id="name"
                            v-model="formData.name"
                            label="Nama"
                            placeholder="Nama"
                            :error="
                                isSubmitStatus == submitStatus.pending
                                ? !$v.formData.name.required 
                                    ? 'Nama penerima harus diisi'
                                    : null
                                : null
                            "
                        />
                    </div>
                    <div class="col-lg-6 col-sm-12">
                        <BaseInput
                            id="phone"
                            v-model="formData.phone"
                            label="No Telepon"
                            placeholder="No Telepon"
                            :error="
                                isSubmitStatus == submitStatus.pending
                                ? !$v.formData.phone.required 
                                    ? 'Nomor telepon penerima harus diisi'
                                    : null
                                : null
                            "
                        />
                    </div>
                </div>
                
                <div>
                    <BaseSelect
                    v-model="formData.province"
                    label="Provinsi"
                    :options="options.province"
                    placeholder="Pilih Provinsi"
                    dense
                    :error="
                        isSubmitStatus == submitStatus.pending
                        ? !$v.formData.province.required 
                            ? 'Provinsi harus diisi'
                            : null
                        : null
                    "
                    @input="onProvinceSelected($event)"
                    />
                </div>

                <div class="row">
                    <div class="col-lg-8 col-sm-12">
                        <BaseSelect
                        v-model="formData.city"
                        label="Kota"
                        :disabled="!formData.province"
                        :options="selectedCityOptions"
                        placeholder="Pilih Kota"
                        dense
                        :error="
                            isSubmitStatus == submitStatus.pending
                            ? !$v.formData.city.required 
                                ? 'Kota harus diisi'
                                : null
                            : null
                        "
                        />
                    </div>
                    <div class="col-lg-4 col-sm-12">
                        <BaseInput
                            id="zipCode"
                            v-model="formData.zipCode"
                            :disabled="!formData.city"
                            label="Kode Pos"
                            placeholder="Kode Pos"
                            :error="
                                isSubmitStatus == submitStatus.pending
                                ? !$v.formData.zipCode.required 
                                    ? 'Kode pos harus diisi'
                                    : null
                                : null
                            "
                        />
                    </div>
                </div>

                
                <BaseTextarea
                    v-model="formData.address"
                    label="Alamat"
                    placeholder="Masukkan alamat"
                    height="200px"
                    :error="
                        isSubmitStatus == submitStatus.pending
                        ? !$v.formData.address.required 
                            ? 'Alamat harus diisi'
                            : null
                        : null
                    "
                />
            </div>
            <div class="modal-footer border-top-0 d-flex">
                <button type="button" class="btn text-dark flex-fill" data-bs-dismiss="modal" @click="$emit('close')">Batal</button>
                <button type="button" class="btn bg-main-color text-white flex-fill" @click.prevent="onSubmit">Simpan</button>
            </div>
        </div>

        <!-- loading -->
        <LoadingSpinner :show="isSubmitStatus==submitStatus.loading"/>

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
                label: null,
                name: null,
                phone: null,
                province: null,
                city: null,
                zipCode: null,
                address: null,
            },
            options: {
                city: [],
                province: [],
            },
            selectedCityOptions: [],
            isSubmitStatus: '',
            submitStatus: SUBMIT_STATUS

        }
    },
    validations: {
        formData :{
                label: { required },
                name: { required },
                phone: { required },
                province: { required },
                city: { required },
                zipCode: { required },
                address: { required },
        }
    },
    created() {
        this.loadOptions();
    },
    methods: {
        async loadOptions() {
            await ApiService.get('/rajaongkir/data/city-and-province')
            .then((response)=>{
                this.options.province = response.data.province.rajaongkir.results.map(function(prv){
                    return {
                        label: prv.province,
                        value: prv.province_id,
                    }
                });
                
                this.options.city = response.data.city.rajaongkir.results;
            })
            .catch(err=>{
                console.log("err",err);
            })
        },
        onProvinceSelected(value){
            this.formData.city = null;
            this.selectedCityOptions = this.options.city.filter(cty=>cty.province_id === value.value )
            .map(function(cty){
                    return {
                        label: cty.city_name,
                        value: cty.city_id,
                    }
                });
        },
        formatFormData(data) {
            const resultData = {
                label: data.label ? data.label : null,
                name: data.name ? data.name : null,
                phone: data.phone ? data.phone : null,
                province: data.province ? data.province : null,
                city: data.city ? data.city : null,
                zipCode: data.zipCode ? data.zipCode : null,
                address: data.address ? data.address : null,
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
                await ApiService.post("/user/address",formattedFormData)
                .then(data=>{
                    this.isSubmitStatus = SUBMIT_STATUS.success;
                    console.log("success",data);
                    this.$emit('update',data.data);
                    this.$toast.success('Berhasil menambahkan alamat.',{icon:'check'});
                    this.closeModal();
                })
                .catch(err=>{
                    this.isSubmitStatus = SUBMIT_STATUS.error;
                    console.log("error",err);
                    this.$toast.error('Terjadi error, gagal menambahkan alamat.',{icon:'error'});
                    this.closeModal();
                })
            }
        },
        closeModal(){
            // reset data
            this.formData = {
                label: null,
                name: null,
                phone: null,
                city: null,
                zipCode: null,
                address: null,
            };
            this.isSubmitStatus = '';
            this.$emit('close');
        }
    }
};
</script>
