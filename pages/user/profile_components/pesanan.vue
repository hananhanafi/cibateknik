<template>
  <div class="shadow p-4 h-100 d-flex flex-column">
    
    <div class="row mb-4">
      <div class="col">
        <div class="flex-fill">
          <h3>Pesanan</h3>
        </div>
      </div>
      <div class="col-lg-2 col-md-12">
        <BaseSelect
        v-model="formData.sort"
        :options="['Terbaru', 'Terlama']"
        placeholder="Pilih Urutkan"
        />
      </div>
    </div>

  
    <div class="row">
      <div class="col">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Nomor Invoice</th>
              <th scope="col">Tanggal</th>
              <th scope="col">Status</th>
              <th scope="col">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(i) in items" :key="i">
              <th scope="row">123321</th>
              <td>Senin, 8 Februari 2021</td>
              <td><span class="text-success">Pesan</span></td>
              <td width="20%">
                <a class="btn btn-sm text-primary mx-auto"><fa class="text-primary" :icon="['fas','eye']" /> Lihat</a>
                <a class="btn btn-sm text-danger mx-auto"  @click="showModalDeleteItem" ><fa class="text-danger" :icon="['fas','trash']"/> Hapus</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    
    <Pagination/>

    <ModalDeleteItem
        :show="isShowModalDeleteItem"
        :data="{}"
        @close="closeModalDeleteItem"
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
      
      items: new Array(10),
      isShowModalDeleteItem: false, 
    }
  },
  methods: {
      showModalDeleteItem() {
          this.isShowModalDeleteItem = true;
      },
      closeModalDeleteItem() {
          this.isShowModalDeleteItem = false;
      }

  }
}
</script>
