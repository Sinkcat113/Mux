import { API_KEY, ADDRESS } from '$env/static/private';
import type { Album, TrackList } from '$lib/types.js';


export const load = async ({ params, cookies }) => {

    const resp = await fetch(`${ADDRESS}/Users/${params.userId}/Items/${params.id}?api_key=${API_KEY}`)
    const data = await resp.json()

    const tracksResp = await fetch(`${ADDRESS}/Items?parentId=${params.id}&collectionType=music&api_key=${API_KEY}`)
    const tracks = await tracksResp.json()

    return {
        Album: data as Album,
        Tracks: tracks as TrackList,
        isAuth: cookies.get("user") ? true : false
    }
};