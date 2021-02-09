<template>
    <Modal :show="show" large centered>

        <div v-if="data.hasOwnProperty('title')" class="modal-header border-bottom-0">
            <h5 id="exampleModalLabel" class="modal-title">{{ data.title }}</h5>
            <button type="button" class="btn-close btn text-danger" data-bs-dismiss="modal" aria-label="Close">x</button>
        </div>
        <div class="modal-body">
            {{ data.message }}
            
            <BaseInput
                id="addressLabel"
                v-model="data.addressLabel"
                label="Label Alamat"
                placeholder="Label Alamat"
            />
            
            <div class="row">
                <div class="col-lg-6 col-sm-12">
                    <BaseInput
                        id="name"
                        v-model="data.name"
                        label="Nama"
                        placeholder="Nama"
                    />
                </div>
                <div class="col-lg-6 col-sm-12">
                    <BaseInput
                        id="phone"
                        v-model="data.phone"
                        label="No Telepon"
                        placeholder="No Telepon"
                    />
                </div>
            </div>
            <div class="row">
                <div class="col-lg-8 col-sm-12">
                    <BaseInput
                        id="city"
                        v-model="data.city"
                        label="Kota atau Kecamatan Tujuan Pengiriman"
                        placeholder="Kota atau Kecamatan Tujuan Pengiriman"
                    />
                </div>
                <div class="col-lg-4 col-sm-12">
                    <BaseInput
                        id="zipCode"
                        v-model="data.zipCode"
                        label="Kode Pos"
                        placeholder="Kode Pos"
                    />
                </div>
            </div>

            
            <BaseTextarea
                v-model="data.description"
                label="Alamat"
                placeholder="Masukkan alamat"
                height="200px"
            />
        </div>
        <div class="modal-footer border-top-0 d-flex">
            <button type="button" class="btn text-dark flex-fill" data-bs-dismiss="modal" @click="$emit('close')">Batal</button>
            <button type="button" class="btn bg-main-color text-white flex-fill">Simpan</button>
        </div>

    </Modal>
</template>

<script>
export default {
    props: {
        show: Boolean,
        data: {
            type: Object,
            default: null
        }
    },
    mounted() {
        console.log("dd",this.data);
    }
};
</script>
