import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { MyCheckbox, MyInput, MySelect } from '../components';
import '../styles/styles.css';

const FormikAbstractation = () => {
  return (
    <div>
      <h1>Formik Abstractation Tutorial</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          terms: false,
          jobType: '',
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, 'Debe de tener 15 caracteres o menos')
            .required('Requerido'),
          lastName: Yup.string()
            .max(15, 'Debe de tener 15 caracteres o menos')
            .required('Requerido'),
          email: Yup.string()
            .email('Correo no tiene un formato válido')
            .required('Requerido'),
          terms: Yup.boolean().oneOf([true], 'Debe de aceptar las condiciones'),
          jobType: Yup.string()
            .notOneOf(['it-junior'], 'Esta opcion no es permitida')
            .required('Requerido'),
        })}
      >
        {(formik) => (
          <Form>
            <MyInput label="First Name" name="firstName" placeholder="First Name" />

            <MyInput label="Last Name" name="lastName" placeholder="Last Name" />

            <MyInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="Email"
            />

            <MySelect label="Job Type" name="jobType">
              <option value="">Pick something</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="it-senior">IT Senior</option>
              <option value="it-junior">IT Junior</option>
            </MySelect>

            <MyCheckbox label="Terms & Conditions" name="terms" />

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikAbstractation;
