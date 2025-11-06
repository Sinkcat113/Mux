import { ADDRESS, API_KEY } from '$env/static/private';


export async function GET({ params, cookies }) {
    const resp = await fetch(`${ADDRESS}/Items/${params.id}/Download?api_key=${API_KEY}`);
    
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