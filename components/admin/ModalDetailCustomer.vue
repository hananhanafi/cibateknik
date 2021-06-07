<template>
    <Modal :show="show" centered>

        <div class="modal-header border-bottom-0">
            <h5 id="exampleModalLabel" class="modal-title">Detail Customer</h5>
            <button data-bs-dismiss="modal" class="btn-close btn text-danger" type="button" aria-label="Close" @click="$emit('close')"><fa :icon="['fas','times']" /></button>
        </div>
        <div class="modal-body">
            <div class="w-100 text-left">
                <div class="row">
                    <div class="col">
                        <b-img class="w-100" :src="photoURL(data)" fluid alt="Responsive image"></b-img>
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
                                    {{ data && data.name }}
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
                                    {{ data && data.email }}
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
                                    {{ data && data.phoneNumber }}
                                </td>
                            </tr>
                            <!-- <tr>
                                <td>
                                    Alamat
                                </td>
                                <td>
                                    :
                                </td>
                                <td>
                                    {{ data && data.address }}
                                </td>
                            </tr> -->
                            <tr>
                                <td>
                                    Tanggal Lahir
                                </td>
                                <td>
                                    :
                                </td>
                                <td>
                                    {{ data && data.dateOfBirth ? data.dateOfBirth.day+"-"+data.dateOfBirth.month+"-"+data.dateOfBirth.year : '-' }}
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
                                    {{ data && formatDate(data.createdAt._seconds) }}
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
                                    {{ data && formatDate(data.lastLogin._seconds) }}
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
import { formatDate } from '../../store/helpers';
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
        photoURL(user) {
            const url = user ? user.photoURL : process.env.baseUrl+"/_nuxt/assets/img/logo-square-white.png"
            return url;
        },

        // helpers
        formatDate
    }
};
</script>
