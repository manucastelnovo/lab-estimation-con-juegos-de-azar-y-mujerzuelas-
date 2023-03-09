<script lang="ts">
	import type { PageData } from './$types';
	import type { Project } from '$lib/types/project';
	import { goto } from '$app/navigation';

	export let data: PageData;
	$: ({ project } = data);

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

<main class="container">
	<form action="/projects/{project.id}?/update-project" method="POST">
		<h3>Edit Project</h3>
		<label for="title"> Title </label>
		<input
			class="bg-[#21002E] focus:border-[#21002E]"
			type="text"
			id="title"
			name="title"
			value={project.title}
		/>
		<label for="description"> Description </label>
		<textarea
			class="bg-[#21002E] focus:border-[#21002E]"
			id="description"
			name="description"
			rows={5}
			value={project.description}
		/>
		<button type="submit" class="border-[#490066]">Update project</button>
		<button
			on:click={() => {
				onDelete(project);
			}}
			type="button"
			class="outline constrast border-[#490066] text-[#490066]"
		>
			Delete
		</button>
	</form>
</main>
