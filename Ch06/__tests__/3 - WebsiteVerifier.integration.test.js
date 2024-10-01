const webVerifier = require("../3 - FetchAdapterModular/3 - WebsiteVerifier");

test("integration test: fetching with callback", async () =>
{
    const result = await webVerifier.isWebsiteAlive();
    expect(result.success).toBe(true);
    expect(result.status).toBe("ok");
});
