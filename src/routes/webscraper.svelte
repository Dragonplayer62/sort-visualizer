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

<main>
  <h1 class="text-2xl text-gray-200 mx-4 my-4 text-center">Fetching 25 of this month's game releases from my web scraper microservice.</h1>

  <ul class="my-4">
    {#each games as game}
      <li class="text-gray-200 text-center text-lg my-1">{game.name}</li>
    {/each}
  </ul>
</main>