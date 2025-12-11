import type { Messages } from '../types'
import { defineLocale } from '../composables/defineLocale'

export default defineLocale<Messages>({
  name: 'Indian',
  code: 'in',
  locale: 'hi_IN',
  messages: {
    alert: {
      close: 'बंद करें'
    },
    authForm: {
      hidePassword: 'पासवर्ड छिपाएं',
      showPassword: 'पासवर्ड दिखाएं',
      submit: 'जारी रखें'
    },
    banner: {
      close: 'बंद करें'
    },
    calendar: {
      nextMonth: 'अगला महीना',
      nextYear: 'अगला साल',
      prevMonth: 'पिछला महीना',
      prevYear: 'पिछला साल'
    },
    carousel: {
      dots: 'दिखाने के लिए स्लाइड चुनें',
      goto: '{slide} पर जाएं',
      next: 'अगला',
      prev: 'पिछला'
    },
    chatPrompt: {
      placeholder: 'अपना संदेश यहाँ दर्ज करें...'
    },
    chatPromptSubmit: {
      label: 'भेजें'
    },
    colorMode: {
      dark: 'डार्क',
      light: 'लाइट',
      switchToDark: 'डार्क मोड पर स्विच करें',
      switchToLight: 'लाइट मोड पर स्विच करें',
      system: 'सिस्टम'
    },
    commandPalette: {
      back: 'वापस',
      close: 'बंद करें',
      noData: 'कोई डेटा नहीं',
      noMatch: 'कोई मैच नहीं मिला',
      placeholder: 'कमांड दर्ज करें या खोजें...'
    },
    contentSearch: {
      links: 'परिणाम',
      theme: 'थीम'
    },
    contentSearchButton: {
      label: 'खोजें...'
    },
    contentToc: {
      title: 'इस पेज पर'
    },
    dashboardSearch: {
      theme: 'थीम'
    },
    dashboardSearchButton: {
      label: 'खोजें...'
    },
    dashboardSidebarCollapse: {
      collapse: 'साइडबार संकुचित करें',
      expand: 'साइडबार विस्तृत करें'
    },
    dashboardSidebarToggle: {
      close: 'साइडबार बंद करें',
      open: 'साइडबार खोलें'
    },
    error: {
      clear: 'पुनः प्रयास करें'
    },
    fileUpload: {
      removeFile: '{filename} हटाएं'
    },
    header: {
      close: 'मेनू बंद करें',
      open: 'मेनू खोलें'
    },
    inputMenu: {
      create: '"{label}" बनाएं',
      noData: 'कोई डेटा नहीं',
      noMatch: 'कोई मैच नहीं मिला'
    },
    inputNumber: {
      decrement: 'घटाएं',
      increment: 'बढ़ाएं'
    },
    modal: {
      close: 'बंद करें'
    },
    pricingTable: {
      caption: 'मूल्य निर्धारण योजनाओं की तुलना'
    },
    prose: {
      codeCollapse: {
        closeText: 'छिपाएं',
        name: 'कोड',
        openText: 'दिखाएं'
      },
      collapsible: {
        closeText: 'छिपाएं',
        name: 'गुण',
        openText: 'दिखाएं'
      },
      pre: {
        copy: 'कॉपी करें'
      }
    },
    selectMenu: {
      create: '"{label}" बनाएं',
      noData: 'कोई डेटा नहीं',
      noMatch: 'कोई मैच नहीं मिला',
      search: 'खोजें...'
    },
    slideover: {
      close: 'बंद करें'
    },
    table: {
      noData: 'कोई डेटा नहीं'
    },
    toast: {
      close: 'बंद करें'
    },
    sidebarLayout: {
      open: 'नेविगेशन खोलें',
      close: 'नेविगेशन बंद करें',
      slideoverTitle: 'नेविगेशन',
      slideoverDescription: 'सामग्री नेविगेशन'
    }
  }
})
