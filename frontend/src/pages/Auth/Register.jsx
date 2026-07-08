/* Para Agus: Desarrollo de UI Login/Registro (frontend)
Estructura de Componentes: En frontend/src/pages/Auth/, crea dos componentes: Login.jsx y Register.jsx.

Diseño: Usa la paleta del proyecto (Color principal: #EC721A). Mantén los formularios minimalistas: inputs limpios, bordes redondeados suaves y un botón de "call to action" claro.

Manejo de Estado Local: Usa useState para capturar el valor de los inputs (email, password, nombre).

Consumo del Contexto:

Importa useContext y AuthContext.

Extrae las funciones login y register del contexto.

Envío del Formulario (onSubmit):

Usa e.preventDefault().

Dentro de un bloque try/catch, llama a la función del contexto (ej: await login(email, password)).

Si es exitoso, redirige al usuario al Dashboard (puedes usar useNavigate de react-router-dom).

Si cae en el catch, muestra el mensaje de error en un párrafo rojo de alerta debajo del formulario. */