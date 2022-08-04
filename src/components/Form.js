import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import firapp from './firebase/Credentials';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
const auth = getAuth(firapp);

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Ingrese un correo válido')
    .required('Este campo es obligatorio'),
  password: yup
    .string()
    .min(6, 'Se debe escribir minimo seis caracteres')
    .required('Este campo es obligatorio'),
});

const Form = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [result, setResult] = useState('');
  const [errorsList, setErrorsList] = useState([]);

  const onFinishLog = async (formData) => {
    try {
      const userData = {
        ...formData,
      };

      signInWithEmailAndPassword(auth, userData.email, userData.password)
        .then((userCredential) => {})
        .catch((error) => {
          setResult('Contraseña o email ingresados incorrectamente');
        });
    } catch (e) {
      const { response } = e;
      if (response) {
        if (response.data.errors) {
          const errors = response.data.errors;
          const newErrorList = [];

          for (let field in errors) {
            newErrorList.push(...errors[field]);
          }
          setErrorsList(newErrorList);
        }
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onFinishLog)}>
        <div>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                placeholder="Correo Electrónico"
                label="Correo electrónico"
                type="email"
              />
            )}
          />
          <p style={{ color: '#ff0000' }}> {errors.email?.message}</p>
        </div>
        <div>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                placeholder="Contraseña"
                label="Correo electrónico"
                type="password"
              />
            )}
          />

          <p style={{ color: '#ff0000' }}>{errors.password?.message}</p>
        </div>
        <p style={{ color: '#ff0000' }}>{result}</p>
        {errorsList.length > 0 && (
          <ul>
            {errorsList.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        <div>
          <button type="submit">Iniciar Sesion</button>
        </div>
      </form>
    </>
  );
};

export default Form;
