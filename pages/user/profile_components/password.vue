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
                :error="
                    isSubmitStatus == submitStatuses.pending
                    ? !$v.formData.password.required 
                        ? 'Password lama harus diisi'
                        : null
                    : null
                "
                
            />
            <BaseInput
                id="Password"
                v-model="formData.newPassword"
                label="Password Baru"
                placeholder="Password Baru"
                type="password"
                :error="
                    isSubmitStatus == submitStatuses.pending
                    ? !$v.formData.newPassword.required 
                        ? 'Password baru harus diisi'
                        : null
                    : null
                "
            />
            <BaseInput
                id="Password"
                v-model="formData.newPasswordConfirmation"
                label="Konfirmasi Password Baru"
                placeholder="Konfirmasi Password Baru"
                type="password"
                :error="
                    isSubmitStatus == submitStatuses.pending
                    ? !$v.formData.newPasswordConfirmation.required 
                        ? 'Konfirmasi password baru harus diisi'
                        : null
                    : null
                "
            />
            
            <div v-show="isSubmitStatus == submitStatuses.pending && !$v.formData.newPasswordConfirmation.sameAsPassword " class="alert alert-danger">
                Password baru tidak sama.
            </div>
            <div v-if="errors" class="alert alert-danger">
                {{ errors.message || 'Error' }}
            </div>
          </div>

        </div>
      </div>
    </div>

    

    <div class="d-flex align-items-end flex-grow-1">
      <div class="w-100">
        <!-- <a class="btn btn-primary text-white w-50">Simpan</a> -->
        <div class="row justify-content-center">
          <div class="col-lg-4 col-md-12 mt-4">
            <ButtonLoading v-if="isSubmitStatus==submitStatuses.loading" class="btn btn-primary text-white w-100 rounded-pill disabled" />
            <a v-else class="btn btn-primary text-white w-100 rounded-pill" @click.prevent="onSubmit">Simpan</a>
          </div>
        </div> 
      </div>
    </div>

    <!-- modalloading -->
    <Modal :show="isLoading" centered>
        <!-- loading -->
        <LoadingSpinner :show="isLoading"/>

    </Modal>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, sameAs } from 'vuelidate/lib/validators';
import { SUBMIT_STATUS } from '../../../store/constants';
import ApiService from '~/common/api.service';
export default {
  mixins: [validationMixin],
  data() {
    return {
      formData: {
        password: "",
        newPassword: "",
        newPasswordConfirmation: "",
      },
      isSubmitStatus: '',
      submitStatuses: SUBMIT_STATUS,
      errors: null,
      isLoading: false,
    }
  },
  validations: {
      formData :{
          password: { required },
          newPassword: { required },
          newPasswordConfirmation: { required, sameAsPassword: sameAs('newPassword') },
      },


  },
  computed: {
    formatFormData(){
      return {
        password : this.formData.password || null,
        newPassword : this.formData.newPassword || null,
        newPasswordConfirmation : this.formData.newPasswordConfirmation || null,
      }
    },
  },
  methods: {
    
    async onSubmit() {
      this.$v.$touch();

      if (this.$v.$invalid) {
          this.isSubmitStatus = SUBMIT_STATUS.pending;
      } else {
        this.isSubmitStatus = SUBMIT_STATUS.loading;

        const formattedFormData = this.formatFormData;
        await ApiService.post(`/user/password/update`,formattedFormData)
        .then(()=>{
            this.isSubmitStatus = SUBMIT_STATUS.success;
            this.$toast.success('Berhasil memperbarui password, silahkan masuk kembali dengan password baru.',{icon:'check'});
            this.logout();
        })
        .catch(err=>{
            this.isSubmitStatus = SUBMIT_STATUS.error;
            const response = {err};
            this.errors = response.err.response.data;
        })
      }
      

    },
    logout() {
        this.isLoading = true;
        this.$store.commit('purgeAuth');
        this.$router.push('/user/login');
        //  // Code will also be required to invalidate the JWT Cookie on external API
        // await ApiService.post(`/user/logout/${this.getUserInfo.userID}`).then(()=>{
        //     this.$store.commit('purgeAuth');
        //     this.$router.push('/user/login');
        //     this.$toast.success('Berhasil keluar',{icon:'check'})

        // }).catch(()=>{
        //     this.$store.commit('purgeAuth');
        //     this.$router.push('/user/login');
        //     this.$toast.error('Error while logout',{icon:'error'})

        // })
        this.isLoading = false;
    },
  }
}
</script>
