
<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useContentStore } from "@/store/content.store";

import LinkingImages, { type ImageItem } from "@/modules/linking/components/LinkingImages.vue";
import SpecialtyActivities, { type Activity } from "@/modules/linking/components/SpecialtyActivities.vue";

import type { IContentPagePayload } from "@/interfaces/IContentPage";
import type { IContentPayload } from "@/interfaces/IContent";

const route = useRoute();
const contentStore = useContentStore();

/* -----------------------------
   Mapeo de Slug a Nombre de Página (Backend)
-------------------------------- */
const slugToPageName: Record<string, string> = {
  "vida-saludable": "VidaSaludable",
  hospedaje: "ServiciosHospedaje",
  ambiental: "LaboratorioAmbiental",
  sig: "SistemasOrgGeografica",
};

const currentSlug = computed(() => route.params.slug as string);
const pageName = computed(() => slugToPageName[currentSlug.value] || currentSlug.value);


/* -----------------------------
   Estado Local
-------------------------------- */
const bannerImages = ref<ImageItem[]>([]);
const activities = ref<Activity[]>([]);
const pageTitle = ref("");

/* -----------------------------
   Carga de Datos
-------------------------------- */
const loadData = async () => {
  if (!pageName.value) return;
  
  // Limpiar estado
  bannerImages.value = [];
  activities.value = [];
  
  try {
    // 1. Cargar Banner desde /content-pages
    const pageContents = await contentStore.fetchContentByPage(pageName.value);
    const bannerContent = pageContents.find(item => item.ComponentPage === "BannerPrincipal");
    
    if (bannerContent) {
      bannerImages.value = [{
        id: bannerContent.Id,
        src: bannerContent.UrlImage || "",
        name: bannerContent.Titule || "Banner",
        // Nota: file no se recupera del backend, solo se usa para subir
      }];
    }

    // 2. Cargar Actividades desde /contents
    // Asumimos que filtramos por título o descripción que contenga el nombre de la página,
    // o pedimos todos y filtramos en frontal si no hay campo Page.
    // DADO QUE el usuario pidió usar /contents, vamos a suponer que se guardan ahí.
    // Sin embargo, filtrar es complicado sin un campo discriminador.
    // Usaremos getAllGeneralContents y filtraremos.
    await contentStore.fetchGeneralContents();
    
    // Filtrado temporal: Buscamos aquellos cuyo "Description" o "Type" coincida con pageName.value
    // O mejor, asumimos que el usuario guardará con Type = pageName.value
    const allActivities = contentStore.generalContents;
    
    // Mejorar lógica de filtrado para ser insensible a mayúsculas si es necesario
    const target = pageName.value.toLowerCase();
    
    activities.value = allActivities
      .filter(item => 
        (item.Type && item.Type.toLowerCase() === target) || 
        (item.Page && item.Page.toLowerCase() === target)
      ) 
      .map(item => ({
        id: item.Id.toString(),
        title: item.Titule,
        description: item.Description,
        image: item.UrlImage || "",
      }));

    // Título de la página
    const titles: Record<string, string> = {
      "vida-saludable": "Vida Saludable",
      hospedaje: "Servicios de Hospedaje",
      ambiental: "Laboratorio Ambiental",
      sig: "Sistemas de Org. Geográfica",
    };
    pageTitle.value = titles[currentSlug.value] || "Especialidad";

  } catch (error) {
    console.error("Error loading content:", error);
  }
};

/* -----------------------------
   Guardado de Banner
-------------------------------- */
const handleBannerUpdate = async (newImages: ImageItem[]) => {
  // Solo manejamos 1 imagen para el banner
  const imageItem = newImages[0];
  if (!imageItem) {
    // Si se borró, podríamos llamar a deleteContent si tuvieramos el ID guardado
    // Por ahora, asumimos no borrar directament el banner completo
    return; 
  }

  // Preparamos payload
  const payload: IContentPagePayload = {
    Page: pageName.value,
    ComponentPage: "BannerPrincipal",
    Titule: imageItem.name || "Banner Principal",
    Description: `Banner para ${pageTitle.value}`,
    image: imageItem.file || undefined,
  };

  try {
    if (imageItem.id) {
      // Actualizar
      await contentStore.editContent(Number(imageItem.id), payload);
      alert("Banner actualizado correctamente");
    } else {
      // Crear
      const newRecord = await contentStore.addContent(payload);
      // Actualizar ID localmente para futuras ediciones sin recargar
      imageItem.id = newRecord.Id; 
      alert("Banner creado correctamente");
    }
  } catch (error) {
    console.error("Error saving banner:", error);
    alert("Error al guardar el banner");
  }
  
  // Actualizamos visualmente
  bannerImages.value = [imageItem];
};


/* -----------------------------
   Guardado de Actividades
-------------------------------- */
const handleActivitiesUpdate = async (updatedActivities: Activity[]) => {
  // Detectar cambios es complejo con update completo.
  // Simplificación: Iteramos y guardamos/actualizamos los que tengan archivo o sean nuevos.
  // Pero SpecialtyActivities emite TODO el array.
  
  // Estrategia: "Actividad por Actividad"
  // El componente SpecialtyActivities emite la lista nueva.
  // Deberíamos identificar cuál cambió.
  // Como simplificación: Al ser gestión de admin, comparemos longitud o busquemos el que tenga 'file'.
  
  // Vamos a asumir que el usuario edita UNO a la vez vía el modal.
  // Buscamos el item que tiene `file` (recién subido/editado con imagen nueva)
  // O que es nuevo (id temp string)
  
  for (const act of updatedActivities) {
    // Es nuevo (ID generado por crypto.randomUUID es largo string vs ID numérico backend)
    // OJO: act.id es string en interface Activity. Backend da number.
    // Si el ID es largo (UUID), es crear. Si es número string, es update.
    const isNew = act.id.length > 10; // Simple heuristic
    const isModified = !!act.file; // Tiene archivo nuevo

    if (isNew) {
      const payload: IContentPayload = {
        Titule: act.title,
        Description: act.description,
        Type: pageName.value, // Usamos PageName como Type para agrupar
        Page: pageName.value,
        IsAnAdvice: false, 
        image: act.file || null,
        IsActive: true
        // Fechas opcionales
      };
      
      try {
        const res = await contentStore.addGeneralContent(payload);
        act.id = res.Id.toString(); // Actualizar ID real
        delete act.file; // Limpiar archivo ya subido
      } catch (e) {
        console.error("Error creating activity", e);
      }
    } else if (isModified) {
       // Update existente
       const payload: IContentPayload = {
        Titule: act.title,
        Description: act.description,
        Type: pageName.value,
        IsAnAdvice: false,
        image: act.file || null,
        IsActive: true
      };
      
      try {
        await contentStore.editGeneralContent(Number(act.id), payload);
        delete act.file;
      } catch (e) {
        console.error("Error updating activity", e);
      }
    }
  }
  
  activities.value = updatedActivities;
  // alert("Cambios guardados"); - Opcional, puede ser molesto en bucle
};

/* -----------------------------
   Sincronización
-------------------------------- */
watch(
  () => route.params.slug,
  () => {
    loadData();
  },
  { immediate: true },
);
</script>

<template>
  <div class="flex flex-col w-full p-6 gap-8">
    <!-- ================= HEADER ================= -->
    <div>
      <h1 class="text-3xl font-semibold text-gray-900">
        Contenido: {{ pageTitle }}
      </h1>
      <p class="text-gray-500 text-base font-medium mt-1">
        Gestiona el contenido visual y las actividades correspondientes a esta especialidad
      </p>
    </div>


    <!-- ================= CONTENIDO PRINCIPAL ================= -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- BANNER EN MITAD DEL ANCHO -->
      <LinkingImages
        title="Banner de la especialidad"
        :images="bannerImages"
        :maxImages="1"
        description="Imagen principal que representa la especialidad en la página de detalle. Se muestra en la parte superior. Tamaño recomendado: 1200x800px."
        variant="banner"
        @update:images="handleBannerUpdate"
      />

    </div>

    <!-- ================= ACTIVIDADES ================= -->
    <section class="flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold text-gray-900">
            Actividades de la especialidad
          </h2>
          <p class="text-gray-500 text-sm mt-1">
            Gestiona las actividades destacadas de {{ pageTitle }}
          </p>
        </div>

        <div class="flex items-center gap-4">
          <span class="text-sm text-gray-500">
            Total de actividades: {{ activities.length }}
          </span>
        </div>
      </div>

      <SpecialtyActivities
        :activities="activities"
        @update:activities="handleActivitiesUpdate"
      />
    </section>
  </div>
</template>