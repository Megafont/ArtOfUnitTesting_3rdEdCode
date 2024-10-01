const { Adder } = require("../8 - Events/Adder Emitter/8 - Adder");

describe("event based module", () =>
{
    describe("add", () =>
    {
        it("generates addition event when called", (done) =>
        {
            const adder = new Adder();
            adder.on("added", (result) =>
            {
                expect(result).toBe(3);
                done();
            });

            adder.add(1, 2);

        });
    });
});
