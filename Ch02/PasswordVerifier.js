//class PasswordVerifier
module.exports = class PasswordVerifier
{
    constructor()
    {
        this.rules = [];
    }

    addRule(rule)
    {
        this.rules.push(rule);
    }

    verify(input)
    {
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

/*
module.exports =
{
    PasswordVerifier
}
*/