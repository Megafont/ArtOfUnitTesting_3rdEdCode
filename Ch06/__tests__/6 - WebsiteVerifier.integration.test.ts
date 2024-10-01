import { NetworkAdapter } from "../6 - FetchAdapterInterface-OO/6 - NetworkAdapter";
import { WebsiteVerifier } from "../6 - FetchAdapterInterface-OO/6 - WebsiteVerifier";

test("integration test: fetching with callback", async () =>
{
    const webVerifier = new WebsiteVerifier(new NetworkAdapter());

    const result = await webVerifier.isWebsiteAlive();

    expect(result.success).toBe(true);
    expect(result.status).toBe("ok");
});
