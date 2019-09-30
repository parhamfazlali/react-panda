/* @flow */

import React, { PureComponent } from 'react';
import { Avatar } from 'antd';

import StyleWrapper from './usersCard.style';

type Props = {
  user: Object,
  onClick: Function
};

type State = {};

class UsersCard extends PureComponent<Props, State> {
  render() {
    const { user, onClick } = this.props;

    return (
      <StyleWrapper>
        {user.map(item => (
          <div key={item.id} className="card--item">
            <div
              className="item--innerbox"
              role="presentation"
              onClick={() => onClick(item.id)}
            >
              <div className="user-avatar">
                <Avatar size={120} src={item.avatar} />
              </div>

              <div className="user-fullname">
                {item.first_name} {item.last_name}
              </div>

              <div className="user-email">{item.email}</div>
            </div>
          </div>
        ))}
      </StyleWrapper>
    );
  }
}

export default UsersCard;
