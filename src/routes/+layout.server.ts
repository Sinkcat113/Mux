import { API_KEY } from '$env/static/private';
import type { Libraries } from '$lib/types.js';


export const load = async ({ cookies }) => {
    if (cookies.get("user")) {

        const userId: string = JSON.parse(cookies.get("user") || "").User.Id
        const address: string = JSON.parse(cookies.get("user") || "").User.Address

        const header = {
            "Authorization": `MediaBrowser Token=${API_KEY}`
        }

        const resp = await fetch(`${address}/Items?userId=${userId}`, {
            headers: header
        })
        const data = await resp.json()

        return {
            Libraries: data as Libraries,
            User: JSON.parse(cookies.get("user") || "")
        }
    } else {
        return {}
    }
};