<template>
  <div>
    <input
      ref="uploader"
      type="file"
      class="d-none"
      :multiple="multiple"
      @change="onFileInputChange"
    />
  </div>
</template>

<script>
export default {
  props: {
    types: {
      type: Array,
      default: () => ["image/jpg", "image/png", "image/jpeg"]
    },
    maxSize: {
      type: Number,
      default: 1000000
    },
    multiple: {
      type: Boolean,
      default: null
    }
  },
  computed: {
    items() {
      return this.$props.value.concat(this.uploadingItems);
    }
  },
  mounted() {
    this.$on("upload", () => {
      // Trigger file input
      this.$refs.uploader.click();
    });
  },
  methods: {
    onFileInputChange(e) {
      const files = e.target.files;

      if (!files || files.length < 0) return;

      const errorTypeValidation = this.validateFileTypes(files);
      const errorMaxSize = this.validateFileSize(files);

      if (errorTypeValidation || errorMaxSize) {
        return this.$emit("error", [errorTypeValidation, errorMaxSize]);
      }

      this.$emit("input", e);
      this.$emit("inputFiles", [...e.target.files]);

      // Reset
      e.target.value = null;
    },
    validateFileTypes(files) {
      const anyInvalidType =
        Array.from(files).some(file => {
          return !this.types.includes(file.type);
        }) || null;

      return anyInvalidType && this.invalidTypesWording();
    },
    validateFileSize(files) {
      const anyLargerThanMaxSize = Array.from(files).some(file => {
        return file.size > this.maxSize;
      });

      return (
        (anyLargerThanMaxSize &&
          `Ukuran file maksimal ${Math.ceil(this.maxSize / 100000) / 10}MB`) ||
        null
      );
    },
    invalidTypesWording() {
      let wording = "Format file yang diizinkan hanya ";

      this.types.forEach((type, i) => {
        const shortType = type.split("/")[1];

        // eslint-disable-next-line eqeqeq
        if (i != 0) {
          // eslint-disable-next-line eqeqeq
          if (i == this.types - 1) {
            wording += "dan ";
          } else {
            wording += ", ";
          }
        }
        wording += `${shortType}`;
      });

      return wording;
    }
  }
};
</script>
