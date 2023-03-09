<script lang="ts">
	import { Label, Button, Select } from 'flowbite-svelte';

	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	export let data: PageData;
	$: ({ project } = data);

	let epicTitle = '';
	let epicColor = '';
	const colors = [
		{ name: 'Red', value: 'red' },
		{ name: 'Blue', value: 'blue' },
		{ name: 'Green', value: 'green' },
		{ name: 'Yellow', value: 'yellow' },
		{ name: 'Purple', value: 'purple' },
		{ name: 'Indigo', value: 'indigo' },
		{ name: 'Pink', value: 'pink' },
		{ name: 'Dark', value: 'dark' }
	];
</script>

<div class="px-[10vw]">
	<form action="/projects/{$page.params.projectId}/epics?/create" method="POST">
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
			<label for="title">Title</label>
			<input bind:value={epicTitle} type="text" name="title" />
			<label for="color">Color</label>
			<Select bind:value={epicColor} items={colors} name="color" />
		</p>

		<Button btnClass="border-[#490066]" type="submit" disabled={!epicTitle || !epicColor}
			>Create</Button
		>
		<Button on:click={() => goto(`/projects/${project.id}/epics`)} btnClass="border-[#490066]"
			>Cancel</Button
		>
	</form>
</div>
