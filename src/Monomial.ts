import { Polynomial } from "./Polynomial.js";
import { variableDict } from "./util/types/types";

export class Monomial<T extends variableDict> {
    private coefficient: number;
    private variables: T;
    constructor(coefficient: number, variables: T) {
        if (coefficient === 0) {
            this.coefficient = 0;
            this.variables = {} as T;
        } else {
            this.coefficient = coefficient;
            const variableValues = Object.values(variables).sort();
            this.variables = variableValues[0] === 0 && variableValues.reverse()[0] === 0 ? {} as T : variables;
        }
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
    public plus(right: Monomial<variableDict> | Polynomial): Polynomial {
        if (right instanceof Polynomial) {
            return right.plus(this);
        } else {
            return new Polynomial([this, right]).format();
        }
    }
    public minus(right: Monomial<variableDict> | Polynomial): Polynomial {
        if (right instanceof Polynomial) {
            return this.plus(right.multiply(-1));
        } else if (typeof right === "number") {
            return new Polynomial([this, new Monomial(-right, {})]).format();
        } else {
            return new Polynomial([this, new Monomial(-right.getCoefficient(), right.getVariables())]).format();
        }
    }
    public multiply(right: Monomial<variableDict> | Polynomial | number): Polynomial {
        if (right instanceof Polynomial) {
            let newPolynomial = new Polynomial([]);
            for (const monomial of right.getVariables()) {
                newPolynomial = newPolynomial.plus(this.multiply(monomial));
            }
            return newPolynomial.format();
        } else if (typeof right === "number") {
            return new Polynomial([new Monomial(this.coefficient * right, this.variables)]);
        } else {
            const newVariables: variableDict = { ...this.variables };
            for (const variable in right.getVariables()) {
                newVariables[variable] = (newVariables[variable] || 0) + right.getOrder(variable);
            }
            return new Polynomial([new Monomial(this.coefficient * right.getCoefficient(), newVariables)]);
        }
    }
}
