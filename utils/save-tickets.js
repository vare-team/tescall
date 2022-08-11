import { writeFile, writeFileSync, readFileSync } from 'fs';

export default function () {
	writeFile('./tickets.json', JSON.stringify(Object.fromEntries(tickets), null, 2), { flag: 'w' }, e => {
		if (e) console.warn(e);
	});

	writeFile('./threads.json', JSON.stringify(Object.fromEntries(threads), null, 2), { flag: 'w' }, e => {
		if (e) console.warn(e);
	});

	writeFile('./mutes.json', JSON.stringify(Object.fromEntries(mutes), null, 2), { flag: 'w' }, e => {
		if (e) console.warn(e);
	});
}

export function createFiles() {
	try {
		writeFileSync('./tickets.json', '{}', { flag: 'wx' });
		writeFileSync('./threads.json', '{}', { flag: 'wx' });
		writeFileSync('./mutes.json', '{}', { flag: 'wx' });
		// eslint-disable-next-line no-empty
	} catch (e) {}
}

export function readFiles(path) {
	return JSON.parse(readFileSync(path, 'utf8'));
}
