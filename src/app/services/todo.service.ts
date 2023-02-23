import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { Todo } from "../models/todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todos: Todo[] = [
    { "id": 1, "title": "To do item 1", "done": true, "date": "20-Feb-2023", "time": "12.30 PM" },
    { "id": 2, "title": "To do item 2", "done": false, "date": "24-Feb-2023", "time": "12.30 PM" },
    { "id": 3, "title": "To do item 3", "done": false, "date": "25-Feb-2023", "time": "2.30 PM" }
  ]

  constructor() { }

  all(): Observable<Todo[]> {
    return Observable.create((observer: Subscriber<Todo[]>) => {
      observer.next(this.todos);
      observer.complete();
    });
  }

  add(todo: Todo) {
    todo.id = this.todos.length + 1;
    this.todos.push(todo);
  }

  markDone(todoId: number) {
    let todoIndex = this.todos.findIndex(t => t.id === todoId);
    this.todos[todoIndex].done = !this.todos[todoIndex].done;
    return this.todos[todoIndex];
  }

}
