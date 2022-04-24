import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Todo} from "../../models/todo.model";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) {
  }


  getAllTodos(): Observable<Todo[]> {
    const x = this.httpClient.get<Todo[]>('https://vpmtafvtfkzjqayxfuhp.supabase.co/rest/v1/todos');
    console.log(x)
    return x;
  }
}
