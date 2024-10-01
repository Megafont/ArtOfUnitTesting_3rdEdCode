// Create a mock of our NetworkAdapter class.
jest.mock("../3 - FetchAdapterModular/3 - NetworkAdapter");

const stubSyncNetwork = require("../3 - FetchAdapterModular/3 - NetworkAdapter");
const webVerifier = require("../3 - FetchAdapterModular/3 - WebsiteVerifier");

describe("Unit test website verifier", () =>
{
    beforeEach(jest.resetAllMocks);

    test("with good content, returns true", async () =>
    {
        stubSyncNetwork.fetchUrlText.mockReturnValue({
            ok: true,
            text: "illustrative",
        });

        const result = await webVerifier.isWebsiteAlive();
        expect(result.success).toBe(true);
        expect(result.status).toBe("ok");
    });

    test("with bad content, returns false", async () =>
    {
        stubSyncNetwork.fetchUrlText.mockReturnValue({
            ok: true,
            text: "<span>hello world</span>",
        });

        const result = await webVerifier.isWebsiteAlive();
        expect(result.success).toBe(false);
        expect(result.status).toBe("missing text");
    });

    test("with bad url or network, throws", async () =>
    {
        stubSyncNetwork.fetchUrlText.mockReturnValue({
            ok: false,
            text: "some network error",
        });

        try
        {
            await webVerifier.isWebsiteAlive(stubSyncNetwork);
            fail("promise.reject expected");
        }
        catch (err)
        {
            expect(err.success).toBe(false);
            expect(err.status).toBe("some network error");
        }
    });
});
