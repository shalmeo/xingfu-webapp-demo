<template>
	<input
		class="form-control"
		type="tel" 
		:value="value"
		@input="$emit('update:value', $event.target.value)"
		v-maska="'+#############'"
	/>
</template>
  
<script setup>
	import { defineProps, defineEmits } from "vue"

	defineProps(["value"])
	defineEmits(["update:value"])
</script>