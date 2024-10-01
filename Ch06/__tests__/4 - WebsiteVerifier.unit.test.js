const webVerifier = require("../4 - FetchAdapterFunctional/4 - WebsiteVerifier");

const makeStubNetworkWithResult = (fakeResult) =>
{
    return {
        fetchUrlText: () =>
        {
            return fakeResult;
        },
    };
};

describe("Unit test website verifier", () =>
{
    test("With good content, returns true", async () =>
    {
        const stubSyncNetwork = makeStubNetworkWithResult(
            {
                ok: true,
                text: "illustrative",
            });

        const result = await webVerifier.isWebsiteAlive(stubSyncNetwork);
        expect(result.success).toBe(true);
        expect(result.status).toBe("ok");
    });

    test("With bad content, returns false", async () =>
    {
        const stubSyncNetwork = makeStubNetworkWithResult(
            {
                ok: true,
                text: "unexpected content",
            });

        const result = await webVerifier.isWebsiteAlive(stubSyncNetwork);
        expect(result.success).toBe(false);
        expect(result.status).toBe("missing text");
    });

    test("With bad url or network, throws", async () =>
    {
        const stubSyncNetwork = makeStubNetworkWithResult(
            {
                ok: false,
                text: "some error",
            });

        try
        {
            const result = await webVerifier.isWebsiteAlive(stubSyncNetwork);
            fail("promise.reject expected");
        }
        catch (err)
        {
            expect(err.success).toBe(false);
            expect(err.status).toBe("some error");
        }

    });
});
