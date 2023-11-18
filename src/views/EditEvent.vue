<script setup>
import { useEvents } from "@/composables/useEvents";
import { useFirebase } from "@/composables/useFirebase";
import { useEventsStore } from "@/store/events";
import { getDownloadURL, getStorage, ref as storageRef, uploadBytes } from "firebase/storage";
import { useField, useForm } from "vee-validate";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();

const route = useRoute();
const id = computed(() => route.params.id);

const { update: updateEvent } = useEventsStore();
const { event, loadEvent } = useEvents();

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

      return "Descripción tiene que tener un mínimo de 10 caracteres y un máximo de 500.";
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
  await updateEventDetails(values);
  isSubmitting.value = false;
});

const isSubmitting = ref(false);
const error = ref(false);

/**
 * Creates a new event and stores it in firestore
 *
 * @param {Object} values
 */
async function updateEventDetails(values) {
  const imageUrl = await uploadImage();
  const attributes = {
    name: values.name,
    description: values.description ?? "",
    date: values.date ?? "",
    time: values.time ?? "",
    location: values.location ?? "",
  };

  if (imageUrl) {
    // TODO: extract image upload composable
    attributes.image = {
      url: imageUrl,
      path: imageUrl.replace("https://firebasestorage.googleapis.com", ""),
    };
  }

  error.value = false;

  try {
    const updatedEvent = await updateEvent(event.value.id, attributes);
    // FIXME: the line below is a hack to update the current user values,
    // find a better way to re-fetch the current user profile
    Object.assign(event.value, updatedEvent);
    // END FIXME
    router.push({ name: "EventDetails", params: { id: event.value.id } });
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
  const [file] = image.value;

  if (!file) {
    return;
  }

  createImage(file);
}

function setDefaultValues() {
  if (!event.value) {
    return;
  }

  const attributes = event.value;

  name.value.value = attributes.name;
  description.value.value = attributes.description;
  date.value.value = attributes.date;
  time.value.value = attributes.time;
  location.value.value = attributes.location;
}

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

watch(event, () => setDefaultValues(), { deep: true });

onMounted(() => load());

// TODO: make form be submitable without being filled
</script>

<template>
  <v-container class="create-event">
    <v-row>
      <v-col>
        <h1 class="create-event__title">Edita tu partido</h1>

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
              Actualizar partido
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
