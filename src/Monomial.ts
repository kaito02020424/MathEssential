import { Polynomial } from "./Polynomial.js";
import { variableDict } from "./util/types/types";

export class Monomial<T extends variableDict> {
    private coefficient: number;
    private variables: T;
    constructor(coefficient: number, variables: T) {
        this.coefficient = coefficient;
        this.variables = variables;
    }
    public getOrder(variable: keyof T): number {
        return this.variables[variable] || 0;
    }
    public getVariables(): T {
        return this.variables;
    }
    public getCoefficient(): number {
        return this.coefficient;
    }
    public toString(): string {
        let str = this.coefficient.toString();
        for (const variable in this.variables) {
            if (this.variables[variable] !== 0) {
                if (this.variables[variable] === 0) continue;
                if (variable.length == 1) str += `*${variable}`;
                else str += `*(${variable})`;
                if (this.variables[variable] !== 1) {
                    str += `^${this.variables[variable]}`;
                }
            }
        }
        return str;
    }
    public plus(right: Monomial<T> | Polynomial): Polynomial {
        if (right instanceof Polynomial) {
            return right.plus(this);
        } else {
            return new Polynomial([this, right]).format();
        }
    }
}


// Example usage
const monomial1 = new Monomial(2, { x: 1, y: 2 });
const monomial2 = new Monomial(3, { x: 2, y: 1 });
const monomial11 = new Monomial(10, { x: 1, y: 2 });
const added = monomial1.plus(monomial2).plus(monomial11);
console.log(added.toString()); // Output: 2*x^1*y^2 + 3*x^2*y^1
