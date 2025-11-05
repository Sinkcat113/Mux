import type { Track } from "$lib/types";
import { writable } from "svelte/store";

export const playing = writable<Track>({
    Name: "",
    ServerId: "",
    Id: "",
    IndexNumber: 0,
    AlbumArtist: "",
    AlbumArtists: {}
})