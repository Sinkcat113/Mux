import { ADDRESS, API_KEY } from '$env/static/private';
import type { Libraries } from '$lib/types.js';


export const load = async ({ cookies }) => {
    if (cookies.get("user")) {

        const userId: string = JSON.parse(cookies.get("user") || "").User.Id

        const resp = await fetch(`${ADDRESS}/Items?userId=${userId}&api_key=${API_KEY}`)
        const data = await resp.json()

        return {
            Libraries: data as Libraries,
            User: JSON.parse(cookies.get("user") || "")
        }
    } else {
        return {}
    }
};