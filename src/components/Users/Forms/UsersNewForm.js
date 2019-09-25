/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';

import type { Connector } from 'react-redux';

import {
  InputCheckbox,
  InputDate,
  InputNumber,
  InputRadio,
  InputSelect,
  InputText,
  InputTextArea,
  SubmitButton
} from 'components/FormElements';
import StyleWrapper from './usersNewForm.style';

type Props = {
  submitting: boolean,
  handleSubmit: Function
};

const USERS_NEW_FORM = 'usersNewForm';

class UsersNewForm extends PureComponent<Props> {
  genderOptions = [
    { title: 'Man', value: 'man' },
    { title: 'Woman', value: 'woman' }
  ];

  jobOptions = [
    { label: 'Designer', name: 'Designer', key: 'designer' },
    { label: 'Teacher', name: 'Teacher', key: 'teacher' },
    { label: 'Web Developer', name: 'Web Developer', key: 'web_developer' }
  ];

  render() {
    const { submitting, handleSubmit } = this.props;
    return (
      <StyleWrapper>
        <form>
          <Field
            name="first_name"
            size="large"
            component={InputText}
            label="First name"
          />

          <Field
            name="last_name"
            size="large"
            component={InputText}
            label="Last name"
          />

          <Field
            name="gender"
            size="large"
            component={InputRadio}
            options={this.genderOptions}
            label="Gender"
          />

          <Field
            name="job"
            size="large"
            label="Job"
            component={InputSelect}
            options={this.jobOptions}
          />

          <Field
            name="childs"
            size="large"
            label="Childs"
            component={InputNumber}
          />

          <Field
            name="birthday"
            size="large"
            label="Birthday"
            component={InputDate}
          />

          <Field name="bio" label="Bio" component={InputTextArea} />

          <Field
            name="agreement"
            size="large"
            label="I agree the terms and conditions"
            component={InputCheckbox}
          />

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
