import { IComplicatedLogger } from "./Interfaces/IComplicatedLogger";
import { MaintenanceWindow } from "./Interfaces/IMaintenanceWindow";

export class PasswordVerifier3
{
    private _rules: any[];
    private _logger: IComplicatedLogger;
    private _maintenanceWindow: MaintenanceWindow;

    constructor(rules: any[], logger: IComplicatedLogger, maintenanceWindow: MaintenanceWindow)
    {
        this._rules = rules;
        this._logger = logger;
        this._maintenanceWindow = maintenanceWindow;
    }

    verify(input: string): boolean
    {
        if (this._maintenanceWindow.isUnderMaintenance())
        {
            this._logger.info('Under Maintenance');
            return false
        }
        const failed = this._rules
            .map(rule => rule(input))
            .filter(result => result === false);

        if (failed.length === 0)
        {
            this._logger.info('PASSED');
            return true;
        }
        this._logger.info('FAIL');
        return false;
    }
}

