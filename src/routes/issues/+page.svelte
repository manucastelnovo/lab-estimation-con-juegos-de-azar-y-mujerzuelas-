<script lang="ts">
	import type { PageData } from './$types';
	import { Button } from 'flowbite-svelte';
	import { goto } from '$app/navigation';
	import MainTable from '$lib/components/MainTable.svelte';

	export let data: PageData;

	$: ({ issues } = data);
	$: ({ project } = data);
</script>

<main class="container bg-[#0A0B0D]">
	<div>
		<MainTable titulo="Issues" lista={issues} nuevoItemUrl={`/issues/create`} />
	</div>
</main>
