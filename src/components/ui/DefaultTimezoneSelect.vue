<template>
	<select class="form-control" :value="value" @change="$emit('update:value', $event.target.value)">
		<option v-for="timezone in timezones" :value="timezone.tz" :key="timezone.tz">
			{{ timezone.city }}
		</option>
	</select>
</template>

<script setup>
import { defineProps, defineEmits } from "vue"

defineProps(["value"])
defineEmits(["update:value"])

const timezones = [
	{ tz: "UTC+3", city: "Москва (UTC+3)" },
	{ tz: "UTC+2", city: "Калининград (UTC+2)" },
	{ tz: "UTC+4", city: "Самара (UTC+4)" },
	{ tz: "UTC+5", city: "Екатеринбург (UTC+5)" },
	{ tz: "UTC+6", city: "Омск (UTC+6)" },
	{ tz: "UTC+7", city: "Новосибирск (UTC+7)" },
	{ tz: "UTC+8", city: "Иркутск (UTC+8)" },
	{ tz: "UTC+9", city: "Якутск (UTC+9)" },
	{ tz: "UTC+10", city: "Владивосток (UTC+10)" },
	{ tz: "UTC+11", city: "Магадан (UTC+11)" },
	{ tz: "UTC+12", city: "Петропавловск-Камчатский (UTC+12)" },
]
</script>