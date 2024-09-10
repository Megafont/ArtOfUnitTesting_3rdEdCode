const { PasswordVerifier_ConstructorInjection, SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY } = require('../PasswordVerifier_ConstructorInjection');

describe('PasswordVerifier_ConstructorInjection', () =>
{
    describe('with a failing rule', () =>
    {
        it('has an error message based on the rule.reason', () =>
        {
            // Arrange
            const verifier = makeVerifierWithFailedRule('fake reason', alwaysMonday);

            // Act
            const errors = verifier.verifyPassword('any input');

            // Assert
            expect(errors[0]).toContain('fake reason');
        });


        it('has exactly one error', () =>
        {
            // Arrange
            const verifier = makeVerifierWithFailedRule('fake reason', alwaysMonday);

            // Act
            const errors = verifier.verifyPassword('any input');

            // Assert
            expect(errors.length).toBe(1);
        });


        describe('with a failing and a passing rule', () =>
        {
            it('has one error', () =>
            {
                // Arrange
                const verifier = makeVerifierWithFailedRule('fale reason', alwaysMonday);
                verifier.addRule(passingRule);

                // Act
                const errors = verifier.verifyPassword('any input');

                // Assert
                expect(errors.length).toBe(1);
            });

            it('error text belongs to failed rule', () =>
            {
                // Arrange
                const verifier = makeVerifierWithFailedRule('fake reason', alwaysMonday);
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
                const verifier = makeVerifier([], alwaysMonday);

                // Act & Assert
                expect(() => verifier.verifyPassword('any input'))
                    .toThrowError(/There are no rules configured./);

                verifier.reset();
            });
        });

    });

    describe('with a passing rule', () =>
    {

        it('has no errors', () =>
        {
            // Arrange
            const verifier = makeVerifierWithPassingRule(alwaysMonday);

            // Act
            const errors = verifier.verifyPassword('any input');

            // Assert
            expect(errors.length).toBe(0);
        });

        describe('verifier - constructor injection', () =>
        {
            test('on weekends, throws exceptions', () =>
            {
                // Arrange
                const verifier = makeVerifierWithPassingRule(alwaysSunday);

                // Act & Assert
                expect(() => verifier.verifyPassword('any input'))
                    .toThrowError(/It's the weekend!/);

                verifier.reset();
            });
        });

    });


    const makeVerifier = (rules, dayFn) =>
    {
        return new PasswordVerifier_ConstructorInjection(rules, dayFn);
    }

    const passingRule = (input) => ({ passed: true, reason: '' });

    const makeVerifierWithPassingRule = (dayFn) =>
    {
        const verifier = makeVerifier([passingRule], dayFn);

        return verifier;
    }

    const makeVerifierWithFailedRule = (reason, dayFn) =>
    {
        const fakeRule = input => ({ passed: false, reason: reason });
        const verifier = makeVerifier([fakeRule], dayFn);

        return verifier;
    }

    const alwaysSunday = () => SUNDAY;
    const alwaysMonday = () => MONDAY;

});
