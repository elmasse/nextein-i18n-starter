const { withNextein } = require('nextein/config')

module.exports = withNextein({
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en'
  }
})
