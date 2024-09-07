const { oneUpperCaseRule } = require('../PasswordRules');

describe('one uppercase rule', function ()
{
    test.each(['Abc', 'aBc', 'abC'])
        ('given %s, %s ', (input) =>
        {
            // Arrange & Act
            const result = oneUpperCaseRule(input);

            // Assert
            expect(result.passed).toEqual(true);
        });

});

describe('one uppercase rule finds no uppercase', function ()
{
    test.each(['abc', 'def', 'bde'])
        ('given %s, %s ', (input) =>
        {
            // Arrange & Act
            const result = oneUpperCaseRule(input);

            // Assert
            expect(result.passed).toEqual(false);
        });

});