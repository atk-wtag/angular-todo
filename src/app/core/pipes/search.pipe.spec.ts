import {LoadMoreService} from '../services/loadmore/load-more.service';
import {SearchPipe} from './search.pipe';

describe('SearchPipe', () => {
  it('create an instance', () => {
    const pipe = new SearchPipe(new LoadMoreService());
    expect(pipe).toBeTruthy();
  });
});
