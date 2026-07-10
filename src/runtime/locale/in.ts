import type { Messages } from '../types/locale'
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
      hidePassword: 'पासवर्ड छुपाएँ',
      showPassword: 'पासवर्ड दिखाएँ',
      submit: 'जारी रखें'
    },
    banner: {
      close: 'बंद करें'
    },
    calendar: {
      nextMonth: 'अगला महीना',
      nextYear: 'अगला वर्ष',
      prevMonth: 'पिछला महीना',
      prevYear: 'पिछला वर्ष'
    },
    carousel: {
      dots: 'प्रदर्शित करने के लिए स्लाइड चुनें',
      goto: '{slide} पर जाएँ',
      next: 'अगला',
      prev: 'पिछला'
    },
    chatPrompt: {
      placeholder: 'अपना संदेश यहाँ लिखें…'
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
      noMatch: 'कोई मिलान नहीं मिला',
      placeholder: 'कमांड दर्ज करें या खोजें…'
    },
    contentSearch: {
      links: 'परिणाम',
      search: 'परिणाम',
      theme: 'थीम'
    },
    contentSearchButton: {
      label: 'खोजें…'
    },
    contentToc: {
      title: 'इस पृष्ठ पर'
    },
    dropdownMenu: {
      noMatch: 'कोई मेल खाता डेटा नहीं',
      search: 'खोजें…'
    },
    dashboardSearch: {
      theme: 'थीम'
    },
    dashboardSearchButton: {
      label: 'खोजें…'
    },
    dashboardSidebarCollapse: {
      collapse: 'साइडबार संक्षिप्त करें',
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
      removeFile: '{filename} हटाएँ'
    },
    header: {
      close: 'मेनू बंद करें',
      open: 'मेनू खोलें'
    },
    inputMenu: {
      create: '"{label}" बनाएँ',
      noData: 'कोई डेटा नहीं',
      noMatch: 'कोई मिलान नहीं मिला'
    },
    inputNumber: {
      decrement: 'घटाएँ',
      increment: 'बढ़ाएँ'
    },
    listbox: {
      noData: 'कोई डेटा नहीं',
      noMatch: 'कोई मिलान डेटा नहीं',
      search: 'खोजें…'
    },
    modal: {
      close: 'बंद करें'
    },
    pricingTable: {
      caption: 'मूल्य योजनाओं की तुलना'
    },
    prose: {
      codeCollapse: {
        closeText: 'छुपाएँ',
        name: 'कोड',
        openText: 'दिखाएँ'
      },
      collapsible: {
        closeText: 'छुपाएँ',
        name: 'गुण',
        openText: 'दिखाएँ'
      },
      pre: {
        copy: 'कोड क्लिपबोर्ड पर कॉपी करें'
      },
      prompt: {
        copy: 'प्रॉम्प्ट कॉपी करें',
        openIn: '{name} में खोलें'
      }
    },
    chatReasoning: {
      thinking: 'सोच रहा है…',
      thought: 'सोच पूरी हुई',
      thoughtFor: '{duration} तक सोचा'
    },
    sidebar: {
      close: 'बंद करें',
      toggle: 'टॉगल करें'
    },
    selectMenu: {
      create: '"{label}" बनाएँ',
      noData: 'कोई डेटा नहीं',
      noMatch: 'कोई मिलान नहीं मिला',
      search: 'खोजें…'
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
