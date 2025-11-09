import { API_KEY } from '$env/static/private';


export async function GET({ params, cookies }) {

    const address = JSON.parse(cookies.get("user") || "").User.Address

    const resp = await fetch(`${address}/Items/${params.id}/Download`, {
        headers: {
            "Authorization": `MediaBrowser Token=${API_KEY}`
        }
    });
    
    const headers = {
        "Content-Type": "audio/mpeg",
        "Accept-Ranges": resp.headers.get("Accept-Ranges") || "bytes",
        "Content-Range": resp.headers.get("Content-Range")!,
        "Content-Length": resp.headers.get("Content-Length")!        
    }

    if (cookies.get("user")) {
        return new Response(await resp.body, {
            status: await resp.status === 206 ? 206 : 200,
            headers: headers
        })
    } else {
        return new Response(JSON.stringify({message: "Forbidden"}), {
            status: 403
        })
    }
}