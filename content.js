function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function app() {
  await sleep(2000); // Give DOM time to load

  const config = {
    venueName: {
      insertionPosition: 'beforebegin',
      label: 'Venue Name',
      cssSelector: '._hdf'
    },
    venueAddress: {
      insertionPosition: 'beforebegin',
      label: 'Venue Address',
      cssSelector: '._Xbe'
    },
    venuePhoneNumber: {
      insertionPosition: 'beforebegin',
      label: 'Venue Phone Number',
      cssSelector: '[data-number]'
    },
  }

  function getCopyButton (cssSelector, label) {
    return `
      <button onClick="(
        function () {
          window.getSelection().empty()
          var range = document.createRange()
          range.selectNode(document.querySelector('${cssSelector}'))
          window.getSelection().addRange(range)
          console.log('${label} copied to clipboard.')
          document.execCommand('copy')
          window.getSelection().empty()
        }())"
      >
        Copy
      </button>
    `
  }

  Object.keys(config).map(x => {
    const cssSelector = config[x].cssSelector
    const label = config[x].label
    const insertionPosition = config[x].insertionPosition
    const buttonHTML = getCopyButton(cssSelector, label)
    document.querySelector(cssSelector).insertAdjacentHTML(insertionPosition, buttonHTML)
  })

}

app();
