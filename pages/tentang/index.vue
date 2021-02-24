<template>
    <div class="pt-md-5">
        <div class="container px-0">
            <div class="bg-white my-md-5 p-4 shadow">
                <h2>Tentang</h2>

                <div class="row">
                    <div class="col-md-9 col-sm-12">
                        <b-img class="w-50 mb-3" src="~/assets/img/logo.png" fluid alt="Responsive image"></b-img>
                        <p class="mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <h5>Lokasi</h5>
                        <p>Jl. Am Sangaji No.70, Jakarta Pusat</p>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.7065271913525!2d106.81209671545174!3d-6.170036862184522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f6791ca6b12b%3A0xa69543773f796a6a!2sJl.%20A.M%20Sangaji%20No.70%2C%20RT.12%2FRW.7%2C%20Petojo%20Utara%2C%20Kecamatan%20Gambir%2C%20Kota%20Jakarta%20Pusat%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2010130!5e0!3m2!1sid!2sid!4v1612455788265!5m2!1sid!2sid" width="100%" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        middleware: 'notAuthenticated',
        // page properties go here
        layout: "user",
        head() {
            return {
                title: "Cibateknik - Tentang",
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
