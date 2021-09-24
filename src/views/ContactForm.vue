<template>
  <div class="contact-form">
    <h2 class="contact-form__title">{{ $t("contact_form.title") }}</h2>
    <form @submit="onSubmit">
      <div
        class="contact-form__field-container"
        :data-name="field.name"
        v-for="(field, i) in formFields"
        :key="i"
      >
        <label class="contact-form__label" :for="'contactForm:' + field.name"
          >{{ $t(field.label) }}
          <span v-if="field.required" class="contact-form__required"
            >*</span
          ></label
        >
        <input
          class="contact-form__field"
          :id="'contactForm:' + field.name"
          :class="{
            'contact-form__field--error': field.validationErrors.length > 0,
          }"
          v-model="field.value"
          :type="field.inputType"
          @blur="onBlur(field)"
          @focus="onFocus(field)"
        />
        <div class="contact-form__errors">
          <p
            class="contact-form__error"
            v-for="(error, i) in field.validationErrors"
            :key="i"
          >
            {{ $t(error) }}
          </p>
        </div>
      </div>
      <button class="contact-form__btn" type="submit">
        {{ $t("contact_form.submit") }}
      </button>
      {{ message }}
    </form>
  </div>
</template>
<script>
export default {
  name: "ContactForm",
  data() {
    return {
      message: "",
      formFields: [
        {
          label: "contact_form.name",
          name: "name",
          value: undefined,
          type: "text",
          inputType: "text",
          required: true,
          validationErrors: [],
        },
        {
          label: "contact_form.surname",
          name: "surname",
          value: undefined,
          type: "text",
          inputType: "text",
          required: true,
          validationErrors: [],
        },
        {
          label: "contact_form.email",
          name: "email",
          value: undefined,
          type: "email",
          inputType: "text",
          required: true,
          validationErrors: [],
        },
        {
          label: "contact_form.phone",
          name: "phone",
          value: undefined,
          type: "phone",
          inputType: "text",
          required: true,
          validationErrors: [],
        },
        {
          label: "contact_form.password",
          name: "password",
          value: undefined,
          type: "password",
          inputType: "password",
          required: true,
          validationErrors: [],
        },
      ],
    };
  },
  computed: {
    isValid() {
      return !this.formFields.some(
        (field) => field.validationErrors.length > 0
      );
    },
  },
  methods: {
    onBlur(field) {
      this.validateField(field);
    },
    onFocus(field) {
      field.validationErrors = [];
    },
    onSubmit(event) {
      event.preventDefault();
      this.validateForm();
      if (this.isValid) {
        this.sendForm();
      }
    },
    sendForm() {
      // const payload = this.formFields.reduce((a, v) => ({ ...a, [v.name]: v.value}), {})
      setTimeout(() => {
        this.message = "";
      }, 5000);
    },
    validateForm() {
      this.formFields.forEach((field) => {
        this.validateField(field);
      });
    },
    validateEmail(email) {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    },
    validateText(text) {
      const re = /^[a-zA-Z]*$/g;
      return re.test(text);
    },
    validatePhone(phone) {
      const re =
        /^(\+{0,})(\d{0,})(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s]?\d+([\s]?\d+){1,2}(\s){0,}$/gm;
      return re.test(phone);
    },
    validatePassword(password) {
      const re = /(?=.*[!@#$%^&*]).{8,}/gm;
      return re.test(password);
    },
    validateField(field) {
      field.validationErrors = [];
      if (field.required && !field.value) {
        field.validationErrors.push("validation_errors.field_is_required");
      }
      if (
        field.type === "text" &&
        field.value &&
        !this.validateText(field.value)
      ) {
        field.validationErrors.push(
          "validation_errors.field_should_only_contain_letters"
        );
      }
      if (
        field.type === "email" &&
        field.value &&
        !this.validateEmail(field.value)
      ) {
        field.validationErrors.push("validation_errors.email_is_not_valid");
      }
      if (
        field.type === "phone" &&
        field.value &&
        !this.validatePhone(field.value)
      ) {
        field.validationErrors.push(
          "validation_errors.phone_number_is_not_valid"
        );
      }
      if (
        field.type === "password" &&
        field.value &&
        !this.validatePassword(field.value)
      ) {
        field.validationErrors.push("validation_errors.password_is_not_valid");
      }
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/main.scss";
.contact-form {
  &__title {
    font-size: $fontSizeLg;
  }
  &__label {
    font-size: $fontSizeSm;
    margin-bottom: 5px;
  }
  &__field-container {
    display: grid;
    margin: 30px 0;
  }
  &__field {
    height: 30px;
    max-width: 400px;
    box-shadow: none;
    outline: none;
    border: 1px solid $lightGray;
    &--error {
      border-color: $red;
    }
  }
  &__required {
    color: $primaryColor;
  }
  &__error {
    margin: 5px 0;
    color: $red;
    font-size: $fontSizeXs;
  }
  &__btn {
    border-radius: 10px;
    padding: 10px 20px;
    outline: none;
    border: 1px solid $gray;
    width: 100%;
    background-color: rgba($lightGray, 0.1);
    cursor: pointer;
    &:hover {
      background-color: rgba($lightGray, 0.2);
    }
  }
  @media (min-width: $breakpointSm) {
    .contact-form {
      &__btn {
        width: auto;
      }
    }
  }
}
</style>
