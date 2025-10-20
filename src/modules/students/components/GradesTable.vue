
<template>
  <div class="mb-5">
    <div class="mb-5 flex items-center gap-2">
      <label class="font-medium">Selecciona un período:</label>
      <select class="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option>1º Parcial</option>
        <option>2º Parcial</option>
        <option>3º Parcial</option>
        <option>Promedio</option>
      </select>
    </div>
    <div class="bg-white rounded-xl overflow-hidden shadow-sm">
      <table class="w-full border-separate border-spacing-0">
        <thead>
          <tr>
            <th class="bg-blue-900 text-white text-lg font-semibold py-4 text-center">Materia</th>
            <th class="bg-blue-900 text-white text-lg font-semibold py-4 text-center">1º Parcial</th>
            <th class="bg-blue-900 text-white text-lg font-semibold py-4 text-center">2º Parcial</th>
            <th class="bg-blue-900 text-white text-lg font-semibold py-4 text-center">3º Parcial</th>
            <th class="bg-blue-900 text-white text-lg font-semibold py-4 text-center">Promedio</th>
            <th class="bg-blue-900 text-white text-lg font-semibold py-4 text-center">Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b last:border-b-0">
            <td class="text-base py-4 px-6 text-center">Materia 1</td>
            <td class="text-base py-4 px-6 text-center">9.2</td>
            <td class="text-base py-4 px-6 text-center">9.2</td>
            <td class="text-base py-4 px-6 text-center">9.2</td>
            <td class="text-base py-4 px-6 text-center">9.2</td>
            <td class="text-green-500 font-medium text-base py-4 px-6 text-center">Aprobado</td>
          </tr>
          <tr class="border-b last:border-b-0">
            <td class="text-base py-4 px-6 text-center">Materia 2</td>
            <td class="text-base py-4 px-6 text-center">9.2</td>
            <td class="text-base py-4 px-6 text-center">9.2</td>
            <td class="text-base py-4 px-6 text-center">9.2</td>
            <td class="text-base py-4 px-6 text-center">9.2</td>
            <td class="text-green-500 font-medium text-base py-4 px-6 text-center">Aprobado</td>
          </tr>
          <tr class="border-b last:border-b-0">
            <td class="text-base py-4 px-6 text-center">Materia 3</td>
            <td class="text-base py-4 px-6 text-center">9.2</td>
            <td class="text-base py-4 px-6 text-center">9.2</td>
            <td class="text-base py-4 px-6 text-center">9.2</td>
            <td class="text-base py-4 px-6 text-center">9.2</td>
            <td class="text-green-500 font-medium text-base py-4 px-6 text-center">Aprobado</td>
          </tr>
          <tr class="border-b last:border-b-0">
            <td class="text-base py-4 px-6 text-center">Materia 4</td>
            <td class="text-base py-4 px-6 text-center">9.2</td>
            <td class="text-base py-4 px-6 text-center">9.2</td>
            <td class="text-base py-4 px-6 text-center">9.2</td>
            <td class="text-base py-4 px-6 text-center">9.2</td>
            <td class="text-green-500 font-medium text-base py-4 px-6 text-center">Aprobado</td>
          </tr>
          <tr>
            <td class="text-base py-4 px-6 text-center">Materia 5</td>
            <td class="text-base py-4 px-6 text-center">9.2</td>
            <td class="text-base py-4 px-6 text-center">9.2</td>
            <td class="text-base py-4 px-6 text-center">9.2</td>
            <td class="text-base py-4 px-6 text-center">9.2</td>
            <td class="text-green-500 font-medium text-base py-4 px-6 text-center">Aprobado</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GradesTable'
}
</script>

