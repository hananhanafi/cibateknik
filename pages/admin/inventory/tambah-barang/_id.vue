<template>
    <div class="text-center">
        <div class="container">
            <Breadcrumb :data="breadCrumbList"/>
            <div class="bg-white shadow-light rounded-8 p-3 text-left ">
                <div class="mb-3 p-2">
                    <h1>Tambah Barang</h1>
                </div>
                <div class="form-group">
                    <div class="mb-3">
                        <label>Nama Produk</label>
                        <b-form-input disabled class=" mb-2" placeholder="Masukkan nama produk" value="Produk 1"></b-form-input>
                    </div>
                    <div class="mb-3">
                        <BaseInput
                            id="name"
                            label="Nama Barang"
                            placeholder="Masukkan nama barang"
                            large
                        />
                    </div>
                    <div class="mb-3">
                        <h6>Informasi Barang</h6>
                        <div class="row">
                            <div class="col">
                                <!-- eslint-disable-next-line vue/no-template-shadow -->
                                <div v-for="(info,i) in infoCount" :key="i" class="d-md-flex d-block">
                                    <div class="mr-2 col-md-1 col-12">
                                        {{info.name}}
                                    </div>
                                    <div class="flex-fill">
                                        <BaseInput
                                            placeholder="Masukkan keterangan informasi barang"
                                            large
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <BaseInput
                            id="stock"
                            label="Stock Barang"
                            placeholder="Masukkan stock barang"
                            large
                        />
                    </div>
                    <div class="mb-3">
                        <BaseInput
                            id="minimumStock"
                            label="Minimum Stock Barang"
                            placeholder="Masukkan minimum stock barang"
                            large
                        />
                    </div>
                    <div class="mb-3">
                        <BaseInput
                            id="price"
                            label="Harga"
                            placeholder="Masukkan harga"
                            large
                        />
                    </div>
                    <div class="mb-3">
                        <h6>Foto Barang</h6>
                        
                        <div class="row">
                            <div v-for="(photo,i) in photos" :key="i" class="col-md-2 col-12 position-relative mb-2 mr-2">
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

                    
                    <div class="w-100">
                        <div class="text-right">
                            <b-button id="show-btn"  size="xl"  class=" ml-auto" variant="outline-dark">Batal</b-button>
                            <b-button id="show-btn"  size="xl"  class=" text-white ml-auto" variant="primary">Simpan</b-button>
                        </div>
                    </div>
                </div>
            </div>
            
            
        </div>
    </div>
</template>

<script>
    export default {
        // page properties go here
        layout: "admin",
        middleware: 'adminAuthenticated',
        data() {
            return {
                breadCrumbList: [
                    {name:"Inventory",link:"/admin/inventory"},
                    {name:"Inventaris Produk",link:""},
                    {name:"Tambah Barang",link:""},
                ],
                infoCount: [
                    {name:'Type'},
                    {name:'Ukuran'},
                    {name:'Diameter'},
                    {name:'Jenis'},
                ],
                errorsPhoto: null,
                photos: [],
                files: [],

            }
        },
        methods: {
            addPhoto(files) {
                files.forEach(file => {
                    this.photos.push({
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
                    
                    this.photos.push({
                        objectURL: URL.createObjectURL(file),
                        file,
                    });
                });

            },
            deletePhoto(index){
                this.photos.splice(index,1)
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
