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