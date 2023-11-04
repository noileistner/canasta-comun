<script setup>
//imports
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useFirebase } from "../composables/useFirebase";

//events collection refs
const { db } = useFirebase();
const eventCollectionRef = collection(db, "events");
const eventCollectionQuery = query(eventCollectionRef, orderBy("date", "desc"));
const router = useRouter();

//events
const events = ref([]);

function uptadeEvent(querySnapshot) {
  const fbEvents = [];
  querySnapshot.forEach((doc) => {
    const event = {
      id: doc.id,
      content: doc.data().content,
      organizer: doc.data().organizer,
      image: doc.data().image,
      location: doc.data().location,
      date: doc.data().date,
    };
    fbEvents.push(event);
  });
  events.value = fbEvents;
}

//connect firebase
function connectFirebase() {
  onSnapshot(eventCollectionQuery, uptadeEvent);
}

//mounted
onMounted(() => {
  connectFirebase();
});

// add Event
const newEventName = ref("");
const newEventOrganizer = ref("");
const newEventImage = ref("");
const newEventLocation = ref("");
const newEventDate = ref("");

const addEvent = () => {
  console.log("Add Event");
  addDoc(eventCollectionRef, {
    content: newEventName.value,
    organizer: newEventOrganizer.value,
    image: newEventImage.value,
    location: newEventLocation.value,
    date: newEventDate.value,
  });
  // newEventName.value = "";
};

// Image
document.addEventListener("DOMContentLoaded", () => {
  const imageInput = document.getElementById("imageInput");
  const imagePreview = document.getElementById("imagePreview");
  //   const container = document.getElementByClass("create-event");

  if (imageInput && imagePreview) {
    imageInput.addEventListener("change", function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          imagePreview.src = e.target.result;
          imagePreview.style.display = "block";
          //   container.style.paddingBottom = "255px";
        };
        reader.readAsDataURL(file);
      } else {
        imagePreview.style.display = "none";
        // container.style.paddingBottom = "0px";
      }
    });
  }
  //   if (imagePreview.style.display === "block") {
  //   } else {
  //   }
});
</script>

<template>
  <v-container class="create-event">
    <v-row>
      <v-col>
        <h1>Crea un partido</h1>
        <v-form @submit.prevent="addEvent">
          <v-text-field v-model="newEventName" label="Nombre del evento" maxlength="50"></v-text-field>

          <v-text-field v-model="newEventDate" type="date" label="Fecha del evento"></v-text-field>

          <v-text-field v-model="newEventLocation" label="Lugar del evento"></v-text-field>
          <!-- TODO: google maps -->

          <input v-bind="newEventImage" type="file" accept="image/*" id="imageInput" />
          <div class="create-event__img-div">
            <img id="imagePreview" width="429" height="242" alt="Image Preview" style="display: none" />
          </div>
          <!-- TODO: make image proportionate -->

          <div class="text-right">
            <v-btn class="create-event__btn" type="submit" size="large" rounded color="secondary">Crear partido</v-btn>
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
.create-event__img-div {
  height: 252;
  width: 439;
}
.create-event__btn {
  margin-top: 20px;
  align-content: left;
}
</style>
