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
    <div class="form-outline mb-2">
      <default-label>Запись активна с:</default-label>
      <default-input type="date" v-model:value="admin.access_start" required />
    </div>
    <div class="form-outline mb-2">
      <default-label>Запись пассивна с:</default-label>
      <default-input type="date" v-model:value="admin.access_end" required />
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
import DefaultTextArea from "@/components/ui/DefaultTextArea";
import DefaultTimezoneSelect from "@/components/ui/DefaultTimezoneSelect";
import { useHttp } from "@/plugins/axiosPlugin";
import { sendUpdateRequest } from "@/services/api/updateRequest";
import { sendGetRequest } from "@/services/api/getRequest";
import { initWebApp } from "@/services/telegram/initWebApp";

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
  access_start: null,
  access_end: null,
});

function setAdmin(getAdmin) {
  admin.surname = getAdmin.surname;
  admin.name = getAdmin.name;
  admin.patronymic = getAdmin.patronymic;
  admin.phone = getAdmin.phone;
  admin.telegram_id = getAdmin.telegram_id;
  admin.telegram_username = getAdmin.telegram_username;
  admin.birthday = getAdmin.birthday;
  admin.email = getAdmin.email;
  admin.level = getAdmin.level;
  admin.description = getAdmin.description;
  admin.timezone = getAdmin.timezone;
  admin.access_start = getAdmin.access_start;
  admin.access_end = getAdmin.access_end;
}

onMounted(async () => {
  const http = useHttp();
  const route = useRoute();

  const adminId = route.params.id;
  const response = await sendGetRequest(http, `/root/admin/${adminId}`);
  setAdmin(response.data);

  initWebApp("Изменить запись", () =>
    sendUpdateRequest(http, `/root/admin/${adminId}`, admin)
  );
});
</script>
