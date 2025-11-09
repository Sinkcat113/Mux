export async function GET({ params, cookies }) {
    
    const address = JSON.parse(cookies.get("user") || "").User.Address

    const resp = await fetch(`${address}/Items/${params.id}/Images/Primary?MaxWidth=${params.w}&MaxHeight=${params.h}`);
    const data = await resp.body;

    const headers = {
        "Content-Type": "image/jpeg"
    }

    return new Response(data, {
        headers: headers
    })
}