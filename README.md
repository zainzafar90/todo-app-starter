# TodoAppStarter

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.26.

It's a starter application, for complete version please refer to [Todo App](https://github.com/zainzafar90/todo-app) repository.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them
+ Node.js up and running.
+ NPM (Node package manager) 

If you get the versions Node 4.x.x and NPM 3.x.x. or higher you are all set. If not you have to get the latest versions

### Setup

Before moving forward go to the app directory and download all the dependencies using command-line/terminal
```
npm install
```

## Development server
Run `ng serve` for a dev server. 

Navigate to `http://localhost:4200/`.

Angular CLI development server includes LiveReload support, so your browser automatically reloads the application when a source file changes.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. 
You can also use the following list of commands with angular-cli to generate features

| Scaffold      | Usage                                      |
| ------------- | ------------------------------------------ |
| App           | ng new my-new-app                          |
| Component     | ng generate component my-new-component     |
| Directive     | ng generate directive my-new-directive     |
| Pipe          | ng generate pipe my-new-pipe               |
| Service       | ng generate service my-new-service         |
| Class         | ng generate class my-new-class             |
| Interface     | ng generate interface my-new-interface     |
| Enum          | ng generate enum my-new-enum               |

## 1. Creating a Todo Class

We'll use a class to represent Todo items

```
ng generate class Todo
```
which will create:

```
src/app/todo.ts
```
Let’s open up ```src/app/todo.ts:```

```Typescript
export class Todo {
}
```

and add the logic we need:

```Typescript
export class Todo {
  id: number;
  title: string = '';
  completed: boolean = false;
}
```
In this Todo class definition, we specify that each Todo instance will have three properties:

+ **id**: number, unique ID of the todo item
+ **title**: string, title of the todo item
+ **completed**: boolean, whether or not the todo item is complete

## 2. Creating a Todo Component

Components are the main way we build and specify elements and logic on the page, through both custom elements and attributes that add functionality to our existing components.

Let's create a Todo Component

```
ng generate component Todo
```
which will create the following files:

```
src/app/todo/todo.component.ts
src/app/todo/todo.component.html
src/app/todo/todo.component.css
src/app/todo/todo.component.spec.ts
```
Let’s open up ```src/app/todo/todo.component.ts:```

```Typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
```

Now open ```src/app/todo.component.html```

```html
<h1>
  {{title}}
</h1>
```

## 3. Create a Todo Service
Angular 2 uses the concept of services, an Angular 2 service is a class that encapsulates some sort of functionality and provides it as a service for the rest of your application

Let's create a Todo Service

```
ng generate service Todo
```
which will create the following files:

```
src/app/todo.service.ts
```

Let’s open up ```src/app/todo.service.ts:```

```Typescript
import { Injectable } from '@angular/core';

@Injectable()
export class TodoService {

  constructor() { }

}
```
Now open ```src/app/app.module.ts``` update it in the provider as well

```Typescript
import { TodoService } from './todo.service';
/* Other Imports */

@NgModule({
  providers: [TodoService]
})
export class AppModule { }

```


## 4. Add Todo app code into respective files

Open ```src/app/todo.service.ts``` file

And add functionality to the service

```Typescript
import { Todo } from './modal/todo';
import { Injectable } from '@angular/core';

@Injectable()
export class TodoService {

  lastId: number = 0;

  todos: Todo[] = [];

  constructor() { }

  getAllTodos(): Todo[] {
    return this.todos;
  }

  addTodo(todo: Todo) {
    todo.id = ++this.lastId;
    this.todos.push(todo);
  }

  deleteTodo(todo: Todo) {
    let index = this.todos.indexOf(todo);
    this.todos.splice(index, 1);
  }

  updateTodo(todo: Todo) {
    let index = this.todos.indexOf(todo);
    this.todos[index] = todo;
  }
}

```
Now open ```src/app/todo.component.ts``` file

And paste this code into component.ts file

```Typescript
import { TodoService } from './../../todo.service';
import { Todo } from './../../modal/todo';
import { Component } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

  newTodo: Todo = new Todo();

  constructor(private _todoService: TodoService) { }

  addTodo() {
    this._todoService.addTodo(this.newTodo);
    this.newTodo = new Todo();
  }

  updateTodo(todo: Todo) {
    this._todoService.updateTodo(todo);
  }

  removeTodo(todo) {
    this._todoService.deleteTodo(todo);
  }


  get todos() {
    return this._todoService.getAllTodos();
  }

}
```

And finally open ```src/app/todo/todo.component.html```

and update file with the following code
```html
<section class="todoapp">
    <header class="header">
        <h1>Todos</h1>
        <input [(ngModel)]="newTodo.title" (keyup.enter)="addTodo()" placeholder="What needs to be done?" class="new-todo" autofocus="">
    </header>
    <section class="main" *ngIf="todos.length > 0">
        <ul class="todo-list">
            <li *ngFor="let todo of todos" [class.completed]="todo.completed">
                <div class="view">
                    <input class="toggle" type="checkbox" (click)="updateTodo(todo)" [checked]="todo.completed">
                    <label class="todo-text">{{todo.title}}</label>
                    <button class="destroy" (click)="removeTodo(todo)"></button>
                </div>
            </li>
        </ul>
    </section>
    <footer class="footer" *ngIf="todos.length > 0">
        <span class="todo-count"><strong>{{todos.length}}</strong> {{todos.length == 1 ? 'item' : 'items'}} left</span>
    </footer>
</section>
```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to GitHub Pages

Run `ng github-pages:deploy` to deploy to GitHub Pages.

## Further help

To get more help on the `angular-cli` use `ng help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
