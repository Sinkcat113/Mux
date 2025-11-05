import type { Track, TrackList } from "$lib/types";
import { writable } from "svelte/store";

export const playlist = writable<Array<Track>>([
    {
        Name: "",
        Id: "",
        IndexNumber: 0,
        ServerId: "",
        AlbumArtist: "",
        AlbumArtists: {}
    }
])