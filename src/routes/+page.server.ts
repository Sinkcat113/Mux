import { ADDRESS, API_KEY, COLLECTION } from "$env/static/private";
import type { AlbumList, ArtistList } from "$lib/types";


export const load = async () => {
    const resp = await fetch(`${ADDRESS}/Items?parentId=${COLLECTION}&collectionType=music&api_key=${API_KEY}`);
    const data = await resp.json()

    const artistResp = await fetch(`${ADDRESS}/Artists?api_key=${API_KEY}`);
    const artistData = await artistResp.json();

    return {
        Albums: data as AlbumList,
        Artists: artistData as ArtistList
    }
};