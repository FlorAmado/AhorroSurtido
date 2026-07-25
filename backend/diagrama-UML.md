# Diagrama UML de clases 
### Diagrama UML de clases de AhorroSurtido en español: Usuario, Nodo, Producto, Pedido, ItemPedido y CompraColectiva con sus atributos, métodos y relaciones


[![](https://mermaid.ink/img/pako:eNqtVt2O0zgUfhXLaKQW2lGbJm0nFyvBAKISM4wE7MVStDqNT1pDYke2AzOM-lD7DPtinCRtNk3TipW4aZ2c7_x9_nziRx5pgTzkFxePS7NUjEklXch2D4wtudtgikse0nIFllaDlu1PMBJWCdoCVDsW5szIFMzDtU60qSI8iSexH08bQRq4F9oINE30VQQTiFvoRCpsgqarmTcftUAO710TNI69q8nsCGScbBWIAc5w1QLGWrnXkMrkoUJZUHZo0UiqbY_bVovyb3txESVg7UsJawPpHlK-Yx9tTozpJlWMPXu3-oKRWwj2txQHhvfOSLVmSqcrg10WTEEmXYaMsn0nTt-A3XTnUlroRWc6ow9DRjrNwIC528XsZd_77IXWCYI6AK5RIeE-6K-oen1WhWtxtGfiltL_NhpIyHKtu4OJHP_9p93pbZ6u0LBEptLhjUQKrO0B4iU4ZDFGG3h1n0kDkdSqM8GnzyzdBbhDJSQqh7aLluuyyI9KRvqInBKHQjqCQUbJBIieyvGbfluW2G8FtI7KAfNeJzKSLhe9vBLWQgwYREWt_RO83xkt8sj9Ru6JqLWmMdBFcGaQirmRigDWnYPAw2kI_RpIjiDtzoi_X9dUbaiZ--VjsnCYVslo72lzUtt5NKlScajJCJIoT4oD4iAhDVTttc6aiqWhifiWOiWdnOj1vxJO9Zvt9rlb-BEoV2js9IY8z0hajQZaBVzTTDBAw5OyyW_wv1nvoLVxoLKyNbsQtqtAV9B3VlMV4pykYKON0eVGnDj21xJNS_H7_XteOp_YwAPMDSqSV3KnTTHvelXXfVa1-unzEbn7__13Yslvl5wNh3_QakyrcmqGxI9xNFQiZHVzpaUCVfDCcR8mrEfUcYJDj52oQmYQEvnjfPgaTF-6PKuxu9cV-ulwuEM3NBvSxCYBUgt7n4ax3XM9sYqiYjSoInm-rrY4KV2xmbVT236yL6rS0ogVwAd8baTgYQyJxQFPkc5o8cwfi5AHNyUB5itdDdSWnDJQf2md8tCZnNyMztebOkieCVLb7p5QQ-gbUlyEcuV4OJ7Nyhg8fOT3PPQC73I0n02Due973sibBAP-wMPh3L8cT-fBaBTMJpMrb-JvB_xHmXZ8eTWdz8eB7_l-QCs_2P4EYHoWPA?type=png)](https://mermaid.live/edit#pako:eNqtVt2O2kYUfpXRRCtBChEGg8EXlZJNqyLtbldKtxddourgOYZp7BlrZpzsZsVD9Rn6Yj22wTXGoFTKDYx9vvP3zTfH88IjLZCH_OrqZWVWijGppAvZ_oGxFXdbTHHFQ1quwdJq0LL9DkbCOkFbgGrHwpwZmYJ5vtaJNlWEV_Ek9uNZI0gD904bgaaJXkQwgbiFTqTCJmi2DsbzUQvk8Mk1QV48XkyCE5BxslUgTjHAdQsYa-V-hlQmzxXKgrJDi0ZSbQfcrlqUf7urqygBa99L2BhID5DyHXuwOTGmm1Qx9sOv678wckvB_pTiyPDBGak2TOl0bbDLginIpMuQUbYvxOkvYLfduZQWetmZzujjkJFOMzBg7vcxe9mXPnundYKgjoAbVEi43_QnVL0-q8K1ODowcUfpvxsNJGS50d3BRI7__N3u9C5P12hYIlPp8FYiBdb2CPEeHLIYoy389JRJA5HUqjPB40eW7gPcoxISlUPbRct1WeSDkpE-IafEoZCOYJBRMgGip3L8rG_KEvutgNZROWA-6ERG0uWil1fCWooBg6iotX-G93ujRR6578g9EbXRNAa6CM4MUjG3UhHAuksQeD4PoV8DyQmk3Rnx9-2aqg01c998TJYO0yoZ7T1tTmo7jyZVKo41GUES5UlxQBwkpIGqvdZZU7E0NBFvqFPSyZle_yvhXL_Zfp-7hR-BcoXGzm_I24yk1WigVcA1zQQDNDwpm_wM_5v1DlobByorW7NLYbsKdAV9FzVVIS5JCrbaGF1uxJljfy3RtBR_2L-3pfOZDTzC3KIieSX32hTzrld13WdVq48fT8g9_B--Eyt-t-JsOPyRVh6tyqkZEj_G0VCJkNXNlZYKVMELx0OYsB5RpwmOPfaiCplBSOTXy-FrMH3p8qzG7l9X6NfD4R7d0GxIE5sESC0cfBrGds_1xCqKitGgiuTlutripHTFZtZObfvZvqhKSyNWAB_wjZGChzEkFgc8RTqjxTN_KUIe3ZQEmE90NVA7cspA_aF1ykNncnIzOt9s6yB5Jkht-3tCDaFvSHERypXjoRdMyhg8fOFPPBwvZm9mIz8Yed7Ym3reJBjwZx769NafjhdeMFr48-losRvwr2VW743vzyeTuT8eT-bBNPBnu38BSoUWBA)

## ¿Qué nos dice este Diagrama de Clases?

A diferencia del diagrama entidad-relación (que se centra puramente en cómo se guardan los datos en la base de datos), este diagrama de clases modela el **comportamiento y la estructura del código** en el backend de la aplicación.

### Estado (Atributos): 
Vemos exactamente qué tipos de datos maneja cada clase (ej. `String`, `Number`, `ObjectId`, `Date`). 
- Observa cómo `Nodo` ahora incluye campos estructurales como `dueñoId`, `limiteMiembros`, `fechaExpiracion` y el arreglo de `miembrosPendientes`.
- Se destaca cómo `Pedido` maneja un `estado` (Abierto, Listo, Consolidado) y contiene un arreglo directo de `ItemPedido[] items`, lo cual es un enfoque ideal y muy común en bases de datos NoSQL como MongoDB.

### Comportamiento (Métodos): 
Aquí vemos la lógica de negocio real que el equipo tendrá que programar:

- El **Usuario** sabe cómo `generarToken()` para la autenticación y `compararPassword()` por seguridad.
- El **Nodo** es responsable de `generarCodigoUnico()` para invitar a nuevos miembros, pero ahora también sabe cómo `editarCapacidad()` y `gestionarSolicitud()` (para que el dueño acepte o rechace a los miembros pendientes).
- El **Pedido** sabe cómo `calcularTotal()` sumando sus ítems, y adquiere el método crítico `confirmarListo()` para bloquear la edición del carrito cuando el usuario finaliza su selección.
- La **CompraColectiva** alberga la lógica matemática más compleja: `calcularAhorro()` y la generación de reportes con `calcularAhorroMensualPorNodo()`.

### Composición (*--):
La relación entre `Pedido` e `ItemPedido` usa un rombo relleno. Esto significa que un `ItemPedido` (ej: "3 aceites a $1500") no tiene sentido ni existe por sí solo si no es parte de un `Pedido`. Si un usuario o el sistema cancela/elimina un pedido, sus ítems desaparecen con él.