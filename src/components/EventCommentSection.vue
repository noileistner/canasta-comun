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
  return `Enseña ${showAll.value ? "menos" : "todo"}`;
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
    <h3>Comentarios ({{ count }})</h3>
    <div v-if="hasComments" class="comments">
      <EventComment class="comment" v-for="comment in comments" :key="comment.id" :comment="comment" />
      <v-btn v-if="showToggleShowAllButton" @click="toggleShowAll" variant="text" color="secondary">{{
        toggleShowAllButtonLabel
      }}</v-btn>
    </div>

    <div class="comment-editor">
      <v-textarea v-model="newComment" placeholder="Escribe un comentario..." rows="1" auto-grow variant="outlined">
        <template #append>
          <v-btn icon @click="addComment" :disabled="!canCreateNewComment">
            <v-icon icon="fa:fas fa-paper-plane" />
          </v-btn>
        </template>
      </v-textarea>
    </div>
  </v-container>
</template>

<style scoped>
.comments .comment:not(:last-child) {
  margin-bottom: 20px;
}
.comments {
  margin-top: 20px;
  /* display: flex;
  justify-content: center; */
}

.comment-editor {
  margin-top: 15px;
}
</style>
