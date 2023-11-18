<script setup>
import ContentContainer from "@/components/ContentContainer.vue";
import EventCommentSection from "@/components/EventCommentSection.vue";
import { useEvents } from "@/composables/useEvents";
import { useSessionStore } from "@/store/session";
import { storeToRefs } from "pinia";
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const { currentUser } = storeToRefs(useSessionStore());
const { event, loadEvent, addComment } = useEvents();

const route = useRoute();
const id = computed(() => route.params.id);

async function load() {
  if (id.value) {
    await loadEvent(id.value);
    if (!event.value) {
      //TODO: render error
      window.alert("event not found", id.value);
    }
  } else {
    // TODO: render error 404
    window.alert("no id");
  }
}

const isOrganizer = computed(() => event.value?.organizer.id === currentUser.value?.id);

onMounted(() => load());
</script>

<template>
  <v-fade-transition>
    <ContentContainer v-if="event" class="event-details">
      <v-card min-width="210" variant="flat" max-width="100%">
        <v-card-title class="event-details__title event-details__all">{{ event.name }}</v-card-title>

        <v-card-text class="event-details__organizer">
          Organizado por
          <router-link
            class="event-details__organizer-user event-details__all"
            :to="{ name: 'ProfilePage', params: { id: event.organizer.id } }"
          >
            {{ event.organizer.name }}
          </router-link>
        </v-card-text>

        <v-card-text class="event-details__description event-details__all">
          {{ event.description }}
        </v-card-text>

        <v-card-text class="event-details__info event-details__all">
          <v-icon class="fa-solid fa-calendar-days" color="secondary" />
          {{ event.date }}
        </v-card-text>

        <v-card-text class="event-details__info event-details__all">
          <v-icon class="fa-solid fa-clock" color="secondary" />
          {{ event.time }}
        </v-card-text>

        <v-card-text class="event-details__info event-details__all">
          <v-icon class="fa-solid fa-location-dot" color="secondary" />
          {{ event.location }}
        </v-card-text>
      </v-card>

      <template #image v-if="event.image">
        <v-card variant="flat"> <TwicImg class="event-details__image" :src="event.image.path" /> </v-card>
      </template>

      <div class="event-details__buttons">
        <router-link v-if="isOrganizer" :to="{ name: 'EditEvent', params: { id } }">
          <v-btn class="event-details__btn" rounded color="secondary">Editar partido</v-btn>
        </router-link>

        <v-btn v-else class="event-details__btn" rounded color="secondary">Únete</v-btn>
      </div>

      <EventCommentSection :comments="event.comments" @comment:add="addComment" />
    </ContentContainer>

    <v-container v-else class="event-details__loading" height="500">
      <v-progress-circular indeterminate />
    </v-container>
  </v-fade-transition>
</template>

<style scoped>
/* .event-details {
  margin-bottom: 100px;
} */
.event-details__all {
  padding-bottom: 3%;
  padding-top: 0;
}
.event-details__title {
  font-family: var(--app-font-family);
  font-size: 6vh;
  padding-top: 10px;
}
.event-details__organizer {
  font-size: 1.6vh;
}
.event-details__organizer-user {
  color: #48a67c;
}
.event-details__description {
  font-size: 1.8vh;
}
.event-details__info {
  font-size: 1.7vh;
  opacity: 0.8;
}
.event-details__image {
  aspect-ratio: 5/3;
  margin-bottom: 30px;
}
.event-details__btn {
  margin-top: 20px;
  margin-bottom: 20px;
}
.event-details__buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}
.event-details__loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
}

@media (max-width: 310px) {
  .event-details__image {
    width: 90%;
  }
}
</style>
