import { ADDRESS, API_KEY } from '$env/static/private';
import { fail, redirect } from '@sveltejs/kit';


export const actions = {
    default: async({ request, cookies }) => {
        const data = await request.formData();
        const username = data.get("username");
        const password = data.get("password");

        if (username && password) {
            const resp = await fetch(`${ADDRESS}/Users/AuthenticateByName?api_key=${API_KEY}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Username: username,
                    Pw: password
                })
            })

            if (await resp.status === 200) {
                cookies.set("user", JSON.stringify(await resp.json()), {path: "/"})

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