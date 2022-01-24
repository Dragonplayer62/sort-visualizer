<script lang="ts">
  import {onMount} from 'svelte';

  let games = [];
  const url = 'http://localhost:8000'
	async function getGames(){
		const res = await fetch(url);
		const data = await res.json();
		games = data;
	}
  onMount(()=>{
    getGames();
  })
  
</script>

<main class="my-4 text-2xl text-gray-200 text-center">
  <h1 class="text-4xl font-bold">Game release scraper</h1>
  <p class=" mx-4 my-4">Fetching 25 of this month's game releases from my web scraper microservice.</p>
  <p class="text-1xl">You can find the source code <a class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"href="https://github.com/Dragonplayer62/web-scraper" target="_blank" rel="noopener noreferrer">here</a>!</p>

  <ul class="my-4">
    {#each games as game}
      <li class="text-lg my-1">{game.name}</li>
    {/each}
  </ul>
</main>