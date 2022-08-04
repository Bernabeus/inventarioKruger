import React, { useState } from 'react';
import Form from './Form';

function Login() {
  return (
    <div style={{ margin: '0 auto' }}>
      <h1>¡Bienvenido, ingresa tus credenciales aqui!</h1>
      <div>
        <Form />
      </div>
    </div>
  );
}

export default Login;
