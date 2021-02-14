<template>
    <div class="pt-md-5">
        <div class="container">
            <div class="bg-white p-4 my-md-5 shadow">
                <h2>Kontak</h2>

                <div class="row">
                    <div class="col-12">
                        <h4 class="mt-5">Hubungi Kami :</h4>
                        <div class="row">
                            <div class="col-lg-4 col-md-12">
                                <button type="button" class="btn btn-success w-100 mb-4"><fa :icon="['fab','whatsapp']" />  Whatsapp</button>
                            </div>
                            <div class="col-lg-4 col-md-12">
                                <button type="button" class="btn btn-primary w-100 mb-4"><fa :icon="['fab','facebook']" /> Facebook</button>
                            </div>
                            <div class="col-lg-4 col-md-12">
                                <button type="button" class="btn btn-danger w-100 mb-4"><fa :icon="['fab','instagram']" /> Instagram</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 text-center">
                        <h4>Atau</h4>
                    </div>
                    <div class="col-12">
                        <div class="card shadow-1 p-lg-5 p-3">
                            <h4 class="mb-5">
                                Ingin mengirim pesan ?
                            </h4>
                            <div class="">
                                
                                <b-input-group  class="mb-4">
                                    <b-form-input v-model="Nama" placeholder="Nama"></b-form-input>
                                </b-input-group>
                                <b-input-group  class="mb-4">
                                    <b-form-input v-model="email" placeholder="Email"></b-form-input>
                                </b-input-group>
                                <b-input-group  class="mb-4">
                                    <b-form-textarea
                                        id="textarea-default"
                                        placeholder="Masukkan pesan"
                                        rows="16"
                                        max-rows="16"
                                    ></b-form-textarea>
                                </b-input-group>
                                
                                <button type="button" class="btn btn-light border w-50">Kirim</button>
                            </div>
                        </div>

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
                title: "Cibateknik - Kontak",
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
