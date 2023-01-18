<template>
  <default-form>
    <div class="form-outline mb-2">
      <default-label>Фамилия</default-label>
      <default-input type="text" v-model:value="student.surname" required />
    </div>
    <div class="form-outline mb-2">
      <default-label>Имя</default-label>
      <default-input type="text" v-model:value="student.name" required />
    </div>
    <div class="form-outline mb-2">
      <default-label>Отчество</default-label>
      <default-input type="text" v-model:value="student.patronymic" />
    </div>
    <div class="form-outline mb-2">
      <default-label>Телефон</default-label>
      <default-phone-input v-model:value="student.phone" />
    </div>
    <div class="form-row align-items-center">
      <div class="col-auto mb-2">
        <default-label>Telegram ID</default-label>
        <default-input type="number" v-model:value="student.telegram_id" />
      </div>
      <div class="col-auto mb-2">
        <default-label>Имя пользователя Telegram</default-label>
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text">@</div>
          </div>
          <default-input
            type="text"
            v-model:value="student.telegram_username"
            placeholder="username"
          />
        </div>
      </div>
    </div>
    <div class="form-outline mb-2">
      <default-label>Дата рождения</default-label>
      <default-input type="date" v-model:value="student.birthday" required />
    </div>
    <div class="form-outline mb-2">
      <default-label>Почта</default-label>
      <default-input type="email" v-model:value="student.email" required />
    </div>
    <div class="form-group mb-2">
      <default-label>Часовой пояс</default-label>
      <default-timezone-select v-model:value="student.timezone" required />
    </div>
  </default-form>
</template>

<script setup>
import { reactive, onMounted } from "vue";

import DefaultForm from "@/components/ui/DefaultForm";
import DefaultInput from "@/components/ui/DefaultInput";
import DefaultLabel from "@/components/ui/DefaultLabel";
import DefaultPhoneInput from "@/components/ui/DefaultPhoneInput";
import DefaultTimezoneSelect from "@/components/ui/DefaultTimezoneSelect";
import { initWebApp } from "@/services/telegram/initWebApp";
import { sendCreateRequest } from "@/services/api/createRequest";
import { useHttp } from "@/plugins/axiosPlugin";

const student = reactive({
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
  
  initWebApp("Создать запись", () =>
    sendCreateRequest(http, "/root/student", student)
  );
});
</script>
