const makeVerifier = (rules, logger) =>
{
    return (input) =>
    {
        const failed = rules
            .map(rule => rule(input))
            .filter(result => result === false);

        console.log(failed);
        if (failed.length == 0)
        {
            logger.info('PASSED');
            return true;
        }

        logger.debug('FAILED');
        return false;
    };
};

module.exports =
{
    makeVerifier
}