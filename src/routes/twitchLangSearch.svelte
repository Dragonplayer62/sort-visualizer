<script>
  import TwitchCard from "../$lib/twitchCard.svelte"

  let streams = [];
  let searchLang = '';
  let pagination = ''; //for scrolling
  let isLoading = false; //for displaying a loading screen

  async function getStreams(){
    if(searchLang.length != 2){
      alert("Language code must be 2 characters long");
      return
    }

    isLoading = true;
    const params = new URLSearchParams();
    params.append('lang', searchLang);
    params.append('pag', pagination);
    params.append('amnt', '20');
    
    const res = await fetch(`http://188.34.185.31/twitch?${params}`);
    if(!res.ok){
      alert("Something went wrong here");
      console.log(res);
      return
    }
    const data = await res.json();
    pagination = data.pagination;
    streams = data.streams;
    isLoading = false;
    scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }
</script>

<svelte:head>
    <title>Twitch Language Search</title>
</svelte:head>

<main class="my-4 text-xl text-gray-200 text-center">
  <body>
    <h1 class="text-4xl text-center my-8 uppercase text-gray-800 dark:text-gray-100">Search Twitch streams of specific language</h1>

    <div class="flex flex-col">
      <form on:submit|preventDefault={getStreams}>
        <input bind:value={searchLang} type="text" placeholder="ja"class="text-gray-800 p-2 rounded-md"/>
        <button class="bg-green-700 p-4 rounded-md">
          Find Streams
        </button>
      </form>
    </div>
    
    <div>
      Language must in be two letter form. Example: "ja" for Japanese, "de" for German
    </div>
    <a class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" href="https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes" target="_blank" rel="noopener noreferrer">
      See this table
    </a>

    <div class="m-2 grid gap-4 md:grid-cols-5 grid-cols1">
      {#if streams.length > 0}
        {#each streams as streamer}
          <TwitchCard streamer = {streamer}/>
        {/each}
      {/if}
    </div>

    {#if streams.length > 0}
    <button on:click={getStreams} class="bg-green-700 p-4 rounded-md">
      Load more...
    </button>
    {/if}

  </body>
</main>