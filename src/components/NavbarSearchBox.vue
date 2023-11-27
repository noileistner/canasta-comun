<script setup>
import { useEventsStore } from "@/store/events";
import { useUserStore } from "@/store/user";
import { ref } from "vue";
import { useRouter } from "vue-router";
import UserAvatar from "./UserAvatar.vue";

const router = useRouter();
const { findAll: findUsers } = useUserStore();
const { findAll: findEvents } = useEventsStore();

const items = ref([]);
const selectedItem = ref(null);
const loading = ref(false);
const error = ref(null);

async function search(searchTerm) {
  if (searchTerm?.length < 3) {
    return;
  }

  error.value = null;
  loading.value = true;

  const results = [];

  try {
    const [users, events] = await Promise.all([findUsers(searchTerm), findEvents(searchTerm)]);

    if (events.length) {
      results.push(...events.map((event) => ({ ...event, isEvent: true })));
    }
    if (users.length) {
      results.push(...users.map((user) => ({ ...user, isUser: true })));
    }
  } catch (e) {
    error.value = "Unable to find data.";
  } finally {
    loading.value = false;
    items.value = results;
  }
}

function handleSelect() {
  if (!selectedItem.value) {
    return;
  }
  const { isUser, id } = selectedItem.value;
  router.push({
    name: isUser ? "ProfilePage" : "EventDetails",
    params: { id },
  });
}

function itemSubtitle(item) {
  return item.isUser ? "Usario" : "Evento";
}
</script>

<template>
  <div class="searchbox">
    <v-responsive class="ma-0 pa-0" width="200px">
      <v-autocomplete
        @update:search="search"
        @update:model-value="handleSelect"
        :items="items"
        item-title="name"
        item-value="id"
        flat
        density="compact"
        variant="solo"
        hide-details
        single-line
        rounded
        placeholder="buscar evento o usarios"
        no-data-text="ni events ni usarios encontrado..."
        return-object
        :loading="loading"
        :error="error"
      >
        <template #prepend-inner>
          <v-icon icon="fa:fas fa-search" />
        </template>

        <template v-slot:item="{ item, props }">
          <v-list-item :title="item" v-bind="props" :subtitle="itemSubtitle(item.raw)">
            <template v-slot:prepend>
              <UserAvatar v-if="item.raw.isUser" :user="item.raw" size="small" color="grey" />
              <v-avatar v-else size="small" color="grey">
                <v-icon icon="fa:fas fa-basketball" />
              </v-avatar>
            </template>
          </v-list-item>
        </template>
      </v-autocomplete>
    </v-responsive>
  </div>
</template>

<style scoped>
.searchbox {
  margin-right: 40px;
}
</style>
