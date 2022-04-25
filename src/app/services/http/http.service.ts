import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  getAllDescending(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(
      'https://vpmtafvtfkzjqayxfuhp.supabase.co/rest/v1/todos?order=u_id.desc'
    );
  }
}
