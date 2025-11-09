import { ADDRESS, API_KEY } from "$env/static/private";
import type { Libraries } from "$lib/types";
import type { AlbumList, ArtistList } from "$lib/types";
import { redirect } from "@sveltejs/kit";


export const load = async ({ cookies }) => {
    if (cookies.get("user")) {

        const userId: string = JSON.parse(cookies.get("user") || "").User.Id

        const header = {
            "Authorization": `MediaBrowser Token=${API_KEY}`
        }

        const resp = await fetch(`${ADDRESS}/Items?userId=${userId}`, {
            headers: header
        })
        const data = await resp.json()

        return {
            Libraries: data as Libraries,
            UserID: userId
        }
    } else {
        redirect(308, "/login")
    }
};