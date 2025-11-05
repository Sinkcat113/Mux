import { ADDRESS } from "$env/static/private";
import Placeholder from "$lib/assets/PlaceholderArtist.png";

export async function GET({ params }) {
    const resp = await fetch(`${ADDRESS}/Items/${params.id}/Images/Primary?MaxWidth=${params.w}&MaxHeight=${params.h}`);
    const data = await resp.body;

    const headers = {
        "Content-Type": "image/jpeg"
    }

    return new Response(data, {
        headers: headers
    })
}