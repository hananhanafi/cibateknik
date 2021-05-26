<template>
<router-link :to="{ name: 'cari-barang_id-detail-barang', params: {barang_id: data.id}}">
    <div class="card rounded-8" style="cursor:pointer" >
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
</template>

<script>
import { toFormatedNumber } from '../../store/helpers';
export default {
    props: {
        data: {
            type: Object,
            default: null
        }
    },
    computed: {
        photoURL() {
            const url = this.data.imagesItem ? this.data.imagesItem[0].imageUrl : process.env.baseUrl+"/_nuxt/assets/img/logo.png"
            return url;
        }
    },
    methods: {
        toFormatedNumber
    }
}
</script>
