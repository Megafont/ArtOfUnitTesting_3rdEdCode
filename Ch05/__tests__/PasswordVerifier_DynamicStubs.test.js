test('Fake same return values', () =>
{
    const stubFunc = jest.fn().mockReturnValue("abc");

    // value remains the same
    expect(stubFunc()).toBe("abc");
    expect(stubFunc()).toBe("abc");
    expect(stubFunc()).toBe("abc");
});

test("Fake multiple return values", () =>
{
    const stubFunc = jest.fn()
        .mockReturnValueOnce("a")
        .mockReturnValueOnce("b")
        .mockReturnValueOnce("c");

    // value changes
    expect(stubFunc()).toBe("a");
    expect(stubFunc()).toBe("b");
    expect(stubFunc()).toBe("c");
    expect(stubFunc()).toBe(undefined);
});
