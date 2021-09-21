# Job Viewer
This simple job viewer displays a list of internal job postings and provides for the user to sort and filter the list by department and location. It also provides for the user to view more details regarding individual job postings.

## Part One: The Final View
#### Business Requirements

* The jobs list must include the job title, the job department, and the job location

| Title       | Department       | City       |
| ----------- | ---------------- | ---------- |
| Job Title 1 | Job Department 1 | Job City 1 |
| Job Title 2 | Job Department 2 | Job City 2 |

* The jobs list must be sortable by each of the columns
* Additional details about an individual job must be available

| Title       | Department       | Location   | Description       | Manager Name       | Manager Email |
| ----------- | ---------------- | ---------- | ----------------- | ------------------ | ------------- |
| Job Title 1 | Job Department 1 | Job City 1 | Job description 1 | Job Manager Name 1 | Job Email 1   |

* The user must be able to directly contact the hiring manager
* The additional details must be supported by an image that helps identify or define the hiring department or location

#### Designer/Layout Requirements
* The table will have a visual highlight on-hover to indicate the currently active selection
* The table will have a second visual highlight on-select to indicate the currently viewed selection
* The interface must be responsive

#### Technical Specification
See [<code>feature files</code>](./requirements/) (Actual feature writing pending. Yes, this is a bad practice, I'm a slacker..)

## Part Two: Manager Management
#### Business Requirements
* A manager must have an interface for entering new jobs for approval, and for flagging jobs as removable
* A manager must be able to fill out a new job form which includes a list of available departments + approved job titles
    * The following fields must be present:
        * Job ID (auto)
        * Job Title (selected from list)
        * Job Department (selected from list)
        * Job Location (auto)
        * Job Description (auto)
        * Job Notes (entry)
        * Length of posting (entry)

#### Designer/Layout Requirements
(coming soon)

#### Technical Specification
(coming soon)