<template>
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb bg-white shadow-sm">
            <li class="breadcrumb-item"><a>Admin</a></li>
            <li v-for="(item,i) in data" :key="i" class="breadcrumb-item" aria-current="page">
                <NuxtLink v-if="i+1<data.length" :to="item.link"> {{ item.name }}</NuxtLink>
                <span v-else>{{ item.name }}</span>
            </li>
        </ol>
    </nav>
</template>

<script>
export default {
    props: {
        data: Array
    },
    
}
</script>