Feature: a button
    Scenario: clicking the button
        Given The user is presented with a thing
        When the user clicks on the thing
        Then The thing responds to the user
        And the user does another thing
        Given the user is presented with the thing but it's blue
        When the user clicks on the thing
        Then the thing changes back to its default color