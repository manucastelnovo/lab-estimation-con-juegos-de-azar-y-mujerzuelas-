import type { Epic } from '$lib/types/epic';
import type { Project } from '$lib/types/project';
import { error, fail, type Actions, type ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ params }) => {
	return {
		epics: await getEpics(Number(params.projectId)),
		project: await getProject(Number(params.projectId))
	};
};
const getProject = async (projectId: number) => {
	const project: Project = await prisma.project.findUnique({
		where: {
			id: projectId
		},
		select: {
			id: true,
			title: true,
			description: true
		}
	});
	if (!project) {
		throw error(404, { message: 'Project not found' });
	}
	return project;
};

const getEpics = async (projectId: number) => {
	const epics: Epic[] = await prisma.epic.findMany({
		where: {
			projectId: projectId,
			deleteStatus: false
		},
		select: {
			id: true,
			title: true,
			tag: true,
			projectId: true
		}
	});
	if (!epics) {
		throw error(404, { message: 'Epics not found' });
	}
	return epics;
};
