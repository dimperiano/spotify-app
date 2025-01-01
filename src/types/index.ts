export type UserProfile = {
    country: string;
    display_name: string;
    email: string;
    explicit_content: {
        filter_enabled: boolean,
        filter_locked: boolean
    },
    external_urls: { spotify: string; };
    followers: { href: string; total: number; };
    href: string;
    id: string;
    images: Image[];
    product: string;
    type: string;
    uri: string;
}

export type Image = {
    url: string;
    height: number;
    width: number;
}

export type ExternalUrls = {
    spotify: string;
  };
  
export type Followers = {
href: string | null;
total: number;
};

export type Artist = {
external_urls: ExternalUrls;
followers: Followers;
genres: string[];
href: string;
id: string;
images: Image[];
name: string;
popularity: number;
type: "artist";
uri: string;
};

export type ArtistResponse = {
items: Artist[];
};