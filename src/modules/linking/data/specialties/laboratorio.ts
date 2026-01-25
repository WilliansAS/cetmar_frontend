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

export const laboratorio: SpecialtyData = {
  slug: "ambiental",
  title: "Laboratorio Ambiental",
  banner: [
    {
      src: "/images/LABn.webp",
      name: "Banner Servicios de Laboratorio",
    },
  ],
  activities: [
    {
      id: "1",
      title: "Visita guiada a planta de tratamiento",
      description: "Alumnos técnicos en Laboratorio Ambiental realizan una visita guiada a la planta de tratamiento de aguas residuales unidad Corales para conocer el proceso de tratamiento y análisis de agua.",
      image: "/images/LAA1.webp",
    },
    {
      id: "2",
      title: "Práctica de Laboratorio",
      description: "Los alumnos realizan prácticas de laboratorio para el análisis de muestras de agua, aire y suelo, aplicando técnicas estandarizadas y utilizando equipos especializados para garantizar resultados precisos y confiables.",
      image: "/images/LAA2.webp",
    },
     {
      id: "3",
      title: "Visita guiada al parque Kabah",
      description: "Se realiza una visita guiada al parque Kabah para la toma de muestras de suelo y agua, con el objetivo de evaluar la calidad ambiental y promover prácticas de conservación en espacios naturales urbanos.",
      image: "/images/LAA3.webp",
    },
  ],
};
