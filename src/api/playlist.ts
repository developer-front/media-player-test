import { PlaylistItem, PlaylistItemType } from "../types/playlist";

const RESPONSE_TIMEOUT = 1000;

export const fetchPlaylist = async (): Promise<PlaylistItem[]> => {
  const mockData: PlaylistItem[] = [
    {
      id: 1,
      type: PlaylistItemType.IMAGE,
      src: "https://via.placeholder.com/800x600.png?text=Sample+Image+1",
      duration: 5,
    },
    {
      id: 2,
      type: PlaylistItemType.VIDEO,
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
      duration: 10,
    },
    {
      id: 3,
      type: PlaylistItemType.IMAGE,
      src: "https://via.placeholder.com/800x600.png?text=Sample+Image+2",
      duration: 4,
    },
  ];

  return await new Promise((resolve) =>
    setTimeout(() => resolve(mockData), RESPONSE_TIMEOUT),
  );
};
