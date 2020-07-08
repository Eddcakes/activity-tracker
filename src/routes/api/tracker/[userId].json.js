import { db } from '../../../database.js';

export async function get(req, res, next) {
  const { userId } = req.params;
  const sql = `
  SELECT 
  tracker.id,
  tracker.quantity,
  tracker.added,
  tracker.activity_id,
  tracker.user_id,
  activity.label,
  activity.unit
  FROM tracker INNER JOIN activity ON (tracker.activity_id = activity.id)
  WHERE user_id = ${userId}
  `;
  try {
    const data = await db(sql);
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
