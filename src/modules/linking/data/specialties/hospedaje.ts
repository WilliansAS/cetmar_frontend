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

export const hospedaje: SpecialtyData = {
  slug: "hospedaje",
  title: "Servicios de Hospedaje",
  banner: [
    {
      src: "/images/HOS.webp",
      name: "Banner Servicios de Hospedaje",
    },
  ],
  activities: [
    {
      id: "1",
      title: "Visita en el Centro de Convenciones de Cancún forjando experiencias memorables",
      description: "Los alumnos técnicos en Servicios de Hospedaje realizan una visita guiada al Centro de Convenciones de Cancún para conocer las instalaciones y protocolos de servicio que se implementan en eventos masivos, enfocándose en la importancia de la atención al cliente y la gestión eficiente de recursos.",
      image: "/images/SO1.webp",
    },
    {
      id: "2",
      title: "Visita guiada al Centro de Convenciones de Cancún para descubrir excelencia en eventos",
      description: "Esta visita práctica permite a los estudiantes observar de primera mano cómo se organizan y gestionan eventos de gran escala, destacando la importancia de la coordinación, el servicio al cliente y la atención a los detalles en el sector de la hospitalidad. Aprendiendo sobre las mejores prácticas y estándares de calidad en la industria.",
      image: "/images/CulturalesDeportivas.webp",
    },
  ],
};
