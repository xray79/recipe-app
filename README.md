# Hosting

Live version is hosted at netlify at:
https://recipe-app-ih.netlify.app/

## Project notes

Mvc architecture was used to separate presentation logic from app and business logic.
Events are captured in the view and handled by the controller using publisher subscriber pattern.

View mainly presents data in small components by returning template strings and re-rendering main page, instead of loading new pages.

Controller initialises event handlers when app is first run using an init function. Event handlers are defined in the view but when triggered will fire a function from the controller.

The model handles api calls and will modify data returned from the api as well as the overall state of the application, this is exported to the controller which can then use the data appropriately.

## Features

- Search for recipes and return search results as a paginated table.
- Clicking a recipe will load the recipe into the main page by rerending the main div instead of loading a new page.
- Recipes can be bookmarked and accessed easily later on and are saved to local storage.
- Recipe quantities can be changed dynamically for a different number of people.
- Recipes can be uploaded and saved.

This project was completed as part of a course: https://www.udemy.com/course/the-complete-javascript-course/
