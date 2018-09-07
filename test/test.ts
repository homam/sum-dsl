
import { sum, match } from 'sum-dsl'

type Expression = {
  Multiply: [Expression, Expression]
  Add: [Expression, Expression]
  Number: [number]
}

const { Multiply, Add, Number } = sum<Expression>()

const evaluate: (value: Expression) => number =
  match<Expression, number>({
    Multiply: (left, right) => evaluate(left) * evaluate(right),
    Add: (left, right) => evaluate(left) + evaluate(right),
    Number: (value) => value
  })

const isNumber = match<Expression, boolean>({
  Number: () => true,
  _: () => false
})

// 2 * (3 + 4)
const expression = Multiply(Number(2), Add(Number(3), Number(4)))

console.log(expression)           // Multiply [ Value [ 2 ], Add [ Value [ 3 ], Value [ 4 ] ] ]
console.log(evaluate(expression)) // 14
console.log(isNumber(expression)) // false
