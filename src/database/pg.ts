import { db } from '../../config';
import { Pool } from 'pg';
import type { PoolConfig } from 'pg';

let pool: Pool | null = null;

const getPool = (config: PoolConfig = db): Pool => {
	if (!pool)
		pool = new Pool({
			host: config.host,
			port: config.port,
			user: config.user,
			password: config.password,
			// database: config.database,
		});

	return pool;
};

export { getPool };
