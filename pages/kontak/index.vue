<template>
    <div class="pt-md-5">
        <div class="container px-0">
            <div class="bg-white p-4 mt-md-5 shadow">
                <h2>Kontak</h2>

                <div class="row">
                    <div class="col-12">
                        <h4 class="mt-5">Hubungi Kami :</h4>
                        <div class="row">
                            <div class="col-lg-4 col-md-12">
                                <button type="button" class="btn btn-success w-100 mb-4"><fa :icon="['fab','whatsapp']" />  Whatsapp</button>
                            </div>
                            <div class="col-lg-4 col-md-12">
                                <button type="button" class="btn btn-primary w-100 mb-4"><fa :icon="['fab','facebook']" /> Facebook</button>
                            </div>
                            <div class="col-lg-4 col-md-12">
                                <button type="button" class="btn btn-danger w-100 mb-4"><fa :icon="['fab','instagram']" /> Instagram</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 text-center">
                        <h4>Atau</h4>
                    </div>
                    <div class="col-12">
                        <div class="card shadow-1 p-lg-5 p-3">
                            <h4 class="mb-5">
                                Ingin mengirim pesan ?
                            </h4>
                            <div class="">
                                <BaseInput
                                    id="name"
                                    v-model="formData.name"
                                    label="Nama"
                                    placeholder="Masukkan Nama Anda"
                                    class="flex-fill mr-2"
                                />
                                <BaseInput
                                    id="email"
                                    v-model="formData.email"
                                    type="email"
                                    label="Email"
                                    placeholder="Masukkan Email Anda"
                                    class="flex-fill mr-2"
                                />
                                <BaseInput
                                    id="title"
                                    v-model="formData.title"
                                    label="Judul"
                                    placeholder="Masukkan Judul Pesan"
                                    :error="
                                        isSubmitStatus == submitStatus.pending
                                        ? !$v.formData.title.required
                                        ? 'Judul harus diisi'
                                        : null
                                        : null
                                    "
                                    class="flex-fill mr-2"
                                />
                    
                                <BaseTextarea
                                    v-model="formData.body"
                                    label="Pesan"
                                    placeholder="Masukkan Pesan"
                                    height="200px"
                                    :error="
                                        isSubmitStatus == submitStatus.pending
                                        ? !$v.formData.body.required 
                                            ? 'Pesan harus diisi'
                                            : null
                                        : null
                                    "
                                />
                                
                                <LoadingSpinner v-if="isSubmitStatus == submitStatus.loading" :show="isSubmitStatus == submitStatus.loading"/>
                                <button v-else type="button" class="btn btn-light border w-100" @click.prevent="onSubmit">Kirim</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import ApiService from '~/common/api.service';
import { SUBMIT_STATUS } from '~/store/constants';
    export default {
    mixins: [validationMixin],
        // page properties go here
        layout: "user",
        data() {
            return {
                formData: {
                    name: null,
                    email: null,
                    title: null,
                    body: null
                },
            isSubmitStatus: '',
            submitStatus: SUBMIT_STATUS
            }
        },
        validations: {
            formData :{
                title :{ required },
                body :{ required },
            }
        },
        methods: {
            
            formatFormData(data) {
                const resultData = {
                    name: data.name ? data.name : '',
                    email: data.email ? data.email : '',
                    title: data.title ? data.title : null,
                    body: data.body ? data.body : null,
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
                    await ApiService.post("/user/admin-notification/send",formattedFormData)
                    .then(data=>{
                        this.isSubmitStatus = SUBMIT_STATUS.success;
                        console.log("success",data);
                        this.$toast.success('Berhasil mengirim pesan.',{icon:'check'});
                    })
                    .catch(err=>{
                        this.isSubmitStatus = SUBMIT_STATUS.error;
                        console.log("error",err);
                        this.$toast.error('Terjadi error, gagal mengirim pesan.',{icon:'error'});
                    })
                }
            },
        },
        head() {
            return {
                title: "Cibateknik - Kontak",
                meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                {
                    hid: 'description',
                    name: 'description',
                    content: 'My custom description'
                }
                ],
                
                // link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
            }
        }
    }
</script>
