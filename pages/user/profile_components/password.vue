<template>
  <div class="shadow p-4 h-100 d-flex flex-column">
    <div class="mb-5">
      <h3>Atur Password</h3>
    </div>
    
    <div class="row">
      <div class="col-lg-8 col-sm-12">
        <div>
          <div>
            <BaseInput
                id="Password"
                v-model="formData.password"
                label="Password"
                placeholder="Password"
                type="password"
                
            />
            <BaseInput
                id="Password"
                v-model="formData.newPassword"
                label="Password Baru"
                placeholder="Password Baru"
                type="password"
            />
            <BaseInput
                id="Password"
                v-model="formData.newPasswordConfirmation"
                label="Konfirmasi Password Baru"
                placeholder="Konfirmasi Password Baru"
                type="password"
            />
          </div>

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
        password: "",
        newPassword: "",
        newPasswordConfirmation: "",
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
