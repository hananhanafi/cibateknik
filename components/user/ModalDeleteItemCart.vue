<template>
    <Modal :show="show" centered>

        <div v-if="isSubmitStatus=='' || isSubmitStatus == submitStatus.pending">
            <div v-if="data.hasOwnProperty('title')" class="modal-header border-bottom-0">
                <h5 id="exampleModalLabel" class="modal-title">{{ data.title }}</h5>
                <button type="button" class="btn-close btn text-danger" data-bs-dismiss="modal" aria-label="Close">x</button>
            </div>
            <div class="modal-body">
                {{ data.message || 'Yakin ingin menghapus barang dari keranjang?' }}
                
                
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
    methods: {
        
        formatFormData(){
            return {
                userID: this.getUserInfo.userID,
                itemID: this.data.itemID,
                amount: 0
            }
        },
        async onSubmit(){
            const formattedFormData = this.formatFormData();
            this.isSubmitStatus = SUBMIT_STATUS.loading;
            await ApiService.post(`/user/cart/add`, formattedFormData)
            .then(()=>{
                this.isSubmitStatus = SUBMIT_STATUS.success;
                this.$emit('update');
                this.$toast.success('Berhasil menghapus barang dari dalam keranjang.',{icon:'check'});
                this.close();
            })
            .catch(()=>{
                this.isSubmitStatus = SUBMIT_STATUS.error;
                this.$toast.error('Terjadi error, gagal menghapus barang dari dalam keranjang.',{icon:'error'});
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
