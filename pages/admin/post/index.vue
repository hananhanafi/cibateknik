<template>
    <div class="text-center">
        <div class="container">
            <Breadcrumb :data="breadCrumbList"/>
            <div class="bg-white shadow-sm rounded-8 p-2 text-left ">
                <div class="mb-3 p-2">
                    <h1>Katalog Barang</h1>
                </div>
                <div class="d-md-flex mb-3 px-2">
                    <div class="flex-fill mb-2 mr-2">
                        <form @submit.prevent="loadData">
                            <BaseInput
                                id="Cari"    
                                v-model="filters.search"
                                placeholder="Cari Barang..."
                                class="mb-0"
                            >
                                <div slot="afterInput" class="position-absolute" style=" right:12px;
                                            top: 50%;
                                            -ms-transform: translateY(-50%);
                                            transform: translateY(-50%);
                                            z-index:99"
                                    @click.prevent="loadData"
                                >
                                    <fa class="" :icon="['fas','search']" /> 
                                </div>
                            </BaseInput>
                        </form>
                    </div>
                    <div class="ml-auto mb-2 mr-2" style="width:240px" >
                        <BaseSelect
                        v-model="filters.product"
                        :options="options.product"
                        placeholder="Pilih Produk"
                        dense
                        @input="loadData"
                        />
                    </div>
                    <div class="ml-auto mb-2 mr-2" style="width:160px">
                        <BaseSelect
                        v-model="filters.order"
                        :options="['Terbaru', 'Terlama']"
                        placeholder="Pilih Urutkan"
                        dense
                        @input="orderSelectHandler($event)"
                        />
                    </div>
                    <div class="ml-auto mb-2 text-right">
                        <button class="btn btn-primary mt-1" type="button" @click="$router.push({name:'admin-post-tambah-post-barang'})">Tambah Barang</button>
                    </div>
                </div>

                <div v-if="items.length>0" class="row px-2">
                    <!-- <div v-for="(i) in dataItems" :key="i" class="col-xl-2 col-lg-3 col-md-4 col-6 mb-4">
                        <ItemCard/>
                    </div> -->
                    <div v-for="(item,i) in items" :key="i" class="col-xl-2 col-lg-3 col-md-4 col-6 mb-4">
                        <AdminItemCard :data="item"/>
                    </div>
                    <div class="col-12 d-flex">
                        <div>
                            Menampilkan {{ metaData.first_index || '0' }} - {{ metaData.last_index || '0' }} dari {{ metaData.total || '0' }} item
                        </div>
                    </div>
                    <div class="col-12 d-flex">
                        <div class="ml-auto">
                            <button v-show="!isLastPage" class="btn btn-primary border w-100" @click.prevent="loadMore">Muat Lagi</button>
                        </div>
                    </div>
                </div>
                <div v-else-if="!isLoadingData" class="text-center my-5 py-5">
                    <div class="text-40 text-warning">
                        <fa :icon="['fas','exclamation-circle']"/>
                    </div>
                    <h3>Barang tidak ditemukan.</h3>
                </div>
                
                <LoadingSpinner v-if="isLoadingData" :show="isLoadingData"/>


            </div>
        </div>

        
        <ModalAddPostItem :show="isShowModalAddPostItem" :data="{}" :options="options" @close="closeModalAddPostItem"/>
    </div>
</template>

<script>
import ApiService from '~/common/api.service';
    export default {
        // page properties go here
        layout: "admin",
        data() {
            return {
                breadCrumbList: [
                    {name:"Katalog",link:"/admin/post"}
                ],
                items: [],
                isLoadingData: true,
                metaData: {
                    first_index: 0,
                    last_index: 0,
                    current_page: 1,
                    first_page: 1,
                    last_page: 1,
                    total: 0,
                },
                options: {
                    product: [],
                    item: [],
                },
                
                dataItems: new Array(18),
                filters: {
                    sort: null,
                    product: null,
                },
                isShowModalAddPostItem: false,
            }
        },
        computed: {
            params() {
                return {
                    search: this.filters.search || null, 
                    page: this.metaData.current_page, 
                    order: this.filters.order ? (this.filters.order === 'Terbaru' ? 'desc' : 'asc') : null, 
                }
            },
            isLastPage() {
                return this.metaData.current_page === this.metaData.last_page;
            }

        },
        mounted() {
            // Set the initial datas
            this.loadOptions();
            this.loadData();
        },
        methods: {
            async loadMore(){
                this.metaData.current_page++;
                this.isLoadingData = true;
                if(this.filters.product){
                    await ApiService.query('/items-posted/'+this.filters.product.value,this.params)
                    .then((Response)=>{
                        if(!this.items){
                            this.items = Response.data.data;
                        }else{
                            this.items = this.items.concat(Response.data.data);
                        }
                        this.metaData = Response.data.meta
                    })
                    .catch(err=>{
                        console.log("err",err);
                    })

                }else{
                    await ApiService.query('/items-posted',this.params)
                    .then((Response)=>{
                        if(!this.items){
                            this.items = Response.data.data;
                        }else{
                            this.items = this.items.concat(Response.data.data);
                        }
                        this.metaData = Response.data.meta
                    })
                    .catch(err=>{
                        console.log("err",err);
                    })

                }
                this.isLoadingData = false;
            },
            async loadData() {
                this.metaData.current_page = 1;
                this.isLoadingData = true;
                if(this.filters.product){
                    await ApiService.query('/items-posted/'+this.filters.product.value,this.params)
                    .then((Response)=>{
                        this.items = Response.data.data;
                        this.metaData = Response.data.meta
                    })
                    .catch(err=>{
                        console.log("err",err);
                    })

                }else{
                    await ApiService.query('/items-posted',this.params)
                    .then((Response)=>{
                        this.items = Response.data.data;
                        this.metaData = Response.data.meta
                    })
                    .catch(err=>{
                        console.log("err",err);
                    })

                }
                this.isLoadingData = false;
            },
            async loadOptions() {
                await ApiService.get('/products')
                .then((Response)=>{
                    this.options.product = Response.data.data.map(function(product){
                        return {
                            label: product.name,
                            value: product.productID,
                        }
                    });
                })
                .catch(err=>{
                    console.log("err",err);
                })
            },

            
            orderSelectHandler(value){
                if(value){
                    // this.loadData();
                    if(this.filters.order === 'Terbaru'){
                        // sorting desc by created_at
                        const sorted = this.items.sort((a, b) =>
                            a.createdAt._seconds > b.createdAt._seconds ? -1 : 1
                        );
                        this.items = sorted;

                    }else {
                        // sorting desc by created_at
                        const sorted = this.items.sort((a, b) =>
                            a.createdAt._seconds < b.createdAt._seconds ? -1 : 1
                        );
                        this.items = sorted;
                        
                    }
                }
            },
            showModalAddPostItem() {
                this.isShowModalAddPostItem = true;
            },
            closeModalAddPostItem() {
                this.isShowModalAddPostItem = false;
            },
        },
        head() {
            return {
                title: "Cibateknik Admin - Katalog",
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