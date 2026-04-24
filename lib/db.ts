/* eslint-disable @typescript-eslint/no-explicit-any */
import CONFIG from '@/config';
import mysql from 'mysql2/promise';


export const pool = mysql.createPool({
  host: CONFIG.DB_HOST,
  user: CONFIG.DB_USER,
  password: CONFIG.DB_PASSWORD,
  database: CONFIG.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function query<T>(
  sql: string,
  params?: any
): Promise<T | null> {
  try {
    const [rows] = await pool.execute(sql, params);
    return rows as T;
  } catch (error) {
    console.error("Database query error:", error);
    return null;
  }
}