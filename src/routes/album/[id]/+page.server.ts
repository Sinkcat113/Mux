import { API_KEY, USER_ID, ADDRESS } from '$env/static/private';
import type { Album, TrackList } from '$lib/types.js';


export const load = async ({ params }) => {
    const resp = await fetch(`${ADDRESS}/Users/${USER_ID}/Items/${params.id}?api_key=${API_KEY}`)
    const data = await resp.json()

    const tracksResp = await fetch(`${ADDRESS}/Items?parentId=${params.id}&collectionType=music&api_key=${API_KEY}`)
    const tracks = await tracksResp.json()

    return {
        Album: data as Album,
        Tracks: tracks as TrackList
    }
};