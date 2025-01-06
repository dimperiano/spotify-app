export type UserProfile = {
  country: string
  display_name: string
  email: string
  explicit_content: {
    filter_enabled: boolean
    filter_locked: boolean
  }
  external_urls: { spotify: string }
  followers: { href: string; total: number }
  href: string
  id: string
  images: Image[]
  product: string
  type: string
  uri: string
}

export type Image = {
  url: string
  height: number
  width: number
}

export type ExternalUrls = {
  spotify: string
}

export type Followers = {
  href: string | null
  total: number
}

export type Artist = {
  external_urls: ExternalUrls
  followers: Followers
  genres: string[]
  href: string
  id: string
  images: Image[]
  name: string
  popularity: number
  type: "artist"
  uri: string
}

export type ArtistResponse = {
  items: Artist[]
}

export type Album = {
  id: string
  name: string
  release_date: string
  images: { url: string; width: number; height: number }[]
  total_tracks: number
  album_type: string
  artists: { id: string; name: string }[]
  external_urls: { spotify: string }
}

export type AlbumsResponse = {
  items: Album[]
  total: number
  next?: string | null
  previous: string | null
  limit: number
  offset: number
}

export type Playlist = {
  id: string
  name: string
  description: string
  images: { url: string }[]
  tracks: { total: number }
}

export type PlaylistsResponse = {
  items: Playlist[]
  next?: string
  previous?: string
  total: number
  limit: number
  offset: number
}
