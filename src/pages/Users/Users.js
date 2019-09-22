/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { loadAll as loadAllUsers } from 'actions/users.action';
import styles from './styles.scss';

type Props = { users: Object, loadAllUsers: () => void };

// Export this for unit testing more easily
export class Users extends PureComponent<Props> {
  componentDidMount() {
    const { loadAllUsers: loadAllPromise } = this.props;

    loadAllPromise();
  }

  renderUserList = () => {
    const { users } = this.props;

    if (users.fetching) return <p>Loading...</p>;

    // if (
    //   !home.readyStatus ||
    //   home.readyStatus === 'USERS_INVALID' ||
    //   home.readyStatus === 'USERS_REQUESTING'
    // )
    //   return <p>Loading...</p>;

    // if (home.readyStatus === 'USERS_FAILURE')
    //   return <p>Oops, Failed to load list!</p>;

    // return <UserList list={home.list} />;

    return <div>hi</div>;
  };

  render() {
    return (
      <div className={styles.Home}>
        <Helmet title="Users" />
        {this.renderUserList()}
      </div>
    );
  }
}

const mapStateToProps = ({ users }: Object) => ({ users });

const mapDispatchToProps = { loadAllUsers };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
