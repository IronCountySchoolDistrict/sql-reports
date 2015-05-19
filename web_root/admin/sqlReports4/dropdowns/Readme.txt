sqlReports Drop Downs

If you wish to add more drop downs, you can do so by doing the following:

1 - create an html file in this folder with the drop down options on it.  Do not include the select coding, but rather just the option coding.  The option coding could be hard coded, like the yesorno.html file, or created dynamically using tlist_sql, like the student.html file.

2 - edit the /sqlReports/dropdownmenu.html file to include your new drop down by adding an option that references the name of the file you created in step 1.  For example, for a file called courses.html that creates a drop-down of courses, add the following to the dropdownmenu.html page:

<option value="courses">Courses

3 - edit the /sqlReports/dropdowndescriptions.html file to include your new drop down.  The information in the file appears on the Edit, Parameters page when one expands the "Information Regarding Name to Display, Add, and Use Drop Down" area on the bottom of the page.


IMPORTANT:  Be sure to make back up the dropdowns folder and any copies of the files mentioned in steps 2 and 3 prior to any upgrades of sqlReports or deleting and reinstalling a plugin so that you don't lose any changes. 


