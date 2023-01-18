<template>
  <default-form>
    <div class="form-outline mb-2">
      <default-label>Фамилия</default-label>
      <default-input type="text" v-model:value="admin.surname" required />
    </div>
    <div class="form-outline mb-2">
      <default-label>Имя</default-label>
      <default-input type="text" v-model:value="admin.name" required />
    </div>
    <div class="form-outline mb-2">
      <default-label>Отчество</default-label>
      <default-input type="text" v-model:value="admin.patronymic" />
    </div>
    <div class="form-outline mb-2">
      <default-label>Телефон</default-label>
      <default-phone-input v-model:value="admin.phone" />
    </div>
    <div class="form-row align-items-center">
      <div class="col-auto mb-2">
        <default-label>Telegram ID</default-label>
        <default-input type="number" v-model:value="admin.telegram_id" />
      </div>
      <div class="col-auto mb-2">
        <default-label>Имя пользователя Telegram</default-label>
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text">@</div>
          </div>
          <default-input
            type="text"
            v-model:value="admin.telegram_username"
            placeholder="username"
          />
        </div>
      </div>
    </div>
    <div class="form-outline mb-2">
      <default-label>Дата рождения</default-label>
      <default-input type="date" v-model:value="admin.birthday" required />
    </div>
    <div class="form-outline mb-2">
      <default-label>Почта</default-label>
      <default-input type="email" v-model:value="admin.email" required />
    </div>
    <div class="form-outline mb-2">
      <default-label>Уровень подготовки</default-label>
      <default-input type="text" v-model:value="admin.level" />
    </div>
    <div class="form-group mb-2">
      <default-label>Дополнительное описание</default-label>
      <default-text-area v-model:value="admin.description" />
    </div>
    <div class="form-group mb-2">
      <default-label>Часовой пояс</default-label>
      <default-timezone-select v-model:value="admin.timezone" required />
    </div>
  </default-form>
</template>

<script setup>
import { reactive, onMounted } from "vue";

import DefaultForm from "@/components/ui/DefaultForm";
import DefaultInput from "@/components/ui/DefaultInput";
import DefaultLabel from "@/components/ui/DefaultLabel";
import DefaultPhoneInput from "@/components/ui/DefaultPhoneInput";
import DefaultTextArea from "@/components/ui/DefaultTextArea";
import DefaultTimezoneSelect from "@/components/ui/DefaultTimezoneSelect";
import { initWebApp } from "@/services/telegram/initWebApp";
import { sendCreateRequest } from "@/services/api/createRequest";
import { useHttp } from "@/plugins/axiosPlugin";

const admin = reactive({
  surname: null,
  name: null,
  patronymic: null,
  phone: null,
  telegram_id: null,
  telegram_username: null,
  birthday: null,
  email: null,
  level: null,
  description: null,
  timezone: "UTC+3",
});

onMounted(() => {
  const http = useHttp();
  
  initWebApp("Создать запись", () =>
    sendCreateRequest(http, "/root/admin", admin)
  );
});
</script>
