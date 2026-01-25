// tipos SOLO para datos
export interface SpecialtyImage {
  src: string;
  name: string;
}

export interface SpecialtyActivity {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface SpecialtyData {
  slug: string;
  title: string;
  banner: SpecialtyImage[];
  activities: SpecialtyActivity[];
}

export const sig: SpecialtyData = {
  slug: "sig",
  title: "Sistema Integral de Gestión",
  banner: [
    {
      src: "/images/SISBAN.webp",
      name: "Banner Sistema Integral de Gestión",
    },
  ],
  activities: [
    {
      id: "1",
      title: "Manejo de drones para captura de datos geoespaciales",
      description: "Los alumnos de Sistemas de Información Geográfica practican el uso y manejo adecuado del dron para la captura de datos geoespaciales en el taller de aventura en Dron y tu comunidad.",
      image: "/images/GA2.webp",
    },
    {
      id: "2",
      title: "Visor de aventura con datos geoespaciales",
      description: "Los alumnos de Sistemas de Información Geográfica utilizan un visor de dron para analizar datos geoespaciales en el taller de aventura en Dron y tú comunidad con el fin de interpretar la información capturada.",
      image: "/images/GA4.webp",
    },
     {
      id: "3",
      title: "Despliegue de dron para captura de datos geoespaciales",
      description: "Los drones son desplegados por los alumnos de Sistemas de Información Geográfica para la captura de datos geoespaciales en el taller de aventura en Dron y tú comunidad, permitiendo la obtención de imágenes aéreas y datos precisos del terreno.",
      image: "/images/GA3.webp",
    },
  ],
};
