<template>
    <Modal :show="show" centered>

        <div v-if="checkoutStatus==submitStatus.success">
            <!-- <div class="modal-header border-bottom-0">
                <h5 id="exampleModalLabel" class="modal-title">Checkout</h5>
            </div> -->
            <div class="modal-body text-center">
                
                <div class="text-40 text-success text-center">
                    <fa :icon="['far','check-circle']"/>
                </div>
                <h6>
                    Berhasil Checkout item
                </h6>
                <div>
                    Silahkan periksa pesanan anda di dalam menu profil > pesanan.
                </div>
                
                
            </div>
            <div class="modal-footer border-top-0 d-flex flex-nowrap">
                <button type="button" class="btn btn-outline-primary w-50" @click="openOrderPage">Ke Pesanan</button>
                <button type="button" class="btn btn-success w-50" @click="openPaymentPage">Bayar</button>
            </div>
        </div>

            
        <!-- loading -->
        <LoadingSpinner :show="checkoutStatus==submitStatus.loading"/>


    </Modal>
</template>

<script>
import { SUBMIT_STATUS } from '~/store/constants';
export default {
    props: {
        show: Boolean,
        data: {
            type: Object,
            default: null,
        },
        checkoutStatus: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
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
        openPaymentPage() {
            window.open(this.data.invoice.invoice_url, '_blank');
            this.openOrderPage();
        },
        openOrderPage() {
            this.$router.push({name: 'user-profile', query: { tab: 'my_order' }});
        },
        close() {
            this.isSubmitStatus='';
            this.$emit('close');
        },
    }
};
</script>
