
class PasswordVerifier_ConstructorObjectInjection
{

    constructor(rules, timeProvider)
    {
        this.rules = rules;
        this.timeProvider = timeProvider;
    }

    addRule(rule)
    {
        this.rules.push(rule);
    }

    verifyPassword(input)
    {
        if ([SATURDAY, SUNDAY].includes(this.timeProvider.getDay()))
            throw new Error("It's the weekend!");

        if (this.rules.length === 0)
            throw new Error("There are no rules configured.");

        const errors = [];
        this.rules.forEach(rule =>
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

const SUNDAY = 0, MONDAY = 1, TUESDAY = 2, WEDNESDAY = 3, THURSDAY = 4, FRIDAY = 5, SATURDAY = 6;


module.exports =
{
    PasswordVerifier_ConstructorObjectInjection,
    SUNDAY,
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY
}
