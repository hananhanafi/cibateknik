<template>
    <Modal :show="show" centered>

        <div v-if="isSubmitStatus=='' || isSubmitStatus == submitStatus.pending">
            <!-- <div class="modal-header border-bottom-0">
                <h5 id="exampleModalLabel" class="modal-title">Hapus Alamat</h5>
                <button type="button" class="btn-close btn text-danger" data-bs-dismiss="modal" aria-label="Close">x</button>
            </div> -->
            <div class="modal-body">
                Yakin ingin menghapus alamat ?
            </div>
            <div class="modal-footer border-top-0 d-flex">
                <button type="button" class="btn text-dark flex-fill" data-bs-dismiss="modal" @click.prevent="$emit('close')">Batal</button>
                <button type="button" class="btn btn-danger flex-fill" @click.prevent="onSubmit">Hapus</button>
            </div>

        </div>

            
        <!-- loading -->
        <LoadingSpinner :show="isSubmitStatus==submitStatus.loading"/>

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
            await ApiService.delete(`/user/address/${this.data.addressID}`)
            .then((response)=>{
                this.isSubmitStatus = SUBMIT_STATUS.success;
                this.$emit('update',response.data.data);
                this.$toast.success('Berhasil menghapus alamat.',{icon:'check'})
                this.close();
            })
            .catch(()=>{
                this.isSubmitStatus = SUBMIT_STATUS.error;
                this.$toast.error('Gagal menghapus alamat.',{icon:'error'})
                this.close();
            })
        },
        close() {
            this.isSubmitStatus='';
            this.$emit('close');
        },
    }
};
</script>
