import { PasswordVerifier } from "../5_ConstructorInterfaceInjection/PasswordVerifier";
import { ILogger } from "../5_ConstructorInterfaceInjection/Interfaces/ILogger";

class FakeLogger implements ILogger
{
    written: string;
    info(text: string)
    {
        this.written = text;
    }
}
describe("faking strongly typed interfaces", () =>
{
    describe("password verifier", () =>
    {
        test("verify, with logger, calls logger", () =>
        {
            const mockLog = new FakeLogger();
            const verifier = new PasswordVerifier([], mockLog);

            verifier.verify("anything");

            expect(mockLog.written).toMatch(/PASS/);
        });
    });
    describe("Explicit Function Mocks", () =>
    {
        test("verify, with logger, calls logger", () =>
        {
            const mockLog = new FakeLogger();
            let logged = "";
            mockLog.info = (text) => (logged = text);
            const verifier = new PasswordVerifier([], mockLog);

            verifier.verify("anything");

            expect(logged).toMatch(/PASS/);
        });
    });
});
