<script></script>

<template>
  <v-container style="margin-left: 0px; margin-right: 0px">
    <v-row cols="12" class="about-me">
      <v-col cols="2">
        <div class="d-none d-sm-flex">
          Table of contents
          <!-- <ul v-for="heading in headings"></ul> -->
        </div>

        <v-app-bar-nav-icon class="d-sm-none">
          <i class="fa-solid fa-bars"></i>
        </v-app-bar-nav-icon>
      </v-col>

      <v-col cols="10" class="about-me__content">
        <h1 class="about-me__content__title">Historia de Canastacomun</h1>
        <h1 class="about-me__content__subtitle">Introducción</h1>
        <p class="about-me__content__text">
          Hace meses empecé a jugar baloncesto durante la hora del patio en el instituto con mis compañeros, desde el
          primer momento me encantó y comencé a interesarme por el deporte. Ahora juego regularmente con mis amigos en
          pistas públicas, sin embargo, uno de los problemas a los que nos enfrentamos es que no siempre somos los
          suficientes para formar equipos completos de cinco jugadores, como en un partido oficial. Me gustaría jugar en
          un equipo, pero no tengo experiencia jugando en partidos organizados y mis habilidades aún no han alcanzado un
          nivel avanzado para ello. Prefiero jugar con gente con una similar maestría del deporte y aprender junto a
          otros que comparten mi nivel de habilidad y entusiasmo. Por ello busqué alguna aplicación o página web donde
          encontrar a otros apasionados del baloncesto e invitarlos a jugar con mis amigos u organizar partidos. Hay
          algunas plataformas que conecta a personas con los mismos intereses y algunas con un enfoque al deporte como
          Playpass.com y Sportpartner.com, pero Sportpartner no ofrece servicios de básquet y Playpass es más para
          organizaciones, no individuos. Mi padre es programador, siempre ha intentado convencerme de que yo también
          empiece a aprender programación. El año pasado hice la optativa de programación y desde entonces me interesa
          mucho el tema, hago cursos en internet para mejorar y ya he hecho algunos proyectos por mi cuenta. Como no he
          encontrado ninguna plataforma para solucionar mi problema, decidí hacer una yo mismo, aplicando todo lo que he
          aprendido sobre el tema hasta ahora y juntando mis dos pasatiempos favoritos. Espero obtener experiencia en el
          proceso de creación de una página web de principio a final y montar una plataforma donde se pueda mejorar como
          jugador y atleta y, al mismo tiempo, establecer nuevas amistades en el proceso.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.about-me__content__title {
  font-family: var(--app-font-family);
  display: flex;
  justify-content: center;
}
.about-me__content__subtitle {
  font-family: var(--app-font-family);
  padding: 15px 0;
}
.about-me__content__text {
  font-size: 2vh;
}
@media (max-width: 600px) {
  .about-me__content__title {
    font-size: 3vh;
  }
  .about-me__content__subtitle {
    font-size: 2.5vh;
  }
}
</style>
