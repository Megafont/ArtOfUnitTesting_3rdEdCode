import { Substitute } from "@fluffy-spoon/substitute";
import { PasswordVerifier3 } from "../5 - Partial Faking/PasswordVerifier";
import { IComplicatedLogger } from "../5 - Partial Faking/Interfaces/IComplicatedLogger";
import { MaintenanceWindow } from "../5 - Partial Faking/MaintenanceWindow";

const makeVerifierWithNoRules = (log, maint) =>
{
    return new PasswordVerifier3([], log, maint);
}

describe("Working with Substitute part 2", () =>
{
    test("Verify, during maintenance windows, calls logger", () =>
    {
        const stubMaintWindow = Substitute.for<MaintenanceWindow>();
        stubMaintWindow.isUnderMaintenance().returns(true);
        const mockLog = Substitute.for<IComplicatedLogger>();
        const verifier = makeVerifierWithNoRules(mockLog, stubMaintWindow);

        verifier.verify("anything");

        mockLog.received().info("Under Maintenance", "verify");
    });

    test("Verify, outside maintenance windows, calls logger", () =>
    {
        const stubMaintWindow = Substitute.for<MaintenanceWindow>();
        stubMaintWindow.isUnderMaintenance().returns(false);
        const mockLog = Substitute.for<IComplicatedLogger>();
        const verifier = makeVerifierWithNoRules(mockLog, stubMaintWindow);

        verifier.verify("anything");

        mockLog.received().info("PASSED", "verify");
    });
});
