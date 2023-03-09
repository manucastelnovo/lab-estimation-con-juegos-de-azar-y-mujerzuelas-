<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import {
		Badge,
		Button,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';

	export let data: PageData;
	$: ({ issue } = data);

	async function deleteProject(projectId: number) {
		try {
			await prisma.project.update({
				where: {
					id: projectId
				},
				data: {
					deleteStatus: true,
					deleteAt: new Date()
				}
			});
		} catch (error) {}
	}
</script>

<div class="px-[10vw] flex flex-col justify-between">
	<h1>{issue.title}</h1>
</div>
