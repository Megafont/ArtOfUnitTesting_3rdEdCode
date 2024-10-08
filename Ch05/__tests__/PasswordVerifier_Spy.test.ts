import { PasswordVerifier } from "../4 - Partial Faking/PasswordVerifier";
import { RealLogger } from "../4 - Partial Faking/RealLogger";


describe('password verifier with interfaces', () =>
{
    test('verify, with logger, calls logger', () =>
    {
        const testableLog: RealLogger = new RealLogger();
        testableLog.info = jest.fn();

        const verifier = new PasswordVerifier([], testableLog);
        verifier.verify('any input');

        expect(testableLog.info)
            .toHaveBeenCalledWith(expect.stringMatching(/PASS/));
    });

    test('another variation with jest.spy', () =>
    {
        const testableLog = new RealLogger();
        const infoFn = jest.spyOn(testableLog, 'info');

        const verifier = new PasswordVerifier([], testableLog);
        verifier.verify('any input');

        expect(infoFn)
            .toHaveBeenCalledWith(expect.stringMatching(/PASS/));
    });
});
