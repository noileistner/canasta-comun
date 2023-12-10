<script></script>

<template>
  <h1 class="about-title">Desarrollo de una página web: Canastacomun</h1>
  <div class="about-all">
    <iframe
      class="about"
      width="100%"
      height="100%"
      src="https://docs.google.com/document/d/e/2PACX-1vQtZSTU45V8PxDJsW5X3003FepCJDM_5Cw2eWywoT8dutFaleiuX-EavbJ8d56qqKgfdLqXkEWi0316/pub?embedded=true"
    />
  </div>
</template>

<style scoped>
.about {
  height: 555px;
  width: 60%;
  margin-bottom: 30px;
}
.about-title {
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
  font-family: var(--app-font-family);
}
.about-all {
  display: flex;
  justify-content: center;
}
@media (max-width: 1200px) {
  .about {
    width: 80%;
  }
}
@media (max-width: 500px) {
  .about {
    width: 95%;
  }
}
</style>
