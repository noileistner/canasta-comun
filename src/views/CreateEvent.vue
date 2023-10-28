<template>
  <v-container class="create-event">
    <h1>Crea un partido</h1>

    <v-text-field label="Nombre del evento" maxlength="50"></v-text-field>
    <v-text-field type="date" label="Fecha del evento"></v-text-field>
    <v-text-field label="Lugar del evento"></v-text-field>
    <!-- TODO: google maps -->
    <input type="file" accept="image/*" id="imageInput" />
    <img
      id="imagePreview"
      width="429"
      height="242"
      alt="Image Preview"
      style="display: none"
    />
    <!-- TODO: make image proportionate -->
  </v-container>
</template>

<script>
document.addEventListener("DOMContentLoaded", function () {
  const imageInput = document.getElementById("imageInput");
  const imagePreview = document.getElementById("imagePreview");
  //   const container = document.getElementByClass("create-event");

  if (imageInput && imagePreview) {
    imageInput.addEventListener("change", function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          imagePreview.src = e.target.result;
          imagePreview.style.display = "block";
          //   container.style.paddingBottom = "255px";
        };
        reader.readAsDataURL(file);
      } else {
        imagePreview.style.display = "none";
        // container.style.paddingBottom = "0px";
      }
    });
  }
  //   if (imagePreview.style.display === "block") {
  //   } else {
  //   }
});
</script>

<style scoped>
.create-event {
  width: 70%;
  justify-content: center;
}
</style>
