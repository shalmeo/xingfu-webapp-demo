<template>
	<textarea class="form-control" rows="3" :value="value" @input="$emit('update:value', $event.target.value)">
	</textarea>
</template>

<script setup>
import { defineProps, defineEmits } from "vue"

defineProps(["value"])
defineEmits(["update:value"])
</script>