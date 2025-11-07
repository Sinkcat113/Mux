<script lang="ts">
	import { playing } from "$lib/stores/playing";
	import { playlist } from "$lib/stores/playlist";
	import type { Album, Track } from "$lib/types";
	import { onMount } from "svelte";
	import PlaceholderAlbum from "$lib/assets/PlaceholderAlbum.png"
    import { context } from "$lib/stores/context";
	import PlayButton from "$lib/assets/play-button.png";
	import PauseButton from "$lib/assets/pause.png";
	import PreviousButton from "$lib/assets/previous.png";
	import NextButton from "$lib/assets/next.png";
	import VolumeIcon from "$lib/assets/volume-up.png";
	import MuteIcon from "$lib/assets/mute.png";
	import LoopIcon from "$lib/assets/repeat.png";
	import LoopOne from "$lib/assets/repeat-one.png"
	import QueueIcon from "$lib/assets/queue.png";
    import TrackItem from "./TrackItem.svelte";

	const { uid } = $props()

	let audio = $state() as HTMLAudioElement;
	let index = 0;
	let contxt = $state({}) as Album;
	let tracklist = $state([]) as Array<Track>;
	let trck = $state({}) as Track;

	let currentTime = $state(0)
	let duration = $state(0)
	let playstate = $state(true)
	let volume = $state(0.7)
	let muted = $state(false)

	let loopState = $state(0)
	let queueOpen = $state(false)

	onMount(() => {
		playing.subscribe((track) => {
			if (track && track.Id) 
			index = track.IndexNumber - 1;
			trck = track
			audio.src = `/api/track/${track.Id}`;
		});

		playlist.subscribe((tracks) => {
			tracklist = tracks
		});

		context.subscribe((ctx) => {
			contxt = ctx
		})
	});

	const previous = () => {
		if (index > 0) {
			index--
			playing.set(tracklist[index])
		}
	}

	const next = () => {
		if (tracklist.length > 0) {
			if (index < tracklist.length - 1) {
				index++
				playing.set(tracklist[index])
			}
		}
	}

</script>

<audio
	bind:this={audio}
	bind:currentTime={currentTime}
	bind:duration={duration}
	bind:paused={playstate}
	bind:volume={volume}
	bind:muted={muted}
	loop={loopState == 2 ? true : false}
	onended={() => {
		if (tracklist.length - 1 == index && loopState == 1) {
			index = 0
			audio.src = `/api/track/${tracklist[index].Id}`
			playing.set(tracklist[index])
		} else {
			index++
			audio.src = `/api/track/${tracklist[index].Id}`
			playing.set(tracklist[index])
		}
	}}
	onloadedmetadata={() => {
		audio.play();
	}}
></audio>

{#if contxt.Name && queueOpen}
	<div class="queue-container">
		<div class="album-view">
			<div class="cover-container">
				<img class="cover" src={tracklist.length > 0 ? `/api/track/${contxt.Id}/cover/128/128` : PlaceholderAlbum} alt="">
			</div>
			<div class="album-details">
				<p class="title">{contxt.Name}</p>
				<p class="artists">{contxt.AlbumArtist}</p>
			</div>
		</div>
		<div class="queue-tracks">
			{#each tracklist as tck, index}
				<TrackItem contxt={contxt} album={tracklist} track={tck} index={index} authState={uid ? true : false} />
			{/each}
		</div>
	</div>
{/if}
	

{#if uid}
	<div class="container">
		<a href={contxt && contxt.Id ? `/album/${uid}/${contxt.Id}` : `/`}>
			<div class="track-section">
				<img class="cover" src={trck && trck.Id ? `/api/track/${trck.Id}/cover/50/50` : PlaceholderAlbum} onerror={(e) => {
					if (e.target && e.target instanceof HTMLImageElement)
					e.target.src = PlaceholderAlbum
				}} alt="">
				<div class="track-info">
					<p class="title">{trck && trck.Name ? trck.Name : ``}</p>
					<p class="artists">{trck && trck.AlbumArtist ? trck.AlbumArtist : ``}</p>
				</div>
			</div>
		</a>
		<div class="player">
			<div class="scrubb-wrapper">
				<input class="scrubber" type="range" bind:value={currentTime} max={duration} step="0.02">
			</div>
			<div class="audio-controls">
				<div>
					<button class={loopState > 0 ? "under-button-select" : "under-button"} onclick={() => {
						if (loopState == 2) {
							loopState = 0
						} else {
							loopState++
						}
					}}>
						<img class="control-button" src={loopState == 2 ? LoopOne : LoopIcon} alt="">
					</button>
				</div>
				<div>
					<button class="under-button" onclick={previous}>
						<img class="control-button" src={PreviousButton} alt="">
					</button>
					<button class="under-button" onclick={() => {playstate = !playstate}}>
						<img class="control-button" src={playstate ? PlayButton : PauseButton} alt="">
					</button>
					<button class="under-button" onclick={next}>
						<img class="control-button" src={NextButton} alt="">
					</button>
				</div>
				<div>
					<button class={queueOpen && contxt.Name ? "under-button-select" : "under-button"} onclick={() => {queueOpen = !queueOpen}}>
						<img class="control-button" src={QueueIcon} alt="">
					</button>
				</div>
			</div>
		</div>
		<div class="volume-controls">
			<button class="under-button" onclick={() => {
				muted = !muted
			}}>
				<img class="control-button" src={muted ? MuteIcon : VolumeIcon} alt="">
			</button>
			<input type="range" class="volume-slider" bind:value={volume} max="1" step="0.01">
		</div>
	</div>
{/if}



<style>
	.queue-container {
		background-color: rgb(20, 20, 20);
		position: fixed;
		top: 70px;
		bottom: 70px;
		right: 20px;
		width: 250px;
		padding: 12px;
		z-index: 2;
		border-style: solid;
		border-radius: 12px;
		border-width: 1px;
		border-color: rgba(128, 128, 128, 0.17);
		display: flex;
		flex-direction: column;
		gap: 12px;
		overflow-y: scroll;
	}

	.album-view {
		display: flex;
		gap: 12px;
		border-bottom-style: solid;
		border-width: 1px;
		border-color: rgba(128, 128, 128, 0.216);
	}

	.album-details {
		padding: 7px;
	}

	.player {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.audio-controls {
		display: flex;
		gap: 12px;
		justify-content: space-between;
	}

	.under-button {
		padding: 5px;
		padding-left: 10px;
		padding-right: 10px;
		background-color: transparent;
		border: none;
		transition: 0.12s;
		cursor: pointer;
		border-radius: 5px;
	}

	.under-button-select { 
		padding: 5px;
		padding-left: 10px;
		padding-right: 10px;
		background-color: transparent;
		border: none;
		transition: 0.12s;
		cursor: pointer;
		border-radius: 5px;
		background-color: #242424;
		scale: 105%;
	}

	.under-button:hover {
		background-color: #242424;
		scale: 105%;
	}

	.under-button:active {
		scale: 100%;
	}

	.control-button {
		filter: invert();
		width: 20px;
		height: 20px;
		vertical-align: middle;
	}

	.scrubb-wrapper {
		display: flex;
	}

	p {
		margin: 0;
		font-family: sans-serif;
		color: white;
		font-size: 1rem;
	}

	.title {
		font-size: 1.1rem;
		font-weight: 800;
	}

	.container {
		display: flex;
		justify-content: space-between;
		bottom: 0;
		left: 0;
		right: 0;
		position: fixed;
		/* background-color: #141414; */
		background-image: linear-gradient(transparent, #141414, #141414, #141414, #141414);
		padding: 12px;
		/* border-top-style: solid;
		border-width: 1px;
		border-color: rgba(128, 128, 128, 0.082); */
	}

	.track-section {
		display: flex;
		gap: 12px;
		cursor: pointer;
		width: 200px;
		overflow: hidden;
		text-wrap-mode: nowrap;
		mask: linear-gradient(90deg, white, white, white, white, white, white, white, white, white, white, transparent);
		transition: 0.06s;
	}

	.track-section:hover {
		width: unset;
		filter: brightness(120%);
		padding-right: 20px;
	}

	.track-info {
		padding: 3px;
	}

	.artists {
		color: gray;
	}

	.cover {
		width: 50px;
		height: 50px;
		border-radius: 5px;
	}

	a {
		text-decoration: none;
	}

    .scrubber {
      overflow: hidden;
      width: 80px;
      -webkit-appearance: none;
      background-color: #242424;
	  width: 500px;
	  height: 5px;
	  border-radius: 20px;
	  cursor: pointer;
	  transition: 0.3s;
    }
    
    .scrubber::-webkit-slider-runnable-track {
      height: 5px;
      -webkit-appearance: none;
      color: #ffffff;
      margin-top: -1px;
	  border-radius: 12px;
	  transition: 0.3s;
    }

    .scrubber::-moz-slider-runnable-track {
      height: 5px;
      -webkit-appearance: none;
      color: #ffffff;
      margin-top: -1px;
	  border-radius: 12px;
	  transition: 0.3s;
    }
    
    .scrubber::-webkit-slider-thumb {
      width: 6px;
      -webkit-appearance: none;
      height: 6px;
      background: #ffffff;
      box-shadow: -500px 0 0 500px #ffffff;
	  border-radius: 12px;
	  transition: 0.3s;
    }

	input[type="range"]::-moz-range-progress {
		background-color: rgb(255, 255, 255);
		height: 1em;
	}

	input[type="range"]::-moz-range-thumb {
		background-color: white;
		width: 1px;
		border: none;
	}

	.volume-controls {
		padding: 12px;
		display: flex;
		gap: 12px;
	}

	.volume-slider {
	  overflow: hidden;
      width: 80px;
	  height: 7px;
      -webkit-appearance: none;
      background-color: #242424;
	  border-radius: 20px;
	  cursor: pointer;
	  transition: 0.3s;
	  position: relative;
	  top: 0.54rem;
	  cursor: pointer;
	}

    .volume-slider::-webkit-slider-runnable-track {
      height: 5px;
      -webkit-appearance: none;
      color: #ffffff;
      margin-top: -1px;
	  border-radius: 12px;
	  transition: 0.3s;
    }
    
    .volume-slider::-webkit-slider-thumb {
      width: 6px;
      -webkit-appearance: none;
      height: 6px;
      background: #ffffff;
      box-shadow: -500px 0 0 500px #ffffff;
	  border-radius: 12px;
	  transition: 0.3s;
    }
</style>