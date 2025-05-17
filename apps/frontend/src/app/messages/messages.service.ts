import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message, CreateMessageDto } from './message.model';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private apiUrl = '/api/messages';

  constructor(private http: HttpClient) {}

  createMessage(message: CreateMessageDto): Observable<Message> {
    return this.http.post<Message>(this.apiUrl, message);
  }

  getMessages(page: number = 1, limit: number = 3): Observable<{ items: Message[]; total: number }> {
    return this.http.get<{ items: Message[]; total: number }>(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }
} 