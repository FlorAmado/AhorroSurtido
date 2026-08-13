# Diagrama entidad-relación
### Diagrama entidad-relación de la base de datos de AhorroSurtido en español: usuarios, nodos, productos, pedidos, items_pedido y compras_colectivas con claves primarias, foráneas y cardinalidad

[![](https://mermaid.ink/img/pako:eNqtld1u2jAUx1_F8sQdVHyUEHLHgGpoY6BCezEhVSY-AW-JHZ04WinlofoMe7E5hI9AAmql3sSxz-8c_20fH6-pqzhQh1YqlRnOpKukJxZO8kuIXkIADpmzCJKBHVIqrVOzkEI7ZNchZEa3_Iw65nfrQ8tntkeGgs19iBLo4JiYQxQBw1VX-QrTCF-8hnfrWZkgGe6rQg6YpdsuazDvjPaFhCxkzVt1u3oGaXjWWajm1duNVg5CLc4EQhNaMD8DPSX1HQuEv0qpiMmoEgEKo23PbdKfbbMplZIGsCfYAlmwZ36OeqMJeX2tVNSaPEweOvcD008iagESSCAgmKOKjlEP0M5p3O8NejsfBOaLF3aET8JnSSMiDi-B3dFwfN-ZPHVHP_rd6eCxk_q4AhAzPgVYEuD1dCaTapHyBc847s07ejDtDydP6eDeZbv6jMf9qPfQnR4l5nwQPECQrmBcEZCpa27PMslIyGj-G1w94ORJcDL-njVFGoVcEKnM5kOBAQIm_ILxkEXRX5O031i0LJxKKq5Mc1c0Gyr_LHX25_JZsk0REAtVGIzH8O8tL03GwRyQ-CIQGob7ZMwAnGkgHrhL1n8OBTJXKJm1M5Myq0Maj0Fyc7IaotxKj0f8aas10hbKlKKCBYUIRulQSGOP9BWCrS4S5ovMzxGb8zR_73oOpjiKTQXNH8a7sgiMFK5yYk4uzIcVhcAFvyIoRMVjV1_MH5eZG80Zv7jPndAXbpHugiLzYfWF27WbXittzvBKHqTAlTRgS4WopglWfDG6Sd08JOiGlukCBaeOx_wIyjQANNXE9Ok6IU7eV87wjyllMnEKmfylVEAdjbFxQxUvlocgcZjMt3tcDqOmIG7fz1hq6tQtexuEOmv6bLq2ddNsV-u1plW1LKtZpivqVGrt2k3DareqZrjetu22vSnTl-20tZt6o9qqWrd2q9Gq3zZq9uY_Ej-O6g?type=png)](https://mermaid.live/edit#pako:eNqtlVFv2jAQx7-K5Yk3qCApBPLGgGloY6BC-zAhVSa-gLfEji6OVkr5UPsM-2JzCNBAAmqlvsSx73fnv-3zeUM9xYG6tFarzXEuPSV9sXTTX0L0CkJwyYLFkA7skUplk5mFFNol-w4hc7rj59Q1vzsfWj2zPTAUbBFAnEJHx9QcoQgZrnsqUJhF-OTb_q3fygXJcZ8VcsA83fGYzfwzOhAS8lBr4Vjt-hmk4UnnoYZvdWynAKEWZwKhCQ4szkBfSf2FhSJYZ1TMZFyLAYXRduC22c-u2VYqaQPYF2yJLDwwP8b98ZS8vNRqakPup_fdu6HppxG1AAkkFBAuUMWvUY_Q3mky6A_7ex8EFohn9gqfhM-TRkQSXQJ749Hkrjt97I2_D3qz4UM38_EEIOZ8SrA0wMvpTCbVYhUInnM8mPf0cDYYTR-zwYPLbvU5j7tx_743e5VY8EHwAUF6gnFFQGauhT3LJSMh48Uv8PSQk0fByeRb3hRrFHJJpDKbDyUGCJkISsYjFsd_TNJ-ZfGqdCqpuDLNl7LZUAVnqXM4l4-SbYqAWKrSYDyBf3-L0mQSLgBJIEKhYXRIxhzAmQbig7dig6dIIPOEknk7MymzPqbxBCQ3J6shLqz09Yg_bLVG2lKZUlSyoAjBKB0JaeyxvkKw9UXCfJEFBWJ7nuZvXc_RlMSJqaDFw3hTFoGRwlVBzMmFebeiCLjgVwRFqHji6Yv54zFzoznjF_e5GwXCK9NdUmTerb50u_bTa6XNGV7Jgwy4kgZspRDVLMXKL0YvrZvHBN3SKl2i4NT1WRBDlYaAppqYPt2kxMn7yhn-NqVMpk4Rkz-VCqmrMTFuqJLl6hgkidL59o_LcdQUxN37mUhNXatp7YJQd0OfTLfTuml26lbDcepO2zTNKl1Tt2ZZzo3d6jh2x2m1rXarva3S5928jRvLrjv11m3bsR3r1m60t_8Bnx2PHw)

## ¿Qué nos dice este Diagrama de Entidad-Relación (DER)?

Este diagrama es el **mapa de nuestra base de datos**. Nos muestra las colecciones principales que vamos a tener en MongoDB y cómo se vinculan entre sí utilizando referencias (los `ObjectId`). 

Para entenderlo rápido, lo podemos dividir en 3 grandes bloques lógicos:

### 1. La Comunidad (Nodos y Usuarios)
* El **Nodo** es el agrupador principal. Contiene toda la información de gestión: quién lo administra (`dueñoId`), cuántas personas pueden entrar (`limiteMiembros`), cuándo termina la ronda de compras (`fechaExpiracion`) y quiénes están esperando entrar (`miembrosPendientes`).
* Los **Usuarios** están vinculados obligatoriamente a un Nodo mediante su `nodoId`, formando la comunidad de compra.

### 2. El Catálogo y el Carrito (Productos, Pedidos e Items)
* Los **Productos** representan nuestro catálogo maestro. Guardan las reglas del juego: los precios y el número mágico para alcanzar el descuento (`umbralMayorista`).
* El **Pedido** es la "bolsa de compras" de un usuario específico. Sabe a quién pertenece (`usuarioId`), en qué nodo se está haciendo (`nodoId`) y en qué `estado` se encuentra (Abierto, Listo, Consolidado).
* Los **Items_Pedido** son el detalle adentro de la bolsa. Conectan el pedido con el catálogo de productos y guardan la `cantidad` elegida y el `precioAplicado` (que se calculará al final).

### 3. El Cierre Financiero (Compra Colectiva)
* La **Compra Colectiva** es el ticket final del grupo. Se genera cuando el dueño del Nodo decide cerrar la semana. 
* Agrupa múltiples **Pedidos** confirmados y guarda una "foto inmutable" de la transacción: cuánto se habría gastado en el súper normal (`totalMinorista`), cuánto se gastó realmente (`totalMayorista`) y el `ahorroTotal` generado gracias al volumen del grupo.
