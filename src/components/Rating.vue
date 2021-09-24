<template>
  <span class="rating">
    <i class="rating__star mdi mdi-star" v-for="(star, i) in value" :key="i" />
  </span>
</template>

<script>
export default {
  name: "Product",
  props: {
    value: {
      type: Number,
      default: 1,
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/main.scss";
.rating {
  color: $primaryColorDark;
  font-size: 24px;
}
</style>
