<script lang="ts">
	import {onMount} from 'svelte';

  import {generateRandomArray} from "../$lib/sorting";
	import {startSort} from "../$lib/sorting";
	import {updateVis} from "../$lib/visualization";
	import type {Visual} from "../$lib/visualization"

	let arr:Visual[] = [];
	const min=1;
	const max=80;
	const len=10;
	const delay=50;
	let container: HTMLDivElement;
	let frag: DocumentFragment;
	
	onMount(()=>{
		arr = generateRandomArray(min,max,len);
		frag = document.createDocumentFragment();
		updateVis(arr, container, frag);
	})
</script>

<svelte:head>
  <title>Sorting visualizer</title>
</svelte:head>

<main class="mx-4">
	<h1 class="text-3xl font-bold text-gray-200">Sorting visualizer</h1>

	<button on:click="{()=>{arr = generateRandomArray(min,max,len); updateVis(arr, container, frag)}}" class="bg-blue-300 rounded-sm">
		Randomize Array
	</button>
	<br>
	<button on:click="{()=>{startSort(arr, delay, container, frag);}}" class="rounded-md text-lg text-gray-200 bg-zinc-500">
		<p class="mx-4">Sort</p>
	</button>
	<div id="wrapper" class="flex justify-center items-start bg-gray-600 h-84 py-2 text-white text-center">
		<div bind:this={container} class="flex"/>
	</div>
</main>