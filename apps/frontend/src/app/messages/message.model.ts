export interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export interface CreateMessageDto {
  name: string;
  email: string;
  message: string;
} 