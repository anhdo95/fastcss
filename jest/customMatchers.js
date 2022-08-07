import { diff } from 'jest-diff'
import prettier from 'prettier'

function format(css) {
  return prettier.format(css, {
    parser: 'css',
    printWidth: 100,
  })
}

expect.extend({
  toMatchCss(received, expected) {
    const options = {
      comment: 'stripped(received) === stripped(argument)',
      isNot: this.isNot,
      promise: this.promise,
    }

    const formattedReceived = format(received)
    const formattedExpected = format(expected)
    const pass = formattedReceived === formattedExpected

    const message = pass
      ? () =>
          // eslint-disable-next-line prefer-template
          this.utils.matcherHint('toMatchCss', undefined, undefined, options) +
          '\n\n' +
          `Expected: not ${this.utils.printExpected(formattedExpected)}\n` +
          `Received: ${this.utils.printReceived(formattedReceived)}`
      : () => {
          const diffString = diff(formattedExpected, formattedReceived, {
            expand: this.expand,
          })
          return (
            // eslint-disable-next-line prefer-template
            this.utils.matcherHint('toBe', undefined, undefined, options) +
            '\n\n' +
            (diffString && diffString.includes('- Expect')
              ? `Difference:\n\n${diffString}`
              : `Expected: ${this.utils.printExpected(formattedExpected)}\n` +
                `Received: ${this.utils.printReceived(formattedReceived)}`)
          )
        }

    return { actual: received, message, pass }
  },
})
