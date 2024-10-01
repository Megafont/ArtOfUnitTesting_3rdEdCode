const samples = require("../2 - FetchPromises/2 - FetchingSamplePromises");

describe("Website is up check", () =>
{
    test("on fetch success with good content, returns true", () =>
    {
        const result = samples.processFetchContent("illustrative");
        expect(result.success).toBe(true);
        expect(result.status).toBe("ok");
    });

    test("on fetch success with bad content, returns false", () =>
    {
        const result = samples.processFetchContent("text not on the website");
        expect(result.success).toBe(false);
        expect(result.status).toBe("missing text");
    });

    test("on fetch fail, returns error text and false", () =>
    {
        expect(() => samples.processFetchError(new Error("error text"))).toThrowError("error text");
    });
});
