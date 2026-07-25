/* Para Cami: Implementación del Middleware de Protección (backend)
Instalar dependencias: Verificar que jsonwebtoken esté en el package.json.

Crear el archivo del middleware: Crea backend/src/middlewares/authMiddleware.js.

Lógica de intercepción:

Extrae el token del header Authorization (formato: Bearer <token>).

Si no hay token, retorna un res.status(401).json({ mensaje: 'No autorizado, no hay token' }).

Usa jwt.verify(token, process.env.JWT_SECRET) dentro de un bloque try/catch.

Si es válido, asigna el payload decodificado a req.usuario y llama a next().

Si el token es inválido o expiró, atrapa el error y retorna 401.

Aplicar a rutas: Ve a las rutas que necesiten protección (por ejemplo, las futuras rutas de Nodos o Pedidos) e inyecta este middleware antes del controlador. */

//------------------------------------------------------------------------
// Codigo de Keyla: a modo de ejemplo para realizar pruebas personales
//------------------------------------------------------------------------

import jwt from 'jsonwebtoken';

export const verificarToken = async (req, res, next) => {
    try {
        // 1. Obtener el header de autorización
        const authHeader = req.headers.authorization;

        // 2. Validar que el header exista y empiece con 'Bearer '
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Acceso denegado. No autorizado, no hay token proporcionado.'
            });
        }

        // 3. Extraer el token puro (removiendo la palabra 'Bearer')
        const token = authHeader.split(' ')[1];

        // 4. Verificar el token usando la firma secreta de las variables de entorno
        // Reemplaza 'JWT_SECRET' si en su archivo .env lo nombraron de otra manera
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 5. Asignar el payload decodificado a req.usuario
        // Esto hace que el id del usuario esté disponible en las rutas como req.usuario.id
        req.usuario = decoded;

        // 6. Dar el paso al siguiente controlador o middleware
        next();

    } catch (error) {
        console.error('Error al verificar el token JWT:', error.message);

        // Si el token expiró o la firma es falsa, capturamos el error aquí
        return res.status(401).json({
            success: false,
            message: 'Token inválido, expirado o alterado. Autenticación fallida.'
        });
    }
};