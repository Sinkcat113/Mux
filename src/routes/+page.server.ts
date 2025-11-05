import { ADDRESS, API_KEY } from "$env/static/private";
import type { AlbumList, ArtistList } from "$lib/types";


export const load = async () => {
    const resp = await fetch(`${ADDRESS}/Items?parentId=6b0bcc893f2368c586f3d225262c8ac6&collectionType=music&api_key=${API_KEY}`);
    const data = await resp.json()

    const artistResp = await fetch(`${ADDRESS}/Artists?api_key=${API_KEY}`);
    const artistData = await artistResp.json();

    return {
        Albums: data as AlbumList,
        Artists: artistData as ArtistList
    }
};