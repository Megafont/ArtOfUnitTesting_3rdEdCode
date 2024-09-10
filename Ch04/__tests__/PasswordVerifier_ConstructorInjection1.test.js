const { PasswordVerifier } = require("../4_ConstructorInjection/PasswordVerifier_ConstructorInjection");

describe("with FakeLogger class - constructor injection", () =>
{
    describe("password verifier", () =>
    {
        test("given logger and passing scenario, calls logger with PASSED", () =>
        {
            let logged = "";
            const mockLog = { info: (text) => (logged = text) };
            const verifier = new PasswordVerifier([], mockLog);
            verifier.verify("any input");

            expect(logged).toMatch(/PASSED/);
        });
    });
});
