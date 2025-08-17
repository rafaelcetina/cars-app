# Arquitectura Híbrida - Cars App

## Descripción General

Esta aplicación implementa una arquitectura híbrida que combina **páginas estáticas** generadas en build time con **islands dinámicos** para contenido generado por IA bajo demanda.

## Arquitectura

### 1. Páginas Estáticas (Build Time)

- **Rutas**: `/`, `/[brand]`, `/[brand]/[model]`
- **Renderizado**: Server-side en build time
- **Contenido**: Información básica de marcas y modelos desde la API
- **Ventajas**:
  - Carga rápida
  - SEO optimizado
  - Sin dependencia de contenido generado por IA

### 2. Islands Dinámicos (Client-side)

- **Componente**: `DynamicContent.svelte`
- **Renderizado**: Client-side con `client:load`
- **Funcionalidad**: Generación y cache de contenido por IA
- **Ventajas**:
  - Contenido generado solo cuando se visita
  - Cache inteligente para evitar regeneración
  - Interactividad completa

## Flujo de Datos

### Primera Visita a un Modelo

1. **Página estática** se carga con información básica
2. **Island dinámico** verifica si existe contenido en BD
3. Si no existe, genera contenido con IA
4. Guarda el contenido en la base de datos
5. Muestra el contenido generado

### Visitas Subsecuentes

1. **Página estática** se carga
2. **Island dinámico** encuentra contenido existente
3. Muestra contenido desde cache sin generar nuevo

## Componentes Clave

### DynamicContent.svelte

```typescript
// Estados del componente
- isChecking: Verificando existencia de contenido
- isLoading: Generando contenido con IA
- contentExists: Contenido disponible
- error: Error en generación
```

### Endpoints API

- `GET /api/check-content`: Verifica si existe contenido
- `POST /api/generate-car`: Genera y guarda contenido

### ContentService

- Maneja operaciones de BD (actualmente localStorage)
- Cache inteligente por brand/model/year
- Fácil migración a BD real

## Ventajas de esta Arquitectura

### Performance

- ✅ Páginas principales cargan instantáneamente
- ✅ Contenido IA solo se genera cuando se necesita
- ✅ Cache evita regeneración innecesaria

### SEO

- ✅ URLs estáticas indexables
- ✅ Meta tags generados en build time
- ✅ Contenido básico siempre disponible

### Costos

- ✅ Menos llamadas a APIs de IA
- ✅ Solo genera contenido visitado
- ✅ Cache reduce costos de regeneración

### UX

- ✅ Carga rápida de páginas
- ✅ Indicadores de estado claros
- ✅ Fallbacks para errores

## Implementación de Base de Datos

### Actual (Mock)

- localStorage para demostración
- Persistencia temporal en navegador

### Recomendado

```sql
CREATE TABLE car_content (
  id VARCHAR(255) PRIMARY KEY,
  brand VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  year INT NOT NULL,
  content TEXT NOT NULL,
  generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_car (brand, model, year)
);
```

## Migración de Contenido

Para migrar de archivos estáticos a BD:

1. **Leer archivos existentes**:

```javascript
const cars = await getCollection('cars');
```

2. **Migrar a BD**:

```javascript
for (const car of cars) {
  await contentService.saveContent(car.data.brand, car.data.model, car.data.year, car.body);
}
```

3. **Actualizar getStaticPaths**:

```javascript
// Remover dependencia de getCollection
// Usar solo API para brands/models
```

## Configuración

### Variables de Entorno

```env
OPENAI_API_KEY=your_openai_key
DATABASE_URL=your_database_url
```

### Astro Config

```javascript
export default defineConfig({
  output: 'static', // Páginas estáticas
  integrations: [
    svelte({
      // Islands dinámicos
    }),
  ],
});
```

## Próximos Pasos

1. **Implementar BD real** (PostgreSQL, MySQL, etc.)
2. **Añadir analytics** de contenido generado
3. **Implementar cache distribuido** (Redis)
4. **Añadir rate limiting** para generación
5. **Optimizar prompts** de IA
6. **Añadir validación** de contenido generado
