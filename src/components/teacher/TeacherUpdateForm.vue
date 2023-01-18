<template>
  <default-form>
    <div class="form-outline mb-2">
      <default-label>Фамилия</default-label>
      <default-input type="text" v-model:value="teacher.surname" required />
    </div>
    <div class="form-outline mb-2">
      <default-label>Имя</default-label>
      <default-input type="text" v-model:value="teacher.name" required />
    </div>
    <div class="form-outline mb-2">
      <default-label>Отчество</default-label>
      <default-input type="text" v-model:value="teacher.patronymic" />
    </div>
    <div class="form-outline mb-2">
      <default-label>Телефон</default-label>
      <default-phone-input v-model:value="teacher.phone" />
    </div>
    <div class="form-row align-items-center">
      <div class="col-auto mb-2">
        <default-label>Telegram ID</default-label>
        <default-input type="number" v-model:value="teacher.telegram_id" />
      </div>
      <div class="col-auto mb-2">
        <default-label>Имя пользователя Telegram</default-label>
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text">@</div>
          </div>
          <default-input
            type="text"
            v-model:value="teacher.telegram_username"
            placeholder="username"
          />
        </div>
      </div>
    </div>
    <div class="form-outline mb-2">
      <default-label>Дата рождения</default-label>
      <default-input type="date" v-model:value="teacher.birthday" required />
    </div>
    <div class="form-outline mb-2">
      <default-label>Почта</default-label>
      <default-input type="email" v-model:value="teacher.email" required />
    </div>
    <div class="form-outline mb-2">
      <default-label>Уровень подготовки</default-label>
      <default-input type="text" v-model:value="teacher.level" />
    </div>
    <div class="form-group mb-2">
      <default-label>Дополнительное описание</default-label>
      <default-text-area v-model:value="teacher.description" />
    </div>
    <div class="form-group mb-2">
      <default-label>Часовой пояс</default-label>
      <default-timezone-select v-model:value="teacher.timezone" required />
    </div>
    <div class="form-outline mb-2">
      <default-label>Запись активна с:</default-label>
      <default-input
        type="date"
        v-model:value="teacher.access_start"
        required
      />
    </div>
    <div class="form-outline mb-2">
      <default-label>Запись пассивна с:</default-label>
      <default-input type="date" v-model:value="teacher.access_end" required />
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

const teacher = reactive({
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

function setTeacher(getTeacher) {
  teacher.surname = getTeacher.surname;
  teacher.name = getTeacher.name;
  teacher.patronymic = getTeacher.patronymic;
  teacher.phone = getTeacher.phone;
  teacher.telegram_id = getTeacher.telegram_id;
  teacher.telegram_username = getTeacher.telegram_username;
  teacher.birthday = getTeacher.birthday;
  teacher.email = getTeacher.email;
  teacher.level = getTeacher.level;
  teacher.description = getTeacher.description;
  teacher.timezone = getTeacher.timezone;
  teacher.access_start = getTeacher.access_start;
  teacher.access_end = getTeacher.access_end;
}

onMounted(async () => {
  const http = useHttp();
  const route = useRoute();

  const teacherId = route.params.id;
  const response = await sendGetRequest(http, `/root/teacher/${teacherId}`);
  setTeacher(response.data);

  initWebApp("Изменить запись", () =>
    sendUpdateRequest(http, `/root/teacher/${teacherId}`, teacher)
  );
});
</script>
