<script setup>
import { ref, onMounted, defineProps, defineExpose } from "vue";
import { Modal } from "bootstrap";

defineProps({
  title: {
    type: String,
    default: "<<Title goes here>>",
  },
});

let modalEle = ref(null);
let thisModalObj = null;

onMounted(() => {
  thisModalObj = new Modal(modalEle.value);
});

function _show() {
  thisModalObj.show();
}

function _close() {
  thisModalObj.hide()
}

defineExpose({ show: _show, close: _close });
</script>

<template>
  <div class="modal fade" tabindex="-1" aria-labelledby="" aria-hidden="true" ref="modalEle">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
      </div>
    </div>
  </div>
</template>