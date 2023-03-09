<script lang="ts">
	import type { PageData } from './$types';
	import { Button } from 'flowbite-svelte';
	import { goto } from '$app/navigation';
	import MainTable from '$lib/components/MainTable.svelte';
	import type { Epic } from '$lib/types/epic';

	export let data: PageData;

	$: ({ epics } = data);
	// $: ({ project } = data);

	async function onDeleteEpic(epic: Epic) {
		const response = await confirm('Are you sure you want to delete this epic?');

		if (response) {
			try {
				await fetch(`/api/epics?id=${epic.id}`, {
					method: 'DELETE'
				});
				window.location.reload();
			} catch (error) {
				if (error instanceof Error) {
					alert(error.message);
				} else {
					alert(error);
				}
			}
		}
	}
</script>

<main class="container bg-[#0A0B0D]">
	<div>
		<MainTable
			titulo="epics"
			lista={epics}
			nuevoItemUrl={`/epics/create`}
			callback={onDeleteEpic}
		/>
	</div>
</main>
