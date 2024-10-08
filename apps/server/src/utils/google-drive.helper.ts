import { google } from 'googleapis';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import * as mime from 'mime-types';

export class GoogleDriveHelper {
  private drive;

  constructor() {
    const auth = new google.auth.GoogleAuth({
      keyFile: 'src/utils/villaizan-2a-cms-drive.json', // Ruta al archivo de credenciales
      scopes: ['https://www.googleapis.com/auth/drive'],
    });

    this.drive = google.drive({ version: 'v3', auth });
  }

  async uploadFile(filePath: string, fileName: string): Promise<string | null> {
    try {
      const mimeType = mime.lookup(fileName) || 'application/octet-stream';
      const fileMetadata = {
        name: `${uuidv4()}-${fileName}`, // Generar un nombre único para la imagen
        parents: [process.env.DRIVE_FOLDER_ID], // ID de la carpeta en Google Drive donde se subirá la imagen
      };

      const media = {
        mimeType: mimeType,
        body: fs.createReadStream(filePath),
      };

      const response = await this.drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id',
      });

      const fileId = response.data.id;

      // Hacer el archivo público
      await this.drive.permissions.create({
        fileId: fileId,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });

      // Obtener la URL pública del archivo
      const fileUrl = `https://drive.google.com/uc?id=${fileId}`;
      return fileUrl;
    } catch (error) {
      console.error('Error uploading file to Google Drive:', error);
      return null;
    }
  }
}
