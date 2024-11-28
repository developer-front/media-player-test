<template>
  <div class="media-player">
    <div class="slide-container">
      <Loader v-if="isLoading" />
      <template v-else>
        <Slide
          v-if="currentSlide"
          :class="{ current: true, 'animate-out transition': isAnimating }"
          :playlistItem="currentSlide"
          autoplay
          @transitionend="onCurrentSlideEnd"
        />
        <Slide
          v-if="nextSlide"
          :class="{ next: true, 'animate-in transition': isAnimating }"
          :playlistItem="nextSlide"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useMediaPlayerStore } from "../../stores/mediaPlayer";
import { onMounted, ref } from "vue";
import Loader from "./Loader.vue";
import Slide from "./Slide.vue";

const TRANSFORM_DURATION = 0.5;
const TRANSFORM_DURATION_WITH_S = TRANSFORM_DURATION + "s";
const ONE_SECOND = 1000;

const mediaPlayerStore = useMediaPlayerStore();
const { playlist, currentSlide, nextSlide, isLoading } =
  storeToRefs(mediaPlayerStore);
const { setNextSlide, getPlaylist } = mediaPlayerStore;

const isAnimating = ref(false);

const startSlideshow = () => {
  const startTime = performance.now();
  const slideDuration = (currentSlide.value?.duration ?? 0) * ONE_SECOND;
  const animationDuration = TRANSFORM_DURATION * ONE_SECOND;
  const totalDuration = slideDuration + animationDuration;

  const loop = (time: number) => {
    if (time - startTime >= totalDuration) {
      isAnimating.value = true;
      return;
    }
    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);
};

const onCurrentSlideEnd = (event: TransitionEvent) => {
  if (event.propertyName !== "transform") return;
  isAnimating.value = false;
  setNextSlide();
  startSlideshow();
};

onMounted(async () => {
  await getPlaylist();
  if (playlist.value.length) startSlideshow();
});
</script>

<style scoped>
.media-player {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: black;
}

.slide-container {
  position: relative;
  width: 80%;
  max-height: 600px;
  max-width: 800px;
  aspect-ratio: 4/3;
  overflow: hidden;
  border: 2px solid cyan;
  border-radius: 10px;
}

.slide-container :deep(.loader) {
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
}

.slide.transition {
  transition: transform v-bind(TRANSFORM_DURATION_WITH_S) ease-in-out;
}

.slide.current {
  z-index: 1;
  transform: translateX(0);
}

.slide.next {
  z-index: 2;
  transform: translateX(100%);
}

.slide.animate-out {
  transform: translateX(-100%);
}

.slide.animate-in {
  transform: translateX(0);
}
</style>
