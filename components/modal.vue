<template>
  <div
    :ref="reference"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    @click="clickOutside"
  >
    <div
      class="modal-dialog"
      :class="{ 
        'modal-dialog-centered': centered !== undefined,
        'modal-xl': extralarge !== undefined,
        'modal-lg': large !== undefined,
        'modal-sm': small !== undefined,
        }"
      role="document"
    >
      <div class="modal-content" :style="contentStyle" :class="contentClass">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
const BODY_CLASS = "modal-open";

export default {
  name: "Modal",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    centered: {
      type: Boolean,
      default: undefined
    },
    extralarge: {
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
    reference: {
      type: String,
      default: "modal"
    },
    contentStyle: {
      type: String,
      default: null
    },
    contentClass: {
      type: String,
      default: null
    },
    width: {
      type: String,
      default: null
    }
  },
  watch: {
    show() {
      this.show ? this.showModal() : this.hideModal();
    }
  },
  mounted() {
    this.show && this.showModal();
  },
  destroyed() {
    document.body.classList.remove(BODY_CLASS);
    const $backdrop = document.querySelector(".modal-backdrop");
    $backdrop && $backdrop.remove();
  },
  methods: {
    showModal() {
      document.body.classList.add(BODY_CLASS);
      this.setDisplay("block");
      this.addBackdrop();
      setTimeout(() => {
        this.$refs[this.reference] && this.$refs[this.reference].classList.add("show");
      }, 0);
    },
    hideModal() {
      document.body.classList.remove(BODY_CLASS);
      this.$refs[this.reference].classList.remove("show");
      this.$nextTick(function() {
        this.setDisplay("none");
        document.querySelector(".modal-backdrop").remove();
      });
    },
    setDisplay(value) {
      this.$refs[this.reference].style.display = value;
    },
    addBackdrop() {
      if (document.querySelector(".modal-backdrop")) return;
      const $backdrop = document.createElement("div");
      $backdrop.className = "modal-backdrop fade";
      document.body.append($backdrop);
      setTimeout(() => {
        $backdrop.classList.add("show");
      }, 0);
    },
    clickOutside(evt) {
      if (evt.target.classList.contains("modal")) {
        this.$emit("clickOutside");
      }
    }
  }
};
</script>
