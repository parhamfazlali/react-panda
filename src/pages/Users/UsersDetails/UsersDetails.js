/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Avatar, Button } from 'antd';
import { get } from 'lodash';

import { load as loadUser } from 'actions/users.action';
import StyleWrapper from './usersDetails.style';

type Props = {
  history: Object,
  params: Object,
  users: Object,
  loadUser: Function
};

type State = {};

// Export this for unit testing more easily
export class UsersDetails extends PureComponent<Props, State> {
  componentDidMount() {
    const { params, loadUser: loadPromise } = this.props;
    console.log('params', params);
    loadPromise(params.id);
  }

  // Back to users list page handler
  handleBack = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { users } = this.props;
    const usersDate = get(users, 'data.data', []);

    return (
      <StyleWrapper>
        <Helmet title="New User" />
        <div className="back-to-list">
          <Button
            size="large"
            type="primary"
            shape="round"
            icon="left"
            onClick={this.handleBack}
          >
            Back to list
          </Button>
        </div>

        <div className="user--details">
          <div className="details--avatar">
            <Avatar size={120} src={usersDate.avatar} />
          </div>

          <div className="details--fullname">
            {usersDate.first_name} {usersDate.last_name}
          </div>

          <div className="details--email">{usersDate.email}</div>
        </div>
      </StyleWrapper>
    );
  }
}

const mapStateToProps = ({ users }: Object) => ({ users: users.detail });

const mapDispatchToProps = { loadUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersDetails);
