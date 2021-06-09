<template>
    <div class="py-5">
        <div class="container-fluid mt-5">

            <div class="row">
                <div class="col-xl-2  col-lg-3 col-md-4 col-sm-12 d-md-block d-none">
                    <div class="bg-white p-3 shadow-main sticky-top mb-4" style="top:80px;z-index:900">
                        <div class="border-bottom mb-2">
                            <h4>Filter</h4>
                        </div>
                        <div>
                            <!-- <label>
                                Harga
                            </label> -->
                            <div>
                                <!-- <div class="d-flex">
                                    <div class="w-100">
                                        <BaseInput
                                            id="min-desktop"
                                            v-model="formData.min"
                                            placeholder="Min"
                                            large
                                            dense
                                            numberonly
                                        />
                                    </div>
                                    <div class="mx-2">-</div>
                                    <div class="w-100">
                                        <BaseInput
                                            id="max-desktop"
                                            v-model="formData.max"
                                            placeholder="Max"
                                            large
                                            dense
                                            numberonly
                                        />
                                    </div>
                                </div> -->
                                <div>
                                    <BaseSelect
                                    v-model="filters.product"
                                    name="product"
                                    class="select-product"
                                    label="Berdasarkan Produk"
                                    :options="options.product"
                                    placeholder="Pilih Produk"
                                    dense
                                    />
                                </div>
                                <div>
                                    <BaseSelect
                                    v-model="filters.order"
                                    name="order"
                                    class="select-order"
                                    label="Urutkan"
                                    :options="['Terbaru', 'Terlama']"
                                    placeholder="Pilih urutkan"
                                    dense
                                    />
                                </div>
                            </div>
                            <div class="d-flex">
                                <div class="flex-fill px-2">
                                    <button type="button" class="btn btn-danger text-white  rounded-8 w-100" @click.prevent="resetFilters">Hapus</button>
                                </div>
                                <div class="flex-fill px-2">
                                    <button type="button" class="btn btn-primary text-white w-100  rounded-8" @click.prevent="resetData">Terapkan</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- mobile -->
                <div class=" d-md-none d-flex fixed-top bg-white p-3 border">
                    <BaseInput
                        id="Cari"
                        v-model="filters.search"
                        placeholder="Cari..."
                        class="mb-0 flex-fill"
                        rounded8
                    >
                        <div slot="afterInput" class="position-absolute"
                            style=" right:12px;
                                    top: 50%;
                                    -ms-transform: translateY(-50%);
                                    transform: translateY(-50%);"
                        >
                            <fa class="" :icon="['fas','search']" /> 
                        </div>
                    </BaseInput>
                    <button type="button" class="btn bg-main-color text-white px-4 ml-3 rounded-8">Cari</button>
                </div>
                

                <!-- desktop -->
                <div class="fixed-bottom text-center d-md-none d-block" style="bottom:80px">
                    <a class="btn btn-light bg-white border px-4 rounded-8" type="button" @click="showModalFilterSearchItem">
                    <fa class="" :icon="['fas','filter']" />  Filter</a>
                </div>
                <div class="col px-md-3 px-0">
                    
                    <form @submit.prevent="resetData">
                        <div class="d-md-flex d-none mb-2 sticky-top border bg-white p-3 " style="top:80px;z-index:900">
                            <BaseInput
                                id="Cari-desktop"
                                v-model="filters.search"
                                placeholder="Cari..."
                                class="mb-0 flex-fill"
                                rounded8
                            >
                            <div slot="afterInput" class="position-absolute"
                                style=" right:12px;
                                        top: 50%;
                                        -ms-transform: translateY(-50%);
                                        transform: translateY(-50%);"
                            >
                                <fa class="" :icon="['fas','search']" /> 
                            </div>
                            </BaseInput>
                            <button type="button" class="btn bg-main-color text-white px-4 ml-3 rounded-8" @click="resetData">Cari</button>
                        </div>
                    </form>
                    
                    <div class="row">
                        <div class="col">
                            <h3 class="font-weight-bold" >Terbaru</h3>
                            <div class="horizontal-separator"></div>
                        </div>
                    </div>
                    <div v-if="items.length>0" class="bg-white mt-md-4 mt-0 border p-3">
                        <div class="row">
                            <div v-for="(item,i) in items" :key="i" class="col-xl-2 col-lg-3 col-md-4 col-6 mb-4">
                                <UserItemCard :data="item"/>
                            </div>
                            <div class="col-12 d-flex">
                                <div>
                                    Menampilkan 1 - {{ metaData.last_index || '0' }} dari {{ metaData.total || '0' }} item
                                </div>
                            </div>
                            <div class="col-12 d-flex">
                                <div class="ml-auto">
                                    <button v-show="!isLastPage" :disabled="isLoadingData" class="btn btn-primary border w-100" @click.prevent="loadMore">Muat Lagi</button>
                                </div>
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
        </div>

        <ModalFilterSearchItem
            :show="isShowModalFilterSearchItem"
            :data="filters"
            :options="options"
            @close="closeModalFilterSearchItem"
            @deleteFilters="resetFilters"
            @update="resetData"
        />

    </div>
</template>

<script>
import ApiService from '~/common/api.service';
    export default {
        // page properties go here
        layout: "user",
        data() {
            return {
                formData: {
                    min: null,
                    max: null,
                    last_education: null,
                },
                isShowModalFilterSearchItem: false, 

                
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
                
                filters: {
                    order: null,
                    product: null,
                    search: this.$route.query.search || ''
                },
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
            },
            isEmptyCheckedItemList(){
                return this.checkedItemList.length<1;
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
                    await ApiService.query('/items-posted-newest/'+this.filters.product.value,this.params)
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
                    await ApiService.query('/items-posted-newest',this.params)
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
                    await ApiService.query('/items-posted-newest/'+this.filters.product.value,this.params)
                    .then((Response)=>{
                        this.items = Response.data.data;
                        this.metaData = Response.data.meta
                    })
                    .catch(err=>{
                        console.log("err",err);
                    })

                }else{
                    await ApiService.query('/items-posted-newest',this.params)
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
            resetData() {
                this.metaData.current_page = 1;
                this.items = [];
                this.loadData();
            },
            resetFilters(){
                this.filters.order = null;
                this.filters.product = null;
            },
            showModalFilterSearchItem() {
                this.isShowModalFilterSearchItem = true;
            },
            closeModalFilterSearchItem() {
                this.isShowModalFilterSearchItem = false;
            },
        },
        head() {
            return {
                title: "Cibateknik - Cari Barang",
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
