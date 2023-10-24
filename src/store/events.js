import { defineStore } from "pinia";
import { ref } from "vue";
import { faker } from "@faker-js/faker";

function createEvent() {
  return {
    id: faker.string.uuid(),
    name: faker.lorem.words(),
    image: {
      url: "https://images.sidearmdev.com/crop?url=https%3a%2f%2fdxbhsrqyrr690.cloudfront.net%2fsidearm.nextgen.sites%2ffvsusports.com%2fimages%2f2023%2f3%2f27%2fMulti-Format_Announcement_-_Landscape_Panel.jpg&height=1080&width=1920&type=jpeg&gravity=smart",
    },
    organizer: {
      name: faker.person.fullName(),
    },
    date: faker.date.future(),
    location: {
      country: faker.location.country(),
      city: faker.location.city(),
      street: faker.location.streetAddress(),
      venue: {
        name: faker.company.buzzNoun(),
      },
    },
  };
}

function loadEvents() {
  const events = [];
  const amount = faker.number.int({ min: 1, max: 6 });

  for (let i = 0; i < amount; i++) {
    events.push(createEvent());
  }

  return events;
}

export const useEventsStore = defineStore("events", () => {
  const events = ref([]);

  // TODO: implement firebase
  events.value = loadEvents();

  return {
    events,
  };
});
