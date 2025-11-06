

export const load = async ({ cookies }) => {
    if (cookies.get("user")) {
        return {
            UserID: JSON.parse(cookies.get("user") || "").User.Id
        }
    } else {
        return {}
    }
};