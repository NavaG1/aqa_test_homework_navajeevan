const { I } = inject();

// Custom function to close the notification
async function closeNotification() {
  try {
    // Wait for the notification to appear with a timeout of 5 seconds
    await I.waitForSelector('#personalized-content-notification', 5);

    // Check if the notification is present
    if (await I.grabNumberOfVisibleElements('#personalized-content-notification') > 0) {
      // Click the close button
      I.click('.notifier-personalized-content-close-btn');
    }
  } catch (error) {
    // Handle timeout or other errors
    console.error('Notification did not appear within the specified timeout.');
  }
}
Given('I am on the Oranum home page', () => {
  I.amOnPage('/');
  I.seeElement("//input[@placeholder='Search for Expert or category']")
});

When('I search for {string}', async(partialText) => {
  I.fillField("//input[@placeholder='Search for Expert or category']", partialText);
  I.pressKey('Enter');
  await closeNotification();
});
                    //partial text search//
Then('I should see results containing {string}', async(expectedResult) => {
  await closeNotification();
  await I.see(expectedResult);
  I.see(expectedResult + ' EXPERTS');
  const actualUrl = await I.grabCurrentUrl();
  const expectedLowerCase = expectedResult.toLowerCase();
  const actualLowerCaseURL = actualUrl.toLowerCase();
  //I.seeInCurrentUrl(expectedLowerCase);
  assert.ok(actualLowerCaseURL.includes(expectedLowerCase), `${expectedLowerCase} is not present in ${actualLowerCaseURL}`);
  
});


                    //Get Credits button///
Given('I am on the livestream page of a live psychic to get credits', async() => {
  
  // I.amOnPage('/')
  // await I.click(".swiper-wrapper")   //Use this if we want to select the first live psychic on the page
  I.amOnPage('https://oranum.com/en/chat/LovePsychyicAnie')   //Using hardcoded value as given in the requirement.
});

When('I trigger the Sign up overlay by clicking on credit button', async() => {
  await I.click("//a[normalize-space()='Get Credits']");    //Click on Get credit button
  await closeNotification();
  });

Then('the Sign up overlay should be displayed after clicking credit button', async() => {
  await closeNotification();
  I.dontSeeCurrentUrlEquals("/")
  await I.seeInCurrentUrl("en/auth/sign-up")
  await I.seeElement("//a[@class='signup-login-button']")
  I.see("BENEFITS OF JOINING")
  I.seeElement("//span[@id='submit_text']")
  I.seeElement("//input[@placeholder='Username']")
});


                              //Add to favorites button//
Given('I am on the livestream page of a live psychic to add to favorites', async() => {
  I.amOnPage('/')
  // await I.click(".swiper-wrapper")
  I.amOnPage('https://www.oranum.com/en/chat/immortaltruth')
});

When('I trigger the Sign up overlay by clicking on add to favorites buttons', async() => {
  await I.click("//span[@class='item-with-popover']")   //Click on favourite button
  await closeNotification();
});

Then('the Sign up overlay should be displayed after clicking add to favorites', async() => {
  await closeNotification();
  I.dontSeeCurrentUrlEquals("/")
  await I.seeInCurrentUrl("en/auth/sign-up")
  I.see("BENEFITS OF JOINING")
  I.seeElement("//span[@id='submit_text']")
  I.seeElement("//input[@placeholder='Username']")
  I.seeElement("//a[@class='signup-login-button']")
  I.seeCurrentUrlEquals("https://www.oranum.com/en/auth/sign-up")
});

                        //Surprise buttons//
Given('I am on the livestream page of a live psychic to surprise', async() => {
  I.amOnPage('/')
  // await I.click(".swiper-wrapper")
  I.amOnPage('https://www.oranum.com/en/chat/PsychicBenz')
});

When('I trigger the Sign up overlay by clicking on surprise buttons', async() => {
  I.click("//div[@data-testid='surprise-OranumSurprisesGlobe_LJ']")   //Click on surprise button
  await closeNotification();
});

Then('the Sign up overlay should be displayed after clicking on surprise buttons', async() => {
  await closeNotification();
  I.see("Hey! Join for free to send me a Surprise")
  I.seeElement("//a[@id='mc_losu_login_link']")
  I.seeElement("#mc_losu_button")
  I.seeElement(".mc_dialog__header")
  I.click('#mc_losu_button');
  
});


                              //Start a session
Given('I am on the livestream page of a live psychic to start a session', async() => {
  I.amOnPage('/')
  I.click(".swiper-wrapper") 
});

When('I trigger the Sign up overlay by clicking on Start Session button', async() => {

  I.click("//div[@id='mc_btn_start_private']")
  await closeNotification();
  
});

Then('the Sign up overlay should be displayed after clicking start session', () => {
  
  I.see("Register now to join me for a Private Session and let's see together where your path may lead you.")
  I.seeElement("//a[@id='mc_losu_login_link']")
  I.seeElement("#mc_losu_button")
});

                          //Get coins button
Given('I am on the livestream page of a live psychic to get coins', async() => {
  I.amOnPage('/')
  I.click(".swiper-wrapper") 
});

When('I trigger the Sign up overlay by clicking on Get coins button button', async() => {

  I.click("//div[@class='mc_bonus_coin__face mc_bonus_coin__face--sideOne mc_is_horizontal_rotation']")
  await closeNotification();
  
});

Then('the Sign up overlay should be displayed after Get coins button', () => {
  
  I.see("Join now for Free")
  I.see("Benefits of membership")
  
  I.seeElement("//button[@id='mc_signup_button']")
  I.seeElement("//div[@class='mc_dialog__column--signup mc_dialog__column--m']")
  I.seeElement("//span[normalize-space()='Login here']")
});

                          

        //selecting different topics should display only matching psychics
const listPageTitleSelector = '.listpage-title';

Given('I am on the Oranum home page', () => {
  I.amOnPage('https://www.oranum.com/en/');
});

When('I click on {string} topic', async (topic) => {
  const topicSelector = `//a[contains(@class,'sidebar-filters-link')][normalize-space()='${topic}']`;

  I.click(topicSelector);
  // Wait for the content to load on the redirected page
  I.waitForVisible(listPageTitleSelector, 10);
  const formattedTopic = topic.toLowerCase().replace(/\s+/g, '+');
  I.seeInCurrentUrl(formattedTopic);
  await closeNotification();
});

const psychicCardSelector = '.thumb--modern[data-type="performer"]';

Then('I should see matching psychics without duplicates', async () => {
  await I.waitForVisible(psychicCardSelector, 10);

  // Grab the names of all displayed psychics
  const psychicNames = await I.executeScript((selector) => {
    const names = [];
    const psychicElements = document.querySelectorAll(selector);

    psychicElements.forEach((element) => {
      const nameElement = element.querySelector('.thumb-data-item--name-container .thumb-data-item--name');
      if (nameElement) {
        names.push(nameElement.textContent.trim());
      }
    });

    return names;
  }, psychicCardSelector);

  // Log the extracted names for troubleshooting
  console.log('Extracted psychic names:', psychicNames);

  // Check for case-insensitive duplicates
  const caseInsensitiveDuplicates = findCaseInsensitiveDuplicates(psychicNames);

  // Fail the test if duplicates are found
  if (caseInsensitiveDuplicates.length > 0) {
    throw new Error(`Case-insensitive duplicate psychics found: ${caseInsensitiveDuplicates.join(', ')}`);
  }
});

// Helper function to find case-insensitive duplicates in an array
function findCaseInsensitiveDuplicates(array) {
  const lowercasedNames = array.map((name) => name.toLowerCase());
  const counts = {};
  const duplicates = [];

  for (const value of lowercasedNames) {
    if (counts[value] === undefined) {
      counts[value] = 1;
    } else {
      duplicates.push(value);
    }
  }

  return duplicates;
}


const assert = require('assert');

Then('I should be on the {string} list page', async (topic) => {
  const expectedTitle = `${topic.toLowerCase()} Experts`;
  const actualTitle = await I.grabTextFrom('.listpage-title');
  
  // Assert that the header matches the expected title
  assert.strictEqual(actualTitle.toLowerCase(), expectedTitle.toLowerCase(), `Expected: ${expectedTitle}, Actual: ${actualTitle}`);
});

