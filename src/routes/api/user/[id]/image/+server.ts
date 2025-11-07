import { ADDRESS } from '$env/static/private'


export async function GET({ params, cookies }) {
    if (cookies.get("user")){

        const userId: string = JSON.parse(cookies.get("user") || "").User.Id;

        const resp = await fetch(`${ADDRESS}/UserImage?userId=${userId}`)
        const data = await resp.body

        if (resp.status === 200) {
            const headers = {
                "Content-Type": "image/jpeg"
            }

            return new Response(data, {
                headers: headers
            })
        } else {
            return new Response(JSON.stringify({
                message: "No Image"
            }), {
                status: 400
            })
        }
    } else {
        return new Response(null, {
            status: 400
        })
    }
}