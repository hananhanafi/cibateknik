<template>
  <div class="shadow p-4 h-100 d-flex flex-column">
    
    <div class="row mb-4">
      <div class="col">
        <div class="flex-fill">
          <h3>Notifikasi <fa :icon="['fas','bell']" /> </h3>
        </div>
      </div>
      <div class="col-lg-6 col-md-12 text-right">
        <a class="btn btn-sm text-danger" @click="showModalDeleteAllItem"><fa class="text-danger" :icon="['fas','trash']" /> Hapus Semua</a>
      </div>
    </div>

  
    <div class="row">
      <div v-for="(i) in items" :key="i" class="col-12" >
        <div class="p-3 shadow-main mb-3 " style="max-height:160px;min-height:120px">
          <div class="row">
            <div class="col">
              <div class="d-flex">
                <div>
                  <h5>Title Notifikasi</h5>
                </div>
                <div class="text-muted ml-4">
                  Senin, 8 Februari 2021
                </div>
              </div>
              <div class="truncate-paragraph">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque deleniti eveniet pariatur ut, asperiores quas, optio nostrum amet error inventore esse, placeat ipsa architecto quam voluptatum consectetur odio? Tempore nesciunt adipisci beatae culpa, quam repellendus? Deleniti odit itaque, soluta officiis neque et nesciunt nisi beatae a dignissimos amet accusamus quis aperiam molestias earum quae nemo id qui consequatur hic harum laudantium vitae. Voluptatem, vel? Ducimus, nesciunt eaque at voluptatibus eos iusto. Facilis, odit sapiente vero iste autem qui dicta delectus quas maxime illum perferendis accusamus dignissimos at! Incidunt, eum nisi! Delectus magnam, vel dignissimos cumque praesentium voluptatem corporis ut nemo.
              </div>
            </div>
            <div class="col-lg-3 col-md-12 text-center d-flex align-self-center">
              <a class="btn btn-sm text-primary mx-auto"><fa class="text-primary" :icon="['fas','eye']" /> Lihat</a>
              <a class="btn btn-sm text-danger mx-auto"  @click="showModalDeleteItem" ><fa class="text-danger" :icon="['fas','trash']"/> Hapus</a>
            </div>
          </div>
          
        </div>
      </div>
    </div>

    

      <ModalDeleteItem
          :show="isShowModalDeleteItem"
          :data="{}"
          @close="closeModalDeleteItem"
      />
    

      <ModalDeleteItem
          :show="isShowModalDeleteAllItem"
          :data="{message:'Yakin ingin menghapus semua?'}"
          @close="closeModalDeleteAllItem"
      />
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: "hanafihanan",
        nama: "Hanan Hanafi",
        email: "hanafihanan@mail.id",
        sort : null,
        date: {
          day: null,
          month: null,
          year: null,
        },
      },
      
      items: new Array(5),
      isShowModalDeleteItem: false, 
      isShowModalDeleteAllItem: false, 
    }
  },
  methods: {
      showModalDeleteItem() {
          this.isShowModalDeleteItem = true;
      },
      closeModalDeleteItem() {
          this.isShowModalDeleteItem = false;
      },
      showModalDeleteAllItem() {
          this.isShowModalDeleteAllItem = true;
      },
      closeModalDeleteAllItem() {
          this.isShowModalDeleteAllItem = false;
      }

  }
}
</script>
