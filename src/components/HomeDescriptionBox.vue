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
        <v-icon :icon="iconName" size="small" color="secondary"></v-icon>
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
  font-size: 3.5vmin;
  padding: 5px 10px;
  width: 90%;
  height: 85%;
}

.description-box__text-row {
  text-align: left;
}
</style>
