import { NetworkAdapter } from "../5 - FetchAdapterInterface/5 - NetworkAdapter";
import { isWebsiteAlive } from "../5 - FetchAdapterInterface/5 - WebsiteVerifier";

test("Integration test: fetching with callback", async () =>
{
    const result = await isWebsiteAlive(new NetworkAdapter());
    expect(result.success).toBe(true);
    expect(result.status).toBe("ok");
});
