import React, { useState } from 'react';
import firapp from '../firebase/Credentials';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
//const auth = getAuth(firapp);
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[aA-zZ\s]+$/, 'Solo debe contener letras')
    .required('Este campo es obligatorio'),
  lastN: yup
    .string()
    .matches(/^[aA-zZ\s]+$/, 'Solo debe contener letras')
    .required('Este campo es obligatorio'),
  email: yup
    .string()
    .email('Ingrese un correo válido')
    .required('Este campo es obligatorio'),
  cedula: yup
    .string()
    .matches(/^[0-9]+$/)
    .min(10, 'Debe contener solo 10 digitos')
    .max(10, 'Debe contener solo 10 digitos')
    .required('Este campo es obligatorio'),
});

function AdministatorV({ user }) {
  const auth = getAuth();
  const firestore = getFirestore();
  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [result, setResult] = useState('');
  const [errorsList, setErrorsList] = useState([]);

  const register = async (formData) => {
    try {
      const userData = {
        ...formData,
      };
      const cedul = String(userData.cedula);
      const lastP = cedul.substring(cedul.length - 4);
      const passw = userData.name.substring(0, 4) + '' + lastP;
      registrarEmpleado(userData, passw);
      //reset();
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

  async function registrarEmpleado(userData, password) {
    createUserWithEmailAndPassword(auth, userData.email, password)
      .then((userCredential) => {
        const userE = userCredential.user.uid;
        const docuRef = doc(firestore, `usuariosK/${userE}`);
        setDoc(docuRef, {
          cedula: userData.cedula,
          nombres: userData.name,
          apellidos: userData.lastN,
          correo: userData.email,
          fechaNacimiento: '',
          direccionD: '',
          telefonoM: '',
          estadoVac: '',
          tipoVac: '',
          fechaVac: '',
          numeroD: '',
          rol: 'empleado',
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  return (
    <>
      <div>
        <h1>Registrar empleado</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit(register)}>
          <div>
            <Controller
              name="cedula"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Cédula"
                  label="cedula"
                  type="number"
                  maxLength="10"
                />
              )}
            />
            <p style={{ color: '#ff0000' }}> {errors.cedula?.message}</p>
          </div>
          <div>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Nombres"
                  label="name"
                  type="text"
                />
              )}
            />
            <p style={{ color: '#ff0000' }}> {errors.name?.message}</p>
          </div>
          <div>
            <Controller
              name="lastN"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Apellidos"
                  label="lastN"
                  type="text"
                />
              )}
            />
            <p style={{ color: '#ff0000' }}> {errors.lastN?.message}</p>
          </div>
          <div>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Correo Electrónico"
                  label="email"
                  type="email"
                />
              )}
            />
            <p style={{ color: '#ff0000' }}> {errors.email?.message}</p>
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
            <button type="submit">Registrar empleado</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AdministatorV;
