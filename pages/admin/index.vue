<template>
    <div class="red">
        <h1 class="red">Index admin</h1>
        <fa :icon="['far','lightbulb']" /> // regular style
        <fa :icon="['fas','lightbulb']" /> // solid style
        <fa :icon="['fab','github']" />
        <fa icon="lightbulb" /> //will use style from first import
    </div>
</template>

<script>
    export default {
        // middleware: 'authenticated',
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