import {LoadMoreService} from 'src/app/core/services/loadmore/load-more.service';
import {NoTodosService} from 'src/app/core/services/NoTodos/no-todos.service';
import {CountPipe} from './count.pipe';

describe('CountPipe', () => {
  it('create an instance', () => {
    const pipe = new CountPipe(new LoadMoreService(), new NoTodosService());
    expect(pipe).toBeTruthy();
  });
});
