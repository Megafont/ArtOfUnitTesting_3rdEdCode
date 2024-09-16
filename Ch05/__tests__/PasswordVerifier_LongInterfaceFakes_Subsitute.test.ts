import { IComplicatedLogger } from "../3 - Long Interface Faking/Interfaces/IComplicatedLogger";
import { PasswordVerifier2 } from "../3 - Long Interface Faking/PasswordVerifier2";

// Note, for this line to work you must run "npm install @fluffy-spoon/substitute" in the VS Code terminal.
// This is the typescript version of Substitute. The regular javascript version is "npm install substitute".
import { Substitute, Arg } from "@fluffy-spoon/substitute";


describe("working with long interfaces", () =>
{
    describe("password verifier", () =>
    {
        test("verify, with logger and passing, calls logger with PASS", () =>
        {
            const mockLog = Substitute.for<IComplicatedLogger>();

            const verifier = new PasswordVerifier2([], mockLog);
            verifier.verify("anything");

            mockLog.received().info(
                Arg.is((x) => x.includes("PASSED")),
                "verify"
            );
        });
    });
});
