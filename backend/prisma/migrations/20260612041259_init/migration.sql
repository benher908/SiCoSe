-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Ciudadano" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT,
    "direccion" TEXT,
    "clave_catastral" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Servicio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "tarifa" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Adeudo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ciudadanoId" TEXT NOT NULL,
    "servicioId" TEXT NOT NULL,
    "monto" REAL NOT NULL,
    "periodo" TEXT NOT NULL,
    "vencimiento" DATETIME NOT NULL,
    "pagado" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Adeudo_ciudadanoId_fkey" FOREIGN KEY ("ciudadanoId") REFERENCES "Ciudadano" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Adeudo_servicioId_fkey" FOREIGN KEY ("servicioId") REFERENCES "Servicio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pago" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ciudadanoId" TEXT NOT NULL,
    "adeudoId" TEXT NOT NULL,
    "monto" REAL NOT NULL,
    "fecha" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metodo" TEXT NOT NULL,
    "recibo" TEXT,
    "creado_por" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Pago_ciudadanoId_fkey" FOREIGN KEY ("ciudadanoId") REFERENCES "Ciudadano" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Pago_adeudoId_fkey" FOREIGN KEY ("adeudoId") REFERENCES "Adeudo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Comprobante" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ciudadanoId" TEXT NOT NULL,
    "adeudoId" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "fecha" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Comprobante_ciudadanoId_fkey" FOREIGN KEY ("ciudadanoId") REFERENCES "Ciudadano" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comprobante_adeudoId_fkey" FOREIGN KEY ("adeudoId") REFERENCES "Adeudo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Auditoria" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuarioId" TEXT NOT NULL,
    "accion" TEXT NOT NULL,
    "entidad" TEXT NOT NULL,
    "entidad_id" TEXT NOT NULL,
    "detalles" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Auditoria_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Reporte" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ciudadanoId" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "tipo" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'PENDIENTE',
    "fecha" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Reporte_ciudadanoId_fkey" FOREIGN KEY ("ciudadanoId") REFERENCES "Ciudadano" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Ciudadano_email_key" ON "Ciudadano"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Ciudadano_clave_catastral_key" ON "Ciudadano"("clave_catastral");

-- CreateIndex
CREATE INDEX "Ciudadano_email_idx" ON "Ciudadano"("email");

-- CreateIndex
CREATE INDEX "Ciudadano_clave_catastral_idx" ON "Ciudadano"("clave_catastral");

-- CreateIndex
CREATE INDEX "Adeudo_ciudadanoId_idx" ON "Adeudo"("ciudadanoId");

-- CreateIndex
CREATE INDEX "Adeudo_servicioId_idx" ON "Adeudo"("servicioId");

-- CreateIndex
CREATE INDEX "Pago_ciudadanoId_idx" ON "Pago"("ciudadanoId");

-- CreateIndex
CREATE INDEX "Pago_adeudoId_idx" ON "Pago"("adeudoId");

-- CreateIndex
CREATE INDEX "Comprobante_ciudadanoId_idx" ON "Comprobante"("ciudadanoId");

-- CreateIndex
CREATE INDEX "Comprobante_adeudoId_idx" ON "Comprobante"("adeudoId");

-- CreateIndex
CREATE INDEX "Auditoria_usuarioId_idx" ON "Auditoria"("usuarioId");

-- CreateIndex
CREATE INDEX "Reporte_ciudadanoId_idx" ON "Reporte"("ciudadanoId");
