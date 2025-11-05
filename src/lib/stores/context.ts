import type { Album } from "$lib/types";
import { writable } from "svelte/store";

export const context = writable<Album>({
    Name: "",
    ServerId: "",
    Id: "",
    Type: "",
    Artists: [],
    AlbumArtist: "",
    AlbumArtists: [{
        Name: "",
        Id: ""
    }]
})