const {
    getAllProductsCallback,
    getAllProductsWithPromise,
} = require("../9 - FS Samples/9 - ProductReader");

describe("callback based product-reader integration tests", () =>
{
    describe("given existing file", () =>
    {
        it("reads the file and returns it as JSON", (done) =>
        {
            getAllProductsCallback(
                (err) =>
                {
                    console.log(err);
                },
                (data) =>
                {
                    expect(data.products.length).toBe(2);
                    done();
                }
            );
        });
    });
});

describe("promise based product-reader integration tests", () =>
{
    describe("given existing file", () =>
    {
        it("reads the file and returns it as JSON", async () =>
        {
            const result = await getAllProductsWithPromise();
            expect(result.products.length).toBe(2);
        });
    });
});
