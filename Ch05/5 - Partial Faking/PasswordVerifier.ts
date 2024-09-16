import { IComplicatedLogger } from "./Interfaces/IComplicatedLogger";
import { MaintenanceWindow } from "./MaintenanceWindow";

export class PasswordVerifier3
{
    private _Rules: any[];
    private _Logger: IComplicatedLogger;
    private _MaintenanceWindow: MaintenanceWindow;

    constructor(rules: any[], logger: IComplicatedLogger, maintenanceWindow: MaintenanceWindow)
    {
        this._Rules = rules;
        this._Logger = logger;
        this._MaintenanceWindow = maintenanceWindow;
    }

    verify(input: string): boolean
    {
        if (this._MaintenanceWindow.isUnderMaintenance())
        {
            this._Logger.info("Under Maintenance", "verify");
            return false;
        }

        const failed = this._Rules
            .map((rule) => rule(input))
            .filter((result) => result === false);

        if (failed.length === 0)
        {
            this._Logger.info("PASSED", "verify");
            return true;
        }
        this._Logger.info("FAILED", "verify");
        return false;
    }
}