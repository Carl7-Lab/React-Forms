import { ErrorMessage, useField } from 'formik';

interface Props {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  [x: string]: any;
}

const MyInput = ({ label, ...props }: Props) => {
  const [field] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" id={props.id || props.name} {...field} {...props} />
      <ErrorMessage name={props.name} component="span" />
    </>
  );
};

export default MyInput;
