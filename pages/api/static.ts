import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req: any, res: any) {
	//Find the absolute path of the json directory
	const data = path.join(process.cwd(), 'data');
	//Read the json data file data.json
	const fileContents = await fs.readFile(data + '/data.json', 'utf8');
	//Return the content of the data file in json format
	res.status(200).send(fileContents);
}
