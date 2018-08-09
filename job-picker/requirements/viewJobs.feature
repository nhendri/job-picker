Feature: View Jobs

    The user can view all of the available jobs

    Scenario: View Jobs
        Given A list of available jobs exists
        When The user navigates to the jobs page
        Then The user sees the jobs table
        Examples:
            | Header 1 | Header 2 | Header 3 |
            | Value 1  | Value 2  | Value 3  |