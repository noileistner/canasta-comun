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
      window.alert("event not found");
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
      <v-card min-width="210" variant="flat">
        <v-card-title class="event-details__title event-details__all">{{ event.name }}</v-card-title>

        <v-card-text>
          <!-- TODO: add event organizer -->
          Organizado por
          <router-link class="event-details__organizer event-details__all" to="/">{{ event.organizer }} </router-link>
        </v-card-text>

        <v-card-text class="event-details__description event-details__all">
          {{ event.description }}
        </v-card-text>

        <v-card-text class="event-details__info event-details__all">
          <v-icon class="fa-solid fa-location-dot" color="secondary" />
          {{ event.location }}
        </v-card-text>

        <v-card-text class="event-details__info event-details__all">
          <v-icon class="fa-solid fa-calendar-days" color="secondary" />
          {{ event.date }}
        </v-card-text>
      </v-card>

      <template #image v-if="event.image">
        <v-card variant="flat" min-width="210">
          <TwicImg :src="event.image.path" />
        </v-card>
      </template>
    </ContentContainer>
    <v-container v-else class="event-details__loading" height="500">
      <v-progress-circular indeterminate />
    </v-container>
  </v-fade-transition>
</template>

<style scoped>
.event-details__all {
  padding-bottom: 20px;
  padding-top: 0;
}
.event-details__title {
  font-family: var(--app-font-family);
  font-size: 3.5vw;
  padding-top: 10px;
}
.event-details__organizer {
  color: #48a67c;
}
.event-details__description {
  font-size: 1.2vw;
}
.event-details__info {
  font-size: 1.4vw;
  opacity: 0.8;
}
.event-details__image {
  aspect-ratio: 5/3;
}

.event-details__loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
}
</style>
