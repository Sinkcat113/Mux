<script lang="ts">
    const { data } = $props()
    import AlbumPlaceholder from "$lib/assets/PlaceholderAlbum.png";

    let libraries = data.Libraries?.Items
</script>

<main>
    <div class="wrapper">
        <h2 style="text-align: center;">Select A Library</h2>
        <div class="album-selector">
            {#each libraries as item}
                <a href="/{item.Id}">
                    <div class="album">
                        <img class="cover" src="/api/track/{item.Id}/cover/1280/720" onerror={(e) => {
                            if (e.target && e.target instanceof HTMLImageElement)
                            e.target.src = AlbumPlaceholder;
                        }} alt="">
                        <div class="album-info">
                            <p class="title">{item.Name}</p>
                        </div>
                    </div> 
                </a>
            {/each}
        </div>
    </div>
</main>

<style>
    .wrapper {
        margin-top: 16dvh;
    }

    .album-selector {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
        justify-content: center;
    }

    .album {
        display: flex;
        flex-direction: column;
        gap: 12px;
        cursor: pointer;
        transition: 0.06s;
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
        width: 208px;
        height: 128px;
        border-radius: 5px;
        object-fit: cover;
    }

    .title {
        color: white;
        font-weight: 800;
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