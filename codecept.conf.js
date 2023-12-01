exports.config = {
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'https://www.oranum.com/en',
      browser: 'chromium',
      args: ['--no-sandbox'],
      show: true,
      restart: false,
      keepBrowserState: true,
      windowSize: '1200x900'
    }
  },
  include: {
    I: './steps_file.js'
  },
  mocha: {
    reporterOptions:{
      mochaFile: "output/result.xml",
      reportDir: "output"
  }},
  bootstrap: null,
  timeout: null,
  teardown: null,
  hooks: [],
  gherkin: {
    features: './features/*.feature',
    steps: ['./step_definitions/steps.js']
  },
  plugins: {
    allure: {
      enabled: true,
      require: '@codeceptjs/allure-legacy',
    },
    debugErrors: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: true
    },
    tryTo: {
      enabled: true
    },
    retryFailedStep: {
      enabled: true
    },
    retryTo: {
      enabled: true
    },
    eachElement: {
      enabled: true
    },
    pauseOnFail: {}
  },
  tryTo: {
    enabled: true
  },
  stepTimeout: 0,
  stepTimeoutOverride: [{
      pattern: 'wait.*',
      timeout: 0
    },
    {
      pattern: 'amOnPage',
      timeout: 0
    }
  ],
  tests: './*_test.js',
  name: 'AQA_Test_HomeWork_Navajeevan',
}