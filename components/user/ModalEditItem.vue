<template>
    <Modal :show="show" centered>

        <div v-if="data.hasOwnProperty('title')" class="modal-header border-bottom-0">
            <h5 id="exampleModalLabel" class="modal-title">{{ data.title }}</h5>
            <button type="button" class="btn-close btn text-danger" data-bs-dismiss="modal" aria-label="Close">x</button>
        </div>
        <div class="modal-body">
            
            <div class="row">
                <div class="col-4">
                    <img src="~/assets/img/item.png" class="w-100" alt="item">
                    
                </div>
                <div class="col-8">
                    <div class="">
                        <div class="mb-3">
                            <h2>Ini Judul ItemCard</h2>
                            <h3>
                                Rp 100.000
                            </h3>
                        </div>
                    </div>
                </div>
                
                <div class="col-12 row mt-3">
                    <div class="col-2 mb-2">
                        <img src="~/assets/img/item.png" class="w-100" alt="item">
                    </div>
                    <div class="col-2 mb-2">
                        <img src="~/assets/img/item.png" class="w-100" alt="item">
                    </div>
                    <div class="col-2 mb-2">
                        <img src="~/assets/img/item.png" class="w-100" alt="item">
                    </div>
                    <div class="col-2 mb-2">
                        <img src="~/assets/img/item.png" class="w-100" alt="item">
                    </div>
                    <div class="col-2 mb-2">
                        <img src="~/assets/img/item.png" class="w-100" alt="item">
                    </div>
                </div>
                <div class="col-12">
                    <div>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda eum distinctio accusantium. Veritatis, quos numquam? Praesentium culpa quos quia dicta, reiciendis cumque vero repellendus deserunt beatae expedita commodi at earum consequuntur maiores quibusdam! Qui eaque ipsum voluptate vitae, soluta maiores illum ut alias quia. Quisquam doloremque labore quibusdam facere ea nesciunt. Eligendi quo corporis aperiam architecto provident odit nam id eos asperiores unde consequuntur, veritatis porro sapiente suscipit, illum quia ipsa. Vitae ipsam deserunt ipsum libero sed explicabo culpa cumque autem repellat necessitatibus molestiae natus commodi voluptates sequi quaerat error eos possimus optio consequatur delectus fugit ad, cupiditate voluptatum sint.
                        </p>
                    </div>
                    <div class="text-muted mb-2">
                        Stock : 100
                    </div>
                    <div class="d-flex">
                        <a class="btn bg-main-color text-white"> - </a>
                        
                        <BaseInput
                            id="amount"
                            v-model="formData.amount"
                            placeholder="Jumlah"
                            large
                            dense
                            numberonly
                            class="mb-0 mx-2"
                            style="width:80px"
                        />

                        <a class="btn bg-main-color text-white"> + </a>
                    </div>
                </div>
            </div>
            
            
        </div>
        <div class="modal-footer border-top-0 d-flex">
            <button type="button" class="btn text-dark flex-fill" data-bs-dismiss="modal" @click="$emit('close')">Batal</button>
            <button type="button" class="btn btn-warning flex-fill" @click="$emit('delete')">Edit</button>
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
                amount: 0,
                max: null,
            },
        }
    },
    mounted() {
        console.log("dd",this.data);
    }
};
</script>
