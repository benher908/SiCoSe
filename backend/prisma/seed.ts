import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();

async function main() {
  // Limpiar tablas para evitar duplicados
  await prisma.comprobante.deleteMany();
  await prisma.pago.deleteMany();
  await prisma.adeudo.deleteMany();
  await prisma.reporte.deleteMany();
  await prisma.auditoria.deleteMany();
  await prisma.usuario.deleteMany();
  await prisma.ciudadano.deleteMany();
  await prisma.servicio.deleteMany();

  // CREACIÓN DE USUARIOS DEL ISSUE #002
  const usuarios = await prisma.usuario.createMany({
    data: [
      {
        email: "cristian@sicose.test",
        password: "SiCoSe2026!",
        nombre: "Cristian",
        rol: "ADMIN",
        activo: true,
      },
      {
        email: "gertrudis@sicose.test",
        password: "SiCoSe2026!",
        nombre: "Gertrudis",
        rol: "USUARIO",
        activo: true,
      },
      {
        email: "marianerida@sicose.test",
        password: "SiCoSe2026!",
        nombre: "María Nerida",
        rol: "USUARIO",
        activo: true,
      }
    ],
  });

  const servicios = await prisma.servicio.createMany({
    data: [
      { nombre: "Agua potable", descripcion: "Suministro de agua potable", tarifa: 45.5 },
      { nombre: "Alcantarillado", descripcion: "Manejo de aguas residuales", tarifa: 32.0 },
      { nombre: "Recolección de basura", descripcion: "Servicio de recolección semanal", tarifa: 25.0 },
    ],
  });

  const ciudadanos = await prisma.ciudadano.createMany({
    data: [
      {
        nombre: "María",
        apellido: "González",
        email: "maria.gonzalez@test.com",
        telefono: "5512345678",
        direccion: "Calle 1 #100",
        clave_catastral: "CAT-0001",
      },
      {
        nombre: "José",
        apellido: "Ramírez",
        email: "jose.ramirez@test.com",
        telefono: "5512345679",
        direccion: "Calle 2 #200",
        clave_catastral: "CAT-0002",
      },
      {
        nombre: "Ana",
        apellido: "López",
        email: "ana.lopez@test.com",
        telefono: "5512345680",
        direccion: "Calle 3 #300",
        clave_catastral: "CAT-0003",
      },
      {
        nombre: "Luis",
        apellido: "Martínez",
        email: "luis.martinez@test.com",
        telefono: "5512345681",
        direccion: "Calle 4 #400",
        clave_catastral: "CAT-0004",
      },
      {
        nombre: "Cecilia",
        apellido: "Sánchez",
        email: "cecilia.sanchez@test.com",
        telefono: "5512345682",
        direccion: "Calle 5 #500",
        clave_catastral: "CAT-0005",
      },
    ],
  });

  console.log(`Seed completado: ${usuarios.count} usuarios, ${servicios.count} servicios, ${ciudadanos.count} ciudadanos creados.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });