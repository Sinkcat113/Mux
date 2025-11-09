import { API_KEY } from '$env/static/private';
import type { Album, Artist, ArtistList, TrackList } from '$lib/types.js';
import { redirect } from '@sveltejs/kit';


export const load = async ({ params, cookies }) => {

    if (!cookies.get("user")) {
        redirect(308, "/login")
    }

    const userID: string = JSON.parse(cookies.get("user") || "").User.Id
    const address: string = JSON.parse(cookies.get("user") || "").User.Address

    const header = {
        "Authorization": `MediaBrowser Token=${API_KEY}`
    }

    const resp = await fetch(`${address}/Users/${userID}/Items/${params.id}`, {
        headers: header
    })
    const data = await resp.json()

    const tracksResp = await fetch(`${address}/Items?ParentId=${params.collection}&ArtistIds=${params.id}&IncludeItemTypes=MusicAlbum&Recursive=true`, {
        headers: header
    })
    const tracks = await tracksResp.json()

    const artistResp = await fetch(`${address}/Artists/${params.id}/Similar`, {
        headers: header
    });
    const artists = await artistResp.json();

    return {
        Artist: data as Artist,
        Tracks: tracks as TrackList,
        Artists: artists as ArtistList,
        UserID: JSON.parse(cookies.get("user") || "").User.Id
    }
};