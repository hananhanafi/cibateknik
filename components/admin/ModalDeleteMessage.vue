<template>
    <Modal :show="show" centered>

        <div v-if="isSubmitStatus=='' || isSubmitStatus == submitStatus.pending">
            <!-- <div class="modal-header border-bottom-0">
                <h5 id="exampleModalLabel" class="modal-title">Hapus pesan</h5>
                <button type="button" class="btn-close btn text-danger" data-bs-dismiss="modal" aria-label="Close">x</button>
            </div> -->
            <div class="modal-body">
                <div class="w-100 text-left">
                    <div class="row">
                        <div class="col-12">
                            <div class="text-center">
                                <div class="text-40 text-warning">
                                    <fa :icon="['fas','exclamation-circle']"/>
                                </div>
                                <h6>
                                    Yakin ingin menghapus ?
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer border-top-0 d-flex">
                <button type="button" class="btn text-dark flex-fill" data-bs-dismiss="modal" @click.prevent="$emit('close')">Batal</button>
                <button type="button" class="btn btn-danger flex-fill" @click.prevent="onSubmit">Hapus</button>
            </div>

        </div>

            
        <!-- loading -->
        <LoadingSpinner :show="isSubmitStatus==submitStatus.loading"/>

        <!-- success -->
        <div v-show="isSubmitStatus==submitStatus.success" class="px-2 text-center">
            <div class="text-40 text-success">
                <fa :icon="['fas','check-circle']"/>
            </div>
            <div class="text-20">
                Berhasil menghapus pesan.
            </div>
            
            <div class="modal-footer border-top-0 d-flex">
                <button type="button" class="btn btn-outline-danger flex-fill" data-bs-dismiss="modal" @click.prevent="close">Tutup</button>
            </div>
        </div>

        <!-- error -->
        <div v-show="isSubmitStatus==submitStatus.error" class="px-2 text-center">
            <div class="text-40 text-danger">
                <fa :icon="['fas','times-circle']"/>
            </div>
            <div class="text-20">
                Gagal menghapus pesan.
            </div>
            
            <div class="modal-footer border-top-0 d-flex">
                <button type="button" class="btn btn-outline-danger flex-fill" data-bs-dismiss="modal" @click.prevent="close">Tutup</button>
            </div>
        </div>

    </Modal>
</template>

<script>
import ApiService from '~/common/api.service';
import { SUBMIT_STATUS } from '~/store/constants';
export default {
    props: {
        show: Boolean,
        data: {
            type: Object,
            default: null,
        }
    },
    data() {
        return {
            isSubmitStatus: '',
            submitStatus: SUBMIT_STATUS,
        }
    },
    computed: {
        isLoggedIn(){
            return this.$store.state.auth;
        },
        getUserInfo(){
            return this.$store.state.userInfo;
        },
    },
    mounted() {
    },
    methods: {
        async onSubmit(){
            this.isSubmitStatus = SUBMIT_STATUS.loading;
            await ApiService.delete(`/user/admin-notification/delete/${this.data.id}`)
            .then((response)=>{
                console.log("res",response);
                this.isSubmitStatus = SUBMIT_STATUS.success;
                this.$emit('update',this.data);
                this.$toast.success('Berhasil menghapus notifikasi.',{icon:'check'});
            })
            .catch(()=>{
                this.isSubmitStatus = SUBMIT_STATUS.error;
                this.$toast.error('Terjadi error, gagal menghapus notifikasi.',{icon:'error'});
            })
        },
        close() {
            this.isSubmitStatus='';
            this.$emit('close');
        },
    }
};
</script>
