Task 1-A

What is done well?
1.Project structure is defined well.
2.Liked the idea of using material design.
3.store management done well.
4.Liked the idea of using the Google chart component.

What would you change?

I Was able to identify the issues quick.
There are issues with input fields in html file, I was able to fix it.
1. Fixed the input field suggestions when we click inside the first text box.
2. Declare the type="text" in the input element tag.
3. Go button is disabled for invalid form.
4. Reduced the size of the form by providing the custom classes to the <form> and <mat-form-field> 
5. Disabled dev tool for production mode.
6. Added interface for timePeriod.

Are there any code smells or problematic implementations?

1.multiple times network requests are going on instead of caching or doing sessionstorage.
2.Define strictly type in component. In componets the declaration type is missing whether it is string or boolean.
3.Remove the unwanted code example something like below.
this.data$.subscribe(newData => (this.chartData = newData));
4.Need to remove the unused dependency imports.
5.Need to add .gitignore file to avoid unwanted files when commit code to branch.

