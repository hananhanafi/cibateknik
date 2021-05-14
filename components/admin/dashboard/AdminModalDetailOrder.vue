<template>
    <Modal :show="show" centered @clickOutside="clickOutside">

        <div class="modal-header border-bottom-0">
            <h5 id="exampleModalLabel" class="modal-title">Detail Pesanan</h5>
            <button data-bs-dismiss="modal" class="btn-close btn text-danger" type="button" aria-label="Close" @click="$emit('close')"><fa :icon="['fas','times']" /></button>
        </div>
        <div class="modal-body">

            <div v-if="data" class="mb-3">
                <table class="text-nowrap">
                    <tr>
                        <td>ID Pesanan</td>
                        <td class="text-center" width="40px">:</td>
                        <td>{{ data && data.id }}</td>
                    </tr>
                    <tr>
                        <td>Tanggal Pesanan Dibuat</td>
                        <td class="text-center" width="40px">:</td>
                        <td>{{ data.createdAt && formatDate(data.createdAt._seconds) }}</td>
                    </tr>
                    <tr>
                        <td>Status Pesanan</td>
                        <td class="text-center" width="40px">:</td>
                        <td>
                            <span v-if="data && data.statusOrder=='PENDING'" class="font-weight-bold text-warning">Memesan</span>
                            <span v-else-if="data && data.statusOrder=='EXPIRED'" class="font-weight-bold text-danger">Pesanan Expired</span>
                            <span v-else-if="data && data.statusOrder=='PACKING'" class="font-weight-bold text-primary">Dikemas</span>
                            <span v-else-if="data && data.statusOrder=='SHIPPING'" class="font-weight-bold text-info">Dikirim</span>
                            <span v-else-if="data && data.statusOrder=='DONE'" class="font-weight-bold text-success">Selesai</span>
                        </td>
                    </tr>
                    <tr v-if="data.invoice">
                        <td>Status Pembayaran</td>
                        <td class="text-center" width="40px">:</td>
                        <td>
                            <span v-if="data.invoice.status=='PENDING'">
                                <span class="font-weight-bold text-warning">Belum dibayar 
                                    <div>
                                        ( Expired Invoice : {{ data.invoice && formateDateTime(data.invoice.expiry_date) }} )
                                    </div>
                                </span>
                            </span>
                            <span v-else-if="data.invoice.status=='EXPIRED'">
                                <span class="font-weight-bold text-danger">Invoice Expired
                                </span>
                            </span>
                            <span v-else-if="data.invoice.status=='PAID'">
                                <span class="font-weight-bold text-success">Sudah dibayar
                                    <div>
                                        ( Telah dibayar pada {{ data.invoice && formateDateTime(data.invoice.paid_at) }} )
                                    </div>
                                </span>
                            </span>

                        </td>
                    </tr>
                </table>
            </div>
            
            <div v-if="dataUser" class="card shadow-sm p-3 w-100 text-left mb-3">
                <div class="row">
                    <div class="col-12">
                        <h4>Info Customer</h4>
                    </div>
                    <div class="col-4">
                        <b-img class="w-100" :src="photoURL(dataUser)" fluid alt="Responsive image"></b-img>
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
                                    {{ dataUser && dataUser.firstName + " " +  dataUser && dataUser.lastName }}
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
                                    {{ dataUser && dataUser.email }}
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
                                    {{ dataUser && dataUser.phoneNumber }}
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
                                    {{ dataUser && dataUser.address }}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Tanggal Lahir
                                </td>
                                <td>
                                    :
                                </td>
                                <td>
                                    {{ dataUser && dataUser.dateOfBirth ? dataUser.dateOfBirth.day+"-"+dataUser.dateOfBirth.month+"-"+dataUser.dateOfBirth.year : '-' }}
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
                                    {{ dataUser && formatDate(dataUser.createdAt._seconds) }}
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
                                    {{ dataUser && formatDate(dataUser.lastLogin._seconds) }}
                                </td>
                            </tr>
                        </table>

                    </div>
                </div>
            </div>

            <div v-if="data" class="w-100">

                <div class="shadow-main p-3 mb-3">
                    <div class="row d-flex align-items-center">
                        <div class="col">
                            <div class="d-flex">
                                <h5 class="mb-2">
                                    Alamat Pengiriman
                                </h5>
                            </div>
                            <div v-if="data.address">
                                <table class="text-nowrap">
                                    <tr>
                                        <td>Label</td>
                                        <td class="text-center" width="40px">:</td>
                                        <td>{{ data.address.label }}</td>
                                    </tr>
                                    <tr>
                                        <td>Nama</td>
                                        <td class="text-center">:</td>
                                        <td>{{ data.address.name }}</td>
                                    </tr>
                                    <tr>
                                        <td>No Telepon</td>
                                        <td class="text-center">:</td>
                                        <td>{{ data.address.phone }}</td>
                                    </tr>
                                    <tr>
                                        <td>Alamat</td>
                                        <td class="text-center">:</td>
                                        <td class="text-wrap">{{ data.address.address }}</td>
                                    </tr>
                                    <tr>
                                        <td>Provinsi</td>
                                        <td class="text-center">:</td>
                                        <td class="text-wrap">{{ data.address.province ?data.address.province.label : '-' }}</td>
                                    </tr>
                                    <tr>
                                        <td>Kota</td>
                                        <td class="text-center">:</td>
                                        <td class="text-wrap">{{ data.address.city ? data.address.city.label : '-' }}</td>
                                    </tr>
                                    <tr>
                                        <td>Kode Pos</td>
                                        <td class="text-center">:</td>
                                        <td class="text-wrap">{{ data.address.zipCode }}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="data.detailOrder" class="shadow-main p-3 mb-3 ">
                    <h5>Barang yang dibeli :</h5>
                    <div class="border p-3 d-md-block d-none">
                        <div class="row d-flex align-items-center">
                            <div class="col">
                                Barang
                            </div>
                            <div class="col-2 text-center">
                                Subtotal
                            </div>
                        </div>
                    </div>
                
                    <div>
                        <div v-for="(item,i) in data.detailOrder.items" :key="i" class="border p-3 my-3">
                            <div class="row d-flex align-items-center">
                                <div class="col">
                                    <div class="form-check d-flex align-items-center">
                                        <div class="d-flex align-items-center">
                                            <div>
                                                <img :src="photoURL(item.item)" style="width:80px" class="card-img-top d-inline" alt="item">
                                            </div>
                                            <div>
                                                <h5 class="ml-4">{{ item.item.name}}</h5>
                                                <div class="ml-4">
                                                    Rp {{ toFormatedNumber(item.item.price) }}
                                                    <div>
                                                        Jumlah : {{ item.cart.amount }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 text-center d-md-block d-none">
                                    Rp {{ toFormatedNumber(item.item.price*item.cart.amount) }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="border p-3 mb-3 ">
                        <div class="row d-flex align-items-center font-weight-bold">
                            <div class="col-6">
                                Total :
                            </div>
                            <div class="col text-right">
                                Rp {{ toFormatedNumber(data.detailOrder.totalItemsPrice) }}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="shadow-main p-3 ">
                    <div class="row d-flex align-items-center">
                        <div class="col">
                            <div class="d-flex">
                                <h5 class="mb-2">
                                    Total Tagihan
                                </h5>
                            </div>
                            
                            <table class="text-nowrap w-100">
                                <tr>
                                    <td class="pb-2">
                                        Total Harga Barang ( {{ data.detailOrder && data.detailOrder.items.length+1 }} Barang )
                                    </td>
                                    <td class="text-center font-weight-bold" width="40px">:</td>
                                    <td>Rp {{ data.detailOrder && toFormatedNumber(data.detailOrder.totalItemsPrice) }}</td>
                                </tr>
                                <tr class="border-bottom" >
                                    <td class="pb-3">
                                        Biaya Pengiriman
                                        <div v-if="data.shipment">
                                            {{ data.shipment.service }} ( {{ data.shipment.description }} )
                                            <div>Estimasi : {{ data.shipment.cost[0].etd.includes("HARI") || data.shipment.cost[0].etd.includes("Hari") || data.shipment.cost[0].etd.includes("hari")  ? data.shipment.cost[0].etd : data.shipment.cost[0].etd + " Hari"  }} sejak pengiriman </div>
                                        </div>
                                    </td>
                                    <td class="text-center font-weight-bold" width="40px">:</td>
                                    <td>
                                        <span v-if="data.shipment">Rp {{ toFormatedNumber(data.shipment.cost[0].value) }} </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Total
                                    </td>
                                    <td class="text-center font-weight-bold" width="40px">:</td>
                                    <td>
                                        <span v-if="data.amount">Rp {{ toFormatedNumber(data.amount) }} </span>
                                    </td>
                                </tr>
                            </table>
                        </div>
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
import ApiService from '~/common/api.service';
import { formatDate, toFormatedNumber, toLongDate } from '~/store/helpers';
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
            dataUser: null,
            isLoadingDataUser: false
        }
    },
    watch: {
        show() {
            if(this.show){
                this.loadUserData(this.data.userID);
            }
        }
    },
    methods: {
        async loadUserData(userID) {
            this.isLoadingDataUser = true;
            await ApiService.query(`/admin/data/user/${userID}`)
            .then((Response)=>{
                this.dataUser = Response.data.data;
            })
            .catch(err=>{
                console.log("err",err);
            })
            this.isLoadingDataUser = false;
        },
        clickOutside() {
            this.$emit('close');
        },
        photoURL(item) {
            const url = item.imagesItem ? item.imagesItem[0].imageUrl : process.env.baseUrl+"/_nuxt/assets/img/logo.png"
            return url;
        },
        formateDateTime(dateParam){
            const date = new Date(dateParam);
            const formattedDate = this.toLongDate(date);
            const hour = date.getHours();
            const minute = date.getMinutes();


            return formattedDate+ " " + hour+":"+minute;
        },
        // helpers
        formatDate,
        toLongDate,
        toFormatedNumber
    }
};
</script>
