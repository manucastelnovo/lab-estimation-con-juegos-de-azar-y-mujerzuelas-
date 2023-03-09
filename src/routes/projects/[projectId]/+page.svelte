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
	$: ({ project, epics, requests } = data);

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
	<h1>
		<div class="flex justify-between">
			{project.title}
			<a class="text-[#490066]" href="/projects/{project.id}/edit">Edit</a>
		</div>
		<p class="text-sm text-center">{project.description}</p>
	</h1>

	<div class="">
		{#each epics as epic}
			<Badge class=" px-2 mx-1" color={epic.tag}>{epic.title}</Badge>
		{/each}
		<div class="py-2">
			<Button
				on:click={() => {
					goto(`/projects/${project.id}/epics`);
				}}
				size="xs"
				class="border-[#490066]">Go to Epics</Button
			>
		</div>
	</div>

	<div>
		<Button
			class="border-[#490066]"
			on:click={async () => {
				await deleteProject(project.id);
				goto(`/projects`);
			}}>Add a new Request</Button
		>
	</div>

	<!-- <Table striped={true}>
		<TableHead>
			<TableHeadCell>Requests</TableHeadCell>
		</TableHead>
		<TableBody tableBodyClass="divide-y">
			{#each requests as request}
				<TableBodyRow>
					<TableBodyCell
						class="cursor-pointer"
						on:click={() => {
							goto(`${project.id}/requests/${request.id}`);
						}}
					>
						<span>
							{request.title}
						</span>
					</TableBodyCell>

					<TableBodyCell>
						<span>{request.description}</span>
					</TableBodyCell>

					<TableBodyCell>
						<a href="/projects/{project.id}/requests/{request.id}/edit">Edit</a>
					</TableBodyCell>

					<TableBodyCell>
						<a href="/projects/{project.id}/requests/{request.id}/delete">Delete</a>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table> -->
</div>
