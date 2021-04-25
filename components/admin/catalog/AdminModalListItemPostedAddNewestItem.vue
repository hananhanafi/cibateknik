<template>
    <Modal :show="show" large centered @clickOutside="clickOutside">
        <div class="bg-white shadow-sm rounded-8 p-3 text-left">
            <div v-if="isSubmitStatus=='' || isSubmitStatus == submitStatus.pending">
                <div v-if="isSubmitStatus=='' || isSubmitStatus == submitStatus.pending" class="modal-body">
                    <div class="mb-3 p-2">
                        <h1>Katalog Semua Barang</h1>
                    </div>
                    <div class="d-md-flex mb-3 px-2">
                    <div class="form-check mr-2 form-control-sm">
                        <input id="check-all-add-newest-item" v-model="checkAll" class="form-check-input" type="checkbox" value="all" @change="checkAllHandler()">
                        <label class="form-check-label" for="check-all-add-newest-item">
                            semua
                        </label>
                    </div>
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
                    </div>

                    <div v-if="items.length>0" class="row px-2">
                        <!-- <div v-for="(i) in dataItems" :key="i" class="col-xl-2 col-lg-3 col-md-4 col-6 mb-4">
                            <ItemCard/>
                        </div> -->
                        <div v-for="(item,i) in items" :key="i" class="col-xl-3 col-lg-3 col-md-4 col-6 mb-4">
                            <AdminItemCard :data="item" :isChecked="checkAll" @checkedList="checkedListHandler($event)"/>
                        </div>
                        <div class="col-12 d-flex">
                            <div>
                                Menampilkan {{ metaData.first_index || '0' }} - {{ metaData.last_index || '0' }} dari {{ metaData.total || '0' }} item
                            </div>
                        </div>
                        <div class="col-12 d-flex">
                            <div class="ml-auto">
                                <button v-show="!isLastPage" class="btn btn-outline-primary border w-100" @click.prevent="loadMore">Muat Lagi</button>
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

                <div class="modal-footer border-top-0 d-flex">
                    <div class="text-center">
                        <button :disabled="isEmptyCheckedItemList" type="button" title="Hapus Barang" class="btn btn-primary" @click="onSubmit">Tambahkan</button>
                        <button type="button" title="Hapus Barang" class="btn btn-outline-danger" @click="clickOutside">Batal</button>
                    </div>
                </div>
            </div>
            
            
            <!-- loading -->
            <LoadingSpinner :show="isSubmitStatus==submitStatus.loading"/>

            <!-- success -->
            <div v-show="isSubmitStatus==submitStatus.success" class="px-2 text-center">
                <div class="text-40 text-success">
                    <fa :icon="['fas','check-circle']"/>
                </div>
                <div class="text-20">
                    Berhasil menambahkan data barang pada katalog barang terbaru.
                </div>
                
                <div class="modal-footer border-top-0 d-flex">
                    <button type="button" class="btn btn-outline-danger flex-fill" data-bs-dismiss="modal" @click="closeModal()">Tutup</button>
                </div>
            </div>

            <!-- error -->
            <div v-show="isSubmitStatus==submitStatus.error" class="px-2 text-center">
                <div class="text-40 text-danger">
                    <fa :icon="['fas','times-circle']"/>
                </div>
                <div class="text-20">
                    Gagal menambahkan data barang pada katalog barang terbaru.
                </div>
                
                <div class="modal-footer border-top-0 d-flex">
                    <button type="button" class="btn btn-outline-danger flex-fill" data-bs-dismiss="modal" @click="closeModal()">Tutup</button>
                </div>
            </div>
            <ModalAddPostItem :show="isShowModalAddPostItem" :data="{}" :options="options" @close="closeModalAddPostItem"/>
            
            <AdminModalDeleteItemPosted :show="isShowAdminModalDeleteItemPosted" :data="checkedItemList" @close="closeAdminModalDeleteItemPosted" @update="resetData"/>
        </div>

        
        
    </Modal>
</template>

<script>
import ApiService from '~/common/api.service';
import { SUBMIT_STATUS } from '~/store/constants';
export default {
    props: {
        show: Boolean,
    },
    data() {
        return {
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
                sort: null,
                product: null,
            },
            isShowModalAddPostItem: false,
            isShowAdminModalDeleteItemPosted: false,

            checkedItemList : [],
            checkAll: false,
            isSubmitStatus: '',
            submitStatus: SUBMIT_STATUS
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
        
            closeModal(){
                // reset data
                this.isSubmitStatus = '';
                this.$emit('close');
            },
            async onSubmit() {
            this.isSubmitStatus = SUBMIT_STATUS.loading;
            await ApiService.post(`/item-posted-newest`,{items_id:this.checkedItemList})
            .then(()=>{
                this.isSubmitStatus = SUBMIT_STATUS.success;
                this.$emit('update');
            })
            .catch(()=>{
                this.isSubmitStatus = SUBMIT_STATUS.error;
            })

            },
            clickOutside() {
                this.$emit('close');
            },
            checkAllHandler() {
                if(!this.checkAll){
                    this.checkedItemList =[];
                }
            },
            checkedListHandler(data){
                if(data.isChecked){
                    this.checkedItemList.push(data.value);
                }else{
                    const index = this.checkedItemList.indexOf(data.value);
                    if (index > -1) {
                        this.checkedItemList.splice(index, 1);
                    }
                }
            },
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
            resetData() {
                this.metaData.current_page = 1;
                this.items = [];
                this.loadData();
            },

            
            orderSelectHandler(value){
                if(value){
                    this.resetData();
                    // this.loadData();
                    // if(this.filters.order === 'Terbaru'){
                    //     // sorting desc by created_at
                    //     const sorted = this.items.sort((a, b) =>
                    //         a.createdAt._seconds > b.createdAt._seconds ? -1 : 1
                    //     );
                    //     this.items = sorted;

                    // }else {
                    //     // sorting desc by created_at
                    //     const sorted = this.items.sort((a, b) =>
                    //         a.createdAt._seconds < b.createdAt._seconds ? -1 : 1
                    //     );
                    //     this.items = sorted;
                        
                    // }
                }
            },
            showModalAddPostItem() {
                this.isShowModalAddPostItem = true;
            },
            closeModalAddPostItem() {
                this.isShowModalAddPostItem = false;
            },
            showAdminModalDeleteItemPosted() {
                this.isShowAdminModalDeleteItemPosted = true;
            },
            closeAdminModalDeleteItemPosted() {
                this.isShowAdminModalDeleteItemPosted = false;
            },
        },
}
</script>
