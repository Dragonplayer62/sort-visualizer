<script>
  export let streamer;
</script>

<a class="p-8 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-md border-4 flex flex-col border-green-700 hover:border-red-600" href={`https://www.twitch.tv/${streamer.user_name}`} target="_blank" rel="noopener noreferrer">
  <img src={streamer.thumbnail_url} alt={streamer.user_name}>
    <div class="text-2xl font-medium text-yellow-500">{streamer.localized_name}</div>
    <div class="text-lg font-thin">{streamer.title}</div>
    <div class="relative text-base font-medium">
      <p class="absolute left-0">{streamer.game_name}</p>
      <p class="absolute right-0">{streamer.viewer_count}</p>
    </div>
</a>