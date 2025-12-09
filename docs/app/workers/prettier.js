/* eslint-disable no-undef */
let isPrettierLoaded = false
const messageQueue = []

// Function for downloading Prettier and plugins
async function loadPrettier() {
  if (!isPrettierLoaded) {
    await Promise.all([
      import('https://cdn.jsdelivr.net/npm/prettier@3.7.4/standalone.js'),
      import('https://cdn.jsdelivr.net/npm/prettier@3.7.4/plugins/babel.js'),
      import('https://cdn.jsdelivr.net/npm/prettier@3.7.4/plugins/estree.js'),
      import('https://cdn.jsdelivr.net/npm/prettier@3.7.4/plugins/html.js'),
      import('https://cdn.jsdelivr.net/npm/prettier@3.7.4/plugins/markdown.js'),
      import('https://cdn.jsdelivr.net/npm/prettier@3.7.4/plugins/typescript.js')
    ])
    isPrettierLoaded = true

    // We process all messages accumulated in the queue
    messageQueue.forEach(event => processMessage(event))
    messageQueue.length = 0
  }
}

// Main message handler
self.onmessage = async function (event) {
  if (!isPrettierLoaded) {
    messageQueue.push(event)
    if (messageQueue.length === 1) {
      loadPrettier()
    }
  } else {
    processMessage(event)
  }
}

async function processMessage(event) {
  const response = {
    uid: event.data.uid,
    message: await handleMessage(event.data.message)
  }
  self.postMessage(response)
}

function handleMessage(message) {
  switch (message.type) {
    case 'format':
      return handleFormatMessage(message)
    default:
      return Promise.resolve(null)
  }
}

async function handleFormatMessage(message) {
  const { options, source } = message

  const formatted = await prettier.format(source, {
    parser: 'markdown',
    plugins: prettierPlugins,
    ...options
  })

  return formatted
}

// Start loading Prettier when worker is initialized
loadPrettier()
