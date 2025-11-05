<script lang="ts">
    import Track from '$lib/components/Track.svelte';
    import { playing } from '$lib/stores/playing.js';
    import { playlist } from '$lib/stores/playlist.js';
    import { onMount } from 'svelte';
    import AlbumPlaceholder from "$lib/assets/PlaceholderAlbum.png";

    const { data } = $props()

    // console.log(data.Tracks.Items)
</script>

<div class="album-page">
    <img class="artist-image" src="/api/track/{data.Artist.Id}/cover/1000/1000" alt="">
    <div class="artist-details">
        <img class="artist-photo" src="/api/track/{data.Artist.Id}/cover/228/228" alt="">
        <div class="name-section">
            <p>{data.Tracks.Items.length && data.Tracks.Items.length > 1 ? `${data.Tracks.Items.length} Albums` : `${data.Tracks.Items.length} Album`}</p>
            <h3>{data.Artist.Name}</h3>
        </div>
    </div>
    <div class="albums">
        <h2>Albums</h2>
        <div class="album-selector">
            {#each data.Tracks.Items as item}
                <a href="/album/{item.Id}">
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
            {/each}
        </div>
    </div>
    <div class="albums">
        <h2>Similar to {data.Artist.Name}</h2>
        <div class="album-list">
            {#each data.Artists.Items as item}
                <a href="/artist/{item.Id}">
                    <div class="album">
                        <img class="cover-artist" src="/api/track/{item.Id}/cover/128/128" onerror={(e) => {
                            if (e.target && e.target instanceof HTMLImageElement)
                            e.target.src = AlbumPlaceholder;
                        }} alt="">
                        <div class="album-info">
                            <p class="artist-name">{item.Name}</p>
                        </div>
                    </div> 
                </a>
            {/each}
        </div>
    </div>
    <!-- <div class="left-col">
        <img class="cover" src="/api/track/{data.Album.Id}/cover/320/320" alt="">
    </div>
    <div class="right-col">
        <div class="album-info">
            <p>{data.Album.AlbumArtist}</p>
            <h2>{data.Album.Name}</h2>
        </div>
        <div class="album-list">
            {#each data.Tracks.Items as item, index}
                <a href="/album/{item.Id}">
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
            {/each}
        </div>
    </div> -->
</div>

<style>

    .artist-image {
        height: 400px;
        object-fit: cover;
        mask: linear-gradient(white, transparent);
        filter: blur(100px) brightness(60%);
        border-radius: 20px;
    }

    .artist-details {
        display: flex;
        gap: 12px;
        position: relative;
        bottom: 250px;
        padding: 20px;
    }

    .artist-photo {
        border-radius: 200px;
    }

    .name-section {
        display: flex;
        flex-direction: column-reverse;
    }

    h3 {
        font-family: sans-serif;
        font-weight: 800;
        color: white;
        margin: 0;
        font-size: 3rem;
    }

    h2 {
        font-family: sans-serif;
        font-weight: 600;
        color: white;
        margin: 0;
        font-size: 1.5rem;
    }

    p {
        font-family: sans-serif;
        color: gray;
        margin: 0;
        font-size: 1.2rem;
    }

    .albums {
        display: flex;
        flex-direction: column;
        gap: 12px;
        position: relative;
        bottom: 220px;
        padding: 12px;
    }

    .album-page {
        display: flex;
        gap: 30px;
        flex-direction: column;
    }

    .album-info {
        display: flex;
        flex-direction: column-reverse;
        height: 300px;
    }

    .cover {
        width: 320px;
        height: 320px;
        border-radius: 5px;
    }

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
        height: 200px;
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

    .title {
        color: white;
        font-weight: 800;
        font-size: 12px;
    }

    .artist {
        font-weight: 500;
        color: gray;
        font-size: 12px;
    }

    a {
        text-decoration: none;
    }

    .cover-artist {
        width: 128px;
        height: 128px;
        border-radius: 100px;
    }

    .album-list {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
    }

    .artist-name {
        color: white;
        font-weight: 800;
        font-size: 12px;
        text-align: center;
    }
</style>