<script lang="ts">
	export let actionUrl: string;
</script>

<div class="px-[10vw]">
	<form action={actionUrl} method="POST">
		<h3 class="mb-6">New Project</h3>
		<label for="title"> Title </label>
		<input class="bg-[#21002E] focus:border-[#21002E]" type="text" id="title" name="title" />
		<label for="description"> Description </label>
		<textarea
			id="description"
			class="bg-[#21002E] focus:border-[#21002E]"
			name="description"
			rows={5}
		/>
		<button type="submit" class="border-[#490066]">Add Project</button>
	</form>
</div>
