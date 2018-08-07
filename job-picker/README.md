# Job Viewer
The job viewer is a simple interface which takes a json data object which represents a set of available jobs and displays it in a simple interface.

#### Requirements
* The data is represented in json notation - the final version of this will be built on SharePoint, with a SharePoint list API serving as the data source
* The list will never have more than 100 entries (ehhhhhhh....)
* The entire interface will be responsive
* The jobs will be displayed in a simple table

| Title       | Department       | City       |
| ----------- | ---------------- | ---------- |
| Job TItle 1 | Job Department 1 | Job City 1 |
| Job TItle 2 | Job Department 2 | Job City 2 |

* The table will be sortable by each of the column headers
* The table will have some sort of visual highlight on-hover to indicate the currently active selection
* The "Title" column will be clickable to show more details about a selected job
* The table will have a second visual highlight on-select to indicate the currently viewed selection