import React from 'react';
import firapp from './firebase/Credentials';
import { getAuth, signOut } from 'firebase/auth';
import EmployeeV from './views/EmployeeV';
import AdministatorV from './views/AdministatorV';

function Home({ user }) {
  const auth = getAuth(firapp);

  return (
    <div>
      <div style={{ textAlign: 'right' }}>
        <button onClick={() => signOut(auth)}>Cerrar sesión</button>
      </div>

      <div style={{ textAlign: 'left' }}>
        {user.rol == 'administrador' ? (
          <AdministatorV user={user} />
        ) : (
          <EmployeeV user={user} />
        )}
      </div>
    </div>
  );
}

export default Home;
