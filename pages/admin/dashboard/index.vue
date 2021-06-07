<template>
    <div class="text-center">
        <div class="container-fluid px-md-5">
            
            <Breadcrumb :data="breadCrumbList"/>

            <AdminDashboardTopTotalData/>
            
            <div class="row">
                <AdminDashboardRevenueChart/>

                <AdminDashboardTodayData/>

            </div>

            <div class="row">

                <AdminDashboardTopSellingItemChart/>

                <AdminDashboardItemSoldChart/>
            </div>

            <AdminListUserOrder/>
            
        </div>
    </div>
</template>

<script>
export default {
    // page properties go here
    layout: "admin",
    middleware: 'adminAuthenticated',
    data() {
        return {
            breadCrumbList: [],
        }
    },
    methods: {
        dateDiffInDays(a, b) {
            const _MS_PER_DAY = 1000 * 60 * 60 * 24;
            // Discard the time and time-zone information.
            const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
            const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

            return Math.floor((utc2 - utc1) / _MS_PER_DAY);
        },
    },
    head() {
        return {
            title: "Cibateknik Admin - Dashboard",
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

<style>
    .red {
    color: red;
    }

    tr td{
        vertical-align: top;
    }
</style>