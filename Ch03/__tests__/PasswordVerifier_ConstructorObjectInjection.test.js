//import { PasswordVerifier_ConstructorObjectInjection, SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY } from '../PasswordVerifier_ConstructorObjectInjection.js';

const { PasswordVerifier_ConstructorObjectInjection, SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY } = require('../PasswordVerifier_ConstructorObjectInjection.js');

describe('PasswordVerifier_ConstructorObjectInjection', () =>
{
    describe('with a failing rule', () =>
    {
        it('has an error message based on the rule.reason', () =>
        {
            // Arrange
            const verifier = makeVerifierWithFailedRule('fake reason', MONDAY);

            // Act
            const errors = verifier.verifyPassword('any input');

            // Assert
            expect(errors[0]).toContain('fake reason');
        });


        it('has exactly one error', () =>
        {
            // Arrange
            const verifier = makeVerifierWithFailedRule('fake reason', MONDAY);

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
                const verifier = makeVerifierWithFailedRule('fale reason', MONDAY);
                verifier.addRule(passingRule);

                // Act
                const errors = verifier.verifyPassword('any input');

                // Assert
                expect(errors.length).toBe(1);
            });

            it('error text belongs to failed rule', () =>
            {
                // Arrange
                const verifier = makeVerifierWithFailedRule('fake reason', MONDAY);
                verifier.addRule(passingRule);

                // Act
                const errors = verifier.verifyPassword('any input');

                // Assert
                expect(errors[0]).toContain('fake reason');
            });
        });

    });

    describe('with no rules', () =>    
    {
        test('verify, with no rules, throws exception', () =>
        {
            // Arrange
            const verifier = makeVerifier([], new FakeTimeProvider(TUESDAY));

            // Act & Assert
            expect(() => verifier.verifyPassword('any input'))
                .toThrowError(/There are no rules configured./);

        });
    });

    describe('with a passing rule', () =>
    {

        it('has no errors', () =>
        {
            // Arrange
            const verifier = makeVerifierWithPassingRule(MONDAY);

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
                const verifier = makeVerifierWithPassingRule(SUNDAY);

                // Act & Assert
                expect(() => verifier.verifyPassword('any input'))
                    .toThrowError(/It's the weekend!/);

            });
        });

    });

});


function FakeTimeProvider(fakeDay)
{
    this.getDay = function ()
    {
        return fakeDay;
    };
}

const makeVerifier = (rules, timeProvider) =>
{
    return new PasswordVerifier_ConstructorObjectInjection(rules, timeProvider);
}

const passingRule = (input) => ({ passed: true, reason: '' });

const makeVerifierWithPassingRule = (day) =>
{
    const verifier = makeVerifier([passingRule], new FakeTimeProvider(day));

    return verifier;
}

const makeVerifierWithFailedRule = (reason, day) =>
{
    const fakeRule = input => ({ passed: false, reason: reason });
    const verifier = makeVerifier([fakeRule], new FakeTimeProvider(day));

    return verifier;
}

