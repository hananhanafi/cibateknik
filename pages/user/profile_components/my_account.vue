<template>
  <div class="shadow p-4 h-100 d-flex flex-column">
    <div class="mb-5">
      <h3>Akun Saya</h3>
    </div>

    <div v-show="isSubmitStatus==submitStatuses.success" class="alert alert-success" role="alert">
      Berhasil Memperbarui Profil
    </div>
    <div v-show="isSubmitStatus==submitStatuses.error" class="alert alert-danger" role="alert">
      Gagal Memperbarui Profil
    </div>


    
    <div class="row">
      <div class="col-lg-4 col-sm-12 order-lg-last order-sm-first order-md-first">
        <div class="shadow-main p-4 text-center mb-4">
            <div class="img-container">
              <img :src="photoURL" class="" 
              alt="Responsive image"> 
            </div>
            <h3>Hanan Hanafi</h3>
            
              <div class="input-group mb-3 d-none">
                <input id="inputGroupFile02" type="file" class="form-control">
              </div>
              <!-- <label for="inputGroupFile02">
                <a class="btn btn-light w-100 border rounded-pill">Pilih Gambar</a>
              </label> -->
              
              <label v-cloak class="c-pointer" @drop.prevent="addFile" @dragover.prevent>
                  <FileInput
                  :max-size="5000000"
                  @inputFiles="addPhoto"
                  @error="errorsPhoto = $event"
                  />
                  <div class="btn btn-outline-dark btn-sm d-flex justify-content-center align-items-center w-100 h-100 p-3">
                      <div>
                          <fa class="text-40" :icon="['fas','cloud-upload-alt']"/>
                          <div>
                              Drag & Drop Photo
                          </div>
                          <div>
                              or
                          </div>
                          <div>
                              <a class="btn btn-dark btn-sm">Upload Photo</a>
                          </div>
                      </div>
                  </div>
              </label>
        </div>
      </div>
      <div class="col-lg-8 col-sm-12">
        <div>

          <div>
            <BaseInput
                id="firstName"
                v-model="formData.firstName"
                label="Nama Awal"
                placeholder="Nama Awal"
                :error="
                    isSubmitStatus == submitStatuses.pending
                    ? !$v.formData.firstName.required 
                        ? 'Nama Awal harus diisi'
                        : null
                    : null
                "
            />
          </div>
          <div>
            <BaseInput
                id="lastName"
                v-model="formData.lastName"
                label="Nama Akhir"
                placeholder="Nama Akhir"
                :error="
                    isSubmitStatus == submitStatuses.pending
                    ? !$v.formData.lastName.required 
                        ? 'Nama Akhir harus diisi'
                        : null
                    : null
                "
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
              dense
              :error="
                  isSubmitStatus == submitStatuses.pending
                  ? !$v.formData.gender.required 
                      ? 'Jenis Kelamin harus diisi'
                      : null
                  : null
              "
              />
          </div>
          
          <div class="row">
            <div class="col-md-4 col-12">
              <BaseSelect
              v-model="formData.dateOfBirth.day"
              label="Tanggal Lahir"
              :options="['1', '2']"
              placeholder="Pilih Tanggal Lahir"
              dense
              :error="
                  isSubmitStatus == submitStatuses.pending
                  ? !$v.formData.dateOfBirth.day.required 
                      ? 'Tanggal Lahir harus diisi'
                      : null
                  : null
              "
              />
            </div>
            <div class="col-md-4 col-12">
              <BaseSelect
              v-model="formData.dateOfBirth.month"
              label="Bulan Lahir"
              :options="['1', '2']"
              placeholder="Pilih Bulan Lahir"
              dense
              :error="
                  isSubmitStatus == submitStatuses.pending
                  ? !$v.formData.dateOfBirth.month.required 
                      ? 'Bulan Lahir harus diisi'
                      : null
                  : null
              "
              />
            </div>
            <div class="col-md-4 col-12">
              <BaseSelect
              v-model="formData.dateOfBirth.year"
              label="Tahun Lahir"
              :options="['2000', '2001']"
              placeholder="Pilih Tahun Lahir"
              dense
              :error="
                  isSubmitStatus == submitStatuses.pending
                  ? !$v.formData.dateOfBirth.year.required 
                      ? 'Tahun Lahir harus diisi'
                      : null
                  : null
              "
              />
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
            <ButtonLoading v-if="isSubmitStatus==submitStatuses.loading" class="btn btn-primary text-white w-100 rounded-pill disabled" />
            <a v-else class="btn btn-primary text-white w-100 rounded-pill" @click.prevent="onSubmit" >Simpan</a>
          </div>
        </div> 
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { SUBMIT_STATUS } from '../../../store/constants';
import ApiService from '~/apis/api.service';
const emptyData ={
        firstName: '',
        lastName: '',
        email: "hanafihanan@mail.id",
        gender : null,
        dateOfBirth: {
          day: null,
          month: null,
          year: null,
        },
        imageUrl : process.env.baseUrl+"/_nuxt/assets/img/dummy.png"
}
export default {  
  mixins: [validationMixin],
  data() {
    return {
      formData: emptyData,
      isSubmitStatus: '',
      submitStatuses: SUBMIT_STATUS,
      photo: null,
    }
  },
  validations: {
      formData :{
          firstName :{ required },
          lastName :{ required },
          email :{ required },
          gender :{ required },
          dateOfBirth :{
            day: {required},
            month: {required},
            year: {required},
          },
      }
  },
  computed: {
      formatInitialFormData(){
        return {
          ...emptyData,
          ...this.getUserInfo
        }
      },
      getUserInfo(){
          return this.$store.state.userInfo;
      },
      formatFormData(){
        return {
          firstName : this.formData.firstName || null,
          lastName : this.formData.lastName || null,
          gender : this.formData.gender || null,
          dateOfBirth : this.formData.dateOfBirth || null,
        }
      },
      photoURL() {
        const url = this.formData.imageUrl || process.env.baseUrl+"/_nuxt/assets/img/dummy.png"
        return url;

        // return this.formData.imageUrl || process.env.baseUrl+"/_nuxt/assets/img/dummy.png";
      }
  },
  mounted() {
    this.formData = this.formatInitialFormData;

    // this.loadData();
  },
  methods: {
    loadData(){
      ApiService.get('/user')
      .then(data=>{
        console.log("dada",data);
      })
    },
    async onSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
          this.isSubmitStatus = SUBMIT_STATUS.pending;
      } else {
        this.isSubmitStatus = SUBMIT_STATUS.loading;
        if(this.photo){
          const dataImage = new FormData();
          dataImage.append("image",this.photo.file);
          await ApiService.postMultiform("/user/image",dataImage)
          .then((response)=>{
            console.log("success",response)
          })
          .catch(err=>{
              this.isSubmitStatus = SUBMIT_STATUS.error;
              console.log("error",err);
          })
        }
        const formattedFormData = this.formatFormData;
        await ApiService.put(`/user`,formattedFormData)
        .then(data=>{
            this.isSubmitStatus = SUBMIT_STATUS.success;
            console.log("success",data);
            this.$store.commit('setUserInfo', data.data.userCredentials);
            this.$emit('update');
            // setTimeout(()=>{
            //   this.reset();
            // },3000)
        })
        .catch(err=>{
            this.isSubmitStatus = SUBMIT_STATUS.error;
            console.log("error",err);
        })
      }
      

    },
    
    addPhoto(files) {
        files.forEach(file => {
            this.photo = {
                objectURL: URL.createObjectURL(file),
                file,
            };
            this.formData.imageUrl = this.photo.objectURL;
        });
    },
    addFile(e) {
        const droppedFiles = e.dataTransfer.files;
        if(!droppedFiles) return;
        // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
        ([...droppedFiles]).forEach(file => {
            this.photo = {
                objectURL: URL.createObjectURL(file),
                file,
            };
            this.formData.imageUrl = this.photo.objectURL;
        });

    },
    deletePhoto(){
        this.photo = null;
        // this.formData.imageUrl = null;
    },
    reset() {
      // this.$nuxt.refresh();
      window.location.reload();
    }
  },
}
</script>
