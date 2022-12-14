interface Video {
    id: string;
    key: string;
    name: string;
    site: string;
    size: number;
    type: string;
  }
  
  export interface Cast {
    id: number;
    name: string;
    character: string;
    profile_path: string;
  }
  
  export interface MoviePage {
    id: number;
    poseter_path: string;
    collection?: MovieDetails[] | null;
    title: string;
    original_name?: string;
    overview: string;
    backdrop_path: string;
    vote_average: number;
    vote_count: number;
    runtime: number;
    trailers: [number];
    cast: Cast[];
    recommendations: recommendation[];
  }
  
  export interface Collection {
    id: number;
    name: string;
  }
  
  export interface CollectionResopnse {
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    parts: MovieDetails[];
  }
  