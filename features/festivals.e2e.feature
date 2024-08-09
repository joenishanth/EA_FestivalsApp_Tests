
Feature: Validate the UI Data with API data

    Scenario: Verify the count of Bands displayed match the API data
        Given I navigate to EAFestivals  website
        And I have retrieved the Festival API payload
        Then I should see the count of Band names matching



