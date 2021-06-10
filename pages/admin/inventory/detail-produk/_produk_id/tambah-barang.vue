<template>
    <div class="text-center">
        <div class="container">
            <Breadcrumb :data="breadCrumbList"/>
            <div class="bg-white shadow-sm rounded-8 p-3 text-left ">
                <div class="mb-3 p-2">
                    <h1>Tambah Barang</h1>
                </div>
                <div v-if="isFormDataReady" class="form-group">
                    <div class="mb-3">
                        <label>Nama Produk</label>
                        <b-form-input disabled class=" mb-2" placeholder="Masukkan nama produk" :value="product.data.name"></b-form-input>
                    </div>
                    <div class="mb-3">
                        <BaseInput
                            id="name"
                            v-model="formData.name"
                            label="Nama Barang"
                            placeholder="Masukkan nama barang"
                            large
                            :error="
                                isSubmitStatus == submitStatuses.pending
                                ? !$v.formData.name.required 
                                    ? 'Nama barang harus diisi'
                                    : null
                                : null
                            "
                        />
                    </div>
                    <div class="mb-3">
                        <h6>Informasi Barang</h6>
                        <div class="row">
                            <div v-if="formData.additionalData" class="col">
                                <!-- eslint-disable-next-line vue/no-template-shadow -->
                                <div v-for="(additional,i) in formData.additionalData" :key="i" class="d-md-flex d-block">
                                    <div class="mr-2 col-md-2 col-12">
                                        {{i}}
                                    </div>
                                    <div class="flex-fill">
                                        <BaseInput
                                            v-model="formData.additionalData[i]"
                                            placeholder="Masukkan keterangan informasi barang"
                                            large
                                            :error="
                                                isSubmitStatus == submitStatuses.pending
                                                ? !$v.formData.additionalData[i].required 
                                                    ? `${i} harus diisi`
                                                    : null
                                                : null
                                            "
                                        />
                                    </div>
                                </div>
                            </div>
                            <div v-else class="col">
                                <div class="ml-3">
                                    Tidak ada informasi tambahan
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <BaseInput
                            id="stock"
                            v-model="formData.stock"
                            label="Stock Barang"
                            placeholder="Masukkan stock barang"
                            large
                            :error="
                                isSubmitStatus == submitStatuses.pending
                                ? !$v.formData.stock.required 
                                    ? 'Stock harus diisi'
                                    : null
                                : null
                            "
                        />
                    </div>
                    <div class="mb-3">
                        <BaseInput
                            id="minimumStock"
                            v-model="formData.minimumStock"
                            label="Minimum Stock Barang"
                            placeholder="Masukkan minimum stock barang"
                            large
                            :error="
                                isSubmitStatus == submitStatuses.pending
                                ? !$v.formData.minimumStock.required 
                                    ? 'Minimum Stock harus diisi'
                                    : null
                                : null
                            "
                        />
                    </div>
                    <div class="mb-3">
                        <BaseInput
                            id="price"
                            v-model="formData.price"
                            label="Harga"
                            placeholder="Masukkan harga"
                            large
                            :error="
                                isSubmitStatus == submitStatuses.pending
                                ? !$v.formData.minimumStock.required 
                                    ? 'Minimum Stock harus diisi'
                                    : null
                                : null
                            "
                        />
                    </div>
                    <div class="mb-3">
                        <BaseTextarea
                            v-model="formData.note"
                            label="Catatan"
                            placeholder="Masukkan Catatan"
                            height="200px"
                        />
                    </div>
                    <div class="mb-3">
                        <h6>Foto Barang</h6>
                        
                        <div class="row">
                            <div v-for="(photo,i) in images" :key="i" class="col-md-2 col-12 position-relative mb-2 mr-2">
                                <div class="btn btn-danger position-absolute"
                                    style=" right:12px;
                                            top: 12px;"
                                    @click="deletePhoto(i)"
                                >
                                    <fa class="" :icon="['fas','times']" /> 
                                </div>
                                <img :src="photo.objectURL" alt="photo-placeholder" class="card-img-top h-100" >
                            </div>
                        </div>
                        <label v-cloak class="c-pointer" @drop.prevent="addFile" @dragover.prevent>
                            <FileInput
                            :max-size="5000000"
                            @inputFiles="addPhoto"
                            @error="errorsPhoto = $event"
                            />
                            <div class="btn btn-outline-dark btn-sm d-flex justify-content-center align-items-center w-100 h-100 p-3">
                                <div>
                                    <fa class="text-40" :icon="['fas','cloud-upload-alt']"/>
                                    <div>
                                        Drag & Drop Photo
                                    </div>
                                    <div>
                                        or
                                    </div>
                                    <div>
                                        <a class="btn btn-dark btn-sm">Upload Photo</a>
                                    </div>
                                </div>
                            </div>
                        </label>
                    </div>


                    <div v-if="isSubmitStatus==submitStatuses.error" class="alert alert-danger">
                        {{errorMessage || 'error'}}
                    </div>
                    
                    <div class="w-100 text-right">
                        <ButtonLoading v-if="isSubmitStatus==submitStatuses.loading"/>
                        <div v-else class="text-right">
                            <b-button id="show-btn"  size="xl"  class=" ml-auto" variant="outline-dark" @click="$router.push({name:'admin-inventory-detail-produk-produk_id-barang',params:{produk_id:$route.params.produk_id}})" >Batal</b-button>
                            <b-button id="show-btn"  size="xl"  class=" text-white ml-auto" variant="primary" @click.prevent="onSubmit">Simpan</b-button>
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
import { SUBMIT_STATUS } from '~/store/constants';
import ApiService from '~/common/api.service';
    export default {
        mixins: [validationMixin],
        // page properties go hereexport default {
        async asyncData ({ params }) {
            const product = await ApiService.get(`/product/${params.produk_id}`);
            // return { id: params.produk_id }
            return {product};
        },
        // page properties go here
        layout: "admin",
        middleware: 'adminAuthenticated',
        data() {
            return {
                breadCrumbList: [
                    {name:"Inventory",link:"/admin/inventory"},
                    {name:"Inventaris Produk",link:"/admin/inventory"},
                    {name:"Tambah Barang",link:""},
                ],
                errorsPhoto: null,
                images: [],
                formData: this.initFormData,
                isFormDataReady: false,
                isSubmitStatus: '',
                submitStatuses: SUBMIT_STATUS,
                errorMessage: null,

            }
        },
        validations() {

            const validate = {
                formData :{
                    name :{ required },
                    stock :{ required },
                    minimumStock :{ required },
                    price :{ required },
                    additionalData : {},
                }
            }
            
            this.product.data.additionalData.forEach( additional => {
                validate.formData.additionalData[additional] = { required };
            } )
            return {
                ...validate
            }
        },
        computed: {
            initFormData(){ 
                const form = {
                    name: null,
                    stock: null,
                    minimumStock: null,
                    price: null,
                    note: null,
                    additionalData: {},
                };
                this.product.data.additionalData.forEach( additional => {
                    // form.additionalData.push(additional,null);
                    form.additionalData[additional] = null;
                } )
                return form;
            }
        },
        mounted() {
            this.formData = this.initFormData;
            this.isFormDataReady = true;
        },
        methods: {
            formatFormData(data){
                const resultData = {
                    name: data.name ? data.name : null,
                    stock: data.stock ? data.stock : null,
                    minimumStock: data.minimumStock ? data.minimumStock : null,
                    price: data.price ? data.price : null,
                    note: data.note ? data.note : null,
                    additionalData: data.additionalData ? data.additionalData : null,
                    // images : this.images.map(item=>{ return item.file })
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
                    const responseItem = await ApiService.post(`/product/${this.$route.params.produk_id}/item`,formattedFormData)
                    .then(data=>{
                        console.log("success",data);
                        return data.data;
                    })
                    .catch(err=>{
                        this.isSubmitStatus = SUBMIT_STATUS.error;
                        const response = {...err};
                        this.errorMessage = response.response.data.message;
                        this.reset();
                        console.log("error",err);
                    })
                    if(responseItem){
                        const dataImage = new FormData();
                        if(this.images.length>0){
                            this.images.forEach((image,i) => {
                                dataImage.append(`images[${i}]`, image.file);
                            });
                            await ApiService.postMultiform(`/product/${this.$route.params.produk_id}/item/${responseItem.id}/images`,dataImage)
                            .then((response)=>{
                                this.$toast.success('Berhasil menambahkan data barang.',{icon:'check'});
                                console.log("success",response);
                                this.isSubmitStatus = SUBMIT_STATUS.success;
                                this.$router.push({name:'admin-inventory-detail-produk-produk_id-barang',params:{produk_id:this.$route.params.produk_id}});
                            })
                            .catch(err=>{
                                this.isSubmitStatus = SUBMIT_STATUS.error;
                                this.$toast.error('Terjadi error, gagal menambahkan data barang.',{icon:'error'});
                                const response = {...err};
                                this.errorMessage = response.response.data.message;
                                console.log("error",err);
                            })
                        }else {
                            this.isSubmitStatus = SUBMIT_STATUS.success;
                            this.$router.push({name:'admin-inventory-detail-produk-produk_id-barang',params:{produk_id:this.$route.params.produk_id}});
                        }
                    }
                }
            },
            reset() {
                setTimeout(() => {
                    this.isSubmitStatus = '';
                    this.errorMessage = null;
                }, 5000 );
            },
            addPhoto(files) {
                files.forEach(file => {
                    this.images.push({
                        objectURL: URL.createObjectURL(file),
                        file,
                    });
                });
            },
            addFile(e) {
                const droppedFiles = e.dataTransfer.files;
                if(!droppedFiles) return;
                // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
                ([...droppedFiles]).forEach(file => {
                    // this.files.push(f);
                    
                    this.images.push({
                        objectURL: URL.createObjectURL(file),
                        file,
                    });
                });

            },
            deletePhoto(index){
                this.images.splice(index,1)
            }
        },
        head() {
            return {
                title: "Cibateknik Admin - Tambah Barang",
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
