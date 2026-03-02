# Implementación de Pagos Bitcoin Lightning

Esta guía detalla las mejores prácticas y estrategias para implementar pagos a través de la red Lightning (LN) en este portafolio personal, asegurando seguridad, soberanía y una experiencia de usuario fluida.

## 1. Estrategias de Integración

Dependiendo del nivel de control y complejidad técnica, existen tres caminos principales:

### A. Lightning Address (Propina/Donación Simple)
Es la forma más sencilla. Funciona como un correo electrónico (ej. `tuusuario@getalby.com`).
- **Uso:** Ideal para un botón de "Cómprame un café".
- **Ventaja:** No requiere backend complejo. Solo mostrar el identificador o usar un servicio de redirección.

### B. Procesadores de Pagos (Custodiales/Semi-custodiales)
Servicios como **Strike API**, **OpenNode** o **Swiss Bitcoin Pay**.
- **Ventaja:** Manejan la liquidez y los canales por ti. Ofrecen APIs REST robustas y Webhooks.
- **Desventaja:** Dependencia de terceros (KYC en algunos casos).

### C. Nodo Propio / BTCPay Server (Soberanía Total)
Integrar directamente con un nodo (LND, Core Lightning) o una instancia de BTCPay Server vía API/Greenfield.
- **Ventaja:** Sin comisiones de terceros, privacidad total.
- **Herramienta recomendada:** `lnc-web` para conexiones cifradas extremo a extremo.

## 2. Protocolos Clave

Para una web moderna, se deben considerar estos estándares:

1.  **LNURL-pay:** Permite solicitar pagos de forma dinámica sin necesidad de generar una factura BOLT11 estática de antemano.
2.  **WebLN:** Un estándar para que las aplicaciones web interactúen con las carteras de los usuarios (proporcionado por extensiones como Alby). Permite `window.webln.sendPayment(invoice)`.
3.  **BOLT11:** El formato estándar de factura Lightning (QR).

## 3. Arquitectura en Next.js

Para mantener la seguridad siguiendo los principios de `AGENTS.md`:

- **API Routes (Backend):** Toda generación de facturas y validación de firmas DEBE ocurrir en el servidor (`app/api/pay/route.ts`). Nunca expongas API Keys en el cliente.
- **Webhooks:** Implementa un endpoint para recibir confirmaciones de pago asíncronas desde el procesador.
- **Variables de Entorno:** Usa `.env.local` para almacenar credenciales (ej. `STRIKE_API_KEY`, `LNBITS_API_KEY`).

## 4. Componentes UI (shadcn/ui)

Usa los componentes existentes para construir la interfaz:

-   **Dialog / Drawer:** Para mostrar el código QR de la factura sin sacar al usuario de la página.
-   **Card:** Para los "tiers" de donación o selección de montos.
-   **Badge:** Para mostrar el estado del pago (Pendiente, Confirmado).
-   **Input:** Para que el usuario ingrese un monto personalizado en Satoshis o USD.
-   **Toast:** Para notificar inmediatamente cuando el pago ha sido detectado por el nodo.

## 5. Mejores Prácticas de Seguridad

1.  **Validación de Montos:** Valida siempre en el servidor que el monto recibido coincide con el servicio/producto solicitado.
2.  **HTTPS Obigatorio:** LNURL y WebLN requieren conexiones seguras.
3.  **Tiempos de Expiración:** Las facturas Lightning expiran rápido (usualmente 10-60 min). Asegúrate de manejar el estado "Expired" en la UI.
4.  **No almacenar Claves Privadas:** Si usas un nodo propio, usa Macaroons con permisos restringidos (solo lectura/facturación) para el servidor web.

## 6. Ejemplo de Flujo de Pago

1.  El usuario hace clic en "Donar 1000 Sats".
2.  El frontend llama a `/api/lightning/create-invoice`.
3.  El servidor solicita la factura al nodo/procesador y la devuelve al cliente.
4.  Se muestra un **Dialog** con el QR y un botón "Pagar con Alby" (WebLN).
5.  El cliente monitorea el estado vía SWR/React Query o WebSockets.
6.  Al confirmar, se cierra el diálogo y se muestra un **Toast** de éxito.
