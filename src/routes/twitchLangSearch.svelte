<script>
  import { getAuthToken } from "../$lib/twitch";
  import TwitchCard from "../$lib/twitchCard.svelte"

  const clientID = 'buolpx11e3dk9bubm5x8pj95wzwg99'; //public
  let authToken='';
  let streams = [];
  let searchLang = '';
  let pagination = ''; //for scrolling
  let isLoading = false; //for displaying a loading screen

  async function getStreams(){
    if(searchLang.length === 0){
      alert("Please input a language");
      return
    }
    if(searchLang.length > 2){
      alert("Input must be 2 characters long");
      return
    }

    isLoading = true;
    await validateAuth();
    const extraParams = new URLSearchParams();
    extraParams.append('language', searchLang);
    extraParams.append('first', '50');

    const url = `https://api.twitch.tv/helix/streams?${extraParams}`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Client-Id' : clientID,
      },
    })
    if(!res.ok){
      alert("Something went wrong on Twitch's end");
      return
    }
    const data = await res.json();
    if(data.data.length === 0){
      alert("Could not find any streams of that language");
      return
    }
    pagination = data.pagination.cursor;
    const loadedStreams = data.data.map((stream) => {
      let str = stream.thumbnail_url.replace('{width}', '320').replace('{height}', '180');
      return {
        thumbnail_url: str,
        user_name: stream.user_login,
        localized_name: stream.user_name,
        title: stream.title,
        game_name: stream.game_name,
        viewer_count: stream.viewer_count
      }
    })
    streams = loadedStreams;
    isLoading = false;
  }

  async function validateAuth(){
    authToken = await getAuthToken(clientID);
    const res = await fetch('https://id.twitch.tv/oauth2/validate', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`
      },
    })
    if(!res.ok){
      console.log('Refreshing auth token')
      validateAuth();
    }
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
  </body>
</main>