/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';

import type { Connector } from 'react-redux';

import { InputText, SubmitButton } from 'components/FormElements';
import StyleWrapper from './usersNewForm.style';

type Props = {
  submitting: boolean,
  handleSubmit: Function
};

const USERS_NEW_FORM = 'usersNewForm';

class UsersNewForm extends PureComponent<Props> {
  componentDidMount() {}

  render() {
    const { submitting, handleSubmit } = this.props;
    return (
      <StyleWrapper>
        <form>
          <Field
            name="name"
            size="large"
            component={InputText}
            label="User name"
          />
          <Field name="job" size="large" component={InputText} label="Job" />

          <SubmitButton
            label="Add user"
            size="large"
            type="primary"
            shape="round"
            icon="check"
            loading={submitting}
            disabled={submitting}
            onSubmit={handleSubmit}
          />
        </form>
      </StyleWrapper>
    );
  }
}

const connector: Connector<{}> = connect();

export default compose(
  withRouter,
  connector,
  reduxForm({
    form: USERS_NEW_FORM
  })
)(UsersNewForm);
