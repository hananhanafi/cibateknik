<template>
  <div class="shadow p-4 h-100 d-flex flex-column">
    
    <div class="row mb-4">
      <div class="col">
        <div class="flex-fill">
          <h3>Notifikasi <fa :icon="['fas','bell']" /> </h3>
        </div>
      </div>
      <div class="col-lg-2 col-md-12">
        <a class="btn btn-lg text-danger"><fa class="text-danger" :icon="['fas','trash']" /> Hapus Semua</a>
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
            <div class="col-lg-2 col-md-12 text-center d-flex align-self-center">
              <a class="btn text-primary mx-auto"><fa class="text-primary" :icon="['fas','eye']" /> Lihat</a>
              <a class="btn text-danger mx-auto"><fa class="text-danger" :icon="['fas','trash']" /> Hapus</a>
            </div>
          </div>
          
        </div>
      </div>
    </div>

    <div class="d-flex align-items-end flex-grow-1">
      <div class="text-center w-100">
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center mb-0">
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
      
      items: new Array(5)
    }
  },
}
</script>
