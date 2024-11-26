export default {
  important: true,
  darkMode: 'class',
  content: [
    './docs/.vitepress/**/*.{js,ts,vue}',
    './docs/*.md',
    './docs/reference/**/*.md',
    './playground/app/**/*.{js,ts,vue}',
    './playground-vue/app/**/*.{js,ts,vue}',
    './src/**/*.{js,ts,vue}'
  ],
  theme: {
    extend: {}
  },
  plugins: [
    require('@bitrix24/b24style')({
      logs: false,
      useLocalFonts: false
    })
  ]
}
