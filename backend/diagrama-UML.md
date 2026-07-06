# Diagrama UML de clases 
### Diagrama UML de clases de AhorroSurtido en español: Usuario, Nodo, Producto, Pedido, ItemPedido y CompraColectiva con sus atributos, métodos y relaciones


[![](https://mermaid.ink/img/pako:eNqtVl1v0zAU_SuWUaUN2ilt0rTNAxIMIfrAmATjgXVCbnLTGhI7unEYY-p_5-aTNE3LkHhpnN5zv46Pr_PIfR0A9_hg8LjClWJMKmk8Vr0wtuJmCzGsuEfLtUhpNezYPguUYh1BmoMax9ycoIwFPlzqSGMZ4Vloh07otoK0cK81BoBt9MIXtgg76EgqaIPc9WwytzogAz9NGzQOJwt7dgBCIzsFwhRmsO4AQ63MWxHL6KFEpUKloxRQUm01blcuisduMMgffiTS9I0UGxRxDSv-YzdpRqzpNl2Mvfiw_ga-WQbsqwz2DB8NSrVhSsdrhD4LxEJGfYaEst0Tr-9Euu3PpXSgl73pUO-H9HWcCBR4XcU8S-7P2WutIxBqD7gBBYT7pL-DOjtnZbgOTzUTV5T-v9FAYpYb3R_MRxCBxk6rVamXheONkr7-W8HXqIPMN_-xaGFgo-kM7RmvsngNyBIEX-r3UhEgNacg4uE4hH5RRAeQbmcQyKdvRmPISi0vgyfra2kgLpPd3jFJL2mvpqnSYH8zfRH5WZQry4iINqps70g7f7IcaymptrJTXkWaL5SRgQiOc_4qiaTfqrFTwCWdFxQ0XCib_CH-mdge5mob8ZYUraXLIO0r0OQMnZRNiTilGrHViLrges_8hgTLQvC34lICdkRdb9Grwvlgj3ow70GRgqJrjfksOCu7Pmdlq7d3B-TWz3qGrvjVirPR6CWtxrQqJopH_KChw-0Da5orLCWohOeOdRiPxRLonOj0MMG-RyUqj9FEieSv0-EbMN0CWdJgq79L9PPRqEK3NOvRNCMBUgu1T8vY7bkZSnlRISAoX56uqytOSpdvZuPUtR_ti6pMdUQHhQ_5BmXAvVBEKQx5DEi3Er3zxzzk3pdEIPA7XZ1qR06JUF-0jrlnMCM31Nlm2wTJkoDUVt2hDQRU8aGQKcM9x54WMbj3yH9yb2JNLhzXmbgL23HnluXOh_yBe7Z74Vrj6dSZWY5l2dZiN-S_iqzjC3vuzuYLezKeLxbO2Nn9Bvz4zCs?type=png)](https://mermaid.live/edit#pako:eNqtVl1v0zAU_SuWUaUN2iltsrTNAxIUIfrAmATjgXVCbnLTGhI7unEYY-p_5-aTNE3LkHhpnNxzv46Pr_vIfR0A9_hg8LjClWJMKmk8Vr0wtuJmCzGsuEfLtUhpNezYPguUYh1BmoMax9ycoIwFPix0pLGM8Cy0Qyd0W0FauNcaA8A2eu4LW4QddCQVtEHuejqZWR2QgZ-mDRqHk7k9PQChkZ0C4RKmsO4AQ63MWxHL6KFEpUKloxRQUm01blcuisduMMgffiTS9I0UGxRxDSu-sZs0I9Z0my7GXnxYfwPfLAP2VQZ7ho8GpdowpeM1Qp8FYiGjPkNC2e6J13ci3fbnUjrQy950qPdD-jpOBAq8rmKeJffn7LXWEQi1B9yAAsJ90t9BnZ2zMlyHp5qJK0r_32ggMcuN7g_mI4hAY6fVqtRF4XijpK__VvA16iDzzX8sWhjYaDpDe8arLF4DsgTBl_q9VARIzSmIeDgOoV8U0QGk2xkE8umb0RiyUsvL4Mn6WhqIy2S3d0zSS9qraao02N9MX0R-FuXKMiKijSrbO9LOnyzHWkqqreyUV5HmC2VkIILjnL9KIum3auwUsKDzgoKGC2WTP8Q_E9vDXG0j3pKitXQZpH0Fmpyhk7IpEadUI7YaURdc75nfkGBZCP5WLCRgR9T1Fr0qnA_2qAfzHhQpKLrWmM-Cs7Lrc1a2ent3QG79rGfoil-tOBuNXtJqTKtionjEDxo63D6wprnCUoJKeO5Yh_FYLIHOiU4PE-x7VKLyGE2USP46Hb4B0y2QJQ22-lyin49GFbqlWY-mGQmQWqh9WsZuz81QyosKAUH58nRdXXFSunwzG6eu_WhfVGWqIzoofMg3KAPuhSJKYchjQLqV6J0_5iH3_kkEAr_T1al25JQI9UXrmHsGM3JDnW22TZAsCUht1R3afKX-in8KmTLcc2yrCMK9R_6TexNrcuG4zsSd2447syx3NuQP3LPdC9caX146U8uxLNua74b8V5F2fGHP3Olsbk_Gs_ncGTu738uszHE)

## ¿Qué nos dice este Diagrama de Clases?

A diferencia del diagrama entidad-relación (que se centra en cómo se guardan los datos en la base de datos), este diagrama de clases modela el comportamiento y la estructura del código en tu aplicación.

### Estado (Atributos): 
Vemos exactamente qué tipos de datos maneja cada clase (ej. String, Number, ObjectId, Date). Observa cómo Pedido ahora tiene un arreglo directo de ItemPedido[] items, lo cual es un enfoque muy común en bases de datos NoSQL como MongoDB o en la estructura en memoria del backend.

### Comportamiento (Métodos): 
Aquí vemos la lógica de negocio real que tendrás que programar:

- El Usuario sabe cómo generarToken() para la autenticación y compararPassword().

- El Nodo es responsable de generarCodigoUnico() para invitar a nuevos miembros.

- El Pedido sabe cómo calcularTotal() sumando sus ítems.

### La CompraColectiva alberga la lógica más compleja: 
* calcularAhorro() y los reportes con calcularAhorroMensualPorNodo().

### Composición (*--):
 La relación entre Pedido e ItemPedido usa un rombo relleno. Esto significa que un ItemPedido no tiene sentido ni existe por sí solo si no es parte de un Pedido.