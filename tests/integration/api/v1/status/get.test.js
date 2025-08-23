test("GET to /api/v1/status should return 200", async () => {
  const res = await fetch("http://localhost:3000/api/v1/status");
  expect(res.status).toBe(200);

  const resBody = await res.json();
  const parsedUpdatedAt = new Date(resBody.updated_at).toISOString();

  expect(resBody.updated_at).toBeDefined();
  expect(parsedUpdatedAt).toEqual(resBody.updated_at);

  expect(resBody.dependencies.database.version).toBe("16.3");
  expect(resBody.dependencies.database.max_connections).toEqual(100);
  expect(resBody.dependencies.database.opened_connections).toEqual(1);
});
