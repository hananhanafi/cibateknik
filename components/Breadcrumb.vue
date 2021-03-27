<template>
    <nav aria-label="breadcrumb">
        <div class="w-100 bg-white text-left mb-3 shadow-sm" style="overflow-x:auto">
            <div class="btn-group btn-breadcrumb">
                <a href="/admin/dashboard" class="btn btn-lg btn-default bg-white border">Dashboard</a>
                <a v-for="(item,i) in data" :key="i" class="btn btn-lg btn-default bg-white border">
                    <NuxtLink v-if="i+1<data.length" :to="item.link" style="overflow:hidden; white-space: nowrap;"> {{ item.name }}</NuxtLink>
                    <span v-else style="overflow:hidden; white-space: nowrap;">{{ item.name }}</span>
                </a>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    props: {
        data: Array
    },
    
}
</script>

<style scoped>

/** The Magic **/

.btn-breadcrumb .btn:not(:last-child)::after {
    content: " ";
    display: block;
    width: 0;
    height: 0;
    border-top: 17px solid transparent;
    border-bottom: 17px solid transparent;
    border-left: 10px solid white;
    position: absolute;
    top: 50%;
    margin-top: -17px;
    left: 100%;
    z-index: 3;
}
.btn-breadcrumb .btn:not(:last-child)::before {
    content: " ";
    display: block;
    width: 0;
    height: 0;
    border-top: 17px solid transparent;
    border-bottom: 17px solid transparent;
    border-left: 10px solid #dee2e6;
    position: absolute;
    top: 50%;
    margin-top: -17px;
    margin-left: 1px;
    left: 100%;
    z-index: 3;
}

/** The Spacing **/

.btn-breadcrumb .btn {
    padding:6px 12px 6px 24px;
}
.btn-breadcrumb .btn:first-child {
    padding:6px 6px 6px 10px;
}
.btn-breadcrumb .btn:last-child {
    padding:6px 18px 6px 24px;
    cursor:default !important;
}

/** Default button **/


</style>