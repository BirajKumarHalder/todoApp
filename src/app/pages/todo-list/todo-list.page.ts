import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo';
import { ModalController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { AddTodoPage } from '../add-todo/add-todo.page';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
})
export class TodoListPage implements OnInit {

  todoList: Todo[] = [];
  constructor(private todoSvc: TodoService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.getAllTodos();
  }

  getAllTodos() {
    this.todoSvc.all().subscribe(res => {
      this.todoList = res as Todo[];
      console.log(this.todoList);
    })
  }

  markTodoDone(todoId: number) {
    const todo = this.todoSvc.markDone(todoId);
    let todoIndex = this.todoList.findIndex(t => t.id === todoId);
    this.todoList[todoIndex] = todo;
    console.log(this.todoList);
  }

  async openAddTodo() {
    const modal = await this.modalCtrl.create({
      component: AddTodoPage
    });
    modal.present();
    const { data } = await modal.onWillDismiss();
    if (data === 'confirm') {
      this.getAllTodos();
    }
  }

}
