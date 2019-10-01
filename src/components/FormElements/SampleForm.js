/* @flow */

import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';

import { isFill } from 'utils/validation';
import {
  InputCheckbox,
  InputDate,
  InputNumber,
  InputRadio,
  InputSelect,
  InputText,
  InputTime,
  InputTextArea,
  SubmitButton
} from 'components/FormElements';

type Props = {
  submitting: boolean,
  handleSubmit: Function
};

type State = {
  afterChangeState: boolean
};
const USERS_NEW_FORM = 'SampleForm';

class SampleForm extends PureComponent<Props, State> {
  state = {
    afterChangeState: false
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

  validate = {
    isFill: isFill()
  };

  handleTextArea = text => {
    console.log('handleTextArea', text);
  };

  render() {
    const { submitting, handleSubmit } = this.props;
    const { afterChangeState } = this.state;
    return (
      <div>
        <form>
          <Field name="name" size="large" component={InputText} label="Name" />

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
          {afterChangeState ? (
            <Field
              name="bio"
              label="Bio"
              component={InputTextArea}
              afterChange={() => {}}
              validate={this.validate.isFill}
            />
          ) : (
            <Field
              name="bio"
              label="Bio"
              component={InputTextArea}
              validate={this.validate.isFill}
            />
          )}

          <Field
            name="agreement"
            size="large"
            label="I agree the terms and conditions"
            component={InputCheckbox}
          />

          <Field
            name="agreement"
            size="large"
            label="I agree the terms and conditions"
            component={InputTime}
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
      </div>
    );
  }
}

export default compose(
  reduxForm({
    form: USERS_NEW_FORM
  })
)(SampleForm);
