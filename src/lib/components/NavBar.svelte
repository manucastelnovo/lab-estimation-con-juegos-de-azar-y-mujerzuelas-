<script lang="ts">
	import '@picocss/pico';
	import { goto } from '$app/navigation';

	//props

	export let name: string;
	export let current_project_id: number = 1;
</script>

<nav class="bg-dark border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-[#0A0B0D] justify-between">
	<div class="flex items-center">
		<a href="/projects" class="flex items-end focus:bg-[#21002E]">
			<img
				src="https://i.pinimg.com/736x/6f/0b/21/6f0b2180987bd0345c5a056a46a9de6c--fullmetal-alchemist-tattoo-ideas.jpg"
				class="h-12 mr-3 sm:h-12"
				alt="Logo"
			/>
			<span class="self-end text-xl font-semibold whitespace-nowrap dark:text-white p-[10px]"
				>{name}
			</span>
		</a>
	</div>

	<div class="flex items-center justify-between border-gray-400">
		<nav>
			<ul class="DESKTOP-MENU hidden space-x-8 lg:flex">
				<li>
					<button
						class="text-white focus:bg-[#21002E]"
						style="background-color:#0A0B0D ; border-color:#0A0B0D; "
						on:click={() => goto(`/projects/${current_project_id}/epics`)}>Epics</button
					>
				</li>
				<li>
					<button
						style="background-color:#0A0B0D; border-color:#0A0B0D;"
						on:click={() => goto(`/projects/${current_project_id}/requests`)}
						class="text-white focus:bg-[#21002E]">Requests</button
					>
				</li>
				<li>
					<button
						style="background-color:#0A0B0D; border-color:#0A0B0D;"
						on:click={() => goto(`/projects/${current_project_id}/requests/1/issues`)}
						class="text-white focus:bg-[#21002E]">Issues</button
					>
				</li>
			</ul>
		</nav>
	</div>

	<div class="py-[20px]">
		<select name="project">
			<option value="value1">Advance</option>
			<option value="value2" selected>Morfit</option>
			<option value="value3">Puae App</option>
		</select>
	</div>
</nav>

<style>
</style>
