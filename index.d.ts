/**
 * @author Audi Nugraha <audinue@gmail.com>
 * @license MIT
 */

export type SumType =
  { [name: string]: any[] }

export type ConstructorMap<T extends SumType> =
  { [P in keyof T]: Constructor<T[P], T> }

export type Constructor<T, U> =
  | T extends [] ? () => U : never
  | T extends [infer A] ? (a: A) => U : never
  | T extends [infer A, infer B] ? (a: A, b: B) => U : never
  | T extends [infer A, infer B, infer C] ? (a: A, b: B, c: C) => U : never
  | T extends [infer A, infer B, infer C, infer D] ? (a: A, b: B, c: C, d: D) => U : never
  | T extends [infer A, infer B, infer C, infer D, infer E] ? (a: A, b: B, c: C, d: D, e: E) => U : never
  | T extends [infer A, infer B, infer C, infer D, infer E, infer F] ? (a: A, b: B, c: C, d: D, e: E, f: F) => U : never
  | T extends [infer A, infer B, infer C, infer D, infer E, infer F, infer G] ? (a: A, b: B, c: C, d: D, e: E, g: G) => U : never

export type ReducerMap<T extends SumType, U> =
  | AllReducerMap<T, U>
  | Partial<AllReducerMap<T, U>> & { _: (value: any) => U }

export type AllReducerMap<T extends SumType, U> =
  { [P in keyof T]: Constructor<T[P], U> }

export function sum<T extends SumType>(): ConstructorMap<T>;

export function match<T extends SumType, U>(map: ReducerMap<T, U>): (value: T) => U;
