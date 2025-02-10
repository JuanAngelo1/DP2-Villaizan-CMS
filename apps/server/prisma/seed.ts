import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  const roles = ['Cliente', 'Administrador'];

  for (const role of roles) {
    await prisma.vi_rol.create({
      data: {
        id: uuidv4(),
        nombre: role,
        usuariocreacion: 'default'
      }
    });
  }

  console.log('Default roles inserted');
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
