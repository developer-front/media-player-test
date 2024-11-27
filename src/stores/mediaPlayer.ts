import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { PlaylistItem } from "../types/playlist";
import { fetchPlaylist } from "../api/playlist";

export const useMediaPlayerStore = defineStore("mediaPlayer", () => {
  const isLoading = ref(false);
  const playlist = ref<PlaylistItem[]>([]);
  const currentSlideIndex = ref(0);

  const currentSlide = computed(() => playlist.value[currentSlideIndex.value]);
  const nextSlide = computed(() => {
    const nextSlideIndex =
      (currentSlideIndex.value + 1) % playlist.value.length;
    return playlist.value[nextSlideIndex];
  });

  const setNextSlide = () => {
    currentSlideIndex.value =
      (currentSlideIndex.value + 1) % playlist.value.length;
  };

  const getPlaylist = async () => {
    isLoading.value = true;

    const response = await fetchPlaylist();

    playlist.value = response;
    isLoading.value = false;
  };

  return {
    isLoading,
    playlist,
    currentSlideIndex,
    currentSlide,
    nextSlide,
    setNextSlide,
    getPlaylist,
  };
});
