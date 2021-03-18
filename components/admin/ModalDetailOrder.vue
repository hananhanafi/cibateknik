<template>
    <Modal :show="show" centered>

        <div class="modal-header border-bottom-0">
            <h5 id="exampleModalLabel" class="modal-title">{{ data.title || 'Detail Pesanan' }}</h5>
            <button data-bs-dismiss="modal" class="btn-close btn text-danger" type="button" aria-label="Close" @click="$emit('close')"><fa :icon="['fas','times']" /></button>
        </div>
        <div class="modal-body">
            <div class="w-100 text-left">
                <table class="modalInfo">
                    <tr>
                        <td style="width:50%">
                            Nama
                        </td>
                        <td>
                            :
                        </td>
                        <td>
                            {{data ? data.name.first : ''}} {{data ? data.name.first : ''}}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Email
                        </td>
                        <td>
                            :
                        </td>
                        <td>
                            hanafi@mail.com
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Nomor HP
                        </td>
                        <td>
                            :
                        </td>
                        <td>
                            081234567890
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Alamat
                        </td>
                        <td>
                            :
                        </td>
                        <td>
                            Jl. Rawa sawah III RT 06/02 No.5 Jakarta
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Tanggal Daftar
                        </td>
                        <td>
                            :
                        </td>
                        <td>
                            {{data ? data.date : ''}}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Terakhir Online
                        </td>
                        <td>
                            :
                        </td>
                        <td>
                            {{data ? data.date : ''}}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            Nama
                        </td>
                        <td>
                            :
                        </td>
                        <td>
                            {{data ? data.name.first : ''}} {{data ? data.name.first : ''}}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Tanggal Order
                        </td>
                        <td>
                            :
                        </td>
                        <td>
                            {{data ? data.date : ''}}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Status Order
                        </td>
                        <td>
                            :
                        </td>
                        <td>
                            {{data ? data.status : ''}}
                        </td>
                    </tr>
                    <tr>
                        <td style="vertical-align:top">
                            Pesanan
                        </td>
                        <td style="vertical-align:top">
                            :
                        </td>
                        <td>
                            <ul>
                                <li>
                                    Endmill 20 buah
                                </li>
                                <li>
                                    Endmill 20 buah
                                </li>
                                <li>
                                    Endmill 20 buah
                                </li>
                            </ul>
                        </td>
                    </tr>
                    
                </table>
            </div>
            
        </div>
        <div class="modal-footer border-top-0 d-flex">
            <button type="button" class="btn btn-outline-danger flex-fill" data-bs-dismiss="modal" @click="$emit('close')">Tutup</button>
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
            additionalInformations: [{
                name: null,
            }],

        }
    },
    mounted() {
    },
    methods: {
        addInfo(){
            // this.additionalInformations = this.additionalInformations+1;
            this.additionalInformations.push({name:null})
        },
        minInfo(index){
            if(this.additionalInformations.length>1){
                // this.additionalInformations = this.additionalInformations-1;
                this.additionalInformations.splice(index,1);
            }
        },
    }
};
</script>
