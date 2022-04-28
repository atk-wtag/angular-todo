import { LoadMoreService } from 'src/app/services/loadmore/load-more.service';
import { NoTodosService } from 'src/app/services/NoTodos/no-todos.service';
import { CountPipe } from './count.pipe';

describe('CountPipe', () => {
  it('create an instance', () => {
    const pipe = new CountPipe(new LoadMoreService(), new NoTodosService());
    expect(pipe).toBeTruthy();
  });
});
