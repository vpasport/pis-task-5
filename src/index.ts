import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import reqIp from 'request-ip';

dotenv.config();

const app: Express = express();

let counter = 0;

app.get('/', (req: Request, res: Response) => {
	res.send(counter.toString());
});
app.get('/stat', (req: Request, res: Response) => {
	res.send(counter.toString());
	counter++;
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
