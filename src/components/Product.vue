<template>
  <a :href="url" class="product" :class="{ 'product--list': listView }">
    <article class="product__container">
      <figure class="product__image-container">
        <img class="product__image" :alt="name" :src="picture" />
        <fav class="product__fav" :value="isFav" />
      </figure>

      <div class="product__text">
        <h2 class="product__name">{{ name }}</h2>
        <p class="product__first-row">
          <span class="product__size">{{ size }}</span>
          <rating class="product__rating" :value="rating" />
        </p>
        <p class="product__second-row">
          <span class="product__price">{{ price }}</span>
          <span v-if="oldPrice && savings" class="product__old-price">{{
            oldPrice
          }}</span>
          <span v-if="oldPrice && savings" class="product__savings"
            >{{ $t("product_list.you_save") }}: {{ savings }}</span
          >
        </p>
      </div>
    </article>
  </a>
</template>

<script>
import Fav from "@/components/Fav.vue";
import Rating from "@/components/Rating.vue";

export default {
  name: "Product",
  components: { Fav, Rating },
  props: {
    name: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "",
    },
    picture: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      default: NaN,
    },
    size: {
      type: String,
      default: "",
    },
    isFav: {
      type: Boolean,
      default: false,
    },
    price: {
      type: String,
      default: "",
    },
    oldPrice: {
      type: String,
      default: "",
    },
    savings: {
      type: String,
      default: "",
    },
    listView: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/main.scss";
.product {
  color: $secondaryColor;
  text-decoration: none;
  background-color: #fff;
  width: 100%;
  max-width: calc(100vw - 20px);
  box-shadow: rgba(0, 0, 0, 0.1) 0 10px 20px;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.2) 0 10px 20px;
  }
  &__fav {
    position: absolute;
    top: 20px;
    right: 20px;
  }
  &__image {
    width: 100%;
  }
  &__image-container {
    position: relative;
    margin: 0;
  }
  &__name {
    margin: 0;
    font-size: 26px;
    font-weight: 600;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    &:first-letter {
      text-transform: capitalize;
    }
  }
  &__price {
    font-weight: 600;
    font-size: 40px;
  }
  &__old-price {
    margin-left: 10px;
    text-decoration: line-through;
    font-size: 18px;
    color: $lightGray;
  }
  &__savings {
    margin-left: 10px;
    color: $primaryColorDark;
    font-size: 18px;
  }
  &__rating {
    margin-left: 5px;
    position: relative;
    bottom: -2px;
  }
  &__size {
    font-size: 18px;
    font-family: $fontFamilySerif;
    color: $gray;
  }
  &__second-row {
    margin-top: 20px;
  }

  &__text {
    padding: 34px 28px;
    min-height: 240px;
  }
  &--list {
    .product {
      position: relative;
      &__image-container {
        position: static;
        margin: 0;
      }
      &__container {
        position: relative;
        display: flex;
      }
      &__image {
        height: 100%;
      }
      &__fav {
        box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
      }
    }
  }
}
@media (min-width: $breakpointSm) {
  .product {
    max-width: none;
  }
}
</style>
