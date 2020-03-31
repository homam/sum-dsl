
import { sum, match } from '../index'

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

type ExpressionJSON = { type: 'Number', value: number} 
  | { type: 'Add', args: [ExpressionJSON, ExpressionJSON] }
  | { type: 'Multiply', args: [ExpressionJSON, ExpressionJSON] }


const toJSON: (value: Expression) => ExpressionJSON =
  match<Expression, ExpressionJSON>({
    Multiply: (left, right) => (
      { type: 'Multiply', args: [toJSON(left), toJSON(right)]}
    ),
    Add: (left, right) => (
      { type: 'Add', args: [toJSON(left), toJSON(right)]}
    ),
    Number: (value) => (
      { type: 'Number', value: value }
    )
  })

function fromJSON (value: ExpressionJSON) : Expression  {
  switch (value.type) {
    case 'Number':
      return Number(value.value)
    case 'Add':
      return Add(fromJSON(value.args[0]), fromJSON(value.args[1]))
    case 'Multiply':
      return Multiply(fromJSON(value.args[0]), fromJSON(value.args[1]))
    default:
      throw "Should not be here";
  }
}

// 2 * (3 + 4)
const expression = Multiply(Number(2), Add(Number(3), Number(4)))

console.log(expression)           // Multiply [ Value [ 2 ], Add [ Value [ 3 ], Value [ 4 ] ] ]
const json = JSON.stringify(toJSON(expression), null, 2)
console.log(json)
const expression1 = fromJSON(JSON.parse(json))
console.log(evaluate(expression1)) // 14
console.log(isNumber(expression)) // false
