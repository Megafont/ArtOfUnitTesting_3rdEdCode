const { verifyPassword2 } = require("../1_FunctionParamInjection/PasswordVerifier_FunctionParamInjection");

describe("password verifier", () =>
{
    describe("given logger, and passing scenario", () =>
    {
        it("calls the logger with PASSED", () =>
        {
            let written = "";
            const mockLog = { info: (text) => (written = text) };

            verifyPassword2("anything", [], mockLog);

            expect(written).toMatch(/PASSED/);
        });
    });
});
