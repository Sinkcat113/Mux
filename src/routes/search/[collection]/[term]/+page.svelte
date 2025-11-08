<script lang="ts">
    const { data } = $props()
    import ArtistPlaceholder from "$lib/assets/PlaceholderArtist.png";
    import AlbumPlaceholder from "$lib/assets/PlaceholderAlbum.png";
    import { page } from "$app/state";

    let Albums = data.Albums.Items
    let Artists = data.Artists.Items
</script>

<main>
    <h2>Albums</h2>
    <div class="album-selector">
        {#each Albums as item}
            {#if item.Name.includes(page.params.term || "") || item.AlbumArtist.includes(page.params.term || "")}
                <a href="/album/{page.params.collection}/{data.UserID}/{item.Id}">
                    <div class="album">
                        <img class="cover" src="/api/track/{item.Id}/cover/128/128" onerror={(e) => {
                            if (e.target && e.target instanceof HTMLImageElement)
                            e.target.src = AlbumPlaceholder;
                        }} alt="">
                        <div class="album-info">
                            <p class="title">{item.Name}</p>
                            <p class="artist">{item.AlbumArtist}</p>
                        </div>
                    </div> 
                </a>
            {/if}
        {/each}
    </div>
    <h2>Artists</h2>
    <div class="album-selector">
        {#each Artists as item, index}
            {#if item.Name.includes(page.params.term || "")}
                <a href="/artist/{page.params.collection}/{item.Id}">
                    <div class="album">
                        <img class="cover-artist" src="/api/track/{item.Id}/cover/128/128" onerror={(e) => {
                            if (e.target && e.target instanceof HTMLImageElement)
                            e.target.src = ArtistPlaceholder;
                        }} alt="">
                        <div class="artist-info">
                            <p class="artist-name">{item.Name}</p>
                        </div>
                    </div> 
                </a>
            {/if}
        {/each}
    </div>
</main>

<style>
    .album-selector {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
    }

    .album {
        display: flex;
        flex-direction: column;
        gap: 12px;
        cursor: pointer;
        transition: 0.06s;
        max-width: 128px;
        overflow-y: hidden;
    }

    .album-info {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .album:hover {
        scale: 105%;
        filter: brightness(120%);
    }

    .album:active {
        filter: brightness(120%);
        scale: 100%;
    }

    .cover {
        width: 128px;
        height: 128px;
        border-radius: 5px;
    }

    .cover-artist {
        width: 128px;
        height: 128px;
        border-radius: 100px;
    }

    .title {
        color: white;
        font-weight: 800;
        font-size: 12px;
    }

    .artist-name {
        color: white;
        font-weight: 800;
        font-size: 12px;
        text-align: center;
    }

    .artist {
        font-weight: 500;
        color: gray;
        font-size: 12px;
    }

    p {
        margin: 0;
        font-family: sans-serif;
    }

    a {
        text-decoration: none;
    }

    h2 {
        color: white;
        font-family: sans-serif;
    }
</style>