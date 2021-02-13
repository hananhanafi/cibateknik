<template>
    <Modal :show="show" large centered>

        <div class="modal-header border-bottom-0">
            <h5 id="exampleModalLabel" class="modal-title">Atur Metode Pembayaran</h5>
            <button type="button" class="btn-close btn text-danger" data-bs-dismiss="modal" aria-label="Close"  @click="$emit('close')"><fa :icon="['fas','times']" /></button>
        </div>
        <div class="modal-body">
            
            <div class="btn-group w-100 mb-3" role="group" aria-label="Basic radio toggle button group">
                <input id="btnradio1" v-model="formData.payment" type="radio" value="bank" class="btn-check d-none" name="btnradio" autocomplete="off" checked>

                <input id="btnradio2" v-model="formData.payment" type="radio" value="card" class="btn-check d-none" name="btnradio" autocomplete="off">

                <input id="btnradio3" v-model="formData.payment" type="radio" value="retail" class="btn-check d-none" name="btnradio" autocomplete="off">

                <input id="btnradio4" v-model="formData.payment" type="radio" value="e_wallet" class="btn-check d-none" name="btnradio" autocomplete="off">

                <div class="row w-100 text-center">
                    <div class="col-6">
                        <label class="btn btn-light w-100" :class="formData.payment == 'bank' ? 'active' : ''" for="btnradio1" @click="selected()"><fa :icon="['fas','university']" /> Transfer Bank</label>
                    </div>
                    <div class="col-6">
                        <label class="btn btn-light w-100" :class="formData.payment == 'card' ? 'active' : ''" for="btnradio2" @click="selected()"><fa :icon="['fas','credit-card']" /> Kartu</label>
                    </div>
                    <div class="col-6">
                        <label class="btn btn-light w-100" :class="formData.payment == 'retail' ? 'active' : ''" for="btnradio3" @click="selected()"><fa :icon="['fas','store']" /> Toko Retail</label>
                    </div>
                    <div class="col-6">
                        <label class="btn btn-light w-100" :class="formData.payment == 'e_wallet' ? 'active' : ''" for="btnradio4" @click="selected()"><fa :icon="['fas','wallet']" /> E-Wallet</label>
                    </div>
                </div>
            </div>
            
            
            <div v-if="formData.payment == 'bank'">
                <div>
                    Pilih metode transfer antar bank
                </div>
                <div class="row">
                    <div class="col-5">
                        <div class="input-group">
                            <div class="d-flex align-items-center">
                                <input id="Mandiri" v-model="formData.selectPayment" value="Mandiri" type="radio" aria-label="Radio button for following text input">
                                <label class="btn w-100 text-left mb-0" for="Mandiri">Transfer Bank Mandiri</label>
                            </div>
                        </div>
                        <div class="input-group">
                            <div class="d-flex align-items-center">
                                <input id="BCA" v-model="formData.selectPayment" value="BCA" type="radio" aria-label="Radio button for following text input">
                                <label class="btn w-100 text-left mb-0" for="BCA">Transfer Bank BCA</label>
                            </div>
                        </div>
                        <div class="input-group">
                            <div class="d-flex align-items-center">
                                <input id="BNI" v-model="formData.selectPayment" value="BNI" type="radio" aria-label="Radio button for following text input">
                                <label class="btn w-100 text-left mb-0" for="BNI">Transfer Bank BNI</label>
                            </div>
                        </div>
                        <div class="input-group">
                            <div class="d-flex align-items-center">
                                <input id="BRI" v-model="formData.selectPayment" value="BRI" type="radio" aria-label="Radio button for following text input">
                                <label class="btn w-100 text-left mb-0" for="BRI">Transfer Bank BRI</label>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card p-2">
                            <div>
                                Cara Transfer : 
                            </div>
                            <div>
                                <ol>
                                    <li>Pergi Ke bank</li>
                                    <li>Masukkan Pin Anda</li>
                                    <li>Pilih Transfer</li>
                                    <li>Masukkan jumlah transfer sesuai dengan jumlah</li>
                                    <li>Pilih Kirim</li>
                                    <li>Selesai</li>

                                </ol>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            
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
    data() {
        return {
            
            formData: {
                payment: null,
                selectPayment: null,
            }
        }
    },
    methods: {
        selected(){
            console.log("Fdata",this.formData);
        }
    }
};
</script>
