import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import App from '../index';

describe('<App />', () => {
  it('renders', () => {
    const fakeStore = {
      default: () => {},
      subscribe: () => {},
      dispatch: () => {},
      getState: () => ({ home: () => {} })
    };
    const fakeRoute = {
      routes: [
        {
          path: '/',
          exact: true,
          component: () => (
            <div>
              <h1>This is Home!</h1>
            </div>
          )
        }
      ]
    };

    const fakeLocation = {
      pathname: '/'
    };

    const tree = renderer
      .create(
        <Provider store={fakeStore}>
          <MemoryRouter>
            <App route={fakeRoute} location={fakeLocation} />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
