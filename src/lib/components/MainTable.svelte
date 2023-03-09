<script lang="ts">
	import { goto } from '$app/navigation';
	import '@picocss/pico';

	//props

	export let titulo: string;
	export let lista: any[];
	export let nuevoItemUrl: string;
	export let callback: Function;

	//icons
	import Fa from 'svelte-fa';
	import { faSquarePlus, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
</script>

<section class="container px-4 mx-auto">
	<div class="sm:flex sm:items-center sm:justify-between">
		<div />

		<div class="flex items-center mt-4 gap-x-3" />
	</div>

	<div class="flex flex-col mt-6">
		<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
				<div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
					<table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
						<thead class="bg-gray-50 dark:bg-black flex justify-between ">
							<tr class="min-w-full">
								<th
									scope="col"
									class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
								>
									<div class="flex items-center gap-x-3">
										<button
											class="w-8 h-8 flex items-center justify-center mb-0 dark:bg-[#560078] border-[#560078] hover:bg-[#490066] hover:border-[#490066]"
											on:click={() => goto(`${nuevoItemUrl}`)}
										>
											<Fa icon={faSquarePlus} />
										</button>
										<span>{titulo}</span>
									</div>
								</th>
							</tr>
						</thead>
						<tbody
							class="bg-white divide-y divide-[#727273] dark:divide-gray-700 dark:bg-[#21002E]"
						>
							{#each lista as project}
								<tr class="bg-[11191f]">
									<td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
										<div class="inline-flex items-center gap-x-3">
											<input
												type="checkbox"
												class="text-blue-500 border-gray-300 rounded dark:bg-[#0A0B0D] dark:ring-offset-gray-900 dark:border-gray-700"
											/>

											<div class="flex items-center gap-x-2">
												<div>
													<h2 class="font-normal text-gray-800 dark:text-white mb-0">
														<!-- content here -->
														<a class="text-white" href={`/${titulo}/${project.id}`}>
															{project.title}</a
														>
													</h2>
												</div>
											</div>
										</div>
									</td>
									<td class="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
										{project.description}
									</td>
									<td class="px-4 py-4 text-sm whitespace-nowrap flex gap-6 items-center">
										<button
											on:click={() => {
												goto(`/projects/${project.id}/edit`);
											}}
											class="h-8 px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100 flex justify-center items-center mb-0 bg-[#560078] border-[#560078]"
										>
											<Fa icon={faPen} />
										</button>
										<button
											on:click={async () => {
												await callback(project);
												location.reload();
											}}
											class=" h-8 w-12 px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100 flex justify-center items-center mb-0 bg-[#560078] border-[#560078]"
										>
											<Fa icon={faTrash} />
										</button>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>

	<div class="flex items-center justify-between mt-6">
		<a
			href="#"
			class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-[#21002E] dark:text-gray-200 dark:border-gray-700 dark:hover:bg-[#490066]"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-5 h-5 rtl:-scale-x-100"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
				/>
			</svg>

			<span> previous </span>
		</a>

		<div class="items-center hidden md:flex gap-x-3">
			<a
				href="#"
				class="px-2 py-1 text-sm text-gray-500 rounded-md dark:bg-[#21002E] bg-blue-100/60">1</a
			>
			<a
				href="#"
				class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-[#21002E] dark:text-gray-300 hover:bg-gray-100"
				>2</a
			>
			<a
				href="#"
				class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-[#21002E] dark:text-gray-300 hover:bg-gray-100"
				>3</a
			>
			<a
				href="#"
				class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-[#21002E] dark:text-gray-300 hover:bg-gray-100"
				>...</a
			>
		</div>

		<a
			href="#"
			class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-[#21002E] dark:text-gray-200 dark:border-gray-700 dark:hover:bg-[#490066]"
		>
			<span> Next </span>

			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-5 h-5 rtl:-scale-x-100"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
				/>
			</svg>
		</a>
	</div>
</section>
