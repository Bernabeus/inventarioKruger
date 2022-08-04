# Perfil a aplicar: front end

## Creacion de la aplicación

Esta aplicacion fue creada con el comando:

### `npx create-react-app <nombre de la aplicación>`

## Ejecutar la aplicación

Para lanzar la aplicación en modo desarrollo se debe correr el comando:

### `npm start`

He ingresar a [http://localhost:3000](http://localhost:3000) en un navegador de preferencia. Conforme vayamos realizando cambios en los archivos de la aplicación se veran actualizados.

Para construir la aplicación para producion se necesita el siguiente comando:

### `npm run build`

Se construira el app en la carpeta `build`. Con esto se optimizara la compilacion para obtener un mejor rendimiento.

## Construcción de la aplicación

Para su construccion se utilizaron algunas librerias y herramientas para su diseño como: 

Boostrap para otorgarle estilos a la app.
React hook foorm para crear los formularios.
Yup para validar la informacion de cada formulario.
Visual Studio Code para editar mis archivos en el proyecto.
Y para el backend se utilizo Firebase en la parte de Autenticacion y como base de datos la parte de Firestore.
 
### Primer proceso de construcción

Para comenzar con la tarea de realizar las historias de usuario la app necesitaba de una pagina inicial que serviria para el inicio de sesion de los empleados o administradores. Este inicio de sesion recogeria el correo electronico y la constraseña del usuario utilizando un formulario con hook form ademas de yup para sus validaciones y los comprobaria con la autenticación en firebase para verificar si estan en el sistema. 

![image](https://user-images.githubusercontent.com/58036212/182850024-ce5912b9-c816-4516-9691-b4c3c89c8991.png)

Ya sea que el usuario ingresara un email de tipo administrador o de empleado la app reconoceria que tipo de cuenta es y la ingresaria a la respectiva pantalla, que le corresponde. La cuenta de administrador usada es `bernabe@gmail.com` con contraseña `123456`.

### Proceso para registrar empleado

Al ingresar con la cuenta de administrador, se desplegará una pantalla, como se muestra en la siguiente imagen, la cual tiene un formulario creado con hook form para ingresar los datos del empleado a registrar, que son cédula, nombres, apellidos y correo electrónico. Todos estos campos en el formulario tienen todas las validaciones que se requieran en la primera historia de usuario, para esto se utilizo yup para que los usuarios solo ingresaran la informacion que se les pide. 

![image](https://user-images.githubusercontent.com/58036212/182851684-09ff2733-ab27-4252-9b98-7a0a002549ba.png)

Cabe decir que cuando se registre un nuevo empleado se le creará un cuenta utilizando la autenticaion de firebase ademas de añadir todos los datos y los restantes del usuario a la base de datos firestore de firebase, la cual usara su correo electrónico y una contraseña construida con su información personal, para esta se tomará las primeras cuatro letras de su nombre y los últimos dígitos de su cédula.

La construccion de la aplicación se quedo hasta este punto.


