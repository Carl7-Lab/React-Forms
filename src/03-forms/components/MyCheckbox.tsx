import { ErrorMessage, useField } from 'formik';

interface Props {
  label: string;
  name: string;
  [x: string]: any;
}

const MyCheckbox = ({ label, ...props }: Props) => {
  const [field] = useField({ ...props, type: 'checkbox' });

  return (
    <>
      <label>
        <input type="checkbox" {...field} {...props} />
        {label}
      </label>
      <ErrorMessage name={props.name} component="span" />
    </>
  );
};

export default MyCheckbox;
