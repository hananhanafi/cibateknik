<template>
  <div
    class="form-group"
    :class="{
      'form-group-dense': dense !== undefined,
      'form-group-lg': large !== undefined
    }"
  >
    <label v-if="label">{{ label }}<slot name="afterLabel"/></label>
    <div class="input-group">
      <slot name="beforeInput" />
      <Multiselect
        :class="{ 
                  'border border-danger': error !== undefined && error !== null ,
                }"
        :value="value"
        :label="isArrayOfString ? null : 'label'"
        v-bind="$attrs"
        select-label=""
        deselect-label=""
        selected-label=""
        open-direction="bottom"
        @input="updateInput"
        @search-change="$emit('search-change', $event)"
      >
        <template #noOptions
          ><span>{{ $props.noOptionsLabel }}</span></template
        >
      </Multiselect>
      <slot name="afterInput" />
    </div>
    <div v-if="error" class="form-hint text-danger mt-1">
      {{ error }}
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
export default {
  name: "BaseSelect",
  components: {
    Multiselect
  },
  inheritAttrs: false,
  props: {
    // eslint-disable-next-line vue/require-default-prop
    label: String,
    // eslint-disable-next-line vue/require-default-prop
    value: [Object, String],
    // eslint-disable-next-line vue/require-default-prop
    error: String,
    // eslint-disable-next-line vue/require-default-prop
    noOptionsLabel: String,
    dense: {
      type: Boolean,
      default: undefined
    },
    large: {
      type: Boolean,
      default: undefined
    }
  },
  computed: {
    // Check if options is of string
    isArrayOfString() {
      return (
        !this.$attrs.options ||
        (this.$attrs.options && typeof this.$attrs.options[0] === "string")
      );
    }
  },
  methods: {
    updateInput(value) {
      this.$emit("input", value);
    }
  }
};
</script>
<!-- New step!
     Add Multiselect CSS. Can be added as a static asset or inside a component. -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

