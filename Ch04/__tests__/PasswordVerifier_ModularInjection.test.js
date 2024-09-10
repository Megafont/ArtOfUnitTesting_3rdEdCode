const {
    verifyPassword,
    injectDependencies,
    resetDependencies,
} = require("../2_ModularInjection/PasswordVerifier_ModularInjection");

describe("password verifier", () =>
{
    afterEach(resetDependencies);

    describe("given logger and passing scenario", () =>
    {
        it("calls the logger with PASS", () =>
        {
            let logged = "";
            const mockLog = { info: (text) => (logged = text) };
            injectDependencies({ log: mockLog });

            verifyPassword("anything", []);

            expect(logged).toMatch(/PASSED/);
        });
    });
});
