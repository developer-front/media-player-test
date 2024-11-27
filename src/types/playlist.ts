export enum PlaylistItemType {
  VIDEO = "video",
  IMAGE = "image",
}

export type PlaylistItem = {
  id: number;
  type: PlaylistItemType;
  src: string;
  duration: number;
};
