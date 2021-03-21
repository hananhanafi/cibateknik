<template functional>
  <div
    v-show="props.show"
    class="text-center text-small my-4"
  >
    <div v-if="props.show">
      <div class="spinner-border mb-2" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <div>Loading..</div>
    </div>
  </div>
</template>
