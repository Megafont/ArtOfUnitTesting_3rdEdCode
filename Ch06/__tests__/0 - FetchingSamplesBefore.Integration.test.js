const samples = require("../0 - Before/0 - FetchingSamplesBefore");

test("NETWORK REQUIRED (callback): website with correct content, returns true", (done) =>
{
    samples.isWebsiteAliveWithCallback((err, result) =>
    {
        expect(err).toBeNull();
        expect(result.status).toBe("ok");
        expect(result.success).toBe(true);
        done();
    });
});

test("NETWORK REQUIRED (await): website with correct content, returns true", (done) =>
{
    samples.isWebsiteAliveWithPromises().then((result) =>
    {
        expect(result.success).toBe(true);
        expect(result.status).toBe("ok");
        done();
    });
});

test("NETWORK REQUIRED2 (await): website with correct content, returns true", async () =>
{
    const result = await samples.isWebsiteAliveWithPromises();
    expect(result.success).toBe(true);
    expect(result.status).toBe("ok");
});
