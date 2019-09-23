/* @flow */

import React, { PureComponent } from 'react';
import { Avatar } from 'antd';

import StyleWrapper from './usersDetails.style';

type Props = {
  user: Object
};

type State = {};

class UsersDetails extends PureComponent<Props, State> {
  render() {
    const { user } = this.props;

    return (
      <StyleWrapper>
        <div className="user-avatar">
          <Avatar size={120} src={user.avatar} />
        </div>

        <div className="user-fullname">
          {user.first_name} {user.last_name}
        </div>

        <div className="user-email">{user.email}</div>
      </StyleWrapper>
    );
  }
}

export default UsersDetails;
