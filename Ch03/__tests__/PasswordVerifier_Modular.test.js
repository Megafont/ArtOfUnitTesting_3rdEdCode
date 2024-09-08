//const PasswordVerifier_Modular = require('../PasswordVerifier');
const { PasswordVerifierModular, SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY } = require('../PasswordVerifier_Modular');

// A helper function for injecting a date dependency into the SUT (system under test).
const injectDate = (verifier, newDay) =>
{
    const reset = verifier.inject(
        {
            moment: function ()
            {
                // We're faking the moment.js module's API here.
                return {
                    day: () => newDay
                };
            }
        });

    return reset;
};

describe('PasswordVerifier_Modular', () =>
{
    describe('with a failing rule', () =>
    {
        it('has an error message based on the rule.reason', () =>
        {
            // Arrange
            const verifier = makeVerifierWithFailedRule('fake reason');
            const reset = injectDate(verifier, MONDAY);

            // Act
            const errors = verifier.verifyPassword('any input');

            // Assert
            expect(errors[0]).toContain('fake reason');
        });

        it('has exactly one error', () =>
        {
            // Arrange
            const verifier = makeVerifierWithFailedRule('fake reason');
            const reset = injectDate(verifier, MONDAY);

            // Act
            const errors = verifier.verifyPassword('any input');

            // Assert
            expect(errors.length).toBe(1);
        });
    });

    describe('with a passing rule', () =>
    {
        it('has no errors', () =>
        {
            // Arrange
            const verifier = makeVerifierWithPassingRule();
            const reset = injectDate(verifier, MONDAY);

            // Act
            const errors = verifier.verifyPassword('any input');

            // Assert
            expect(errors.length).toBe(0);
        });
    });

    describe('with a failing and a passing rule', () =>
    {
        it('has one error', () =>
        {
            // Arrange
            const verifier = makeVerifierWithFailedRule('fake reason');
            const reset = injectDate(verifier, MONDAY);
            verifier.addRule(passingRule);

            // Act
            const errors = verifier.verifyPassword('any input');

            // Assert
            expect(errors.length).toBe(1);
        });

        it('error text belongs to failed rule', () =>
        {
            // Arrange
            const verifier = makeVerifierWithFailedRule('fake reason');
            const reset = injectDate(verifier, MONDAY);
            verifier.addRule(passingRule);

            // Act
            const errors = verifier.verifyPassword('any input');

            // Assert
            expect(errors[0]).toContain('fake reason');
        });
    });

    describe('with no rules', () =>    
    {
        test('verify, with no rules, throws exception', () =>
        {
            // Arrange
            const verifier = makeVerifier();
            injectDate(verifier, MONDAY);

            // Act & Assert
            expect(() => verifier.verifyPassword('any input'))
                .toThrowError(/There are no rules configured./);

            verifier.reset();
        });
    });

    describe('verifier - modular injection', () =>
    {
        test('on weekends, throws exceptions', () =>
        {
            // Arrange
            const verifier = makeVerifierWithPassingRule();
            injectDate(verifier, SATURDAY);

            // Act & Assert
            expect(() => verifier.verifyPassword('any input'))
                .toThrowError(/It's the weekend!/);

            verifier.reset();
        });
    });



    const makeVerifier = () => new PasswordVerifierModular();
    const passingRule = (input) => ({ passed: true, reason: '' });

    const makeVerifierWithPassingRule = () =>
    {
        const verifier = makeVerifier();
        verifier.addRule(passingRule);

        return verifier;
    }

    const makeVerifierWithFailedRule = (reason) =>
    {
        const verifier = makeVerifier();
        const fakeRule = input => ({ passed: false, reason: reason });
        verifier.addRule(fakeRule);

        return verifier;
    }

    /*
    const makeFailingRule = (reason) => 
    {
        return (input) =>
        {
            return { passed: false, reason: reason };
        }
    }

    const makePassingRule = () =>
    {
        return (input) =>
        {
            return { passed: true, reason: '' };
        }
    }
    */
});
