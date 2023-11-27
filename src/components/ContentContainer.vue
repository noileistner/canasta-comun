<script setup></script>

<template>
  <div class="content-container">
    <v-row class="content-container__row">
      <v-col cols="7" class="content-column">
        <slot />
      </v-col>

      <v-col class="content-container__image content-column" cols="5">
        <slot name="image" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="content__buttons content-column">
        <slot name="buttons" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="content-column">
        <slot name="participants" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="content__comments content-column">
        <slot name="comments" />
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.content-container {
  padding-top: 15px;
  /* padding-bottom: 50px; */
  width: 70%;
  margin: auto;
  display: grid;
}
.content-container__image {
  padding: 0;
}
.content__buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 37px;
}
.content__comments {
  width: 60%;
}

@media (max-width: 755px) {
  .content-container {
    width: 90%;
  }
  .content-container__row {
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(1, 1fr);
  }
  .content-column {
    max-width: 100%;
    width: 100%;
    justify-content: center;
    display: flex;
  }
}
</style>
