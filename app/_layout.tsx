// app/_layout.js

import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    // Stack es un componente de navegación que apila pantallas
    // útil si en el futuro decides tener más de una pantalla y navegar entre ellas.
    // Por ahora, solo tendrá una pantalla principal.
    <Stack>
      {/* Esto asegura que la primera ruta (index.js) sea la principal */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* Puedes añadir más Stack.Screen aquí si creas otras rutas en el futuro */}
    </Stack>
  );
}