<script lang="ts">
    import Track from '$lib/components/Track.svelte';

    const { data } = $props()
</script>

<div class="album-page">
    <div class="left-col">
        <img class="cover" src="/api/track/{data.Album.Id}/cover/320/320" alt="">
    </div>
    <div class="right-col">
        <div class="album-info">
            <a href={data.isAuth ? `/artist/${data.Album.AlbumArtists[0].Id}` : "/"}>
                <p>{data.Album.AlbumArtist}</p>
            </a>
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
    }

    p {
        font-family: sans-serif;
        color: gray;
        margin: 0;
        font-size: 1.5rem;
    }

    .album-page {
        display: flex;
        gap: 30px;
    }

    .album-info {
        display: flex;
        flex-direction: column-reverse;
        height: 300px;
    }

    .right-col {
        display: flex;
        flex-direction: column;
        gap: 12px;
        width: 98%;
    }

    .cover {
        width: 320px;
        height: 320px;
        border-radius: 5px;
    }

    a {
        text-decoration-color: gray;
        text-decoration-thickness: 0.5px;
    }
</style>