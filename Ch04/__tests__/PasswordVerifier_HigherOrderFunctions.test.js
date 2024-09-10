const { makeVerifier } = require("../3_HigherOrderFunctions/PasswordVerifier_HigherOrderFuncs");

describe("higher order factory functions", () =>
{
    describe("password verifier", () =>
    {
        test('given logger and passing scenario', () =>
        {
            let logged = "";
            const mockLog = { info: (text) => (logged = text) };
            const passVerify = makeVerifier([], mockLog);

            passVerify("any input");

            expect(logged).toMatch(/PASSED/);
        });
    });
});
