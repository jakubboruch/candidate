<template>
  <div class="product-list">
    <Filters
      :filters="filtersDef"
      :value="productList.filters"
      @input="onFilterChange"
    ></Filters>
    <div class="product-list__header">
      <h2 class="product-list__results">
        <span v-if="resultsNumber">{{ resultsNumber }}</span>
        <span> {{ $tc("product_list.results", resultsNumber) }}</span>
      </h2>
      <div class="product-list__header-settings">
        <select
          class="product-list__sorting"
          @change="setSorting"
          :value="productList.sorting"
        >
          <option v-for="(option, i) in sortDef" :key="i" :value="option.value">
            {{ option.text }}
          </option>
        </select>
        <button class="product-list__view btn" @click="toggleView">
          <i v-show="productList.isList" class="mdi mdi-view-list" />
          <i v-show="!productList.isList" class="mdi mdi-view-grid" />
        </button>
      </div>
    </div>
    <div
      class="product-list__items"
      :class="{
        'product-list__items--list': productList.isList,
        'product-list__items--grid': !productList.isList,
      }"
    >
      <Product
        v-for="product in results"
        :key="product._id"
        :name="product.name"
        :url="product.url"
        :picture="product.picture"
        :size="product.size"
        :rating="product.rating"
        :price="product.price"
        :oldPrice="product.oldPrice"
        :savings="product.savings"
        :is-fav="product.isFav"
        :list-view="productList.isList"
      ></Product>
    </div>
  </div>
</template>

<script>
import Product from "@/components/Product.vue";
import Filters from "@/components/Filters.vue";
import ProductsData from "@/data/products.json";
import { mapState } from "vuex";
export default {
  name: "ProductList",
  components: {
    Product,
    Filters,
  },
  data() {
    return {
      filtersDef: [
        {
          name: "size",
          label: this.$t("product_list.size"),
          component: "select",
          options: [
            "",
            "S - Small",
            "M - Medium",
            "L - Large",
            "XL - Extra large",
          ],
        },
        {
          name: "priceFrom",
          label: this.$t("product_list.price_from"),
          type: "number",
          component: "input",
        },
        {
          name: "priceTo",
          label: this.$t("product_list.price_to"),
          type: "number",
          component: "input",
        },
      ],
      sizeDef: ["S - Small", "M - Medium", "L - Large", "XL - Extra large"],
      sortDef: [
        {
          text: this.$t("product_list.most_relevant"),
          value: undefined,
        },
        {
          text: this.$t("product_list.price_asc"),
          value: "priceASC",
        },
        {
          text: this.$t("product_list.price_desc"),
          value: "priceDESC",
        },
        {
          text: this.$t("product_list.name_asc"),
          value: "nameASC",
        },
      ],
      products: ProductsData,
      filter: {
        size: undefined,
        price: {
          from: undefined,
          to: undefined,
        },
      },
    };
  },
  computed: {
    ...mapState(["productList"]),
    resultsNumber() {
      return this.results.length;
    },
    results() {
      let results = [...this.products];
      if (this.productList.filters.size) {
        results = results.filter(
          (result) => result.size === this.productList.filters.size
        );
      }
      if (this.productList.filters.priceFrom) {
        results = results.filter(
          (result) =>
            this.parseMoneyToNumber(result.price) >=
            this.productList.filters.priceFrom
        );
      }
      if (this.productList.filters.priceTo) {
        results = results.filter(
          (result) =>
            this.parseMoneyToNumber(result.price) <=
            this.productList.filters.priceTo
        );
      }
      if (this.productList.sorting === "priceASC") {
        results = results.sort(
          (resultA, resultB) =>
            this.parseMoneyToNumber(resultA.price) -
            this.parseMoneyToNumber(resultB.price)
        );
      }
      if (this.productList.sorting === "priceDESC") {
        results = results.sort(
          (resultA, resultB) =>
            this.parseMoneyToNumber(resultB.price) -
            this.parseMoneyToNumber(resultA.price)
        );
      }
      if (this.productList.sorting === "nameASC") {
        results = results.sort((resultA, resultB) =>
          resultA.name > resultB.name ? 1 : resultA.name < resultB.name ? -1 : 0
        );
      }
      return results;
    },
  },
  methods: {
    parseMoneyToNumber(price) {
      return price && Number(price.replace(/[^0-9.-]+/g, ""));
    },
    setSorting(event) {
      this.$store.dispatch("setSorting", event.target.value);
    },
    toggleView() {
      this.$store.dispatch("toggleView");
    },
    onFilterChange(filter) {
      this.$store.dispatch("setFilters", filter);
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/main.scss";
.product-list {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__header-settings {
    justify-content: flex-end;
    display: flex;
    align-items: center;
  }
  &__results {
    font-size: $fontSizeLg;
    font-weight: 600;
  }
  &__sorting {
    height: 30px;
  }
  &__view {
    display: none;
  }
  &__items {
    padding: 30px 0;
    row-gap: 50px;
    column-gap: 50px;
    &--grid {
      display: grid;
      align-content: space-around;
      justify-content: space-between;
      grid-template-columns: repeat(auto-fit, minmax(370px, 1fr));
    }
    &--list {
      display: grid;
      align-content: space-around;
      justify-content: space-between;
      grid-template-columns: 1fr;
    }
  }
}
.btn {
  font-size: $fontSizeLg;
  border: none;
  cursor: pointer;
  padding: 10px;
  background: none;
  &:hover {
    color: $primaryColorDark;
  }
}
@media (min-width: $breakpointLg) {
  .product-list {
    &__view {
      display: flex;
      margin-left: 30px;
    }
  }
}
</style>
