import { Monomial } from "./Monomial.js";
import { variableDict } from "./util/types/types";

export class Polynomial {
    private variables: Monomial<variableDict>[];
    constructor(variables: Monomial<variableDict>[], private autoFormat: boolean = true) {
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
            str += monomial.toString() + "+";
        }
        return str.slice(0, -1);
    }
    public format(): this {
        const counter: Map<string, number> = new Map<string, number>();
        const variables: Map<string, variableDict> = new Map<string, variableDict>();
        for (const monomial of this.variables) {
            const key = new Monomial(1, monomial.getVariables()).toString();
            const value = monomial.getCoefficient();
            if (counter.has(key)) {
                counter.set(key, counter.get(key)! + value);
            } else {
                counter.set(key, value);
                variables.set(key, monomial.getVariables());
            }
        }
        this.variables = [];
        counter.forEach((value, key) => {
            const monomial = new Monomial(value, variables.get(key)!);
            if (monomial.getCoefficient() !== 0) {
                this.variables.push(monomial);
            }
        })
        return this;
    }
    public plus(right: Monomial<variableDict> | Polynomial): Polynomial {
        if (right instanceof Polynomial) {
            return new Polynomial([...this.variables, ...right.getVariables()]).format();
        } else {
            return new Polynomial([...this.variables, right]).format();
        }
    }
}
