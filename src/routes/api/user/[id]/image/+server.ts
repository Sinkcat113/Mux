
export async function GET({ cookies }) {
    if (cookies.get("user")){

        const userId: string = JSON.parse(cookies.get("user") || "").User.Id;
        const address: string = JSON.parse(cookies.get("user") || "").User.Address

        const resp = await fetch(`${address}/UserImage?userId=${userId}`)
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