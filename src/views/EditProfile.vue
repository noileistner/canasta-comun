<script setup>
import { useSessionStore } from "@/store/session";
import { useUserStore } from "@/store/user";
import { getDownloadURL, getStorage, ref as storageRef, uploadBytes } from "firebase/storage";
import { storeToRefs } from "pinia";
import { useField, useForm } from "vee-validate";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useFirebase } from "../composables/useFirebase";

const { update: updateUser } = useUserStore();
const { currentUser } = storeToRefs(useSessionStore());
const router = useRouter();

const { handleSubmit } = useForm({
  validationSchema: {
    name(value) {
      if (value?.length >= 3 && value?.length <= 50) return true;

      return "Nombre tiene que tener un mínimo de 3 caracteres y un máximo de 50.";
    },
  },
});

const name = useField("name");
const birthday = useField("birthday");
const location = useField("location");
const description = useField("description");
const image = ref(null);

const submit = handleSubmit(async (values) => {
  isSubmitting.value = true;
  await updateProfile(values);
  isSubmitting.value = false;
});

const isSubmitting = ref(false);
const error = ref(false);

/**
 * Creates a new event and stores it in firestore
 *
 * @param {Object} values
 */
async function updateProfile(values) {
  const imageUrl = await uploadImage();
  const attributes = {
    name: values.name,
    description: values.description ?? "",
    birthday: values.birthday ?? "",
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
    const user = await updateUser(currentUser.value.id, attributes);
    // FIXME: the line below is a hack to update the current user values,
    // find a better way to re-fetch the current user profile
    Object.assign(currentUser.value, user);
    // END FIXME
    router.push({ name: "ProfilePage", params: { id: user.id } });
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
  const storageReference = storageRef(storage, `profile-images/${file.name}`);
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
  if (!currentUser.value) {
    return;
  }

  const attributes = currentUser.value;

  name.value.value = attributes.name;
  description.value.value = attributes.description;
  birthday.value.value = attributes.birthday;
  location.value.value = attributes.location;
}

watch(currentUser, () => setDefaultValues(), { deep: true });

onMounted(() => setDefaultValues());

// TODO: make form be submitable without being filled
</script>

<template>
  <v-container class="edit-profile">
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

    <v-row>
      <v-col>
        <h1 class="edit-profile__title">Edita tu perfil</h1>

        <v-form @submit.prevent="submit">
          <v-text-field
            v-model="name.value.value"
            :error-messages="name.errorMessage.value"
            label="Nombre"
            maxlength="50"
          />

          <v-textarea
            v-model="description.value.value"
            :error-messages="description.errorMessage.value"
            label="Descripción"
          />

          <v-text-field
            v-model="birthday.value.value"
            :error-messages="birthday.errorMessage.value"
            type="date"
            label="Cumple"
          />

          <v-text-field
            v-model="location.value.value"
            :error-messages="location.errorMessage.value"
            label="Población"
          />

          <v-file-input
            v-model="image"
            type="file"
            accept="image/*"
            label="Foto de perfil"
            hint="Esta sera tu foto de perfil."
            @change="onFileChange"
          />
          <v-fade-transition>
            <v-img class="edit-profile__image" v-if="localImageUrl" width="500" :src="localImageUrl" cover />
          </v-fade-transition>

          <div class="text-right">
            <v-btn
              class="edit-profile__btn"
              type="submit"
              size="large"
              rounded
              color="secondary"
              :loading="isSubmitting"
            >
              Actualizar perfil
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.edit-profile {
  width: 70%;
}
.edit-profile__title {
  font-family: var(--app-font-family);
}

@media (max-width: 800px) {
  .edit-profile {
    width: 95%;
  }
}
</style>
