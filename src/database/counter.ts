import type { QueryResult } from 'pg';
import type { ICounter } from '../types/counter';

import { getPool } from './pg';

const pool = getPool();

const getCounter = async (): Promise<null | ICounter> => {
	try {
		const {
			rows: { 0: counter },
		}: QueryResult<ICounter> = await pool.query(
			`select 
                value
            from
                counter`
		);

		return counter;
	} catch (err) {
		console.error(err);
		return null;
	}
};

const updateCounter = async (
	userInfo: string | undefined
): Promise<ICounter | null> => {
	const client = await pool.connect();
	await client.query('begin');

	try {
		const {
			rows: { 0: counter },
		}: QueryResult<ICounter> = await client.query(
			`update counter
            set
                value = value + 1
            returning *`
		);

		await client.query(
			`insert into
                counter_info (client_info)
            values
                ($1)`,
			[userInfo || 'none']
		);

		await client.query('commit');
		client.release();

		return counter;
	} catch (err) {
		await client.query('rollback');
		client.release();

		console.error(err);
		return null;
	}
};

export { getCounter, updateCounter };
