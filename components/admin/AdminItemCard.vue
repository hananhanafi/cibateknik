<template>
<div>
    
    <div class="form-check position-absolute" style="z-index:99;right:10%;top:5%">
        <input :id="data.name" v-model="checkBox" class="form-check-input" type="checkbox" :value="data.id" @change="checkboxUpdate(data.id)">
        <!-- <label class="form-check-label" for="flexCheckDefault">
            Produk
        </label> -->
    </div>
    <router-link :to="{ name: 'admin-post-barang_id-detail-barang', params: {barang_id: data.id}}">
        <div class="card" style="cursor:pointer" >
            <div class="img-container">
                <img :src="photoURL" class="" 
                alt="Responsive image"> 
            </div>
            <div class="card-body p-2">
                <h6 class="font-weight-bold">{{ data.name }}</h6>
                <p class="card-text">Rp {{ data.price ? toFormatedNumber(data.price) : '-'  }}</p>
            </div>
        </div>
    </router-link>
</div>
</template>

<script>
import { toFormatedNumber } from '../../store/helpers';
export default {
    props: {
        data: {
            type: Object,
            default: null,
        },
        isChecked: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
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
            const value = this.data.id;
            if(!this.checkBox && this.isChecked){
                const data = {
                    value,
                    isChecked: this.isChecked
                }
                this.$emit('checkedList', data);
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
            this.$emit('checkedList', data);
        },
        toFormatedNumber
    }
}
</script>
