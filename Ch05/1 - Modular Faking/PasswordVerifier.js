const { info, debug } = require("./ComplicatedLogger");
const { getLogLevel } = require("./ConfigurationService");

const log = (text) =>
{
    if (getLogLevel() === "info")
    {
        info(text);
    }
    if (getLogLevel() === "debug")
    {
        debug(text);
    }
};


const verifyPassword = (input, rules) =>
{
    const failed = rules
        .map((rule) => rule(input))
        .filter((result) => result === false);

    if (failed.length === 0)
    {
        log("PASSED");
        return true;
    }

    log("FAILED");
    return false;
};

module.exports = {
    verifyPassword,
};
