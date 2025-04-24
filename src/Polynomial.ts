import { Monomial } from "./Monomial.js";
import { variableDict } from "./util/types/types";

export class Polynomial {
    private variables: Monomial<variableDict>[];
    constructor(variables: Monomial<variableDict>[]) {
        this.variables = variables;
    }
    public getCoefficient(variable: variableDict): number {
        for (const monomial of this.variables) {
            const monomialVariables = monomial.getVariables();
            if (Object.keys(monomialVariables).length !== Object.keys(variable).length) break;
            for (const key in variable) {
                if (monomialVariables[key] !== variable[key]) {
                    break;
                }
            }
            return monomial.getCoefficient();
        }
        return 0;
    }
    public getVariables(): Monomial<variableDict>[] {
        return this.variables;
    }
    public toString(): string {
        let str = "";
        for (const monomial of this.variables) {
            const strTmp = monomial.toString();
            if (str.endsWith("+") && strTmp.startsWith("-")) {
                str = str.slice(0, -1);
                str += `${strTmp}+`;
            } else str += strTmp + "+";
        }
        return str.slice(0, -1).length === 0 ? "0" : str.slice(0, -1);
    }
    public format(): this {
        const counter: Map<string, number> = new Map<string, number>();
        for (const monomial of this.variables) {
            const key = JSON.stringify(monomial.getVariables());
            const value = monomial.getCoefficient();
            if (counter.has(key)) {
                counter.set(key, counter.get(key)! + value);
            } else {
                counter.set(key, value);
            }
        }
        this.variables = [];
        counter.forEach((value, key) => {
            const monomial = new Monomial(value, JSON.parse(key));
            if (monomial.getCoefficient() !== 0) {
                this.variables.push(monomial);
            }
        })
        this.variables.sort((a, b) => {
            const aVariables = a.getVariables();
            const bVariables = b.getVariables();
            const aKeys = Object.keys(aVariables);
            const bKeys = Object.keys(bVariables);
            return bKeys.length - aKeys.length;
        });
        return this;
    }
    public plus(right: Monomial<variableDict> | Polynomial | number): Polynomial {
        if (right instanceof Polynomial) {
            return new Polynomial([...this.variables, ...right.getVariables()]).format();
        } else if (right instanceof Monomial) {
            return new Polynomial([...this.variables, right]).format();
        } else {
            return new Polynomial([...this.variables, new Monomial(right, {})]).format();
        }
    }
    public minus(right: Monomial<variableDict> | Polynomial | number): Polynomial {
        if (typeof right === "number") {
            return this.plus(new Monomial(-right, {})).format();
        } else {
            return this.plus(right.multiply(-1)).format();
        }
    }
    public multiply(right: Monomial<variableDict> | Polynomial | number): Polynomial {
        if (right instanceof Polynomial) {
            let newPolynomial = new Polynomial([]);
            for (const monomial of this.variables) {
                newPolynomial = newPolynomial.plus(monomial.multiply(right));
            }
            return newPolynomial.format();
        } else if (typeof right === "number") {
            let newPolynomial = new Polynomial([]);
            for (const monomial of this.variables) {
                newPolynomial = newPolynomial.plus(monomial.multiply(right));
            }
            return newPolynomial.format();
        } else {
            let newPolynomial = new Polynomial([]);
            for (const monomial of this.variables) {
                newPolynomial = newPolynomial.plus(monomial.multiply(right));
            }
            return newPolynomial.format();
        }
    }
}
