
originalDependencies =
{
    moment: require('moment')
};

class PasswordVerifier_ConstructorInjection
{

    constructor(rules, dayofWeekFunction)
    {
        this.rules = rules;
        this.dayOfWeekFn = dayofWeekFunction;
        this.dependencies = { ...originalDependencies };
    }

    addRule(rule)
    {
        this.rules.push(rule);
    }

    inject(fakes)
    {
        Object.assign(this.dependencies, fakes);
    }

    reset()
    {
        this.dependencies = { ...originalDependencies };
    }

    verifyPassword(input)
    {
        const dayOfWeek = this.dependencies.moment().day();
        if ([SATURDAY, SUNDAY].includes(this.dayOfWeekFn()))
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
    PasswordVerifier_ConstructorInjection,
    SUNDAY,
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY
}
