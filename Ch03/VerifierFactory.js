const { RealTimeProvider } = require('./time-provider');
const { PasswordVerifier } = require('./PasswordVerifier_ConstructorObjectInjection');

const passwordVerifierFactory = (rules) =>
{
    return new PasswordVerifier(new RealTimeProvider());
};

module.exports = {
    passwordVerifierFactory
};
