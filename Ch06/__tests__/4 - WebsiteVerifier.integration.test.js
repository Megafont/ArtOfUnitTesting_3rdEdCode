const realNetwork = require("../4 - FetchAdapterFunctional/4 - NetworkAdapter");
const webVerifier = require("../4 - FetchAdapterFunctional/4 - WebsiteVerifier");

test("Integration test: fetching with callback", async () =>
{
    const result = await webVerifier.isWebsiteAlive(realNetwork);
    expect(result.success).toBe(true);
});
