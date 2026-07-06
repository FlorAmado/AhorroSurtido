# Diagrama entidad-relación
### Diagrama entidad-relación de la base de datos de AhorroSurtido en español: usuarios, nodos, productos, pedidos, items_pedido y compras_colectivas con claves primarias, foráneas y cardinalidad

[![](https://mermaid.ink/img/pako:eNqtlVFv2jAQx7-K5Yk3WgWSBsgbg1ZDW0dVaB8mpMrEF_CW2NHF0UZpvvscEmggKWqlvsR27nd3_9jny5b6igP1aKu1XeBCEiKk0B4pF4QsqF5DBAvqmemSJWbWPrE9MhRsGUKSQwfH3ByjiBhuRipUWET4EtiBE7iVIBXuq0IOWKUHPrNZcEKHQkIVcpe9bt86gTT801WoE3QHdq8GoRYnAuEKerA8AQMl9Q2LRLgpqITJ5CIBFEbbnsuKyW7IWq18ABwLtkIW7Zmf0_F0Rl5eLi7UljzMHob3E7POI2oBEkgkIFqiSl6jHqDS6e56PBmXPggsFM_sFT4KXyWNiDR-CxxNb-_uh7On0fTH9Wg-eRwWPr4AxIpPA5YHeDnO5CuZqFDwiuPeXNKT-fXt7Kl4uXfZfX3F4346fhjNXyXWfBACQJC-YFwRkIVrbc8qxUjIdPkbfD3h5Elwcve9ako0CrkiUpnNhwYDREyEDe9jliR_TdF-Y8m6MZVUXJnhpikbqvCkdPbn8lmyzdUWK9UYzDe1wxUeacvq2_9pSpiGlTJtomqTabQEJDGCL9StkMae6DME27xJmCeysEZkpyX43u85mNIkNd2tfobvOmEwUriqiTkq5g8rioELfkZQjIqnvq4T5Vb5zNw2zvib-zyMQ-E36W5oAB9W37hdZXqttDnDM3VQAGfKgK0VoprnWNXKTfWRAPw1G-U97VCgGW3TFQpOvYCFCbRpBGhuulnTbU4c_fs4wz-mzcjcKWbyl1IR9TSmxg1VulofgqRxnq9s_AcE5O7XlkpNPce2djGot6X_qNe1upeO63Tdge24fcty-226oZ7tXrpW5-rK6VmOZdnWIGvT513WzqXdd3v9gd3t9AcDp-Nk_wEvy14J?type=png)](https://mermaid.live/edit#pako:eNqtld9v2jAQx_8VyxNvtApJCJA3Bq2Gto6q0D5MSJUTX8BbYkcXRyul_O91-NVAUtRKfYnt3OfuvrHPlxUNFQfq00ZjNcOZJERIoX2yWxAyo3oBCcyob6YBy8yseWJ7YChYEENWQAfHwpyiSBguBypWuI3wLXIiN_JKQUrcd4UcsEz3Quaw6ISOhYQy5AUdu2udQBqedBlqRXbP6VQg1OJEILShA8EJGCmpr1ki4uWWypjMLjJAYbTtufV2shnWjUYxAA4FmyNL9szv8XA8IS8vFxdqRe4n9_27kVkXEbUACSQRkASosreoB2jndHs1HA13PggsFs_sDT4KXyaNiDx9DxyMb27v-pPHwfjX1WA6euhvfUIBiCWfGqwI8HKcKVQyU7HgJce9eUePplc3k8fty73L5utLHnfj4f1g-iax4oMQAYIMBeOKgNy6VvasVIyEjIO_EOoRJ4-Ck9ufZVOmUcg5kcpsPtQYIGEirnmfsiz7b4r2B8sWtamk4soM13XZUMUnpbM_l6-Sba62mKvaYKGpHa7wSNu6uv1fpoRpmCvTJso2mScBIEkRQqFuhDT2TJ8h2PJdwjyRxRVifVqCH_2egynPctPdqmf4oRMGI4WripijYv60ohS44GcEpah4HuoqsduqkJnbxhl_d5_7aSzCOt01DeDT6mu3a5deK23O8EwdbIEzZcAWClFNC6xs5ab6SAThgg2KnnYo0DVt0jkKTv2IxRk0aQJobrpZ01VBHP37OMN_ps3Iwill8o9SycEPVT5fHFZ5WiTcdX7qa8wLBOTm35ZLTX3Xbm-CUH9Fn6hvW_al67m213Ncr2tZXrdJl9R3vEvParXbbsdyLcuxeusmfd6kbV06Xa_T7Tl2q9vruS13_QqQ515Y)

## ¿Cómo se relacionan los datos en tu sistema de compras grupales?

### 1) El Eje Central: Nodos y Usuarios
El sistema gira en torno a los Nodos (grupos de compra).

- NODOS: Son creados por un usuario (creadorId) y agrupan a varias personas.

- USUARIOS: Cada persona pertenece a un nodo específico (nodoId).

### 2) El Catálogo: Productos
- PRODUCTOS: Almacenan la lógica clave del negocio. Tienen un precio común (precioMinorista), un precio con descuento (precioMayorista) y la cantidad mínima que se debe alcanzar para que aplique el descuento (umbralMayorista).

### 3) El Flujo de Compras
- PEDIDOS: Cada usuario realiza pedidos dentro de su nodo.

- ITEMS_PEDIDO: Es el "carrito de compras". Conecta un pedido específico con los productos, guardando cuántos se pidieron y qué precio se les terminó aplicando.

- COMPRAS_COLECTIVAS: Es la consolidación final. El Nodo agrupa todos los pedidos individuales, calcula cuánto habría costado individualmente (totalMinorista), cuánto costó en grupo (totalMayorista) y el ahorroTotal generado al superar los umbrales de los productos.