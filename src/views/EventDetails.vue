<script setup>
import ContentContainer from "@/components/ContentContainer.vue";
import { doc, getDoc } from "firebase/firestore";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useFirebase } from "../composables/useFirebase";

const route = useRoute();
const id = computed(() => route.params.id);
const event = ref(null);

async function loadEvent() {
  const { db } = useFirebase();
  const docRef = doc(db, "events", id.value);
  const docSnap = await getDoc(docRef);

  console.log("load event", id.value);

  if (docSnap.exists()) {
    event.value = docSnap.data();
    console.log("Document data:", event.value);
  }
}

onMounted(async () => {
  if (id.value) {
    await loadEvent();
    if (!event.value) {
      //TODO: render error
      window.alert("event not found", id.value);
    }
  } else {
    // TODO: render error 404
    window.alert("no id");
  }
});
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

        <v-card-actions>
          <v-btn class="edit-profile__btn" type="submit" size="large" rounded color="secondary" :loading="isSubmitting">
            Actualizar perfil
          </v-btn>
        </v-card-actions>
      </v-card>

      <template #image v-if="event.image">
        <v-card variant="flat"> <TwicImg class="event-details__image" :src="event.image.path" /> </v-card>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24002.805396606374!2d1.7828631766955259!3d41.23591868715993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a3804720b208fb%3A0x7061f1fb2907c8f9!2s08870%20Sitges%2C%20Barcelona!5e0!3m2!1sen!2ses!4v1699733544617!5m2!1sen!2ses"
          width="100%"
          height="50%"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </template>
    </ContentContainer>

    <v-container v-else class="event-details__loading" height="500">
      <v-progress-circular indeterminate />
    </v-container>
  </v-fade-transition>
</template>

<style scoped>
.event-details {
  margin-bottom: 100px;
}
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
  /* font-size: 1.8vh; */
}
.event-details__info {
  font-size: 1.7vh;
  opacity: 0.8;
}
.event-details__image {
  aspect-ratio: 5/3;
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
