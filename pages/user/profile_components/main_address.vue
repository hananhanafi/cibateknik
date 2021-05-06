<template>
    <div class="shadow p-4 h-100 d-flex flex-column">
        
        <div class="row mb-4">
            <div class="col">
                <div class="flex-fill">
                <h3>Alamat Utama</h3>
                </div>
            </div>
            <div class="col-lg-6 col-md-12 text-right">
                <a class="btn text-primary" @click="showUserModalAddAddress" ><fa :icon="['fas','plus']" /> Tambah Alamat</a>
            </div>
        </div>

    
        <div v-if="userAddresses.length>0" class="row">
            <div v-for="(address, i) in userAddresses" :key="i" class="col-12" >
                <div class="p-3 shadow-main mb-3">
                    <div class="row">
                        <div class="col">
                            <table class="text-nowrap">
                                <tr>
                                    <td>Label</td>
                                    <td class="text-center" width="40px">:</td>
                                    <td>{{ address.label }} <span v-if="address.isMainAddress && address.isMainAddress === true" class="text-success font-weight-bolder"> (Alamat Utama)</span></td>
                                </tr>
                                <tr>
                                    <td>Nama</td>
                                    <td class="text-center">:</td>
                                    <td>{{ address.name }}</td>
                                </tr>
                                <tr>
                                    <td>No Telepon</td>
                                    <td class="text-center">:</td>
                                    <td>{{ address.phone }}</td>
                                </tr>
                                <tr>
                                    <td>Alamat</td>
                                    <td class="text-center">:</td>
                                    <td class="text-wrap">{{ address.address }}</td>
                                </tr>
                            </table>
                        </div>
                        <div class="col-lg-3 col-md-12">
                            <div class="text-center d-flex flex-column h-100">
                                <button v-if="!address.isMainAddress" :disabled="isLoadingChangeMainAddress" class="btn btn-light border my-3 rounded-pill" @click.prevent="changeMainAddress(address)">Jadikan Utama</button>
                                <div class="text-center mt-auto flex-grow-1 d-flex align-items-center">
                                    <a class="btn text-warning mx-auto" @click="showUserModalEditAddress(address)"><fa class="text-warning" :icon="['fas','pencil-alt']" /> Edit</a>
                                    <a class="btn text-danger mx-auto" @click="showModalDeleteAddress(address)"><fa class="text-danger" :icon="['fas','trash']" /> Hapus</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="!isLoadingData" class="text-center my-5 py-5">
            <div class="text-40 text-warning">
                <fa :icon="['fas','exclamation-circle']"/>
            </div>
            <h3>Alamat tidak ada.</h3>
        </div>
        <div v-if="isLoadingData" class="row">
            <div class="col">
                <LoadingSpinner :show="isLoadingData"/>
            </div>
        </div>

        <UserModalAddAddress
            :show="isShowUserModalAddAddress"
            @close="closeUserModalAddAddress"
            @update="addNewAddress($event)"
        />

        <UserModalEditAddress
            :show="isShowUserModalEditAddress"
            :data="currentAddress"
            @close="closeUserModalEditAddress"
            @update="updateAddressHandler($event)"
        />
        <ModalDeleteAddress
            :show="isShowModalDeleteAddress"
            :data="currentAddress"
            @close="closeModalDeleteAddress"
            @update="deleteUpdateHandler($event)"
        />

    </div>
</template>

<script>
import ApiService from '~/common/api.service';
export default {
    data() {
        return {
        userAddresses: [],
        isLoadingData: true,
        currentAddress: null,
        
        isShowUserModalAddAddress: false,
        isShowUserModalEditAddress: false,
        isShowModalDeleteAddress: false,
            
        isLoadingChangeMainAddress: false,
        }
    },
    created() {
        this.loadData();
    },
    methods: {
        deleteUpdateHandler(value) {
            this.userAddresses = this.userAddresses.filter(address=>{return address.addressID !== value.addressID});
        },
        updateAddressHandler(value) {
            this.userAddresses = this.userAddresses.filter(address=>{return address.addressID !== value.addressID});
            this.userAddresses.push(value);
        },
        addNewAddress(value){
            this.userAddresses.push(value);
        },
        async changeMainAddress(address){
            this.isLoadingChangeMainAddress = true;
            await ApiService.post(`/user/main-address/update/${address.addressID}`).then(()=>{
                const currentMainAddress = this.userAddresses.find(address=>address.isMainAddress===true);
                currentMainAddress.isMainAddress = false;
                address.isMainAddress = true;
            })
            .catch(err=>{
                console.log("err",err);
            })
            this.isLoadingChangeMainAddress = false;

        },
        async loadData() {
            this.isLoadingData = true;
            await ApiService.query('/user/address')
            .then((response)=>{
                this.userAddresses = response.data;

            })
            .catch(err=>{
                console.log("err",err);
            })
            this.isLoadingData = false;
        },
        showUserModalAddAddress() {
            this.isShowUserModalAddAddress = true;
        },
        closeUserModalAddAddress() {
            this.isShowUserModalAddAddress = false;
        },
        showUserModalEditAddress(address) {
            this.currentAddress = Object.assign({},address);
            this.isShowUserModalEditAddress = true;
        },
        closeUserModalEditAddress() {
            this.currentAddress = null;
            this.isShowUserModalEditAddress = false;
        },
        showModalDeleteAddress(address) {
            this.currentAddress = Object.assign({},address);
            this.isShowModalDeleteAddress = true;
        },
        closeModalDeleteAddress() {
            this.currentAddress = null;
            this.isShowModalDeleteAddress = false;
        }
    }
}
</script>
