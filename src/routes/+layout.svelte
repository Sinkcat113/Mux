<script lang="ts">
	import favicon from '$lib/assets/Mux_Logo.png';
	import MuxLogo from "$lib/assets/Mux_Logo_Extended.png";
    import Player from '$lib/components/Player.svelte';
    import { navigating, page } from '$app/state';
	import ForwardIcon from "$lib/assets/forward.png";
	import BackIcon from "$lib/assets/back.png";
	import SearchIcon from "$lib/assets/magnifying-glass.png";
	import LibraryIcon from "$lib/assets/library.png";
    import { goto } from '$app/navigation';
    import { clickOutside } from 'svelte-outside';

	let { children, data } = $props();

	let searchTerm = $state("")

	let isAccountOpen = $state(false)

	const handleSearch = (e: KeyboardEvent) => {
		if (e.key === "Enter")
			if (!searchTerm)
				goto(`/${page.params.collection}`)
			else
				goto(`/search/${page.params.collection}/${searchTerm}`)
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} type="image/x-icon" />
	<title>Mux</title>
</svelte:head>

{#if page.url.pathname != "/login" && data.User}
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
		</div>
		<div class="profile-container">
			<button class="btn-account" onclick={() => {isAccountOpen = !isAccountOpen}} use:clickOutside={(e) => {isAccountOpen = false}}>
				<img class="profile-pic" src="/api/user/{data.User.User.Id}/image" alt="">
			</button>
			{#if isAccountOpen}
				<div class="account-options">
					<a href="/logout">
						<button class="menu-btn-danger">
							Logout
						</button>
					</a>
				</div>
			{/if}
		</div>
	</div>
{/if}

{#if page.url.pathname != "/login" && data.User}
	<div class="side-nav">
		<div class="logo-cotainer">
			<img class="logo" src={MuxLogo} alt="">
		</div>
		<div class="search-bar">
			<img class="control-button" style="padding: 7px;" src={SearchIcon} alt="">
			<input type="text" bind:value={searchTerm} onkeypress={handleSearch} placeholder="Search...">
		</div>
		<div class="nav-section">
			<h3 class="nav-heading">Libraries</h3>
			<div class="library-list">
				{#each data.Libraries?.Items as lib}
					<a href="/{lib.Id}">
						<button class={page.url.pathname.includes(lib.Id) ? "btn-lib-select" : "btn-lib"}>
							<img class="icon" src={LibraryIcon} alt="">
							{lib.Name}
						</button>
					</a>
				{/each}
			</div>
		</div>
	</div>
{/if}


<div class={navigating.complete ? "loader" : ""}>
	<div class={data.User ? "root" : "root-full"}>
		{@render children()}
	</div>
</div>

{#if page.url.pathname != "/login" && data.User}
	<Player uid={data.User.User.Id} />
{/if}

<style>

	.root::-webkit-scrollbar {
		display: none;
	}

	:root {
		background-color: rgb(20, 20, 20);
	}

	.root {
		background-color: rgb(20, 20, 20);
		padding: 20px;
		padding-bottom: 100px;
		padding-top: 65px;
		margin-left: 220px;
	}

	.root-full {
		background-color: rgb(20, 20, 20);
		padding: 20px;
		padding-bottom: 100px;
		padding-top: 65px;
	}

	.side-nav {
		display: flex;
		flex-direction: column;
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		padding: 20px;
		width: 200px;
		gap: 20px;
		/* background-color: rgb(20, 20, 20); */
		z-index: 5;
		overflow-y: scroll;
		background-image: linear-gradient(90deg, rgb(20, 20, 20), transparent);
	}

	.nav-heading {
		font-family: sans-serif;
		color: white;
		margin: 0;
		font-size: 0.9rem;
	}

	.nav-section {
		margin-top: 20px;
	}

	.library-list {
		display: flex;
		flex-direction: column;
		gap: 5px;
		margin-top: 12px;
	}

	.icon {
		width: 16px;
		height: 16px;
		vertical-align: middle;
		margin-top: 2px;
		filter: invert();
		opacity: 50%;
	}

	.btn-lib {
		display: flex;
		border: none;
		gap: 12px;
		text-align: left;
		background-color: transparent;
		padding: 8px;
		border-radius: 8px;
		color: rgba(255, 255, 255, 0.491);
		font-family: sans-serif;
		cursor: pointer;
		transition: 0.06s;
		font-size: 0.9rem;
		font-weight: 800;
		line-height: 20px;
		width: 100%;
	}

	.btn-lib:hover {
		background-color: rgba(128, 128, 128, 0.121);
		color: white;
	}

	.btn-lib:hover .icon {
		opacity: 100%;
	}

	.btn-lib:active {
		background-color: rgba(137, 137, 137, 0.243);
		color: white;
	}

	.btn-lib-select {
		display: flex;
		border: none;
		gap: 12px;
		text-align: left;
		background-color: transparent;
		padding: 8px;
		border-radius: 8px;
		color: rgba(255, 255, 255, 0.491);
		font-family: sans-serif;
		cursor: pointer;
		transition: 0.06s;
		font-size: 0.9rem;
		font-weight: 800;
		line-height: 20px;
		width: 100%;
		background-color: rgba(137, 137, 137, 0.243);
		color: white;
	}

	.btn-lib-select .icon {
		opacity: 100%;
	}

	.loader {
		animation-name: load;
		animation-iteration-count: infinite;
		animation-duration: 1.7s;
		animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}

	.top {
		top: 0;
		left: 220px;
		right: 0;
		position: fixed;
		padding: 20px;
		padding-left: 22px;
		padding-right: 22px;
		/* background-color: rgb(20, 20, 20); */
		display: flex;
		justify-content: space-between;
		gap: 12px;
		z-index: 5;
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

	.btn-account {
		border: none;
		padding: 0;
		background-color: transparent;
	}

	.profile-pic {
		border-radius: 100px;
		width: 34px;
		height: 33px;
		object-fit: cover;
		transition: 0.06s;
		cursor: pointer;
		vertical-align: middle;
	}

	.profile-pic:hover {
		scale: 105%;
	}

	.profile-pic:active {
		scale: 100%;
	}

	.account-options {
		width: 130px;
		position: fixed;
		right: 22px;
		top: 60px;
		padding: 5px;
		border-radius: 8px;
		background-color: rgba(90, 90, 90, 0.243);
		display: flex;
		flex-direction: column;
		gap: 5px;
	}


	/* Porobably will be used later */
	/* .menu-btn {
		border: none;
		background-color: transparent;
		color: white;
		font-weight: 700;
	} */

	.menu-btn-danger {
		border: none;
		background-color: rgba(255, 76, 109, 0.205);
		color: rgb(255, 0, 47);
		font-weight: 700;
		width: 100%;
		padding: 6px;
		border-radius: 5px;
		text-align: left;
		transition: 0.06s;
		cursor: pointer;
		padding-left: 12px;
		padding-right: 12px;
	}
	
	.menu-btn-danger:hover {
		background-color: rgba(255, 76, 109, 0.356);
	}

	/* .nav-lib {
		display: flex;
		gap: 5px;
		padding: 5px;
		background-color: #33333394;
		border-radius: 12px;
		backdrop-filter: blur(20px);
	} */

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
		background-color: #6969699d;
	}

	.nav {
		display: flex;
		gap: 12px;
	}

	.logo {
		height: 30px;
		position: relative;
		top: 0.3rem;
	}

	a {
		text-decoration: none;
		display: block;
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