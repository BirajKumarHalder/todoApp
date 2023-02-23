import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.page.html',
  styleUrls: ['./add-todo.page.scss'],
})
export class AddTodoPage {

  title = '';
  date = '';
  time = '';
  constructor(private todoSvc: TodoService, private modalCtrl: ModalController) { }

  cancel() {
    return this.modalCtrl.dismiss('cancel');
  }

  save() {
    const todo: Todo = { "id":0, "title": this.title, "done": false, "date": this.date, "time": this.time };
    this.todoSvc.add(todo);
    return this.modalCtrl.dismiss('confirm');
  }

}
