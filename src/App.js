import React, { useState } from 'react';
import Login from './components/Login';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import firapp from './components/firebase/Credentials';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

function App() {
  const auth = getAuth(firapp);
  const db = getFirestore(firapp);
  const [user, setUser] = useState(null);

  async function getRol(uid) {
    const docRef = doc(db, 'usuariosK', uid);
    const docSnap = await getDoc(docRef);
    let dataR = 0;
    if (docSnap.exists()) {
      //console.log('Document data:', docSnap.data());
      dataR = docSnap.data();
    } else {
      console.log('No such document!');
    }
    return dataR;
  }

  onAuthStateChanged(auth, (userF) => {
    if (userF) {
      if (!user) {
        getRol(userF.uid).then((dataR) => {
          const userData = {
            uid: userF.uid,
            email: userF.email,
            rol: dataR.rol,
          };
          setUser(userData);
        });
      }
    } else {
      setUser(null);
    }
  });

  return (
    <div>
      <Header />
      <div style={{ margin: '1rem', textAlign: 'center' }}>
        {user ? <Home user={user} /> : <Login />}
      </div>
      <Footer />
    </div>
  );
}

export default App;
