import * as yup from 'yup';

export const AdoptFormSchema = yup.object().shape({
    firstName: yup.string()
      .min(2, 'Your first name is atleast more than one character')
      .required('Required'),
    lastName: yup.string()
      .min(2, 'Your Last name is atleast more than one character')
      .required('Required'),
    email: yup.string().email('Please enter valid email').required('Required'),
    phone: yup.string()
         .matches(/^\d{11}$/, 'Phone number is not valid')
        .required('Required')
  });