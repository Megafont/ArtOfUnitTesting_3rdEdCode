const samples = require("../2 - FetchPromises/2 - FetchingSamplePromises");

test("isWebsiteAlive with real website returns true", async () =>
{
    const result = await samples.isWebsiteAlive();
    expect(result.success).toBe(true);
    expect(result.status).toBe("ok");
});
