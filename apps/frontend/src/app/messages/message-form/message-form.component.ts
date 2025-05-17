import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MessagesService } from '../messages.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="card p-4 mb-4">
      <h2 class="mb-3">Send a Message</h2>
      <form [formGroup]="messageForm" (ngSubmit)="onSubmit()">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input 
            type="text" 
            id="name" 
            formControlName="name" 
            class="form-control"
            [ngClass]="{'is-invalid': submitted && f['name'].errors}"
          />
          <div *ngIf="submitted && f['name'].errors" class="invalid-feedback">
            <div *ngIf="f['name'].errors['required']">Name is required</div>
          </div>
        </div>

        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input 
            type="email" 
            id="email" 
            formControlName="email" 
            class="form-control"
            [ngClass]="{'is-invalid': submitted && f['email'].errors}"
          />
          <div *ngIf="submitted && f['email'].errors" class="invalid-feedback">
            <div *ngIf="f['email'].errors['required']">Email is required</div>
            <div *ngIf="f['email'].errors['email']">Email must be valid</div>
          </div>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">Message</label>
          <textarea 
            id="message" 
            formControlName="message" 
            class="form-control" 
            rows="4"
            [ngClass]="{'is-invalid': submitted && f['message'].errors}"
          ></textarea>
          <div *ngIf="submitted && f['message'].errors" class="invalid-feedback">
            <div *ngIf="f['message'].errors['required']">Message is required</div>
          </div>
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  `,
  styles: `
    .form-control.is-invalid {
      border-color: #dc3545;
    }
    .invalid-feedback {
      color: #dc3545;
    }
  `
})
export class MessageFormComponent {
  messageForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private messagesService: MessagesService
  ) {
    this.messageForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  get f() { return this.messageForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.messageForm.invalid) {
      return;
    }

    this.messagesService.createMessage(this.messageForm.value).subscribe({
      next: () => {
        this.submitted = false;
        this.messageForm.reset();
        // You could emit an event here to refresh the message list
      },
      error: (error) => {
        console.error('Error creating message', error);
      }
    });
  }
} 