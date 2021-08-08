## TODO LIST

## Commands

```bash
yarn test # launch the tests
yarn start # run the application locally
```

## Directory structure

### Overview

The todo list is written is React. you can play with it here
https://kidz-todo-list-backend.herokuapp.com/

What can you do with it:

- add task to the todo list ( title and description )
- toggle the status of your todo list ( completed or not )
- remove a task from the todo list
- Set an expiration date for a task (extra)
- Added a filter for expired tasks (extra)
- The todolist is paginated with a max per page of 10 items (extra)

## Explanation

Under the hood, the app uses the redux store to manage the global state of the application and redux-saga to manage the side effects (mainly the calls to the database)

I choose here not to go with an Array structure for the todoList because I want to be able to access directly a task without having to loop over an array.

That's why I used a object with the task id as a key. Like that, I can just access and modify a task in my todolist.

The only downside of it is on Task Creation, because I don't have an ID yet. I have to wait for the api call to be made to show the task in the list ( it's not very UI friendly to block the UI on a call).
I could have solve this issue by generating a unique temporary ID to add it to the list and when the call would have been done. it would just swap the temporary ID with the actual task id retrieved from the backend.

## Small details

Every calls are made in the background thanks to redux saga ( great tool by the way). like that, users are not blocked by slow internet connections.

I made sure to inform the user when the data is synchronised with the backend.

I avoid useless calls, for example when a user save a task without editing, I will not make the call.

I made sure that the components respect the single responsability principle.

Components are also not connected to the redux-store. which make them easily reusable or integrable in a component library

Only the principal TodoList view is feeded with the store data and feed the children through props.

The principal view handle all the dispatch functions. I usually only allow the high order views to connect with the store / dispatch infos, it avoid too much dependency mess and it makes the data flow cleaner in my opinion.
