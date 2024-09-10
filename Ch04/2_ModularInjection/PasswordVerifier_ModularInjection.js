const originalDependencies =
{
    log: require('./ComplicatedLogger'),
}

let dependencies = { ...originalDependencies };

const resetDependencies = () =>
{
    dependencies = { ...originalDependencies };
}

const injectDependencies = (fakes) =>
{
    Object.assign(dependencies, fakes);
}

const log = (text) =>
{
    if (getLogLevel() === "info")
        info(text);
    if (getLogLevel() === "debug")
        debug(text);
};


const verifyPassword = (input, rules) =>
{
    const failed = rules
        .map((rule) => rule(input))
        .filter((result) => result === false);

    if (failed.length === 0)
    {
        dependencies.log.info("PASSED");
        return true;
    }

    dependencies.log.debug("FAILED");
    return false;
};


module.exports =
{
    verifyPassword,
    injectDependencies,
    resetDependencies,
};
