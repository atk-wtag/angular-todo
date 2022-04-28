import {Injectable} from '@angular/core';
import {createClient, SupabaseClient} from '@supabase/supabase-js';
import {environment} from 'src/environments/environment';
import {Todo} from '../../../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private readonly _supabase: SupabaseClient;

  constructor() {
    this._supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  get allTodos() {
    return this._supabase
      .from<Todo>('todos')
      .select('*', {count: 'exact'})
      .order('u_id', {ascending: false});
  }

  get incompleteTodos() {
    return this._supabase
      .from('todos')
      .select('*', {count: 'exact'})
      .match({completed: false})
      .order('u_id', {ascending: true});
  }

  get completeTodos() {
    return this._supabase
      .from('todos')
      .select('*', {count: 'exact'})
      .match({completed: true})
      .order('u_id', {ascending: true});
  }
}
