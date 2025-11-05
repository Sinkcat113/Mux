import { ADDRESS, API_KEY, USER_ID } from '$env/static/private';
import type { Album, Artist, ArtistList, TrackList } from '$lib/types.js';


export const load = async ({ params }) => {
    const resp = await fetch(`${ADDRESS}/Users/${USER_ID}/Items/${params.id}?api_key=${API_KEY}`)
    const data = await resp.json()

    const tracksResp = await fetch(`${ADDRESS}/Items?ParentId=f589bad31f6609e91f1acf4b36eb9a3c&ArtistIds=${params.id}&IncludeItemTypes=MusicAlbum&Recursive=true&api_key=${API_KEY}`)
    const tracks = await tracksResp.json()

    const artistResp = await fetch(`${ADDRESS}/Artists/${params.id}/Similar?api_key=${API_KEY}`);
    const artists = await artistResp.json();

    return {
        Artist: data as Artist,
        Tracks: tracks as TrackList,
        Artists: artists as ArtistList
    }
};