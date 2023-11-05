<script setup>
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, getStorage, ref as storageRef, uploadBytes } from "firebase/storage";
import { useField, useForm } from "vee-validate";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useFirebase } from "../composables/useFirebase";

const router = useRouter();

const { handleSubmit } = useForm({
  validationSchema: {
    name(value) {
      if (value?.length >= 5) return true;

      return "Nombre tiene que tener un minimo de 5 caracteres";
    },
    date(value) {
      if (value?.length) return true;

      return "Fecha tiene que estar en el futuro.";
    },
    location(value) {
      if (value?.length) return true;

      return "Ubicacion tiene que ser valida.";
    },
  },
});

const name = useField("name");
const date = useField("date");
const location = useField("location");
const image = ref(null);

const submit = handleSubmit(async (values) => {
  isSubmitting.value = true;
  await addEvent(values);
  isSubmitting.value = false;
});

const isSubmitting = ref(false);
const error = ref(false);

const { db } = useFirebase();
const eventsCollection = collection(db, "events");

/**
 * Creates a new event and stores it in firestore
 *
 * @param {Object} values
 */
async function addEvent(values) {
  const { name, date, location } = values;
  const organizer = ""; //TODO: fetch organizer from current user

  const imageUrl = await uploadImage();
  const payload = { name, organizer, location, date };
  if (imageUrl) {
    payload.imageUrl = imageUrl;
  }

  error.value = false;

  try {
    const event = await addDoc(eventsCollection, payload);
    router.push({ name: "EventDetails", params: { id: event.id } });
  } catch (e) {
    error.value = true;
    console.error(e);
  }
}

async function uploadImage() {
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
</script>

<template>
  <v-container class="create-event">
    <v-row>
      <v-col cols="7">
        <v-alert
          v-if="error"
          justify-content="center"
          density="compact"
          type="error"
          variant="tonal"
          title="Ha habido un error"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!"
        ></v-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h1>Crea un partido</h1>

        <v-form @submit.prevent="submit">
          <v-text-field
            v-model="name.value.value"
            :error-messages="name.errorMessage.value"
            label="Nombre del evento"
            maxlength="50"
          />

          <v-text-field
            v-model="date.value.value"
            :error-messages="date.errorMessage.value"
            type="date"
            label="Fecha del evento"
          />

          <v-text-field
            v-model="location.value.value"
            :error-messages="location.errorMessage.value"
            label="Lugar del evento"
          />
          <!-- TODO: google maps -->

          <v-file-input
            v-model="image"
            type="file"
            accept="image/*"
            label="Foto del evento"
            hint="Esta sera la portada de tu evento."
            @change="onFileChange"
          />
          <v-fade-transition>
            <v-img v-if="localImageUrl" width="439" :src="localImageUrl" />
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
  </v-container>
</template>

<style scoped>
.create-event {
  width: 70%;
}
.create-event__btn {
  margin-top: 20px;
  align-content: left;
}
</style>
