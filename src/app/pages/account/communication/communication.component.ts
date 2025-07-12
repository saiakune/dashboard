import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';


export interface Message {
  id: string;
  type: string;
  subject: string;
  sender: string;
  content: string;
  date: string;
  attachments: number;
  hasReply: boolean;
  status: string;
  badge?: string;
}

@Component({
  selector: 'app-communication',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './communication.component.html',
  styleUrl: './communication.component.scss',
})
export class CommunicationComponent implements OnInit {
  messages: Message[] = [];
  filteredMessages: Message[] = [];

  activeTab = 'RECENT';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.http
      .get<{ communications: Message[] }>('assets/mock/account-details.json')
      .subscribe({
        next: (response) => {
          this.messages = response.communications;
          this.filterMessages();
        },
        error: (err) => {
          console.error('Failed to load communications', err);
        },
      });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.filterMessages();
  }

  filterMessages(): void {
    if (this.activeTab === 'RECENT') {
      this.filteredMessages = [...this.messages].sort((a, b) => {
        const aDate = a.date ? new Date(a.date) : new Date(0);
        const bDate = b.date ? new Date(b.date) : new Date(0);
        return bDate.getTime() - aDate.getTime();
      });
    } else if (this.activeTab === 'GROUP') {
      this.filteredMessages = [...this.messages];
    }
  }

  replyToMessage(messageId: string): void {
    console.log('Reply to message:', messageId);
  }

  submitMessage(messageId: string): void {
    console.log('Submit message:', messageId);
  }

  manageMessages(): void {
    console.log('Manage messages');
  }
}