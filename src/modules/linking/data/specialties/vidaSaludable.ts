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

export const vidaSaludable: SpecialtyData = {
  slug: "vida-saludable",
  title: "Vida Saludable",
  banner: [
    {
      src: "/images/VSBanner.webp",
      name: "Banner Vida Saludable",
    },
  ],
  activities: [
    {
      id: "1",
      title: "Participación en competencia de Atletismo en los Juegos Deportivos Nacionales DEGETAyCM",
      description: "Nuestros alumnos técnicos en Vida Saludable demostraron su destreza y espíritu competitivo al participar en los Juegos Deportivos Nacionales DEGETAyCM, representando con orgullo a nuestra institución y destacándose en diversas disciplinas atléticas.",
      image: "/images/VSA0.webp",
    },
    {
      id: "2",
      title: "Exposición: Innovación y Tradición Medicinal",
      description: "Descubriendo el poder de la Chaya. Los alumnos analizan los beneficios nutricionales y medicinales de esta planta emblemática para promover una vida más sana. ¡Descubre cómo la ciencia y la naturaleza se unen en esta carrera para mejorar la salud!",
      image: "/images/VSA1.webp",
    },
     {
      id: "2",
      title: "Exposición: Uso medicinal de plantas regionales",
      description: "¡De la tierra a tu bienestar! Nuestros estudiantes exponen las propiedades curativas de la hierbabuena en un proyecto que une la salud con los recursos naturales de nuestra región. Aquí aprendes a transformar la flora regional en soluciones de bienestar para la comunidad.",
      image: "/images/VSA2.webp",
    },
  ],
};
