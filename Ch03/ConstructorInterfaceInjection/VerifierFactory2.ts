import { PasswordVerifier_ConstructorInterfaceInjection } from "./PasswordVerifier_ConstructorInterfaceInjection";
import { RealTimeProvider2 } from "./TimeProvider2";

export const makeVerifier = (rules: any[]): PasswordVerifier_ConstructorInterfaceInjection =>
{
    return new PasswordVerifier_ConstructorInterfaceInjection(rules, new RealTimeProvider2());
};
