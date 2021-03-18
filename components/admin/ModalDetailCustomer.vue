<template>
    <Modal :show="show" centered>

        <div class="modal-header border-bottom-0">
            <h5 id="exampleModalLabel" class="modal-title">{{ data.title || 'Detail Pesanan' }}</h5>
            <button data-bs-dismiss="modal" class="btn-close btn text-danger" type="button" aria-label="Close" @click="$emit('close')"><fa :icon="['fas','times']" /></button>
        </div>
        <div class="modal-body">
            <div class="w-100 text-left">
                <div class="row">
                    <div class="col">
                        <b-img class="w-100" src="~/assets/img/person.png" fluid alt="Responsive image"></b-img>
                    </div>
                    <div class="col">
                        <table>
                            <tr>
                                <td>
                                    Nama
                                </td>
                                <td>
                                    :
                                </td>
                                <td>
                                    Hanan Hanafi
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
                                    Kamis, 21 Desember 2021
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
                                    Kamis, 21 Desember 2021
                                </td>
                            </tr>
                        </table>

                    </div>
                </div>
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
        }
    },
    mounted() {
    },
    methods: {
    }
};
</script>
