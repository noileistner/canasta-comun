<script setup>
import { useFollowerStore } from "@/store/follower";
import { useFollowingStore } from "@/store/following";
import { useSessionStore } from "@/store/session";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref, watch } from "vue";

const {
  create: addFollowing,
  remove: removeFollowing,
  find: findFollowing,
  count: getFollowingCount,
} = useFollowingStore();
const { create: addFollower, remove: removeFollower, count: getFollowersCount } = useFollowerStore();
const { currentUser } = storeToRefs(useSessionStore());

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const sections = computed(() => [
  { name: "seguidores", count: followersCount },
  { name: "siguiendo", count: followingCount },
]);

const isCurrentUser = computed(() => {
  return currentUser.value?.id === props.user.id;
});

const isFollowedByCurrentUser = ref(false);
async function computeIsFollowedByCurrentUser() {
  if (!props.user || isCurrentUser.value || !currentUser.value) {
    isFollowedByCurrentUser.value = false;
  } else {
    isFollowedByCurrentUser.value = await findFollowing(currentUser.value.id, props.user.id);
  }
}

const followersCount = ref(0);
async function computeFollowersCount() {
  followersCount.value = props.user ? await getFollowersCount(props.user.id) : 0;
}

const followingCount = ref(0);
async function computeFollowingCount() {
  followingCount.value = props.user ? await getFollowingCount(props.user.id) : 0;
}

async function updateAsyncComputedValues() {
  await Promise.all([computeIsFollowedByCurrentUser(), computeFollowersCount(), computeFollowingCount()]);
}

const toggleFollowButtonLabel = computed(() => (isFollowedByCurrentUser.value ? "Dejar de seguir" : "Seguir"));
const isUpdatingFollowing = ref(false);
const updateFollowingError = ref(null);

async function toggleFollow() {
  isUpdatingFollowing.value = true;
  updateFollowingError.value = null;

  try {
    const fn = isFollowedByCurrentUser.value ? unfollow : follow;
    await fn();
  } catch (error) {
    console.error(error);
    updateFollowingError.value = `${toggleFollowButtonLabel.value} failed.`;
  } finally {
    isUpdatingFollowing.value = false;
  }
}

async function follow() {
  return await Promise.all([
    addFollowing(currentUser.value.id, props.user),
    addFollower(props.user.id, currentUser.value),
  ]);
}

async function unfollow() {
  return await Promise.all([
    removeFollowing(currentUser.value.id, props.user),
    removeFollower(props.user.id, currentUser.value),
  ]);
}

watch([isUpdatingFollowing, currentUser, props.user], () => updateAsyncComputedValues());

onMounted(async () => {
  await updateAsyncComputedValues();
});
</script>

<template>
  <v-card variant="flat">
    <v-card-text class="follow-status">
      <div v-for="section in sections" :key="section.name" class="follow-status__entry">
        <span class="follow-status__entry-count">
          {{ section.count }}
        </span>
        <v-card-subtitle> {{ section.name }} </v-card-subtitle>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        v-if="!isCurrentUser"
        @click="toggleFollow"
        :loading="isUpdatingFollowing"
        variant="flat"
        rounded
        color="secondary"
        width="210px"
        >{{ toggleFollowButtonLabel }}</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.follow-status {
  display: grid;
  grid-template-columns: auto auto;
  align-items: start;
  justify-content: start;
}
.follow-status__entry {
  display: grid;
  grid-template-rows: auto auto;
  text-align: center;
}
.follow-status__entry-count {
  font-size: 170%;
  font-weight: 700;
}
</style>
