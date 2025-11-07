<script lang="ts">
    import Track from '$lib/components/TrackItem.svelte';

    const { data } = $props()
</script>

<div class="album-page">
    <div class="left-col">
        <img class="cover" src="/api/track/{data.Album.Id}/cover/320/320" alt="">
    </div>
	<img class="image-blur" src={`/api/track/${data.Album.Id}/cover/320/320`} alt="">
    <div class="right-col">
        <div class="album-info">
            <div style="display: flex; gap: 12px; justify-content: center;">
                <a href={data.isAuth ? `/artist/${data.Album.AlbumArtists[0].Id}` : "/"}>
                    <p>{data.Album.AlbumArtist}</p>
                </a>
            </div>
            <h2>{data.Album.Name}</h2>
        </div>
        <div class="album-list">
            {#each data.Tracks.Items as item, index}
                <Track contxt={data.Album} album={data.Tracks.Items} track={item} index={index} authState={data.isAuth} />
            {/each}
        </div>
    </div>
</div>

<style>

    h2 {
        font-family: sans-serif;
        font-weight: 800;
        color: white;
        margin: 0;
        font-size: 3rem;
        text-align: center;
    }

    p {
        font-family: sans-serif;
        color: gray;
        margin: 0;
        font-size: 1.5rem;
        text-align: center;
        margin-top: 12px;
        transition: 0.12s;
    }

    p:hover {
        color: white;
    }

    .album-page {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .album-info {
        display: flex;
        flex-direction: column-reverse;
    }

    .right-col {
        display: flex;
        flex-direction: column;
        gap: 12px;
        width: 98%;
    }

    .cover {
        position: relative;
        width: 320px;
        height: 320px;
        border-radius: 5px;
        z-index: 1;
        margin-left: auto;
        margin-right: auto;
        display: flex;
    }

    .image-blur {
        position: absolute;
        display: flex;
        margin-left: auto;
        margin-right: auto;
        left: 250px;
        right: 0;
        top: 120px;
        filter: blur(80px) opacity(20%);
        z-index: 0;
    }

    a {
        text-decoration: none;
        cursor: pointer;
    }
</style>