import { redirect } from '@sveltejs/kit';


export const load = async ({ cookies }) => {
    cookies.delete("user", {path: "/"})
    redirect(301, "/login")
};