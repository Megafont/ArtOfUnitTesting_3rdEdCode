
const { makeVerifier } = require("../2 - Function Faking/PasswordVerifier");
const { stringMatching } = expect;

describe("Higher order factory functions", () =>
{
    describe("Password Verifier", () =>
    {
        test('Given logger and passing scenario', () =>
        {
            const mockLog = { info: jest.fn() };
            const verify = makeVerifier([], mockLog);

            verify("any input");

            // Assert that the mock was called correctly
            expect(mockLog.info).toHaveBeenCalledWith(stringMatching(/PASSED/));
        });

    });
});
