import postcss from 'postcss'
import plugin from '../src/lib/substituteFocusableAtRules'

function run(input, opts = () => {}) {
  return postcss([plugin(opts)]).process(input)
}

test('it adds a focusable variant to each nested class definition', () => {
  const input = `
    @focusable {
      .banana { color: yellow; }
      .chocolate { color: brown; }
    }
  `

  const output = `
      .banana { color: yellow; }
      .chocolate { color: brown; }
      .focus\\:banana:focus { color: yellow; }
      .focus\\:chocolate:focus { color: brown; }
  `

  return run(input).then(result => {
    expect(result.css).toMatchCss(output)
    expect(result.warnings().length).toBe(0)
  })
})
