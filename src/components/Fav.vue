<template>
  <div class="fav">
    <i v-if="value" class="fav__icon mdi mdi-heart"></i>
    <i v-if="!value" class="fav__icon mdi mdi-heart-outline"></i>
  </div>
</template>

<script>
export default {
  name: "Fav",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/main.scss";
.fav {
  width: 64px;
  height: 64px;
  background: #fff;
  top: 30px;
  right: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  color: $primaryColor;
  &__icon {
    position: relative;
    top: 4px;
  }
}
</style>
