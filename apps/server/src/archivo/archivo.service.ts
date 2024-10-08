import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GoogleDriveHelper } from 'src/utils/google-drive.helper';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class ArchivoService {
  private googleDriveHelper: GoogleDriveHelper;
  constructor(private prisma: PrismaService) {
    this.googleDriveHelper = new GoogleDriveHelper();
  }

  async createArchivo(file: Express.Multer.File): Promise<any> {
    try {
      const tempDir = 'src/archivo/tmp';
      const filePath = path.join(tempDir, file.originalname);

      // Asegúrate de que el directorio temporal existe
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }

      // Guarda el archivo localmente
      fs.writeFileSync(filePath, file.buffer);
      const imageUrl = await this.googleDriveHelper.uploadFile(
        filePath,
        file.originalname,
      );
      // Elimina el archivo local después de subirlo
      fs.unlinkSync(filePath);
      return imageUrl;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
