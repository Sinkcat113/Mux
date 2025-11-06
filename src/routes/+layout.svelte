<script lang="ts">
	import favicon from '$lib/assets/Mux_Logo.png';
	import MuxLogo from "$lib/assets/Mux_Logo_Extended.png";
    import Player from '$lib/components/Player.svelte';
    import { navigating } from '$app/state';
	import ForwardIcon from "$lib/assets/forward.png";
	import BackIcon from "$lib/assets/back.png";
	import SearchIcon from "$lib/assets/magnifying-glass.png";
	import LibraryIcon from "$lib/assets/library.png";
    import { goto } from '$app/navigation';

	let { children } = $props();

	let searchTerm = $state("")

	const handleSearch = (e: KeyboardEvent) => {
		if (e.key === "Enter")
			if (!searchTerm)
				goto("/")
			else
				goto(`/search/${searchTerm}`)
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} type="image/x-icon" />
	<title>Mux</title>
</svelte:head>

<div class="top">
	<div class="nav">
		<div class="nav-history">
			<button class="nav-button" onclick={() => {
				window.history.back()
			}}>
				<img class="control-button" src={BackIcon} alt="">
			</button>
			<button class="nav-button" onclick={() => {
				window.history.forward()
			}}>
				<img class="control-button" src={ForwardIcon} alt="">
			</button>
		</div>
		<div class="nav-lib">
			<button class="nav-button" onclick={() => {
				goto("/")
			}}>
				<img class="control-button" src={LibraryIcon} alt="">
			</button>
		</div>
		<div class="logo-cotainer">
			<img class="logo" src={MuxLogo} alt="">
		</div>
	</div>
	<div class="search-bar">
		<img class="control-button" style="padding: 7px;" src={SearchIcon} alt="">
		<input type="text" bind:value={searchTerm} onkeypress={handleSearch} placeholder="Search...">
	</div>
</div>

<div class={navigating.complete ? "loader" : ""}>
	{@render children()}
</div>

<Player />

<style>

	:root::-webkit-scrollbar {
		display: none;
	}

	:root {
		background-color: rgb(20, 20, 20);
		padding: 20px;
		padding-bottom: 100px;
		padding-top: 60px;
	}

	.loader {
		animation-name: load;
		animation-iteration-count: infinite;
		animation-duration: 1s;
		animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}

	.top {
		top: 0;
		left: 0;
		right: 0;
		position: fixed;
		padding: 12px;
		/* background-color: rgb(20, 20, 20); */
		display: flex;
		justify-content: space-between;
		gap: 12px;
		z-index: 1;
		background-image: linear-gradient(rgb(20, 20, 20), transparent);
	}


	.nav-button {
		padding: 5px;
		padding-left: 10px;
		padding-right: 10px;
		background-color: transparent;
		border: none;
		transition: 0.12s;
		cursor: pointer;
		border-radius: 7px;
	}

	.nav-button:hover {
		background-color: #6969699d;
		scale: 105%;
	}

	.nav-button:active {
		scale: 100%;
	}

	.control-button {
		filter: invert();
		width: 16px;
		height: 16px;
		vertical-align: middle;
	}

	.nav-history {
		display: flex;
		gap: 5px;
		padding: 5px;
		background-color: #33333394;
		border-radius: 12px;
		backdrop-filter: blur(20px);
	}

	.nav-lib {
		display: flex;
		gap: 5px;
		padding: 5px;
		background-color: #33333394;
		border-radius: 12px;
		backdrop-filter: blur(20px);
	}

	.search-bar {
		display: flex;
		gap: 5px;
		padding: 5px;
		background-color: #33333394;
		border-radius: 12px;
		backdrop-filter: blur(20px);
		transition: 0.12s;
	}

	input {
		background-color: transparent;
		border: none;
		color: white;
		outline: none;
		width: 20dvw;
	}

	.search-bar:has(input:focus) {
		background-color: #242424ce;
	}

	.nav {
		display: flex;
		gap: 12px;
	}

	.logo {
		height: 30px;
		position: relative;
		top: 0.4rem;
	}

	@keyframes load {
		0% {
			opacity: 100%;
		}

		50% {
			opacity: 50%;
		}

		100% {
			opacity: 100%;
		}
	}
</style>