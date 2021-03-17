<template>
<router-link :to="{ name: 'cari-detail'}" target="_blank">
    <div class="card" style="cursor:pointer" >
        <img src="~/assets/img/item.png" class="card-img-top" alt="item">
        <div class="card-body p-2">
            <h5 class="font-weight-bold">Card title</h5>
            <p class="card-text">Rp 100.000</p>
        </div>
    </div>
</router-link>
</template>

<script>
export default {
}
</script>
