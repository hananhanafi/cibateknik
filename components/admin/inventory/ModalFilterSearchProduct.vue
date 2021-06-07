<template>
    <Modal :show="show" centered>

        <div  class="modal-header border-bottom-0">
            <h5 id="exampleModalLabel" class="modal-title">Filter</h5>
            <button data-bs-dismiss="modal" class="btn-close btn text-danger" type="button" aria-label="Close" @click="$emit('close')"><fa :icon="['fas','times']" /></button>
        </div>
        <div class="modal-body">
            <div class="text-left">
                <!-- <div class="border-bottom mb-2">
                    <h4>Filter</h4>
                </div> -->
                
                <BaseSelect
                v-model="formData.category"
                :options="options.category"
                label="Kategori"
                placeholder="Pilih Kategori"
                dense
                />

                
                <BaseSelect
                v-model="formData.brand"
                :options="options.brand"
                label="Merek"
                placeholder="Pilih Merek"
                dense
                />

                
                <BaseSelect
                v-model="formData.supplier"
                :options="options.supplier"
                label="Supplier"
                placeholder="Pilih Supplier"
                dense
                />
            </div>
            
        </div>
        <div class="modal-footer border-top-0 d-flex">
            <button type="button" class="btn text-danger flex-fill rounded-pill" data-bs-dismiss="modal" @click="reset">Hapus Penerapan</button>
            <button type="button" class="btn btn-primary flex-fill rounded-pill" @click="filterUpdate">Terapkan</button>
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
        },
        options: {
            type: Object,
            default() {
                return {
                    category: [],
                    brand: [],
                    supplier: [],
                }
            }
        }
    },
    data() {
        return{
            formData: {
                brand: null,
                category: null,
                supplier: null,
            }
        }
    },
    methods: {
        filterUpdate() {
            this.$emit('update',this.formData);
            this.$emit('close');
        },
        reset() {
            this.formData = {
                brand: null,
                category: null,
                supplier: null,
            };
        }
    }
};
</script>
