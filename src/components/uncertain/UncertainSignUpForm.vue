<template>
  <default-form>
    <div class="form-outline mb-2">
      <default-label>Фамилия</default-label>
      <default-input type="text" v-model:value="uncertain.surname" required />
    </div>
    <div class="form-outline mb-2">
      <default-label>Имя</default-label>
      <default-input type="text" v-model:value="uncertain.name" required />
    </div>
    <div class="form-outline mb-2">
      <default-label>Отчество</default-label>
      <default-input type="text" v-model:value="uncertain.patronymic" />
    </div>
    <div class="form-outline mb-2">
      <default-label>Телефон</default-label>
      <default-phone-input v-model:value="uncertain.phone" />
    </div>
    <div class="form-outline mb-2">
      <default-label>Дата рождения</default-label>
      <default-input type="date" v-model:value="uncertain.birthday" required />
    </div>
    <div class="form-outline mb-2">
      <default-label>Почта</default-label>
      <default-input type="email" v-model:value="uncertain.email" required />
    </div>
    <div class="form-group mb-2">
      <default-label>Часовой пояс</default-label>
      <default-timezone-select v-model:value="uncertain.timezone" required />
    </div>
  </default-form>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { useRoute } from "vue-router";

import DefaultForm from "@/components/ui/DefaultForm";
import DefaultInput from "@/components/ui/DefaultInput";
import DefaultLabel from "@/components/ui/DefaultLabel";
import DefaultPhoneInput from "@/components/ui/DefaultPhoneInput";
import DefaultTimezoneSelect from "@/components/ui/DefaultTimezoneSelect";
import { initWebApp } from "@/services/telegram/initWebApp";
import { sendCreateRequest } from "@/services/api/createRequest";
import { useHttp } from "@/plugins/axiosPlugin";

const uncertain = reactive({
  surname: null,
  name: null,
  patronymic: null,
  phone: null,
  telegram_id: null,
  telegram_username: null,
  birthday: null,
  email: null,
  timezone: "UTC+3",
});

onMounted(() => {
  const http = useHttp();
  const route = useRoute();
  console.log(window.Telegram?.WebApp.initDataUnsafe);
  uncertain.telegram_id = route.query.telegram_id;
  uncertain.telegram_username = route.query.telegram_username;

  initWebApp("Отправить заявку", () =>
    sendCreateRequest(http, "/uncertain/sign-up", uncertain)
  );
});
</script>
