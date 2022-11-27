import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import chalk from 'chalk';
import reqIp from 'request-ip';

import { counterRepository } from './database';

dotenv.config();

import { create } from './database/utils/create';
import { fill } from './database/utils/fill';

create()
	.then(() => fill())
	.catch((err) => {
		console.error(err);
	});

const app: Express = express();

app.get('/', async (req: Request, res: Response) => {
	const counter = await counterRepository.getCounter();

	if (counter) {
		res.send(counter.value.toString());
	} else {
		res.sendStatus(500);
	}
});

app.get('/stat', async (req: Request, res: Response) => {
	const counter = await counterRepository.updateCounter(
		req.headers['user-agent']
	);

	if (counter) {
		res.send(counter.value.toString());
	} else {
		res.sendStatus(500);
	}
});

app.get('/about', (req: Request, res: Response) => {
	res.send(
		`<h3>Привет!</h3>
		<br/>
		<span>Я не понял что тут нужно вернуть</span> 
		<br/>
		вот remoteAddress: <b>${req.socket.remoteAddress}</b>
		<br/>
		вот hostname: <b>${req.hostname}</b>
		<br/>
		вот ip через модуль <a href="https://github.com/pbojinov/request-ip" target="_blank">request-ip</a>: <b>${reqIp.getClientIp(
			req
		)}</b>
		<br/>`
	);
});

app.listen(process.env.PORT, () => {
	console.log(
		`⚡️[server]: Server is running at http://localhost:${process.env.PORT}`
	);
});
