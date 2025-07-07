function shInitSwitcher() {
  const STORAGE_KEY = 'shTheme'

  // Add CSS styles with !important
  if (!document.getElementById('shThemeStyles')) {
    const style = document.createElement('style')
    style.id = 'shThemeStyles'
    style.textContent = `
      body.sh-theme-edge-dark {
        background: #5964B3 url(/bitrix/templates/air/themes/light/lightness/lightness.jpg) fixed 0 0 no-repeat !important;
        background-size: cover !important;
      }
      body.sh-theme-edge-light {
        background: #eef2f4 url(/bitrix/templates/air/themes/dark/pattern-light-grey/pattern-light-grey.svg) 0 0 repeat !important;
        background-size: initial !important;
      }
      body.sh-theme-dark {
        background: #333 !important;
        background-size: initial !important;
      }
      body.sh-theme-light {
        background: #eef2f4 !important;
        background-size: initial !important;
      }
    `
    document.head.appendChild(style)
  }

  // Determine container based on context
  let container
  container = document.querySelector('.air-header')
  if (!container) {
    container = document.querySelector('.ui-toolbar-right-buttons')
  }
  if (!container) {
    container = document.querySelector('.ui-side-panel-wrap-title-inner-container')
  }

  if (!container) return

  const existingSelect = document.getElementById('shThemeSelector')
  if (existingSelect) {
    // Unsubscribe from events
    existingSelect.removeEventListener('change', handleThemeChange)
    document.removeEventListener('keydown', handleKeyDown)
    window.removeEventListener('storage', handleStorageChange)
  }

  // Remove parent container
  const wrapper = document.getElementById('shThemeSelectorWrapper')
  if (wrapper && wrapper.parentNode === container) {
    container.removeChild(wrapper)
  }

  // Create container for styled select
  const selectWrapper = document.createElement('div')
  selectWrapper.id = 'shThemeSelectorWrapper'
  selectWrapper.className = 'ui-ctl ui-ctl-after-icon ui-ctl-dropdown ui-ctl-xs'

  // Create icon element
  const iconDiv = document.createElement('div')
  iconDiv.className = 'ui-ctl-after ui-ctl-icon-angle'

  // Create dropdown
  const select = document.createElement('select')
  select.id = 'shThemeSelector'
  select.className = 'ui-ctl-element'

  const themes = [
    { value: 'edgeDark', label: 'Edge Dark (Shift+1)'},
    { value: 'edgeLight', label: 'Edge Light (Shift+2)' },
    { value: 'dark', label: 'Dark (Shift+3)' },
    { value: 'light', label: 'Light (Shift+4)' }
  ]

  // Add options to select
  themes.forEach((theme) => {
    const option = document.createElement('option')
    option.value = theme.value
    option.textContent = theme.label
    select.appendChild(option)
  })

  // Theme application function
  function applyTheme(themeValue) {
    const body = document.body
    body.classList.remove(
      '--ui-context-edge-dark',
      '--ui-context-edge-light',
      '--ui-context-content-dark',
      '--ui-context-content-light',
      'sh-theme-edge-dark',
      'sh-theme-edge-light',
      'sh-theme-dark',
      'sh-theme-light'
    )

    // Update body
    if (themeValue === 'edgeDark') {
      body.classList.add('--ui-context-edge-dark', 'sh-theme-edge-dark')
    } else if (themeValue === 'edgeLight') {
      body.classList.add('--ui-context-edge-light', 'sh-theme-edge-light')
    } else if (themeValue === 'dark') {
      body.classList.add('--ui-context-content-dark', 'sh-theme-dark')
    } else if (themeValue === 'light') {
      body.classList.add('--ui-context-content-light', 'sh-theme-light')
    }

    select.value = themeValue
    localStorage.setItem(STORAGE_KEY, themeValue)
  }

  // Theme change handler
  function handleThemeChange(event) {
    applyTheme(event.currentTarget.value)
  }

  function handleStorageChange(event) {
    if (event.key === STORAGE_KEY) {
      applyTheme(event.newValue)
    }
  }

  function handleKeyDown(event) {
    if (event.shiftKey) {
      let theme
      switch (event.code) {
        case 'Digit1':
          theme = 'edgeDark'
          break
        case 'Digit2':
          theme = 'edgeLight'
          break
        case 'Digit3':
          theme = 'dark'
          break
        case 'Digit4':
          theme = 'light'
          break
      }

      if (theme) {
        event.preventDefault()
        applyTheme(theme)
      }
    }
  }

  selectWrapper.appendChild(select)
  selectWrapper.appendChild(iconDiv)
  container.appendChild(selectWrapper)

  select.addEventListener('change', handleThemeChange)
  window.addEventListener('storage', handleStorageChange)
  document.addEventListener('keydown', handleKeyDown)

  const savedTheme = localStorage.getItem(STORAGE_KEY)
  const defaultTheme = 'edgeDark'

  // Apply saved theme or default theme
  applyTheme(savedTheme || defaultTheme)
}

// Initialize in current document
shInitSwitcher()
