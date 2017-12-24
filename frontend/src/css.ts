import generate from 'crux-css'

function makeCss() {
  return generate(
    {
      borderWidths: {
        small: '1px',
        medium: '2px',
        large: '3px',
      },
      colors: {
        primary: 'red',
        secondary: 'blue',
      },
      dimensions: {
        1: '1rem',
        2: '2rem',
        3: '4rem',
        4: '8rem',
        5: '16rem',
        6: '32rem',
        7: '64rem',
        8: '128rem',
      },
      fontSizes: {
        small: '0.8rem',
        medium: '1rem',
        large: '1.5rem',
        huge: '2rem',
      },
      fontWeights: {
        100: '100',
        200: '200',
        300: '300',
        400: '400',
        500: '500',
      },
      letterSpacings: {
        1: '1px',
        2: '2px',
        3: '3px',
        4: '4px',
      },
      lineHeights: {
        1: '0.8em',
        2: '1em',
        3: '1.2em',
        4: '1.5em',
        5: '2em',
      },
      opacity: {
        10: '0.1',
        20: '0.2',
        30: '0.3',
        40: '0.4',
        50: '0.5',
        60: '0.6',
        70: '0.7',
        80: '0.8',
        90: '0.9',
        100: '1',
      },
      radii: {
        circle: '99999px',
      },
      spacing: {
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.5rem',
        6: '2rem',
        7: '2.5rem',
        8: '3rem',
      },
      media: {
        ns: {
          min: '30em',
        },
        m: {
          min: '30em',
          max: '60em',
        },
        l: {
          min: '60em',
        },
      },
    },
    {
      includeCore: true,
    },
  )
}

export default {
  inject() {
    const css = makeCss()
    var head = document.head || document.getElementsByTagName('head')[0]
    var styleTag = document.createElement('style')

    styleTag.type = 'text/css'
    if (styleTag.style) {
      styleTag.innerText = css
    } else {
      styleTag.appendChild(document.createTextNode(css))
    }

    head.appendChild(styleTag)
  },
}
