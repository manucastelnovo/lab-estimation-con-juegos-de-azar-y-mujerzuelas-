<script lang="ts">
	import type { PageData } from './$types';
	import { Button } from 'flowbite-svelte';
	import { goto } from '$app/navigation';
	import MainTable from '$lib/components/MainTable.svelte';
	import type { Epic } from '$lib/types/epic';
	import type { Request } from '$lib/types/request';
	import { onMount } from 'svelte';

	export let data: PageData;

	$: ({ requests } = data);
	$: ({ project } = data);
	// $: ({ epic } = data);

	async function onDeleteRequest(request: Request) {
		const response = await confirm('Are you sure you want to delete this request?');

		if (response) {
			try {
				await fetch(`/api/request?id=${request.id}`, {
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
			nuevoItemUrl={`/requests/create`}
			titulo="requests"
			lista={requests}
			callback={onDeleteRequest}
		/>
	</div>
</main>
