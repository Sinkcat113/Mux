import { API_KEY } from '$env/static/private';
import { fail, redirect } from '@sveltejs/kit';


export const actions = {
    default: async({ request, cookies }) => {
        const data = await request.formData();
        const username = data.get("username");
        const password = data.get("password");
        const address = data.get("address");

        if (username || password || address) {
            const resp = await fetch(`${"https://" + address}/Users/AuthenticateByName`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `MediaBrowser Token=${API_KEY}`
                },
                body: JSON.stringify({
                    Username: username,
                    Pw: password
                })
            })

            if (await resp.status === 200) {

                const userData = await resp.json()

                cookies.set("user", JSON.stringify({
                    User: {
                        Address: "https://" + address,
                        Name: userData.User.Name,
                        Id: userData.User.Id,
                    }
                }), {path: "/"})

                if (cookies.get("user"))
                    redirect(301, "/");
                else
                    return fail(400, {message: "Something went wrong :/"})
            } else {
                return fail(400, {message: "Username or passsword incorrect"})
            }

        } else {
            return fail(400, {message: "No data was provided"})
        }
    }
};