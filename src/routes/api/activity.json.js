import { db } from '../../database.js';

export async function get(req, res, next) {
  try {
    const data = await db('SELECT * FROM activity');
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(
      JSON.stringify({
        message: data.rows,
      })
    );
  } catch {
    res.writeHead(404, {
      'Content-Type': 'application/json',
    });
    res.end(
      JSON.stringify({
        message: 'Not found',
      })
    );
  }
}
