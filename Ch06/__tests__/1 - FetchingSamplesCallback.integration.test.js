const samples = require("../1 - FetchCallback/1 - FetchingSamplesCallback");

test("isWebsiteAlive with real website return true", (done) =>
{
    samples.isWebsiteAlive((err, result) =>
    {
        expect(err).toBeNull();
        expect(result.success).toBe(true);
        done();
    });
});
