import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  users = ['User 1', 'User 2'];

  getUsers(): string[] {
    return this.users;
  }
}