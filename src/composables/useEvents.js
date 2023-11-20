import { useEventsStore } from "@/store/events";
import { useSessionStore } from "@/store/session";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";

export function useEvents() {
  const { currentUser } = storeToRefs(useSessionStore());
  const { find, update } = useEventsStore();
  const event = ref(null);

  const isOrganizer = computed(() => event.value?.organizer.id === currentUser.value?.id);

  const isParticipant = computed(() => event.value?.participants?.find(({ id }) => id === currentUser.value?.id));

  const canParticipate = computed(() => !isOrganizer.value && currentUser.value);

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
      comment.author = currentUser.value.toJSON();
    }

    event.value = await update(event.value.id, {
      comments: [...comments, comment],
    });
  }

  async function toggleParticipation() {
    const participant = currentUser.value.toJSON();
    const participants = event.value.participants?.filter(({ id }) => id !== participant.id) ?? [];

    if (!isParticipant.value) {
      participants.push(participant);
    }

    event.value = await update(event.value.id, {
      participants,
    });
  }

  return {
    event,
    isOrganizer,
    isParticipant,
    canParticipate,

    loadEvent,
    addComment,
    toggleParticipation,
  };
}
