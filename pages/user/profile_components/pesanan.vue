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
                <a class="btn btn-sm text-danger mx-auto"><fa class="text-danger" :icon="['fas','trash']" /> Hapus</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="d-flex align-items-end flex-grow-1">
      <div class="text-center w-100">
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item disabled">
              <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

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
      
      items: new Array(10)
    }
  },
}
</script>
