import { TimeProviderInterface } from "./TimeProviderInterface";

export class PasswordVerifier_ConstructorInterfaceInjection
{
    private _rules: any[];
    private _timeProvider: TimeProviderInterface;

    constructor(rules: any[], timeProvider: TimeProviderInterface)
    {
        this._rules = rules;
        this._timeProvider = timeProvider;
    }

    addRule(rule)
    {
        this._rules.push(rule);
    }

    verifyPassword(input)
    {
        if ([SATURDAY, SUNDAY].includes(this._timeProvider.getDay()))
            throw new Error("It's the weekend!");

        if (this._rules.length === 0)
            throw new Error("There are no rules configured.");

        const errors: any[] = [];
        this._rules.forEach(rule =>
        {
            const result = rule(input);
            if (!result.passed)
            {
                errors.push(`error ${result.reason}`);
            }
        });

        return errors;
    }

}

export const SUNDAY = 0, MONDAY = 1, TUESDAY = 2, WEDNESDAY = 3, THURSDAY = 4, FRIDAY = 5, SATURDAY = 6;


