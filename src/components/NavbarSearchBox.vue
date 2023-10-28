<template>
  <div class="searchbox">
    <v-responsive class="ma-0 pa-0" width="150px">
      <v-text-field
        v-model="searchInput"
        flat
        density="compact"
        variant="solo"
        hide-details
        single-line
        rounded
        placeholder="busca"
        append-inner-icon="fa:fas fa-search"
        @keydown.enter="onSearchKeyDown"
        @click:append-inner="onSearchClick"
      />
    </v-responsive>
  </div>
</template>

<script setup>
import { ref } from "vue";

const searchInput = ref("");

function onSearchKeyDown() {
  search();
}

function onSearchClick() {
  search();
}

function search() {
  console.log(searchInput.value);
}
</script>

<style scoped>
.searchbox {
  margin-right: 30px;
}
</style>
