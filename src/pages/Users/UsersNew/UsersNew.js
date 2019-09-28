/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { initialize } from 'redux-form';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import { Button, notification } from 'antd';

import type { Connector } from 'react-redux';

import { create as createUser } from 'actions/users.action';
import { UsersNewForm } from 'components';
import StyleWrapper from './usersNew.style';

type Props = {
  history: Object,
  createUser: Function,
  initialize: Function
};

type State = {};

// Export this for unit testing more easily
export class UsersNew extends PureComponent<Props, State> {
  // Create new user handler
  handleCreateUser = (data: Object) => {
    const {
      createUser: createPromise,
      initialize: initializeForm
    } = this.props;

    const USERS_NEW_FORM = 'usersNewForm';

    return createPromise(data)
      .then(() => {
        notification.success({
          message: 'Success',
          description: 'User created successfully'
        });
        initializeForm(USERS_NEW_FORM, {});
      })
      .catch(() => {
        notification.error({
          message: 'Error',
          description: 'Something went wrong!'
        });
      });
  };

  // Back to users list page handler
  handleBack = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
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

        <UsersNewForm onSubmit={this.handleCreateUser} />
      </StyleWrapper>
    );
  }
}

const connector: Connector<{}> = connect(
  undefined,
  {
    createUser,
    initialize
  }
);
export default compose(
  withRouter,
  connector
)(UsersNew);
