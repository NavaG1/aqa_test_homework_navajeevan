Feature: Testing Psychics on Oranum

  @search
  Scenario Outline: Search for psychics by partial text
    Given I am on the Oranum home page
    When I search for '<partial_text>'
    Then I should see results containing '<expected_result>'

  Examples:
    | partial_text | expected_result |
    | Matt         | MATT            |
    | Myst         | MYST            |
    | Ann          | ANN             |
    | psy          | PSY             |

  @livestream
  Scenario: Validate 'Sign up' overlay triggers when "Get credits" is clicked
    Given I am on the livestream page of a live psychic to get credits
    When I trigger the Sign up overlay by clicking on credit button
    Then the Sign up overlay should be displayed after clicking credit button
  @livestream
  Scenario: Validate 'Sign up' overlay triggers when "Add to favorites button" is clicked
    Given I am on the livestream page of a live psychic to add to favorites
    When I trigger the Sign up overlay by clicking on add to favorites buttons
    Then the Sign up overlay should be displayed after clicking add to favorites
  @livestream 
  Scenario: Validate 'Sign up' overlay triggers when "Surprise button" is clicked
    Given I am on the livestream page of a live psychic to surprise
    When I trigger the Sign up overlay by clicking on surprise buttons
    Then the Sign up overlay should be displayed after clicking on surprise buttons
  @livestream
  Scenario: Validate 'Sign up' overlay triggers when "Start Session button" is clicked
    Given I am on the livestream page of a live psychic to start a session
    When I trigger the Sign up overlay by clicking on Start Session button
    Then the Sign up overlay should be displayed after clicking start session
  @livestream
  Scenario: Validate 'Sign up' overlay triggers when "Get coins button" is clicked
    Given I am on the livestream page of a live psychic to get coins
    When I trigger the Sign up overlay by clicking on Get coins button button
    Then the Sign up overlay should be displayed after Get coins button

  @topics
  Scenario Outline: Selecting '<topic>' should display matching psychics
    Given I am on the Oranum home page
    When I click on '<topic>' topic
    Then I should be on the '<topic>' list page
    And I should see matching psychics without duplicates

  Examples:
    | topic            |
    | Astrology        |
    | Tarot            |
    | Clairvoyance     |
    | Dream interpretation |
    | Healing          |
    | Crystals         |
    | Mediumship       |
    | Crystal ball     |
    | Numerology       |
    | Runes            |
    | Palm reading     |
    | Energy work      |