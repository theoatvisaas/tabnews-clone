import database from "infra/database.js";

const status = async (req, res) => {
  const updatedAt = new Date().toISOString();

  const dbVersionResult = await database.query("SHOW server_version;");
  const dbVersionValue = dbVersionResult.rows[0].server_version;

  const dbMaxConnectionsResult = await database.query("SHOW max_connections;");
  const dbMaxConnectionsValue = dbMaxConnectionsResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const dbOpenConnectionsResult = await database.query({
    text: `SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1;`,
    values: [databaseName],
  });
  const dbOpenConnectionsValue = dbOpenConnectionsResult.rows[0].count;

  res.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: dbVersionValue,
        max_connections: parseInt(dbMaxConnectionsValue),
        opened_connections: parseInt(dbOpenConnectionsValue),
      },
    },
  });
};

export default status;
