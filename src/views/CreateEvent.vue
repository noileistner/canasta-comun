<script setup>
import { useEventsStore } from "@/store/events";
import { useSessionStore } from "@/store/session";
import { getDownloadURL, getStorage, ref as storageRef, uploadBytes } from "firebase/storage";
import { storeToRefs } from "pinia";
import { useField, useForm } from "vee-validate";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useFirebase } from "../composables/useFirebase";

const { currentUser } = storeToRefs(useSessionStore());
const { create: createEvent } = useEventsStore();
const router = useRouter();

const { handleSubmit } = useForm({
  validationSchema: {
    name(value) {
      if (value?.length >= 5 && value?.length <= 23) return true;

      return "Nombre tiene que tener un mínimo de 5 caracteres y un máximo de 23.";
    },
    date(value) {
      if (value?.length) return true;

      return "Fecha tiene que estar en el futuro.";
    },
    time(value) {
      if (value?.length) return true;

      return "Fecha inválida.";
    },
    location(value) {
      if (value?.length) return true;

      return "Ubicación tiene que ser válida.";
    },
    description(value) {
      if (value?.length <= 500) return true;

      return "Ubicación tiene que ser válida.";
    },
  },
});

const name = useField("name");
const date = useField("date");
const time = useField("time");
const location = useField("location");
const description = useField("description");
const image = ref(null);

const submit = handleSubmit(async (values) => {
  isSubmitting.value = true;
  await addEvent(values);
  isSubmitting.value = false;
});

const isSubmitting = ref(false);
const error = ref(false);

/**
 * Creates a new event and stores it in firestore
 *
 * @param {Object} values
 */
async function addEvent(values) {
  const imageUrl = await uploadImage();
  const attributes = {
    ...values,
    imageUrl,
    organizer: {
      id: currentUser.value.id,
      name: currentUser.value.name,
    },
  };

  error.value = false;

  try {
    const event = await createEvent(attributes);
    router.push({ name: "EventDetails", params: { id: event.id } });
  } catch (e) {
    error.value = true;
    console.error(e);
  }
}

async function uploadImage() {
  if (!image.value) {
    return;
  }
  const [file] = image.value;
  if (!file) {
    return;
  }
  const { app } = useFirebase();
  const storage = getStorage(app);
  const storageReference = storageRef(storage, `event-images/${file.name}`);
  console.log("storageReference", storageReference);
  const snapshot = await uploadBytes(storageReference, file);

  const imageUrl = await getDownloadURL(snapshot.ref);

  return imageUrl;
}

const localImageUrl = ref(null);

function createImage(file) {
  console.log(file);
  const reader = new FileReader();

  reader.onload = (e) => {
    localImageUrl.value = e.target.result;
  };
  reader.readAsDataURL(file);
}

function onFileChange() {
  if (!image.value) {
    return;
  }
  const [file] = image.value;

  if (!file) {
    return;
  }

  createImage(file);
}
</script>

<template>
  <v-container class="create-event">
    <v-row>
      <v-col>
        <h1 class="create-event__title">Crea un partido</h1>

        <v-form @submit.prevent="submit">
          <v-text-field
            v-model="name.value.value"
            :error-messages="name.errorMessage.value"
            label="Nombre del evento"
            maxlength="50"
          />

          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="date.value.value"
                :error-messages="date.errorMessage.value"
                type="date"
                label="Fecha del evento"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="time.value.value"
                :error-messages="time.errorMessage.value"
                type="time"
                label="Hora del evento"
              />
            </v-col>
          </v-row>

          <v-text-field
            v-model="location.value.value"
            :error-messages="location.errorMessage.value"
            label="Lugar del evento"
          />
          <!-- TODO: google maps -->

          <v-textarea
            v-model="description.value.value"
            :error-messages="description.errorMessage.value"
            label="Descripción del evento"
          />

          <v-file-input
            v-model="image"
            type="file"
            accept="image/*"
            label="Foto del evento"
            hint="Esta sera la portada de tu evento."
            @change="onFileChange"
          />
          <v-fade-transition>
            <v-img class="create-event__image" v-if="localImageUrl" width="500" :src="localImageUrl" cover />
          </v-fade-transition>

          <div class="text-right">
            <v-btn
              class="create-event__btn"
              type="submit"
              size="large"
              rounded
              color="secondary"
              :loading="isSubmitting"
            >
              Crear partido
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="7">
        <v-alert
          v-if="error"
          justify-content="center"
          density="compact"
          type="error"
          variant="tonal"
          title="Error"
          text="Ha habido en error, inténtelo de nuevo"
        ></v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.create-event {
  width: 70%;
}
.create-event__title {
  font-family: var(--app-font-family);
}
.create-event__image {
  aspect-ratio: 5/3;
}
.create-event__btn {
  margin-top: 20px;
  align-content: left;
}

@media (max-width: 800px) {
  .create-event {
    width: 95%;
  }
}
</style>
