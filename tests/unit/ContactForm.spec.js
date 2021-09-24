import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import ContactForm from "@/views/ContactForm.vue";

describe("ContactForm.vue", () => {
  let wrapper;
  const $t = () => {};
  beforeEach(() => {
    wrapper = shallowMount(ContactForm, {
      mocks: { $t },
    });
  });
  it("Error should be displayed for each field if wrong data was entered", async () => {
    await wrapper.setData({
      formFields: [
        {
          label: "contact_form.name",
          name: "name",
          value: "12312312",
          type: "text",
          inputType: "text",
          required: true,
          validationErrors: [],
        },
        {
          label: "contact_form.surname",
          name: "surname",
          value: "1231213",
          type: "text",
          inputType: "text",
          required: true,
          validationErrors: [],
        },
        {
          label: "contact_form.email",
          name: "email",
          value: "jakub/dadsadas",
          type: "email",
          inputType: "text",
          required: true,
          validationErrors: [],
        },
        {
          label: "contact_form.phone",
          name: "phone",
          value: "666-666-666",
          type: "phone",
          inputType: "text",
          required: true,
          validationErrors: [],
        },
        {
          label: "contact_form.password",
          name: "password",
          value: "undefined",
          type: "password",
          inputType: "password",
          required: true,
          validationErrors: [],
        },
      ],
    });
    const submitBtn = wrapper.find(".contact-form__btn");
    submitBtn.trigger("submit");
    await Vue.nextTick();
    expect(
      wrapper.findAll(
        '.contact-form__field-container[data-name="name"] .contact-form__error'
      )
    ).toHaveLength(1);
    expect(
      wrapper.findAll(
        '.contact-form__field-container[data-name="surname"] .contact-form__error'
      )
    ).toHaveLength(1);
    expect(
      wrapper.findAll(
        '.contact-form__field-container[data-name="email"] .contact-form__error'
      )
    ).toHaveLength(1);
    expect(
      wrapper.findAll(
        '.contact-form__field-container[data-name="phone"] .contact-form__error'
      )
    ).toHaveLength(1);
    expect(
      wrapper.findAll(
        '.contact-form__field-container[data-name="password"] .contact-form__error'
      )
    ).toHaveLength(1);
  });
  it("No errors for correct data", async () => {
    await wrapper.setData({
      formFields: [
        {
          label: "contact_form.name",
          name: "name",
          value: "Jakub",
          type: "text",
          inputType: "text",
          required: true,
          validationErrors: [],
        },
        {
          label: "contact_form.surname",
          name: "surname",
          value: "Boruch",
          type: "text",
          inputType: "text",
          required: true,
          validationErrors: [],
        },
        {
          label: "contact_form.email",
          name: "email",
          value: "jakub@boruch.pl",
          type: "email",
          inputType: "text",
          required: true,
          validationErrors: [],
        },
        {
          label: "contact_form.phone",
          name: "phone",
          value: "+48 666 666 666",
          type: "phone",
          inputType: "text",
          required: true,
          validationErrors: [],
        },
        {
          label: "contact_form.password",
          name: "password",
          value: "undefined!",
          type: "password",
          inputType: "password",
          required: true,
          validationErrors: [],
        },
      ],
    });
    const submitBtn = wrapper.find(".contact-form__btn");
    submitBtn.trigger("submit");
    await Vue.nextTick();
    expect(
      wrapper.findAll(
        '.contact-form__field-container[data-name="name"] .contact-form__error'
      )
    ).toHaveLength(0);
    expect(
      wrapper.findAll(
        '.contact-form__field-container[data-name="surname"] .contact-form__error'
      )
    ).toHaveLength(0);
    expect(
      wrapper.findAll(
        '.contact-form__field-container[data-name="email"] .contact-form__error'
      )
    ).toHaveLength(0);
    expect(
      wrapper.findAll(
        '.contact-form__field-container[data-name="phone"] .contact-form__error'
      )
    ).toHaveLength(0);
    expect(
      wrapper.findAll(
        '.contact-form__field-container[data-name="password"] .contact-form__error'
      )
    ).toHaveLength(0);
  });
  it("Errors for missing values when field required", async () => {
    await wrapper.setData({
      formFields: [
        {
          label: "contact_form.name",
          name: "name",
          value: undefined,
          type: "text",
          inputType: "text",
          required: false,
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
      ],
    });
    const submitBtn = wrapper.find(".contact-form__btn");
    submitBtn.trigger("submit");
    await Vue.nextTick();
    expect(
      wrapper.findAll(
        '.contact-form__field-container[data-name="name"] .contact-form__error'
      )
    ).toHaveLength(0);
    expect(
      wrapper.findAll(
        '.contact-form__field-container[data-name="surname"] .contact-form__error'
      )
    ).toHaveLength(1);
  });
  it("Should clear the error if the user focus on the field", async () => {
    await wrapper.setData({
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
      ],
    });
    const submitBtn = wrapper.find(".contact-form__btn");
    const field = wrapper.find(
      '.contact-form__field-container[data-name="name"] input'
    );
    submitBtn.trigger("submit");
    await Vue.nextTick();
    expect(
      wrapper.findAll(
        '.contact-form__field-container[data-name="name"] .contact-form__error'
      )
    ).toHaveLength(1);
    field.trigger("focus");
    await Vue.nextTick();
    expect(
      wrapper.findAll(
        '.contact-form__field-container[data-name="name"] .contact-form__error'
      )
    ).toHaveLength(0);
  });
  it("Should validate the field after blur", async () => {
    await wrapper.setData({
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
      ],
    });
    const submitBtn = wrapper.find(".contact-form__btn");
    const field = wrapper.find(
      '.contact-form__field-container[data-name="name"] input'
    );
    submitBtn.trigger("submit");
    await Vue.nextTick();
    expect(
      wrapper.findAll(
        '.contact-form__field-container[data-name="name"] .contact-form__error'
      )
    ).toHaveLength(1);
    await field.setValue("Jakub");
    field.trigger("blur");
    await Vue.nextTick();
    expect(
      wrapper.findAll(
        '.contact-form__field-container[data-name="name"] .contact-form__error'
      )
    ).toHaveLength(0);
  });
});
