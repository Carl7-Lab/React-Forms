import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import formJson from '../data/custom-form.json';
import { MyInput, MySelect } from '../components';

const DynamicForms = () => {
  const initialValues: { [key: string]: any } = {};
  const fieldsValidations: { [key: string]: any } = {};

  for (const input of formJson) {
    initialValues[input.name] = input.value;
    if (!input.validations) continue;
    let schema = Yup.string();
    for (const rule of input.validations) {
      if (rule.type === 'required') {
        schema = schema.required('Este campo es requerido');
      }
      if (rule.type === 'minLength') {
        schema = schema.min(
          (rule as any).value || 1,
          `Mínimo de ${(rule as any).value || 2} caracteres`,
        );
      }
      if (rule.type === 'email') {
        schema = schema.email('Correo no tiene un formato válido');
      }
      // ... otras reglas
    }

    fieldsValidations[input.name] = schema;
  }

  const validationSchema = Yup.object({ ...fieldsValidations });
  return (
    <div>
      <h1>Dynamic Form</h1>

      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form>
            {formJson.map(({ label, placeholder, name, type, options }) => {
              if (type === 'input' || type === 'email' || type === 'password') {
                return (
                  <MyInput
                    key={name}
                    type={type as any}
                    label={label}
                    name={name}
                    placeholder={placeholder}
                  />
                );
              } else if (type === 'select') {
                return (
                  <MySelect key={name} label={label} name={name}>
                    <option value="">Select an option</option>
                    {options?.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </MySelect>
                );
              }
              return <span>Type: {type} no es soportado</span>;
            })}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DynamicForms;
