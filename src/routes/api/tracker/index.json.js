import { db } from "../../../database.js";

export async function get(req, res, next) {
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
  `;
  try {
    const data = await db(sql);
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    //message: data.rows,
    res.end(JSON.stringify({ success: true }));
  } catch (err) {
    res.writeHead(404, {
      "Content-Type": "application/json",
    });
    res.end(
      JSON.stringify({
        message: "Not found",
      })
    );
  }
}

//post remember to take user id and timestamp
export async function post(req, res, next) {
  const data = req.body;
  const sql = `INSERT INTO tracker(quantity, added, activity_id, user_id) VALUES($1, $2, $3, $4) RETURNING *`;
  const values = [data.quantity, "NOW()", data.activityId, data.userId];
  try {
    const databaseCall = await db(sql, values);
    res.end(JSON.stringify(databaseCall));
  } catch (err) {
    console.error("tracker.json.js post: ", err);
    res.writeHead(500);
    res.end(JSON.stringify({ message: "Unable to post" }));
  }
}
