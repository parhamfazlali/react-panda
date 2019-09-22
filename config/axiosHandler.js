import axios from 'axios';
import FormData from 'form-data';
import { isEmpty, isNumber } from 'lodash';
import config from './index';
/* eslint no-restricted-syntax: "off" */

function createFormData(object, form, namespace) {
  const formData = form || new FormData();

  for (const property in object) {
    if (
      Object.hasOwnProperty.call(object, property) &&
      (!isEmpty(object[property]) || isNumber(object[property]))
    ) {
      const propertyResult = Number.isNaN(Number(property)) ? property : '';
      const formKey = namespace ? `${namespace}[${propertyResult}]` : property;
      if (object[property] instanceof Date) {
        formData.append(formKey, object[property].toISOString());
      } else if (
        typeof object[property] === 'object' &&
        !(object[property] instanceof File)
      ) {
        createFormData(object[property], formData, formKey);
      } else {
        formData.append(formKey, object[property]);
      }
    }
  }
  return formData;
}

global.createFormData = createFormData;

function baseURL() {
  return `${config.apiUrl}`;
}

// headers: { 'content-type': 'multipart/form-data' }
const axiosHandler = ({ files: filesForm, isExternal, ...configuration }) => {
  const params = { ...configuration };

  if (filesForm) {
    const formData = createFormData(filesForm);
    params.data = formData;
  }

  if (!isExternal) {
    params.baseURL = baseURL();
  }

  return axios(params);
};

export default axiosHandler;
