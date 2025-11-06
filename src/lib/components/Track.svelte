<script lang="ts">
    import { context } from "$lib/stores/context";
    import { playing } from "$lib/stores/playing";
    import { playlist } from "$lib/stores/playlist";
    import type { Track } from "$lib/types";
    import { onMount } from "svelte";

    const { contxt, album, track, index, authState } = $props()

    const handleSongSelect = (index: number) => {
        context.set(contxt)
        playlist.set(album)
        playing.set(album[index])
    }

    let currentTrack = $state({}) as Track;

    onMount(() => {
        playing.subscribe((track) => {
            currentTrack = track
        })
    })
</script>

<button disabled={!authState}
    class={currentTrack && currentTrack.Id === track.Id
        ? "track-selected"
        : "track"}
    onclick={() => {
        handleSongSelect(index);
    }}
>
    <p class="index">{index + 1}.</p>
    <p class="title">{track.Name}</p>
</button>

<style>

    p {
        font-family: sans-serif;
        color: gray;
        margin: 0;
        font-size: 1.5rem;
    }

    .title {
        color: white;
        font-size: 1rem;
    }

    .index {
        font-size: 1rem;
    }

    .track {
        display: flex;
        gap: 12px;
        padding: 12px;
        transition: 0.06s;
        cursor: pointer;
        border: none;
        border-radius: 5px;
        border-bottom-style: solid;
        border-width: 1px;
        border-color: rgba(128, 128, 128, 0.123);
        background-color: transparent;
        width: 100%;
    }

    .track:disabled {
        opacity: 50%;
        cursor: default;
    }
    
    .track:hover {
        background-color: rgba(128, 128, 128, 0.137);
    }

    .track-selected {
        display: flex;
        gap: 12px;
        padding: 12px;
        transition: 0.06s;
        border: none;
        border-radius: 5px;
        border-bottom-style: solid;
        border-width: 1px;
        border-color: rgba(128, 128, 128, 0.123);
        background-color: rgba(128, 128, 128, 0.137);
        width: 100%;
        cursor: default;
    }
</style>