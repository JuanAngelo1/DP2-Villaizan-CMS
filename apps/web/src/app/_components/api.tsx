const API = {
  uploadImage: async (file) => {
    try {
      const uploadUrl = 'https://tu-api.com/upload';
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al subir la imagen');
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      return 'https://img.freepik.com/fotos-premium/descarga-imagen-fondo-hd_555090-60427.jpg'; // Imagen por defecto en caso de error, prueba local
    }
  },
};

export default API;
