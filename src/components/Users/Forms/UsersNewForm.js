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
import { validation } from 'utils';
import StyleWrapper from './usersNewForm.style';

type Props = {
  submitting: boolean,
  handleSubmit: Function
};

const USERS_NEW_FORM = 'usersNewForm';

class UsersNewForm extends PureComponent<Props> {
  validate = {
    isEmail: validation.isEmail(),
    isFill: validation.isFill(),
    isName: validation.isName()
  };

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
            validate={[this.validate.isFill, this.validate.isName]}
          />

          <Field
            name="last_name"
            size="large"
            component={InputText}
            label="Last name"
            validate={[this.validate.isFill]}
          />

          <Field
            name="email"
            size="large"
            component={InputText}
            label="Email"
            validate={[this.validate.isFill, this.validate.isEmail]}
          />

          <Field
            name="gender"
            size="large"
            component={InputRadio}
            options={this.genderOptions}
            label="Gender"
            validate={[this.validate.isFill]}
          />

          <Field
            name="job"
            size="large"
            label="Job"
            component={InputSelect}
            options={this.jobOptions}
            validate={[this.validate.isFill]}
          />

          <Field
            name="childs"
            size="large"
            label="Childs"
            component={InputNumber}
            validate={[this.validate.isFill]}
          />

          <Field
            name="birthday"
            size="large"
            label="Birthday"
            component={InputDate}
            validate={[this.validate.isFill]}
          />

          <Field name="bio" label="Bio" component={InputTextArea} />

          <Field
            name="agreement"
            size="large"
            label="I agree the terms and conditions"
            component={InputCheckbox}
            validate={[this.validate.isFill]}
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
