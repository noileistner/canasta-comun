import { useEventsStore } from "@/store/events";
import { useSessionStore } from "@/store/session";
import { storeToRefs } from "pinia";
import { ref } from "vue";

export function useEvents() {
  const { currentUser } = storeToRefs(useSessionStore());
  const { find, update } = useEventsStore();
  const event = ref(null);

  async function loadEvent(id) {
    event.value = await find(id);
    return event.value;
  }

  async function addComment(text) {
    const { comments = [] } = event.value;

    const comment = {
      text,
      createdAt: Date.now(),
    };

    if (currentUser.value) {
      const { id, name, image } = currentUser.value;
      comment.author = {
        id,
        name,
      };
      if (image) {
        comment.author.image = image;
      }
    }

    event.value = await update(event.value.id, {
      comments: [...comments, comment],
    });
  }

  return {
    loadEvent,
    event,
    addComment,
  };
}
