import { ADDRESS, API_KEY } from '$env/static/private';
import type { Album, Artist, ArtistList, TrackList } from '$lib/types.js';


export const load = async ({ params, cookies }) => {

    const userID: string = JSON.parse(cookies.get("user") || "").User.Id

    const resp = await fetch(`${ADDRESS}/Users/${userID}/Items/${params.id}?api_key=${API_KEY}`)
    const data = await resp.json()

    const tracksResp = await fetch(`${ADDRESS}/Items?ParentId=${params.collection}&ArtistIds=${params.id}&IncludeItemTypes=MusicAlbum&Recursive=true&api_key=${API_KEY}`)
    const tracks = await tracksResp.json()

    const artistResp = await fetch(`${ADDRESS}/Artists/${params.id}/Similar?api_key=${API_KEY}`);
    const artists = await artistResp.json();

    return {
        Artist: data as Artist,
        Tracks: tracks as TrackList,
        Artists: artists as ArtistList,
        UserID: JSON.parse(cookies.get("user") || "").User.Id
    }
};