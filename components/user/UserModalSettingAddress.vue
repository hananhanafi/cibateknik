<template>
    <Modal :show="show" reference="setting_address" large centered>

        <div class="modal-header border-bottom-0">
            <h5 id="exampleModalLabel" class="modal-title">Atur Alamat Pengiriman</h5>
            <button type="button" class="btn-close btn text-danger" data-bs-dismiss="modal" aria-label="Close"  @click="$emit('close')"><fa :icon="['fas','times']" /></button>
        </div>
        <div class="modal-body">
            <div class="float-right">
                <a class="btn text-primary" @click="$emit('add-address')"><fa :icon="['fas','plus']" /> Tambah Alamat</a>
            </div>
            
            <div v-if="userAddressesOption.length>0">
                <BaseSelect
                v-model="formData.address"
                name="address"
                class="select-address"
                label="Alamat"
                :options="userAddressesOption"
                placeholder="Pilih Alamat"
                dense/>
            </div>

            
            <div v-else class="text-center my-5 py-5">
                <div class="text-40 text-warning">
                    <fa :icon="['fas','exclamation-circle']"/>
                </div>
                <h6>Alamat tidak ada, silahkan tambahkan alamat pengiriman Anda.</h6>
            </div>
        </div>
        <div class="modal-footer border-top-0 d-flex">
            <button type="button" class="btn text-dark flex-fill" data-bs-dismiss="modal" @click="$emit('close')">Batal</button>
            <button class="btn bg-main-color text-white flex-fill" @click="updateAddress">Simpan</button>
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
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            
            formData: {
                address: null,
            },
            userAddressesOption: this.options.map(address=>{
                return{
                    label: address.label,
                    value: address
                }
            })
        }
    },
    watch: {
        show() {
            this.userAddressesOption = this.options.map(address=>{
                return{
                    label: address.label,
                    value: address
                }
            })
            if(this.data){
                this.formData.address = {
                    label : this.data.label,
                value: this.data
                }
            }
        }
    },
    methods: {
        updateAddress(){
            this.$emit('update-address',this.formData.address);
            this.$emit('close');
        }
    }
};
</script>
