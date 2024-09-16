// Fake the modules
jest.mock("../1 - Modular Faking/ComplicatedLogger");
jest.mock("../1 - Modular Faking/ConfigurationService");

const { stringMatching } = expect;
const { verifyPassword } = require("../1 - Modular Faking/PasswordVerifier");

// Get the fake instances of the modules
const mockLoggerModule = require("../1 - Modular Faking/ComplicatedLogger");
const stubConfigModule = require("../1 - Modular Faking/ConfigurationService");

describe("Password Verifier", () =>
{
    // Tell jest to reset any fake module behavior between tests
    afterEach(jest.resetAllMocks);

    test('With info log level and no rules, it calls the logger with PASSED', () =>
    {
        // Configure the stub to return a fake "info" value;
        stubConfigModule.getLogLevel.mockReturnValue("info");

        verifyPassword("anything", []);

        // Assert that the mock was called correctly
        expect(mockLoggerModule.info).toHaveBeenCalledWith(stringMatching(/PASSED/));
    });

    test('with debug Log level and no rules, it calls the logger with PASSED', () =>
    {
        // Configure the stub to return a fake "info" value;
        stubConfigModule.getLogLevel.mockReturnValue("debug");

        verifyPassword("anything", []);

        // Assert that the mock was called correctly
        expect(mockLoggerModule.debug).toHaveBeenCalledWith(stringMatching(/PASSED/));
    });
});
