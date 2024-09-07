const PasswordVerifier = require('../PasswordVerifier');
//const { PasswordVerifier } = require('../PasswordVerifier');

describe('PasswordVerifier', () =>
{
    describe('with a failing rule', () =>
    {
        it('has an error message based on the rule.reason', () =>
        {
            // Arrange
            const verifier = makeVerifierWithFailedRule('fake reason');

            // Act
            const errors = verifier.verify('any input');

            // Assert
            expect(errors[0]).toContain('fake reason');
        });

        it('has exactly one error', () =>
        {
            // Arrange
            const verifier = makeVerifierWithFailedRule('fake reason');

            // Act
            const errors = verifier.verify('any input');

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

            // Act
            const errors = verifier.verify('any input');

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
            verifier.addRule(passingRule);

            // Act
            const errors = verifier.verify('any input');

            // Assert
            expect(errors.length).toBe(1);
        });

        it('error text belongs to failed rule', () =>
        {
            // Arrange
            const verifier = makeVerifierWithFailedRule('fake reason');
            verifier.addRule(passingRule);

            // Act
            const errors = verifier.verify('any input');

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

            // Act & Assert
            expect(() => verifier.verify('any input'))
                .toThrowError(/There are no rules configured./);
        });
    });



    const makeVerifier = () => new PasswordVerifier();
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
