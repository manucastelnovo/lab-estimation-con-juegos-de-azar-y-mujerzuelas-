<script lang="ts">
	import type { PageData } from './$types';
	import { Button } from 'flowbite-svelte';
	import { goto } from '$app/navigation';
	import MainTable from '$lib/components/MainTable.svelte';
	import type { Project } from '$lib/types/project';

	export let data: PageData;

	$: ({ issues } = data);

	const onDelete = async (project: Project) => {
		const response = await confirm('Are you sure you want to delete this project?');

		if (response) {
			await fetch(`/api/projects?id=${project.id}`, {
				method: 'DELETE'
			});
			goto('/projects');
		}
	};
</script>

<main class="container bg-[#0A0B0D]">
	<div>
		<MainTable titulo="issues" lista={issues} nuevoItemUrl="projects/create" callback={onDelete} />
	</div>
</main>
