<template>
  <div class="slide">
    <img
      v-if="props.playlistItem.type === PlaylistItemType.IMAGE"
      :src="props.playlistItem.src"
      class="slide-content"
      alt="Slide"
    />
    <video
      v-else
      class="slide-content"
      :src="props.playlistItem.src"
      :autoplay="props.autoplay"
      muted
      playsinline
    ></video>
  </div>
</template>

<script setup lang="ts">
import { PlaylistItem, PlaylistItemType } from "../../types/playlist";

type SlideProps = {
  playlistItem: PlaylistItem;
  autoplay?: boolean;
};

const props = defineProps<SlideProps>();
</script>

<style scoped>
.slide {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.slide-content {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
