<template>
  <default-form-window>
    <default-form-title>Информация об администраторе</default-form-title>
    <default-form>
      <div class="form-outline mb-2">
        <default-label>Фамилия</default-label>
        <default-input type="text" v-model:value="surname" />
      </div>
      <div class="form-outline mb-2">
        <default-label>Имя</default-label>
        <default-input type="text" v-model:value="name" />
      </div>
      <div class="form-outline mb-2">
        <default-label>Отчество</default-label>
        <default-input type="text" v-model:value="patronymic" />
      </div>
      <div class="form-outline mb-2">
        <default-label>Телефон</default-label>
        <default-phone-input v-model:value="phone" />
      </div>
      <div class="form-row align-items-center">
        <div class="col-auto mb-2">
          <default-label>Telegram ID</default-label>
          <default-input type="number" v-model:value="telegramId" />
        </div>
        <div class="col-auto mb-2">
          <default-label>Имя пользователя Telegram</default-label>
          <div class="input-group">
            <div class="input-group-prepend">
              <div class="input-group-text">@</div>
            </div>
            <default-input type="text" v-model:value="telegramUsername" placeholder="username" />
          </div>
        </div>
      </div>
      <div class="form-outline mb-2">
        <default-label>Дата рождения</default-label>
        <default-input type="date" v-model:value="birthday" />
      </div>
      <div class="form-outline mb-2">
        <default-label>Уровень подготовки</default-label>
        <default-input type="text" v-model:value="level" />
      </div>
      <div class="form-group mb-2">
        <default-label>Дополнительное описание</default-label>
        <default-text-area v-model:value="description" />
      </div>
      <div class="form-group mb-2">
        <default-label>Часовой пояс</default-label>
        <default-timezone-select v-model:value="timezone" />
      </div>
    </default-form>
  </default-form-window>
</template>

<script setup>
import { ref } from "vue"

import DefaultForm from "@/components/ui/DefaultForm"
import DefaultFormTitle from "@/components/ui/DefaultFormTitle"
import DefaultFormWindow from "@/components/ui/DefaultFormWindow"
import DefaultInput from "@/components/ui/DefaultInput"
import DefaultLabel from "@/components/ui/DefaultLabel"
import DefaultPhoneInput from "@/components/ui/DefaultPhoneInput"
import DefaultTextArea from "@/components/ui/DefaultTextArea"
import DefaultTimezoneSelect from "@/components/ui/DefaultTimezoneSelect"

const surname = ref(null)
const name = ref(null)
const patronymic = ref(null)
const phone = ref(null)
const telegramId = ref(null)
const telegramUsername = ref(null)
const birthday = ref(null)
const level = ref(null)
const description = ref(null)
const timezone = ref("UTC+3")

window.Telegram.WebApp.expand()
const MainButton = window.Telegram.WebApp.MainButton
MainButton.setText("Создать запись").show()
MainButton.onClick(() => {
  try {
    console.log("send request")
  } catch (e) {
    console.log(e)
  }
})
</script>