import { Prisma } from '@prisma/client';

const clientUser = Prisma.validator<Prisma.vi_usuarioDefaultArgs>()({
  select: {
    id: true,
    nombre: true,
    apellido: true,
    correo: true,
    imagenperfil: true,
    puntosacumulados: true,
  },
});

export type ClientUser = Prisma.vi_usuarioGetPayload<typeof clientUser>;
