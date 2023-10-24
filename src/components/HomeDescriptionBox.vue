<script setup>
defineProps({
  text: {
    type: String,
  },
});
</script>

<template>
  <div class="description-box">
    <slot v-if="$slots.default" />
    <template v-else>
      {{ text }}
    </template>
  </div>
</template>

<style scoped>
.description-box {
  border-radius: 25px;
  background: #fff;
  color: black;
  font-size: 3.5vmin;
  padding: 5px 10px;
}
</style>
