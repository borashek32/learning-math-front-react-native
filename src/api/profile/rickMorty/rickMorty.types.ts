export type RickMortyDataType = {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: CharacterType[];
};

export type CharacterType = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string; // path to image
  episode: [string];
  url: string;
  created: string;
};
