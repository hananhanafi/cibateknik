<template>
  <div
    class="form-group"
    :class="{
      'form-group-dense': dense !== undefined,
      'form-group-lg': large !== undefined,
      'form-group-error': error
    }"
  >
    <label v-if="label">{{ label }}<slot name="afterLabel"/></label>
    <div class="input-group">
      <slot name="beforeInput" />
      <input
        ref="input"
        v-bind="$attrs"
        class="form-control"
        :class="{ 'form-control-sm': small !== undefined, 'rounded-pill': rounded !== undefined }"
        :style="{ 'text-align': align }"
        :value="value"
        @input="updateInput"
        @keypress="(numeric || numberonly) && isNumber($event)"
        @focus="numeric && toNumber(value)"
      />
      <slot name="afterInput" />
    </div>
    <div v-if="error" class="form-hint text-danger mt-1">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { toNumber, toFormatedNumber } from "./helpers";
export default {
  inheritAttrs: false,
  props: {
    // label: String,
    label: {
      type: String,
      default: undefined
    },
    // eslint-disable-next-line vue/require-default-prop
    value: [String, Number],
      // error: String,
    error: {
      type: String,
      default: undefined
    },
    dense: {
      type: Boolean,
      default: undefined
    },
    numeric: {
      type: Boolean,
      default: undefined
    },
    // TODO: Refactor with numeric and thousand
    numberonly: {
      type: Boolean,
      default: undefined
    },
    decimal: {
      type: Boolean,
      default: undefined
    },
    large: {
      type: Boolean,
      default: undefined
    },
    small: {
      type: Boolean,
      default: undefined
    },
    rounded: {
      type: Boolean,
      default: undefined
    },
    maxlength: {
      type: String,
      default: undefined
    },
    min: {
      type: String,
      default: undefined
    },
    max: {
      type: String,
      default: undefined
    },
    align: {
      type: String,
      default: null
    }
  },
  mounted() {
    if (this.$props.numeric) {
      this.toFormatedNumber(this.$props.value);
    }
  },
  methods: {
    updateInput(event) {
      let value = event.target.value;

      if (this.maxlength) {
        value = this.sliceToMaxlength(event.target.value);
      }

      if (this.$refs.input.type === "number" && value) {
        value = Number(value);
      }

      if (value === 0 && this.min !== undefined) {
        value = value < +this.min ? this.min : value;
      }
      if (value && this.min !== undefined) {
        value = value < +this.min ? this.min : value;
      }

      if (value && this.max !== undefined) {
        value = value > +this.max ? this.max : value;
      }

      if (this.numeric) {
        value = this.toFormatedNumber(value);
      }

      if (this.numberonly) {
        value = value.replace(/\D/gi, "");
      }

      if (this.decimal) {
        value = value.replace(/[^0-9.]|\.(?=.*\.)/g, "");
      }

      this.$refs.input.value = value;

      this.$emit("input", value);
    },
    sliceToMaxlength(val) {
      if (val.length > +this.maxlength) {
        const sliced = val.slice(0, +this.maxlength);
        return sliced;
      } else {
        return val;
      }
    },
    isNumber(evt) {
      evt = evt || window.event;
      const charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    toNumber(value) {
      this.updateInput({
        target: {
          value: toNumber(value)
        }
      });
    },
    toFormatedNumber(value) {
      const _value = value == null ? "" : toFormatedNumber(toNumber(value));
      return _value;
    }
  }
};
</script>

