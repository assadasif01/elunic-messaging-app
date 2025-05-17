import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesService } from '../messages.service';
import { Message } from '../message.model';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [CommonModule, TableModule, PaginatorModule, CardModule],
  template: `
    <div class="card p-4">
      <h2 class="mb-3">Messages</h2>
      
      <p-table [value]="messages" styleClass="p-datatable-sm" [tableStyle]="{ 'min-width': '50rem' }">
        <ng-template pTemplate="header">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-message>
          <tr>
            <td>{{ message.name }}</td>
            <td>{{ message.email }}</td>
            <td>{{ message.message }}</td>
            <td>{{ message.createdAt | date:'medium' }}</td>
          </tr>
        </ng-template>
        <ng-template pTemplate="emptymessage">
          <tr>
            <td colspan="4" class="text-center p-4">No messages found.</td>
          </tr>
        </ng-template>
      </p-table>
      
      <p-paginator 
        [rows]="pageSize" 
        [totalRecords]="totalMessages" 
        [rowsPerPageOptions]="[3, 5, 10]"
        (onPageChange)="onPageChange($event)">
      </p-paginator>
    </div>
  `,
  styles: ``
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];
  currentPage = 1;
  pageSize = 3;
  totalMessages = 0;

  constructor(private messagesService: MessagesService) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.messagesService.getMessages(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.messages = data.items;
        this.totalMessages = data.total;
      },
      error: (error) => {
        console.error('Error loading messages', error);
      }
    });
  }

  onPageChange(event: any): void {
    this.currentPage = event.page + 1;
    this.pageSize = event.rows;
    this.loadMessages();
  }
} 