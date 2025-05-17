import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageFormComponent } from './message-form/message-form.component';
import { MessageListComponent } from './message-list/message-list.component';
import { MessagesService } from './messages.service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, MessageFormComponent, MessageListComponent],
  template: `
    <div class="container mt-4">
      <h1 class="mb-4">User Messages</h1>
      <div class="row">
        <div class="col-md-6">
          <app-message-form></app-message-form>
        </div>
        <div class="col-md-12 mt-4">
          <app-message-list></app-message-list>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class MessagesComponent {
  constructor(private messagesService: MessagesService) {}
} 