import { Monomial } from "../src/Monomial.js";
import { Polynomial } from "../src/Polynomial.js";


const Mono1 = new Monomial(2, { x: 1, y: 2 });
const Mono2 = new Monomial(3, { x: 2, y: 1 });
const Mono3 = new Monomial(4, { x: 1 });
const Poly1 = new Polynomial([Mono1, Mono2]);
const Poly2 = new Polynomial([Mono3]);
const PolyEmpty = new Polynomial([]);
const constantValue = new Monomial(5, {});
const constantValue2 = new Monomial(4, {});


//add
console.log("===== Add =====");
//Mono + Mono
console.log(Mono1.plus(Mono2).toString());
//Mono + Poly
console.log(Mono1.plus(Poly1).toString());
//Poly + Mono
console.log(Poly1.plus(Mono1).toString());
//Poly + Poly
console.log(Poly1.plus(Poly2).toString());
//Poly + constant
console.log(Poly1.plus(constantValue).toString());
//Mono + constant
console.log(Mono1.plus(constantValue).toString());
//constant + Mono
console.log(constantValue.plus(Mono1).toString());
//constant + Poly
console.log(constantValue.plus(Poly1).toString());
//constant + constant
console.log(constantValue.plus(constantValue2).toString());
//Poly + 0
console.log(Poly1.plus(PolyEmpty).toString());
//Mono + 0
console.log(Mono1.plus(PolyEmpty).toString());
//0 + Poly
console.log(PolyEmpty.plus(Poly1).toString());
//0 + Mono
console.log(PolyEmpty.plus(Mono1).toString());
//0 + 0
console.log(PolyEmpty.plus(PolyEmpty).toString());
//0 + constant
console.log(PolyEmpty.plus(constantValue).toString());
//constant + 0
console.log(constantValue.plus(PolyEmpty).toString());


//minus
console.log("===== Minus =====");
//Mono - Mono
console.log(Mono1.minus(Mono2).toString());
//Mono - Poly
console.log(Mono1.minus(Poly1).toString());
//Poly - Mono
console.log(Poly1.minus(Mono1).toString());
//Poly - Poly
console.log(Poly1.minus(Poly2).toString());
//Poly - constant
console.log(Poly1.minus(constantValue).toString());
//Mono - constant
console.log(Mono1.minus(constantValue).toString());
//constant - Mono
console.log(constantValue.minus(Mono1).toString());
//constant - Poly
console.log(constantValue.minus(Poly1).toString());
//constant - constant
console.log(constantValue.minus(constantValue2).toString());
//Poly - 0
console.log(Poly1.minus(PolyEmpty).toString());
//Mono - 0
console.log(Mono1.minus(PolyEmpty).toString());
//0 - Poly
console.log(PolyEmpty.minus(Poly1).toString());
//0 - Mono
console.log(PolyEmpty.minus(Mono1).toString());
//0 - 0
console.log(PolyEmpty.minus(PolyEmpty).toString());
//0 - constant
console.log(PolyEmpty.minus(constantValue).toString());
//constant - 0
console.log(constantValue.minus(PolyEmpty).toString());

//multiply
console.log("===== Multiply =====");
//Mono * Mono
console.log(Mono1.multiply(Mono2).toString());
//Mono * Poly
console.log(Mono1.multiply(Poly1).toString());
//Poly * Mono
console.log(Poly1.multiply(Mono1).toString());
//Poly * Poly
console.log(Poly1.multiply(Poly2).toString());
//Poly * constant
console.log(Poly1.multiply(constantValue).toString());
//Mono * constant
console.log(Mono1.multiply(constantValue).toString());
//constant * Mono
console.log(constantValue.multiply(Mono1).toString());
//constant * Poly
console.log(constantValue.multiply(Poly1).toString());
//constant * constant
console.log(constantValue.multiply(constantValue2).toString());
//Poly * 0
console.log(Poly1.multiply(PolyEmpty).toString());
//Mono * 0
console.log(Mono1.multiply(PolyEmpty).toString());
//0 * Poly
console.log(PolyEmpty.multiply(Poly1).toString());
//0 * Mono
console.log(PolyEmpty.multiply(Mono1).toString());
//0 * 0
console.log(PolyEmpty.multiply(PolyEmpty).toString());
//0 * constant
console.log(PolyEmpty.multiply(constantValue).toString());
//constant * 0
console.log(constantValue.multiply(PolyEmpty).toString());
