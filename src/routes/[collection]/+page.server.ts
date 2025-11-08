import { ADDRESS, API_KEY } from "$env/static/private";
import type { AlbumList, ArtistList } from "$lib/types";
import { redirect } from "@sveltejs/kit";


export const load = async ({ params, cookies }) => {

    if (!cookies.get("user")) {
        redirect(308, "/login")
    }

    const resp = await fetch(`${ADDRESS}/Items?parentId=${params.collection}&collectionType=music&api_key=${API_KEY}`);
    const data = await resp.json()

    const artistResp = await fetch(`${ADDRESS}/Artists?api_key=${API_KEY}`);
    const artistData = await artistResp.json();

    return {
        Albums: data as AlbumList,
        Artists: artistData as ArtistList,
        UserID: JSON.parse(cookies.get("user") || "").User.Id
    }
};