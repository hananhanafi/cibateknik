<template>
    <div class="text-center">
        <b-container>
            <!-- <h1 class="red">Customer admin</h1> -->
            <div class="bg-white shadow rounded-8 p-4 text-left ">
                <h1>Katalog Barang</h1>
                <b-row>
                    <b-col md="8">
                        <b-form-input class="rounded-pill mb-2" placeholder="Cari Nama Barang"></b-form-input>
                    </b-col>
                    <b-col md="2">
                        <b-form-select v-model="selected" class="rounded-pill mb-2" :options="options"></b-form-select>
                    </b-col>
                    <b-col md="2">
                        <b-button  id="show-btn"  class="rounded-pill text-white w-100" variant="danger" @click="showModal">Tambah</b-button>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col md="3">
                        <b-card title="Title" img-src="https://ecs7.tokopedia.net/img/cache/700/product-1/2017/5/1/178052659/178052659_01cb8620-13b5-468f-a065-f6e0ecbbef43_2048_0.jpg" img-alt="Image" img-top>
                            <b-card-text>
                                This is a wider card with supporting text below as a natural lead-in to additional content.
                                This content is a little bit longer.
                            </b-card-text>
                            <template #footer>
                                <small class="text-muted">Last updated 3 mins ago</small>
                            </template>
                        </b-card>
                    </b-col>
                    <b-col md="3">
                        <b-card title="Title" img-src="https://ecs7.tokopedia.net/img/cache/700/product-1/2017/5/1/178052659/178052659_01cb8620-13b5-468f-a065-f6e0ecbbef43_2048_0.jpg" img-alt="Image" img-top>
                            <b-card-text>
                                This is a wider card with supporting text below as a natural lead-in to additional content.
                                This content is a little bit longer.
                            </b-card-text>
                            <template #footer>
                                <small class="text-muted">Last updated 3 mins ago</small>
                            </template>
                        </b-card>
                    </b-col>
                    <b-col md="3">
                        <b-card title="Title" img-src="https://ecs7.tokopedia.net/img/cache/700/product-1/2017/5/1/178052659/178052659_01cb8620-13b5-468f-a065-f6e0ecbbef43_2048_0.jpg" img-alt="Image" img-top>
                            <b-card-text>
                                This is a wider card with supporting text below as a natural lead-in to additional content.
                                This content is a little bit longer.
                            </b-card-text>
                            <template #footer>
                                <small class="text-muted">Last updated 3 mins ago</small>
                            </template>
                        </b-card>
                    </b-col>
                    <b-col md="3">
                        <b-card title="Title" img-src="https://ecs7.tokopedia.net/img/cache/700/product-1/2017/5/1/178052659/178052659_01cb8620-13b5-468f-a065-f6e0ecbbef43_2048_0.jpg" img-alt="Image" img-top>
                            <b-card-text>
                                This is a wider card with supporting text below as a natural lead-in to additional content.
                                This content is a little bit longer.
                            </b-card-text>
                            <template #footer>
                                <small class="text-muted">Last updated 3 mins ago</small>
                            </template>
                        </b-card>
                    </b-col>

                    
                    <b-col md="3">
                        <b-card title="Title" img-src="https://ecs7.tokopedia.net/img/cache/700/product-1/2017/5/1/178052659/178052659_01cb8620-13b5-468f-a065-f6e0ecbbef43_2048_0.jpg" img-alt="Image" img-top>
                            <b-card-text>
                                This is a wider card with supporting text below as a natural lead-in to additional content.
                                This content is a little bit longer.
                            </b-card-text>
                            <template #footer>
                                <small class="text-muted">Last updated 3 mins ago</small>
                            </template>
                        </b-card>
                    </b-col>
                    
                    <b-col md="3">
                        <b-card title="Title" img-src="https://ecs7.tokopedia.net/img/cache/700/product-1/2017/5/1/178052659/178052659_01cb8620-13b5-468f-a065-f6e0ecbbef43_2048_0.jpg" img-alt="Image" img-top>
                            <b-card-text>
                                This is a wider card with supporting text below as a natural lead-in to additional content.
                                This content is a little bit longer.
                            </b-card-text>
                            <template #footer>
                                <small class="text-muted">Last updated 3 mins ago</small>
                            </template>
                        </b-card>
                    </b-col>
                    
                    <b-col md="3">
                        <b-card title="Title" img-src="https://ecs7.tokopedia.net/img/cache/700/product-1/2017/5/1/178052659/178052659_01cb8620-13b5-468f-a065-f6e0ecbbef43_2048_0.jpg" img-alt="Image" img-top>
                            <b-card-text>
                                This is a wider card with supporting text below as a natural lead-in to additional content.
                                This content is a little bit longer.
                            </b-card-text>
                            <template #footer>
                                <small class="text-muted">Last updated 3 mins ago</small>
                            </template>
                        </b-card>
                    </b-col>
                    
                    <b-col md="3">
                        <b-card title="Title" img-src="https://ecs7.tokopedia.net/img/cache/700/product-1/2017/5/1/178052659/178052659_01cb8620-13b5-468f-a065-f6e0ecbbef43_2048_0.jpg" img-alt="Image" img-top>
                            <b-card-text>
                                This is a wider card with supporting text below as a natural lead-in to additional content.
                                This content is a little bit longer.
                            </b-card-text>
                            <template #footer>
                                <small class="text-muted">Last updated 3 mins ago</small>
                            </template>
                        </b-card>
                    </b-col>
                </b-row>
                <div class="w-50 mx-auto mt-3">
                    <b-pagination
                    v-model="currentPage"
                    :total-rows="totalRows"
                    :per-page="perPage"
                    align="fill"
                    size="sm"
                    class="my-0"
                    ></b-pagination>
                </div>

            </div>
        </b-container>

        <b-modal ref="my-modal" hide-footer>
            <div class="d-block text-center">
                <h5>Tambahkan barang ke dalam katalog</h5>
                
                <div class="mb-3 text-left">
                    <div class="mb-3">
                        <h6>Pilih Produk</h6>
                        <b-form-select v-model="selected" :options="options"></b-form-select>
                    </div>

                    <div v-show="selected" class="mb-3">
                        <h6>Pilih Barang</h6>
                        <b-form-select v-show="selected" v-model="selectedItem" :options="optionsItem"></b-form-select>
                    </div>
                    <div v-show="selectedItem">
                        <h6>Informasi Tambahan Barang</h6>
                        <b-form-textarea
                        id="textarea"
                        v-model="text"
                        placeholder="Masukkan Informasi Tambahan Barang"
                        rows="3"
                        max-rows="6"
                        ></b-form-textarea>
                    </div>
                    <!-- <b-form-select v-model="selected" :options="options" size="sm" class="mt-3"></b-form-select> -->
                    <!-- <div class="mt-3">Selected: <strong>{{ selected }}</strong></div> -->
                </div>
            </div>
            <b-row>
                <b-col>
                    <b-button variant="primary" block @click="hideModal">Batal</b-button>
                </b-col>
                <b-col>
                    <b-button variant="success" block @click="toggleModal">Simpan</b-button>
                </b-col>
            </b-row>
        </b-modal>
    </div>
</template>

<script>
    export default {
        // page properties go here
        layout: "admin",
        data() {
            return {
                
                text: '',
                selected: null,
                options: [
                    { value: null, text: 'Pilih Produk' },
                    { value: 'a', text: 'Produk 1' },
                    { value: 'b', text: 'Produk 2' },
                ],
                selectedItem: null,
                optionsItem: [
                    { value: null, text: 'Pilih Barang' },
                    { value: 'a', text: 'Barang 1' },
                    { value: 'b', text: 'Barang 2' },
                ]
            }
        },
        methods: {
            showModal() {
                this.$refs['my-modal'].show()
            },
            hideModal() {
                this.$refs['my-modal'].hide()
            },
            toggleModal() {
                // We pass the ID of the button that we want to return focus to
                // when the modal has hidden
                this.$refs['my-modal'].toggle('#toggle-btn')
            },
        }
    }
</script>

<style>
    .red {
    color: red;
    }
</style>