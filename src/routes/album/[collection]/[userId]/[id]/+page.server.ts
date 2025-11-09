import { API_KEY } from '$env/static/private';
import type { Album, TrackList } from '$lib/types.js';
import { redirect } from '@sveltejs/kit';


export const load = async ({ params, cookies }) => {

    if (!cookies.get("user")) {
        redirect(308, "/login")
    }

    const address = JSON.parse(cookies.get("user") || "").User.Address

    const resp = await fetch(`${address}/Users/${params.userId}/Items/${params.id}?api_key=${API_KEY}`)
    const data = await resp.json()

    const tracksResp = await fetch(`${address}/Items?parentId=${params.id}&collectionType=music&api_key=${API_KEY}`)
    const tracks = await tracksResp.json()

    return {
        Album: data as Album,
        Tracks: tracks as TrackList,
        isAuth: cookies.get("user") ? true : false
    }
};