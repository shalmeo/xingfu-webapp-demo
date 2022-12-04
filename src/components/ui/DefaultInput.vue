<template>
  <input
    class="form-control"
    :value="value"
    @input="$emit('update:value', $event.target.value)"
  />
</template>

<script setup>
import { defineProps, defineEmits } from "vue"

defineProps(["value"])
defineEmits(["update:value"])
</script>