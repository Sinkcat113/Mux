import { API_KEY } from "$env/static/private";
import type { AlbumList, ArtistList } from "$lib/types";
import { redirect } from "@sveltejs/kit";


export const load = async ({ cookies, params }) => {

    if (!cookies.get("user")) {
        redirect(308, "/login")
    }

    const header = {
        "Authorization": `MediaBrowser Token=${API_KEY}`
    }

    const address: string = JSON.parse(cookies.get("user") || "").User.Address

    const resp = await fetch(`${address}/Items?parentId=${params.collection}&collectionType=music`, {
        headers: header
    });
    const data = await resp.json()

    const artistResp = await fetch(`${address}/Artists`, {
        headers: header
    });
    const artistData = await artistResp.json();

    return {
        Albums: data as AlbumList,
        Artists: artistData as ArtistList,
        UserID: JSON.parse(cookies.get("user") || "").User.Id
    }
};