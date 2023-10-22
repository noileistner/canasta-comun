<template>
  <div id="footer">
    <router-link to="/contactanos">Contactanos</router-link>
  </div>
</template>

<style scoped>
#footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  padding: 25px;
  background: rgb(var(--v-theme-primary));
  color: white;
  display: flex;
  align-items: center;
  border-top: 7px solid rgb(var(--v-theme-secondary));
  z-index: 2;
}

#footer a {
  display: inline-block;
  margin-right: 20px;
  color: white;
  opacity: 0.7;
  transition: 0.2 ease color;
}
#footer a.router-link-active,
#footer a:hover {
  opacity: 1;
}
</style>
