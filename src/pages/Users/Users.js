/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { get } from 'lodash';

import { loadAll as loadAllUsers } from 'actions/users.action';
import StyleWrapper from './users.style';

type Props = { users: Object, loadAllUsers: () => void };

// Export this for unit testing more easily
export class Users extends PureComponent<Props> {
  componentDidMount() {
    const { loadAllUsers: loadAllPromise } = this.props;
    loadAllPromise();
  }

  renderUserList = () => {
    const { users } = this.props;

    const usersList = get(users, 'data.data', []);

    if (users.fetching) return <p>Loading...</p>;

    return (
      <div>
        <h4>Users List</h4>
        <ul>
          {usersList.map(item => (
            <li key={item.id}>
              <div>
                <img src={item.avatar} alt="" />
              </div>
              <p>{item.first_name}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  render() {
    return (
      <StyleWrapper>
        <Helmet title="Users" />
        {this.renderUserList()}
      </StyleWrapper>
    );
  }
}

const mapStateToProps = ({ users }: Object) => ({ users });

const mapDispatchToProps = { loadAllUsers };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
