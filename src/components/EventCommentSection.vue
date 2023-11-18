<script setup>
import { computed, ref } from "vue";
import EventComment from "./EventComment.vue";

const emit = defineEmits(["comment:add"]);

const props = defineProps({
  comments: {
    type: Array,
  },
});

const DEFAULT_COMMENTS_LIST_SIZE = 3;

const showAll = ref(false);

const comments = computed(() => {
  const comments = props.comments ?? [];

  if (showAll.value) {
    return comments;
  }
  return comments.slice(0, DEFAULT_COMMENTS_LIST_SIZE);
});

const count = computed(() => props.comments?.length);
const hasComments = computed(() => count.value > 0);

const showToggleShowAllButton = computed(() => props.comments?.length > DEFAULT_COMMENTS_LIST_SIZE);
const toggleShowAllButtonLabel = computed(() => {
  return `Show ${showAll.value ? "less" : "all"}`;
});

function toggleShowAll() {
  showAll.value = !showAll.value;
}

const newComment = ref(null);
const canCreateNewComment = computed(() => newComment.value?.length > 0);

function addComment() {
  emit("comment:add", newComment.value);
  newComment.value = null;
}
</script>

<template>
  <v-container>
    <h3>Comments ({{ count }})</h3>
    <div v-if="hasComments" class="comments">
      <EventComment class="comment" v-for="comment in comments" :key="comment.id" :comment="comment" />
      <v-btn v-if="showToggleShowAllButton" @click="toggleShowAll" variant="text">{{ toggleShowAllButtonLabel }}</v-btn>
    </div>
    <div v-else>no comments yet</div>

    <hr />

    <v-textarea v-model="newComment" placeholder="Escribe un comentario..." />
    <v-btn @click="addComment" :disabled="!canCreateNewComment">Add Comment</v-btn>
  </v-container>
</template>

<style scoped>
.comments .comment {
  margin-bottom: 20px;
}
</style>
