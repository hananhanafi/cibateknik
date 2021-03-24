<template>
    <div>
    </div>
</template>

<script>
    export default {
        middleware: 'adminAuthenticated',
        // page properties go here
        layout: "admin",
        created() {
            this.$router.push('/admin/dashboard');
        }
    }
</script>

<style>
    .red {
    color: red;
    }
</style>