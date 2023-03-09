import { error, fail, type Actions, type ServerLoad } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { Project } from '$lib/types/project';
import type { Color, Epic } from '$lib/types/epic';
import type { Request } from '$lib/types/request';
import type { Issue } from '$lib/types/issue';

export const load: ServerLoad = async ({ params }) => {
	return {
		project: await getProject(Number(params.projectId)),
		epics: await getEpics(Number(params.projectId)),
		requests: await getRequests(Number(params.epicId)),
		issues: await getIssues(Number(params.requestId))
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
			tag: true
		}
	});
	if (!epics) {
		throw error(404, { message: 'Epic not found' });
	}
	return epics;
};

async function getRequests(epicId: number) {
	const requests: Request[] = await prisma.request.findMany({
		where: {
			epicId: epicId,
			deleteStatus: false
		},
		select: {
			id: true,
			title: true,
			description: true,
			issues: true
		}
	});
	if (!requests) {
		throw error(404, { message: 'Requests not found' });
	}
	console.log(JSON.stringify(requests));
	return requests;
}

async function getIssues(requestId: number) {
	const issues: Issue[] = await prisma.issue.findMany({
		where: {
			requestId: requestId,
			deleteStatus: false
		},
		select: {
			id: true,
			title: true,
			description: true
		}
	});
	if (!issues) {
		throw error(404, { message: 'Requests not found' });
	}
	console.log(JSON.stringify(issues));
	return issues;
}

export const actions: Actions = {
	'update-project': async ({ request, params }) => {
		console.log('Ejecute updateProject');
		console.log('id: ', params.projectId);
		const { title, description } = Object.fromEntries(await request.formData()) as {
			title: string;
			description: string;
		};

		try {
			await prisma.project.update({
				where: {
					id: Number(params.projectId)
				},
				data: {
					title,
					description
				}
			});
		} catch (err) {
			console.error(err);
			return fail(500, { message: 'Could not update the project' });
		}
		return {
			status: 201
		};
	},
	'create-epic': async ({ request, params }) => {
		console.log('Ejecute createEpic');
		const { title, color } = Object.fromEntries(await request.formData()) as {
			title: string;
			color: Color;
		};

		try {
			await prisma.epic.create({
				data: {
					title,
					tag: color,
					projectId: Number(params.projectId)
				}
			});
		} catch (err) {
			console.error(err);
			return fail(500, { message: 'Could not create the epic.' });
		}

		return {
			status: 201
		};
	},
	'create-request': async ({ request, params }) => {
		const { title, description } = Object.fromEntries(await request.formData()) as {
			title: string;
			description: string;
		};

		try {
			await prisma.request.create({
				data: {
					title,
					description,
					projectId: Number(params.projectId)
				}
			});
		} catch (err) {
			console.error(err);
			return fail(500, { message: 'Could not create the request.' });
		}

		return {
			status: 201
		};
	}
};
