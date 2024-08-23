interface Song {
  id: string;
  title: string;
  artistId: string;
  key: string;
  albumId: string | null;
  likes: number;
  artistUserId: string | null;
  artist: {
    name: string;
  };
  album: string | null;
  songPublicUrl: string;
}
