<template>
    <Modal :show="show" centered>

        <div  class="modal-header border-bottom-0">
            <h5 id="exampleModalLabel" class="modal-title">Filter</h5>
            <button data-bs-dismiss="modal" class="btn-close btn text-danger" type="button" aria-label="Close" @click="$emit('close')"><fa :icon="['fas','times']" /></button>
        </div>
        <div class="modal-body">
            <div>
                <!-- <div class="border-bottom mb-2">
                    <h4>Filter</h4>
                </div> -->
                <div>
                    <label>
                        Harga
                    </label>
                    <div>
                        <div class="d-flex">
                            <div class="w-100">
                                <BaseInput
                                    id="min"
                                    v-model="data.min"
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
                                    v-model="data.max"
                                    placeholder="Max"
                                    large
                                    dense
                                    numberonly
                                />
                            </div>
                        </div>

                        <div>
                            <BaseSelect
                            v-model="data.education"
                            label="Urutkan"
                            :options="['Harga Termurah', 'Harga Termahal']"
                            placeholder="Pilih urutkan"
                            dense/>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="modal-footer border-top-0 d-flex">
            <button type="button" class="btn text-dark flex-fill rounded-pill" data-bs-dismiss="modal" @click="$emit('close')">Batal</button>
            <button type="button" class="btn btn-primary flex-fill rounded-pill" @click="$emit('delete')">Terapkan</button>
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
