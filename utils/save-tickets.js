import { writeFile } from 'fs';

export default function () {
	writeFile('./tickets.json', JSON.stringify(tickets, null, 2), { flag: 'w' }, () => {});
	writeFile('./threads.json', JSON.stringify(threads, null, 2), { flag: 'w' }, () => {});
}

export function createFiles() {
	writeFile('./tickets.json', '{}', { flag: 'wx' }, () => {});
	writeFile('./threads.json', '{}', { flag: 'wx' }, () => {});
}
