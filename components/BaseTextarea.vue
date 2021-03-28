<template>
  <div class="form-group">
    <label v-if="label">{{ label }}<slot name="afterLabel"/></label>
    <textarea
      v-bind="$attrs"
      class="form-control"
        :class="{ 
                  'is-invalid': error !== undefined && error !== null ,
                }"
      :value="value"
      :style="{ height: height }"
      @input="updateInput"
    ></textarea>
    <div v-if="error" class="form-hint text-danger mt-1">
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseTextarea",
  inheritAttrs: false,
  props: {
    // eslint-disable-next-line vue/require-default-prop
    label: String,
    // eslint-disable-next-line vue/require-default-prop
    value: [String, Number],
    // eslint-disable-next-line vue/require-default-prop
    error: String,
    // eslint-disable-next-line vue/require-default-prop
    height: String
  },
  methods: {
    updateInput(event) {
      this.$emit("input", event.target.value);
    }
  }
};
</script>

