<template>
    <div class="pt-5">
        <div class="container-fluid mt-5">

            <div class="row">
                <div class="col-xl-2  col-lg-3 col-md-4 col-sm-12">
                    <div class="bg-white p-3 shadow-main sticky-top mb-4" style="top:80px;z-index:900">
                        <div class="border-bottom mb-2">
                            <h4>Filter</h4>
                        </div>
                        <div>
                            <label>
                                Harga
                            </label>
                            <div>
                                <div class="d-flex">
                                    <div class="w-100">
                                        <BaseInput
                                            id="min"
                                            v-model="formData.min"
                                            placeholder="Min"
                                            large
                                            dense
                                            numberonly
                                        />
                                    </div>
                                    <div class="mx-2">-</div>
                                    <div class="w-100">
                                        <BaseInput
                                            id="max"
                                            v-model="formData.max"
                                            placeholder="Max"
                                            large
                                            dense
                                            numberonly
                                        />
                                    </div>
                                </div>

                                <div>
                                    <BaseSelect
                                    v-model="formData.education"
                                    label="Urutkan"
                                    :options="['Harga Termurah', 'Harga Termahal']"
                                    placeholder="Pilih urutkan"
                                    dense/>
                                </div>
                            </div>
                            <div class="d-flex">
                                <div class="flex-fill px-2">
                                    <button type="button" class="btn btn-danger text-white w-100">Hapus</button>
                                </div>
                                <div class="flex-fill px-2">
                                    <button type="button" class="btn btn-primary text-white w-100">Terapkan</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    
                    <div class="d-flex mb-2 sticky-top" style="top:80px;z-index:900">
                        <BaseInput
                            id="Cari"
                            placeholder="Cari..."
                            class="mb-0 flex-fill"
                        >
                        <div slot="afterInput" class="position-absolute"
                            style=" right:8px;
                                    top: 50%;
                                    -ms-transform: translateY(-50%);
                                    transform: translateY(-50%);"
                        >
                            <fa class="" :icon="['fas','search']" /> 
                        </div>
                        </BaseInput>
                        <button type="button" class="btn bg-main-color text-white px-4 ml-3">Cari</button>

                    </div>
                    <div class="bg-white p-3 shadow-main">
                        <div class="row">
                            <div v-for="(i) in items" :key="i" class="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-4">
                                <ItemCard/>
                            </div>
                            <div class="col-12 d-flex">
                                <div>
                                    Menampilkan 1 - 10 dari 40 item
                                </div>
                                <div class="ml-auto">
                                    <button class="btn btn-primary border w-100">Muat Lagi</button>
                                </div>
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
        data() {
            return {
                formData: {
                    min: null,
                    max: null,
                    last_education: null,
                },
                last_educationOptions: [],
                items: new Array(18)
            }
        },
        head() {
            return {
                title: "Cibateknik - Cari Barang",
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
