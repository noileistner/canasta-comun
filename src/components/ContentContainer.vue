<script setup></script>

<template>
  <div class="content-container">
    <v-row>
      <v-col cols="7">
        <slot />
      </v-col>

      <v-col cols="5">
        <slot name="image" />
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.content-container {
  padding-top: 15px;
  padding-bottom: 50px;
  width: 70%;
  margin: auto;
}
</style>
