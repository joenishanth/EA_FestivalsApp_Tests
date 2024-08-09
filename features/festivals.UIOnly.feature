Feature: Verify the Band and Festivals are displayed correctly

    Scenario: Verify Band Names are arranged in Alphabetical Order
        Given I navigate to EAFestivals  website
        Then I should see Band Names in Alphabetical Order

    Scenario: Verify Band Names are not present
        Given I navigate to EAFestivals  website
        Then I should not see duplicate Band Names

    Scenario: Verify All Band has got alteast one Festival location
        Given I navigate to EAFestivals  website
        Then I should not see Bands with blank festival locations

    Scenario: Verify Festivals are arranged is Alphabetical order
        Given I navigate to EAFestivals  website
        Then I should see Festival Names sorted in Alphabetical Order