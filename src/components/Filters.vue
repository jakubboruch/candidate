<template>
  <div class="filters-container">
    <h2 class="filters-container__title">{{ $t("common.filters") }}</h2>
    <div class="filters">
      <div class="filters__filter" v-for="(filter, i) in filters" :key="i">
        <label class="filters__label" :for="'filter:' + filter.name">{{
          filter.label
        }}</label>
        <compenent
          class="filters__field"
          :is="filter.component"
          :id="'filter:' + filter.name"
          :type="filter.type"
          :value="value && value[filter.name]"
          @input="onChange($event, filter.name)"
        >
          <option
            v-for="(option, i) in filter.options"
            :value="option"
            :selected="option === value[filter.name]"
            :key="i"
          >
            {{ option }}
          </option>
        </compenent>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Filters",
  props: {
    filters: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      internalValue: {},
    };
  },
  methods: {
    onChange(event, name) {
      this.$emit("input", { name, value: event.target.value });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/main.scss";
.filters-container {
  margin: 40px 0;
  &__title {
    font-size: $fontSizeLg;
  }
}
.filters {
  display: flex;
  flex-direction: column;
  &__filter {
    display: flex;
    flex-direction: column;
    margin: 10px 0;
  }
  &__label {
    font-size: $fontSizeSm;
    margin-bottom: 5px;
  }
  &__field {
    height: 30px;
    border: 1px solid $lightGray;
  }
}
@media (min-width: $breakpointMd) {
  .filters {
    flex-direction: row;
    &__filter {
      margin-right: 30px;
    }
  }
}
</style>
