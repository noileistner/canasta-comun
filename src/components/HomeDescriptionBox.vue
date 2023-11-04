<script setup>
import { computed } from "vue";

const props = defineProps({
  icon: {
    type: String,
  },
});

const iconName = computed(() => `fa:fas fa-${props.icon}`);
</script>

<template>
  <div class="description-box">
    <v-row>
      <v-col cols="2" v-if="icon">
        <v-icon :icon="iconName" size="large" color="secondary"></v-icon>
      </v-col>

      <v-col cols="10" class="description-box__text-row">
        <slot />
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.description-box {
  border-radius: 13px;
  background: #fff;
  padding: 8px 10px;
  width: 100%;
  height: 90%;
  min-width: 310px;
}

.description-box__text-row {
  text-align: left;
}
</style>
