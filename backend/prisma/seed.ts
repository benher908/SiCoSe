import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();
const passwordHash = await bcrypt.hash("SiCoSe2026!", 12);

async function main() {
  await prisma.comprobante.deleteMany();
  await prisma.pago.deleteMany();
  await prisma.adeudo.deleteMany();
  await prisma.reporte.deleteMany();
  await prisma.auditoria.deleteMany();
  await prisma.usuario.deleteMany();
  await prisma.ciudadano.deleteMany();
  await prisma.servicio.deleteMany();

  const admin = await prisma.usuario.create({
    data: {
      email: "admin@sicose.test",
      passwordHash,
      nombre: "Administrador",
      rol: "admin",
      activo: true,
    },
  });

  const servicios = await prisma.servicio.createMany({
    data: [
      { nombre: "Agua potable", descripcion: "Suministro de agua potable", tarifa: 45.5 },
      { nombre: "Alcantarillado", descripcion: "Manejo de aguas residuales", tarifa: 32.0 },
      { nombre: "Recolección de basura", descripcion: "Servicio de recolección semanal", tarifa: 25.0 },
    ],
  });

  const servicioRecords = await prisma.servicio.findMany();

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

  const ciudadanoRecords = await prisma.ciudadano.findMany();

  console.log({ admin, servicios, ciudadanos: ciudadanoRecords.length });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
