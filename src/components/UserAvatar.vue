<script setup>
import { computed } from "vue";

const props = defineProps({
  user: {
    type: Object,
  },
  color: {
    type: String,
  },
  size: {
    type: [Number, String],
  },
});

const image = computed(() => props.user?.image);
</script>

<template>
  <v-avatar class="user-avatar" :size="size" :color="color">
    <v-img v-if="image" :src="image.url" :width="size" cover />
    <v-icon v-else icon="fa:fas fa-user" />
  </v-avatar>
</template>
