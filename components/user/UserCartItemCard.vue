<template>
    <div class="row d-flex align-items-center">
        <div class="col-md col-12">
            <div class="form-check d-flex align-items-center">
                <input id="item1" v-model="checkBox" :disabled="checkStock" :checked="productsChecked" class="form-check-input align-self-center my-auto" type="checkbox" :value="data" @change="checkboxUpdate(data)">
                <router-link :to="{ name: 'cari-barang_id-detail-barang', params: {barang_id: data.item.id}}" target="_blank">
                    <div class="d-flex align-items-center">
                        <div>
                            <img :src="photoURL" style="width:80px" class="card-img-top d-inline" alt="item">
                        </div>
                        <div>
                            <h5 class="ml-2 mb-1">{{data.item.name}}</h5>

                            <!-- mobile -->
                            <div class="d-md-none d-block ml-2">
                                Rp {{ data.item.price ? toFormatedNumber(data.item.price) : '-'  }}
                                <div>
                                    Jumlah pesanan : {{ data.cart.amount || '-' }}
                                </div>
                                <div>
                                    Total : Rp {{ data.item.price ? toFormatedNumber(data.item.price*data.cart.amount) : '-'  }}
                                </div>
                            </div>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="col-2 text-center d-md-block d-none">
            Rp {{ data.item.price ? toFormatedNumber(data.item.price) : '-'  }}
        </div>
        <div class="col-2 text-center d-md-block d-none">
            {{ data.cart.amount || '-' }}
        </div>
        <div class="col-2 text-center d-md-block d-none">
            Rp {{ data.item.price ? toFormatedNumber(data.item.price*data.cart.amount) : '-'  }}
        </div>
        <div class="col-md-3 col-12  text-right">
            <a class="btn text-warning" @click="showModalAddCart"><fa class="text-warning" :icon="['fas','pencil-alt']" /> Edit</a>
            <a class="btn text-danger"  @click="showModalDeleteItemCart"><fa class="text-danger" :icon="['fas','trash']" /> Hapus</a>
        </div>

        <div v-if="checkStock" class="col-12">
            <div class="alert alert-danger">
                Stok persediaan barang telah habis atau kurang dari jumlah barang dalam keranjang.
            </div>
        </div>
        
        <ModalDeleteItemCart
            :show="isShowModalDeleteItemCart"
            :data="data"
            @close="closeModalDeleteItemCart"
            @update="deleteUpdateHandler"
        />
        
                
        <ModalAddCart :show="isShowModalAddCart" :data="data.item"  @close="closeModalAddCart" @update="updateHandler($event)"/>
    </div>
</template>

<script>
import { toFormatedNumber } from '../../store/helpers';
export default {
    props: {
        data: {
            type: Object,
            default: null
        },
        isChecked: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            productsChecked: false,
            isShowModalDeleteItemCart: false, 
            isShowModalAddCart: false,
            checkBox: null,
        }
    },
    computed: {
        photoURL() {
            const url = this.data.item.imagesItem ? this.data.item.imagesItem[0].imageUrl : process.env.baseUrl+"/_nuxt/assets/img/logo.png"
            return url;
        },
        checkStock() {
            return this.data.item.stock<this.data.cart.amount;
        },
        qtyItemCart(){
            if(this.checkStock){
                return '0';
            }else{
                return this.data.cart.amount;
            }
        },
    },
    watch: {
        isChecked(){
            if(!this.checkStock){
                const value = this.data;
                if(!this.checkBox && this.isChecked){
                    const data = {
                        value,
                        isChecked: this.isChecked
                    }
                    this.$emit('checkedItem', data);
                }
                this.checkBox = this.isChecked;
            }
        }
    },
    methods: {
        checkboxUpdate(value){
            const data = {
                value,
                isChecked: this.checkBox
            }
            this.$emit('checkedItem', data);
        },
        updateHandler(value) {
            if(value===0){
                this.$emit('delete',this.data);
            }else{
                this.data.cart.amount = value;
            }
        },
        deleteUpdateHandler() {
            this.$emit('delete',this.data);
        },
        showModalAddCart() {
            this.isShowModalAddCart = true;
        },
        closeModalAddCart() {
            this.isShowModalAddCart = false;
        },
        showModalDeleteItemCart() {
            this.isShowModalDeleteItemCart = true;
        },
        closeModalDeleteItemCart() {
            this.isShowModalDeleteItemCart = false;
        },
            
        toFormatedNumber
    }
}
</script>
