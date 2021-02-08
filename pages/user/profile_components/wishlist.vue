<template>
  <div class="shadow p-4 h-100 d-flex flex-column">
    
    <div class="row mb-4">
      <div class="col">
        <div class="flex-fill">
          <h3>Wishlist Saya</h3>
        </div>
      </div>
    </div>

    <div class="row">
        <div v-for="(i) in items" :key="i" class="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-4">
            <ItemCard/>
        </div>
        <div class="col-12 d-flex">
            <div>
                Menampilkan 1 - 10 dari 40 item
            </div>
            <div class="ml-auto">
                <button class="btn btn-primary border w-100">Muat Lagi</button>
            </div>
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
      
      items: new Array(18)
    }
  },
}
</script>
