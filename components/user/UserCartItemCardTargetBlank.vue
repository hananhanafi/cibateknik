<template>
    <div class="row d-flex align-items-center">
        <div class="col-md col-12">
            <div class="form-check d-flex align-items-center">
                <input id="item1" v-model="checkBox" :checked="productsChecked" class="form-check-input align-self-center my-auto" type="checkbox" :value="data" @change="checkboxUpdate(data)">
                <router-link :to="{ name: 'cari-barang_id-detail-barang', params: {barang_id: data.id}}" target="_blank">
                    <div class="d-flex align-items-center">
                        <div>
                            <img :src="photoURL" style="width:80px" class="card-img-top d-inline" alt="item">
                        </div>
                        <div>
                            <h5 class="ml-2 mb-1">{{data.name}}</h5>

                            <!-- mobile -->
                            <div class="d-md-none d-block ml-2">
                                Rp {{ data.price ? toFormatedNumber(data.price) : '-'  }}
                                <div>
                                    Jumlah pesanan : {{ data.cart.amount || '-' }}
                                </div>
                                <div>
                                    Total : Rp {{ data.price ? toFormatedNumber(data.price*data.cart.amount) : '-'  }}
                                </div>
                            </div>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="col-2 text-center d-md-block d-none">
            Rp {{ data.price ? toFormatedNumber(data.price) : '-'  }}
        </div>
        <div class="col-2 text-center d-md-block d-none">
            {{ data.cart.amount || '-' }}
        </div>
        <div class="col-2 text-center d-md-block d-none">
            Rp {{ data.price ? toFormatedNumber(data.price*data.cart.amount) : '-'  }}
        </div>
        <div class="col-md-1 col-12  text-right">
            <a class="btn text-warning" @click="showModalAddCart"><fa class="text-warning" :icon="['fas','pencil-alt']" /> Edit</a>
            <a class="btn text-danger"  @click="showModalDeleteItemCart"><fa class="text-danger" :icon="['fas','trash']" /> Hapus</a>
        </div>
        
        <ModalDeleteItemCart
            :show="isShowModalDeleteItemCart"
            :data="data"
            @close="closeModalDeleteItemCart"
            @update="deleteUpdateHandler"
        />
        
                
        <ModalAddCart :show="isShowModalAddCart" :data="data"  @close="closeModalAddCart" @update="updateHandler($event)"/>
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
            const url = this.data.imagesItem ? this.data.imagesItem[0].imageUrl : process.env.baseUrl+"/_nuxt/assets/img/logo.png"
            return url;
        }
    },
    watch: {
        isChecked(){
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
            this.data.cart.amount = value;
        },
        deleteUpdateHandler() {
            this.$emit('delete');
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
