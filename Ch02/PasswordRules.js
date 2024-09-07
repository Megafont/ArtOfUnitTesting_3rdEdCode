
// const oneUpperCaseRule = (input) =>
function oneUpperCaseRule(input)
{
    return {
        passed: (String(input).toLowerCase() !== String(input)),
        reason: 'at least one upper case letter needed'
    };
};

module.exports =
{
    oneUpperCaseRule
};
