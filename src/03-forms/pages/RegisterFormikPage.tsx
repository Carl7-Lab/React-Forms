import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { MyInput } from '../components';
import '../styles/styles.css';

const RegisterFormikPage = () => {
  const VALID_PASSWORD_REGEX =
    /^(?=.*?[A-Z])(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*?[a-z])(?=.*?[0-9]).{8,20}$/;
  return (
    <div>
      <h1>Register Formik Page</h1>

      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(15, 'Debe de tener 15 caracteres o menos')
            .min(2, 'Debe de tene 2 caracteres como minimo')
            .required('Requerido'),
          email: Yup.string()
            .email('Correo no tiene un formato válido')
            .required('Requerido'),
          password: Yup.string()
            .min(8, 'Debe de tener 8 caracteres como minimo')
            .max(20, 'No debe superar los 20 caracteres')
            .required('Requerido')
            .matches(
              VALID_PASSWORD_REGEX,
              'La contraseña debe tener al menos 8 caracteres,' +
                'una mayúscula, una minúscula, un número y un carácter especial',
            ),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), undefined], 'Las contraseñas deben ser iguales')
            .required('Requerido'),
        })}
      >
        {(formik) => (
          <Form>
            <MyInput label="Name" name="name" placeholder="Name" />
            <MyInput
              label="Email Address"
              type="email"
              name="email"
              placeholder="Email"
            />
            <MyInput
              label="Password"
              type="password"
              name="password"
              placeholder="Password"
            />
            <MyInput
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
            />
            <button type="submit">Create</button>
            <button type="button" onClick={formik.handleReset} className="reset-button">
              Reset Form
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterFormikPage;
