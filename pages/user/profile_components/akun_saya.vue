<template>
  <div class="shadow p-4 h-100 d-flex flex-column">
    <div class="mb-5">
      <h3>Akun Saya</h3>
    </div>
    
    <div class="row">
      <div class="col-lg-4 col-sm-12 order-lg-last order-sm-first order-md-first">
        <div class="shadow-main p-4 text-center mb-4">
            <img src="~/assets/img/person.png" class="img-fluid rounded-circle w-100 mb-2"  alt="Responsive image"> 
            <h3>Hanan Hanafi</h3>
            
              <div class="input-group mb-3 d-none">
                <input type="file" class="form-control" id="inputGroupFile02">
              </div>
              <label for="inputGroupFile02">
                <a class="btn btn-light w-100 border">Pilih Gambar</a>
              </label>
        </div>
      </div>
      <div class="col-lg-8 col-sm-12">
        <div>
          <div>
            <BaseInput
                id="username"
                v-model="formData.username"
                label="Username"
                placeholder="Username"
                disabled
            />
          </div>
          <div>
            <BaseInput
                id="nama"
                v-model="formData.nama"
                label="Nama"
                placeholder="Nama"
                numberonly
            />
          </div>
          <div>
            <BaseInput
                id="email"
                v-model="formData.email"
                label="Email"
                placeholder="Email"
                disabled
            />
          </div>
          
          <div>
              <BaseSelect
              v-model="formData.gender"
              label="Jenis Kelamin"
              :options="['Laki-laki', 'Perempuan']"
              placeholder="Pilih Jenis Kelamin"
              dense/>
          </div>
          
          <div class="row">
            <div class="col">
              <BaseSelect
              v-model="formData.date.day"
              label="Tanggal Lahir"
              :options="['1', '2']"
              placeholder="Pilih Tanggal Lahir"
              dense/>
            </div>
            <div class="col">
              <BaseSelect
              v-model="formData.date.month"
              label="Bulan Lahir"
              :options="['1', '2']"
              placeholder="Pilih Bulan Lahir"
              dense/>
            </div>
            <div class="col">
              <BaseSelect
              v-model="formData.date.year"
              label="Tahun Lahir"
              :options="['2000', '2001']"
              placeholder="Pilih Tahun Lahir"
              dense/>
            </div>
          </div>

          <!-- <div class="row">
            <div class="col-lg-4 col-md-12 mt-4">
              <a class="btn btn-primary text-white w-100">Simpan</a>
            </div>
          </div> -->
          

        </div>
      </div>
    </div>

    

    <div class="d-flex align-items-end flex-grow-1">
      <div class="w-100">
        <!-- <a class="btn btn-primary text-white w-50">Simpan</a> -->
        <div class="row justify-content-center">
          <div class="col-lg-4 col-md-12 mt-4">
            <a class="btn btn-primary text-white w-100">Simpan</a>
          </div>
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
        gender : null,
        date: {
          day: null,
          month: null,
          year: null,
        }
      }
    }
  }
}
</script>
