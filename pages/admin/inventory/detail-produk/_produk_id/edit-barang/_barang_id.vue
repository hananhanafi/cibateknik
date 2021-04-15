<template>
    <div class="text-center">
        <div class="container">
            <Breadcrumb :data="breadCrumbList"/>
            <!-- <h1 class="red">Customer admin</h1> -->
            <div v-if="isDataReady" class="bg-white shadow rounded-8 p-3 text-left ">
                <div class="mb-3 p-2">
                    <h1>Edit Barang</h1>
                </div>
                <div class="form-group">
                    <div class="mb-3">
                        <h6>Nama Produk</h6>
                        <b-form-input disabled class=" mb-2" placeholder="Masukkan nama produk" :value="dataProduct.name"></b-form-input>
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
                            <div class="col">
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
                        <h6>Foto Barang</h6>
                        
                        <div class="row">
                            <div v-for="(image,i) in images" :key="i" class="col-md-2 col-12 position-relative mb-2 mr-2" >
                                <div class="btn btn-danger position-absolute"
                                    style=" right:12px;
                                            top: 12px;"
                                    @click="deleteImage(image,i)"
                                >
                                    <fa class="" :icon="['fas','times']" /> 
                                </div>
                                <img :src="image.imageUrl" alt="photo-placeholder" class="card-img-top h-100" >
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
                            <b-button id="show-btn"  size="xl"  class=" ml-auto" variant="outline-dark">Batal</b-button>
                            <b-button id="show-btn" size="xl"  class=" text-white ml-auto"  variant="primary" @click="onSubmit">Simpan</b-button>
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
        async asyncData ({ params, redirect }) {
            console.log("redirect",redirect);
            const postItem = await ApiService.get(`/product/${params.produk_id}/item/${params.barang_id}`);
            
            return {postItem};
        },
        // page properties go here
        layout: "admin",
        middleware: 'adminAuthenticated',
        data() {
            return {
                breadCrumbList: [
                    {name:"Inventory",link:"/admin/inventory"},
                    {name:"Inventaris Produk",link:"/admin/inventory"},
                    {name:"Edit Barang",link:""},
                ],
                errorsPhoto: null,
                images: [],
                deleted_images: [],
                new_images: [],

                formData: this.initFormData,
                dataItem:null,
                dataProduct:null,
                isDataReady: false,
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
                    additionalData : {required},
                }
            }
            
            // this.dataProduct.additionalData.forEach(function(additional){
            //     validate.formData.additionalData[additional] = { required };
            // })
            
            // Object.keys(this.formData.additionalData).forEach(function(key) {
            //     validate.formData.additionalData[key] = { required };
            // });
            return {
                ...validate
            }
        },

        computed: {
            initFormData(){ 
                const {
                    name,
                    stock,
                    minimumStock,
                    price,
                    note,
                    additionalData,
                } = this.dataItem;

                const form = {
                    name,
                    stock,
                    minimumStock,
                    price,
                    note,
                    additionalData,}
                // if(this.dataItem){
                //     form = this.dataItem;
                // }
                // if(this.dataProduct.additionalData){
                //     this.dataProduct.additionalData.forEach(data => {
                //         if(!form.additionalData[data]){
                //             form.additionalData[data] = null;
                //         }
                //     })
                // }
                this.dataProduct.additionalData.forEach(additional => {
                    if(!form.additionalData[additional]){
                        form.additionalData[additional] = null;
                    }
                })

                console.log("form",form);

                return form;
            }
        },
        mounted() {
            this.dataItem = this.postItem.data.item;
            this.dataProduct = this.postItem.data.product;
            this.formData = this.initFormData;
            this.images = this.formData.imagesItem || [];
            this.isDataReady = true;
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
                }

                return resultData;

            },
            async onSubmit(){
                this.$v.$touch();
                console.log("formdata",this.formData);
                console.log("VVV",this.$v);
                if (this.$v.$invalid) {
                    this.isSubmitStatus = SUBMIT_STATUS.pending;
                } 
                else {
                    const promises = [];
                    this.isSubmitStatus = SUBMIT_STATUS.loading;
                    const formattedFormData = this.formatFormData(this.formData);
                    promises.push(
                        ApiService.put(`/product/${this.$route.params.produk_id}/item/${this.$route.params.barang_id}`,formattedFormData)
                        .then(data=>{
                            console.log("success",data);
                        })
                        .catch(err=>{
                            console.log("error",err);
                            this.isSubmitStatus = SUBMIT_STATUS.error;
                            const response = {...err};
                            this.errorMessage = response.response.data.message;
                        })
                    )

                    if(this.new_images.length>0){
                        const dataImage = new FormData();
                        this.images.forEach((image,i) => {
                            dataImage.append(`images[${i}]`, image.file);
                        });

                        promises.push (
                            ApiService.postMultiform(`/product/${this.$route.params.produk_id}/item/${this.$route.params.barang_id}/images`,dataImage)
                            .then((response)=>{
                                console.log("success",response);
                            })
                            .catch(err=>{
                                this.isSubmitStatus = SUBMIT_STATUS.error;
                                const response = {...err};
                                this.errorMessage = response.response.data.message;
                                console.log("error",err);
                            })
                        )
                    }

                    if(this.deleted_images.length>0){
                        const deletedImages = { deleted_images: this.deleted_images };
                        promises.push (
                            ApiService.post(`/product/${this.$route.params.produk_id}/item/${this.$route.params.barang_id}/images/delete`,deletedImages)
                            .then((response)=>{
                                console.log("success",response);
                            })
                            .catch(err=>{
                                this.isSubmitStatus = SUBMIT_STATUS.error;
                                const response = {...err};
                                this.errorMessage = response.response.data.message;
                                console.log("error",err);
                            })
                        )
                    }

                    try {
                        await Promise.all(promises);
                        this.isSubmitStatus = SUBMIT_STATUS.success;
                        this.$router.push({name:'admin-inventory-detail-produk-produk_id-barang',params:{produk_id:this.$route.params.produk_id}})

                    }catch {
                        this.isSubmitStatus = SUBMIT_STATUS.error;
                    }
                }
            },
            addPhoto(files) {
                files.forEach(file => {
                    this.images.push({
                        imageUrl: URL.createObjectURL(file),
                        file,
                    });
                    this.new_images.push({
                        imageUrl: URL.createObjectURL(file),
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
                        imageUrl: URL.createObjectURL(file),
                        file,
                    });
                    this.new_images.push({
                        imageUrl: URL.createObjectURL(file),
                        file,
                    });
                });

            },
            deleteImage(image,index){
                this.images.splice(index,1);
                if(image.imageName){
                    this.deleted_images.push(image);
                }
            }
        }
    }
</script>