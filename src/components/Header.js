import React from 'react';

const Header = () => {
  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-success">
          <div style={{ margin: '0.7rem', textAlign: 'center' }}>
            <h2 className="navbar-brand ">
              Inventario de vacunación de empleados - Kruger
            </h2>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
