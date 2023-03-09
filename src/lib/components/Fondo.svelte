<script>
	import particlesJS from './../../../node_modules/particles.js/package.json';
	import { onMount } from 'svelte';

	const loadParticles = () => {
		particlesJS.load('particles-js', 'assets/particles.json', function () {
			console.log('callback - particles-js config loaded');
		});
	};

	// Load particles when the component mounts
	onMount(() => {
		loadParticles();
	});
</script>

<div id="particles-js" />

<style>
	#particles-js {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
	}
</style>
