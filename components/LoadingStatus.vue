<template functional>
  <div
    v-show="props.isLoading || props.isError"
    class="text-center text-small my-4"
  >
    <div v-if="props.isLoading">
      <div class="loading-spinner mb-2"></div>
      <!-- <div>Memuat data..</div> -->
    </div>
    <div v-if="props.isError">
      <div class="mb-3">Gagal memuat data</div>
      <button class="btn btn-secondary-outline" @click="listeners['reload']()">
        Muat ulang
      </button>
    </div>
  </div>
</template>
