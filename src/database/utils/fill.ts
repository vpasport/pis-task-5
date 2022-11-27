import chalk from 'chalk';
import { readFileSync } from 'fs';

import { db } from '../../../config';
import { getPool } from '../pg';

export const fill = () => {
	return new Promise((res, rej) => {
		try {
			const pool = getPool({
				...db,
			});

			const script = readFileSync('./sql/fill.sql', {
				encoding: 'utf-8',
			});

			pool.connect()
				.then((client) =>
					client.query(script).then(() => {
						console.log(chalk.blue('SUCCESS!'));
						res(true);
					})
				)
				.catch((err) => {
					console.log(chalk.red('ERROR!'));
					rej(err);
				});
		} catch (error) {
			rej(error);
		}
	});
};
