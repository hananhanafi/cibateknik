<template>
    <div id="catalog-list" class="container">
        <Breadcrumb :data="breadCrumbList"/>

        <AdminListItemPosted/>

        <div class="horizontal-separator my-4">
        </div>

        <AdminListItemPostedNewest/>

        <div class="horizontal-separator my-4">
        </div>

        <AdminListItemPostedRecommendation/>

    </div>
</template>

<script>
    export default {
        // page properties go here
        layout: "admin",
        data() {
            return {
                breadCrumbList: [
                    {name:"Katalog",link:"/admin/post"}
                ],
            }
        },
        head() {
            return {
                title: "Cibateknik Admin - Katalog",
                meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                {
                    hid: 'description',
                    name: 'description',
                    content: 'My custom description'
                }
                ],
                
                // link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
            }
        }
    }
</script>