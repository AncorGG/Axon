# Axon

<details>
  <summary>Tabla de Contenidos</summary>
  <ol>
    <li><a href="#1-introducción--descripción">Introducción / Descripción</a></li>
    <li><a href="#2-diagramas-y-modelo-de-datos">Diagramas y Modelo de Datos</a></li>
    <li><a href="#3-requisitos-de-usuario">Requisitos de Usuario</a></li>
    <li><a href="#4-casos-de-uso">Casos de Uso</a></li>
    <li><a href="#5-descripción-del-sistema-y-especificaciones-técnicas">Descripción del Sistema y Especificaciones Técnicas</a></li>
    <li>
      <a href="#6-interfaces">Interfaces</a>
      <ul>
        <li><a href="#diseño-inicial">Diseño Inicial</a></li>
        <li><a href="#usabilidad-y-accesibilidad">Usabilidad y Accesibilidad</a></li>
      </ul>
    </li>
    <li><a href="#7-manuales">Manuales</a></li>
    <li>
      <a href="#8-test-de-prueba">Test de Prueba</a>
      <ul>
        <li><a href="#backend">Backend</a></li>
        <li><a href="#frontend">Frontend</a></li>
      </ul>
    </li>
    <li><a href="#9-pila-tecnológica">Pila Tecnológica</a></li>
    <li><a href="#10-comparación-de-tecnologías">Comparación de Tecnologías</a></li>
    <li><a href="#11-repositorios">Repositorios</a></li>
    <li><a href="#12-planificación">Planificación</a></li>
    <li><a href="#13-conclusiones-y-reflexiones">Conclusiones y Reflexiones</a></li>
    <li><a href="#14-enlaces-y-referencias">Enlaces y Referencias</a></li>
    <li><a href="#15-anexos">Anexos</a></li>
  </ol>
</details>

## 1. Introducción / Descripción

### Origen de la necesidad

Axon surge de la necesidad de fomentar el desarrollo cognitivo a través de ejercicios interactivos. En un mundo donde la tecnología es parte esencial de la vida cotidiana, es fundamental contar con herramientas que ayuden a mejorar habilidades mentales como la memoria, la atención y la agilidad mental de una manera accesible y entretenida.

### Empresa destinataria

Este proyecto ha sido desarrollado en el curso de **2º Desarrollo de Aplicaciones Multiplataforma** en el **IES EL RINCÓN**, con el objetivo de presentar una aplicación funcional como parte del **Proyecto de Trimestre**. Su destino es llegar a empresas promovedoras de la asistencia y salud mental para un envejecimiento sano en la era tecnológica.

### Resumen del proyecto

Axon es una aplicación diseñada para mejorar las capacidades cognitivas de los usuarios a través de una experiencia gamificada. Los usuarios pueden realizar ejercicios diseñados para potenciar su memoria, concentración y habilidades mentales, mientras cumplen retos y obtienen insignias como recompensa.

La aplicación ofrece diversas funcionalidades, incluyendo un menú de inicio que permite acceder rápidamente a los ejercicios, un sistema de retos y logros que motiva a los usuarios, un menú de opciones para personalizar la experiencia, y un sistema de rutinas que permite planificar entrenamientos personalizados.

---

## 2. Diagramas y Modelo de Datos

<details>
  <summary>Lista de campos, relaciones y sus correspondientes modelos que forman la app</summary>

- **Campos y Relaciones**

### **1. Exercise**

Representa los ejercicios disponibles en el sistema que pueden ser realizados.

- **Campos:**

  - `id_exercise (PK)`: Identificador único de cada ejercicio.
  - `exercise_name`: Nombre del ejercicio.
  - `difficulty`: Nivel de dificultad del ejercicio (por ejemplo: fácil, medio, difícil).
  - `speed`: Velocidad requerida o sugerida para realizar el ejercicio.
  - `experience`: Puntos de experiencia otorgados al completar el ejercicio.

- **Relaciones:**
  - Relacionado con `RoutineExercise` (un ejercicio puede estar en muchas rutinas).
  - Relacionado con `UserExercise` (un ejercicio puede ser completado por varios usuarios).

---

### **2. RoutineExercise**

Relaciona los ejercicios con las rutinas, indicando el orden de ejecución.

- **Campos:**

  - `id_routine* (PK, FK)`: Identificador de la rutina.
  - `id_exercise* (PK, FK)`: Identificador del ejercicio.
  - `sequence_order`: Orden de ejecución del ejercicio en la rutina.

- **Claves:**

  - Clave primaria compuesta: (`id_routine`, `id_exercise`).

- **Relaciones:**
  - Relacionado con `Routine` mediante `id_routine`.
  - Relacionado con `Exercise` mediante `id_exercise`.

---

### **3. Routine**

Representa las rutinas diseñadas para los usuarios.

- **Campos:**

  - `id_routine (PK)`: Identificador único de la rutina.
  - `name`: Nombre de la rutina.
  - `description`: Descripción de la rutina.
  - `creation_date`: Fecha en la que se creó la rutina.
  - `id_user* (FK)`: Identificador del usuario que creó la rutina.

- **Relaciones:**
  - Relacionado con `Users` mediante `id_user` (una rutina pertenece a un usuario).
  - Relacionado con los ejercicios a través de `RoutineExercise`.

---

### **4. Users**

Contiene los datos de los usuarios registrados en el sistema.

- **Campos:**

  - `id_user (PK)`: Identificador único del usuario.
  - `username`: Nombre de usuario.
  - `email`: Correo electrónico del usuario.
  - `level`: Nivel actual del usuario.
  - `experience`: Puntos de experiencia acumulados por el usuario.
  - `registration_date`: Fecha de registro del usuario.
  - `hashed_password`: Contraseña hasheada del usuario.
  - `token`: Token del usuario activo.

- **Relaciones:**
  - Relacionado con `Routine` (un usuario puede crear muchas rutinas).
  - Relacionado con `UserExercise` (un usuario puede completar muchos ejercicios).
  - Relacionado con `UserMilestone` y `UserBadge` para registrar logros y recompensas.
  - Relacionado con `Configuration` (un usuario tiene una configuración única).

---

### **5. UserExercise**

Registra qué ejercicios ha completado un usuario y cuándo.

- **Campos:**

  - `id_exercise* (PK, FK)`: Identificador del ejercicio completado.
  - `id_user* (PK, FK)`: Identificador del usuario.
  - `completion_date`: Fecha de finalización del ejercicio.

- **Relaciones:**
  - Relacionado con `Exercise` mediante `id_exercise`.
  - Relacionado con `Users` mediante `id_user`.

---

### **6. Milestones**

Representa los hitos o logros que los usuarios pueden alcanzar semanalmente.

- **Campos:**

  - `id_milestone (PK)`: Identificador único del hito.
  - `name`: Nombre del hito.
  - `description`: Descripción del hito.
  - `reward`: Recompensa asociada al hito.
  - `week`: Semana en la que se puede lograr el hito.

- **Relaciones:**
  - Relacionado con `UserMilestone` (un hito puede ser alcanzado por muchos usuarios).

---

### **7. UserMilestone**

Relaciona a los usuarios con los hitos que han logrado.

- **Campos:**

  - `id_milestone* (PK, FK)`: Identificador del hito alcanzado.
  - `id_user* (PK, FK)`: Identificador del usuario.
  - `completion_date`: Fecha de finalización del hito.

- **Relaciones:**
  - Relacionado con `Milestones` mediante `id_milestone`.
  - Relacionado con `Users` mediante `id_user`.

---

### **8. Badges**

Representa las insignias que los usuarios pueden ganar.

- **Campos:**

  - `id_badge (PK)`: Identificador único de la insignia.
  - `name`: Nombre de la insignia.
  - `description`: Descripción de la insignia.
  - `criteria`: Criterio para obtener la insignia.

- **Relaciones:**
  - Relacionado con `UserBadge` (una insignia puede ser otorgada a muchos usuarios).

---

### **9. UserBadge**

Relaciona a los usuarios con las insignias que han ganado.

- **Campos:**

  - `id_badge* (PK, FK)`: Identificador de la insignia ganada.
  - `id_user* (PK, FK)`: Identificador del usuario.
  - `completion_date`: Fecha en la que se ganó la insignia.

- **Relaciones:**
  - Relacionado con `Badges` mediante `id_badge`.
  - Relacionado con `Users` mediante `id_user`.

---

### **10. Configuration**

Almacena la configuración personalizada de cada usuario.

- **Campos:**

  - `id_configuration (PK)`: Identificador único de la configuración.
  - `id_user* (FK)`: Identificador del usuario.
  - `difficulty`: Nivel de dificultad predeterminado en la configuración.
  - `notifications`: Preferencias de notificaciones.
  - `audio`: Configuración de audio.

- **Relaciones:**

  - Relacionado con `Users` mediante `id_user`.

- **Modelo Entidad-Relación**

Desde el punto de vista del modelo E/R, el sistema consiste en varias entidades clave: Exercise, Routine, Users, Milestones, Badges, y Configuration. Las relaciones entre ellas se representan con vínculos como RoutineExercise, que conecta rutinas y ejercicios, y UserExercise, que asocia a los usuarios con ejercicios completados. Además, existen asociaciones entre Users y Milestones a través de la entidad UserMilestone, así como entre Users y Badges mediante la relación UserBadge.

![Diagrama Modelo Entidad - Relación](/public/images/doc/BBDDAxon.jpeg)

- **Modelo UML**

En el modelo UML, las entidades se representarían como clases con sus atributos listados dentro de ellas. Por ejemplo, la clase Exercise tiene atributos como id_exercise, exercise_name, difficulty, speed, y experience. Las relaciones entre las clases serían representadas con asociaciones, como la relación RoutineExercise que une Exercise y Routine. Las asociaciones pueden ser con multiplicidad, indicando, por ejemplo, que un User puede tener muchos Milestones a través de la clase de relación UserMilestone.

![Diagrama UML](/public/images/doc/UMLAxon.jpeg)

- **Modelo Relacional**

En el modelo relacional, los datos se estructuran en tablas. Cada entidad se representa como una tabla con columnas para sus atributos. Por ejemplo, la tabla Exercise tendrá columnas como id_exercise, exercise_name, difficulty, speed, y experience. Las relaciones entre entidades se representan mediante claves foráneas: en la tabla RoutineExercise, id_routine y id_exercise son claves foráneas que vinculan las rutinas y los ejercicios.

Las tablas UserExercise, UserMilestone, UserBadge, y Configuration también contienen claves foráneas que relacionan usuarios con sus respectivos ejercicios, hitos, insignias y configuraciones. En la sección superior se encuentran aquellas tablas que hemos llegado a implementar y en la parte inferior aquellas que no.

- Exercise (id_exercise, exercise_name, difficulty, speed, experience);
- RoutineExercise (id_routine\*, id_exercise\*, sequence_order);
- Routine (id_routine, name, description, creation date, id_user\*);
- Users (id_user, username, email, level, experience, registration_date, hashed_password, token);
- UserExercise ( id_exercise\*, id_user\*, completion_date);
- Milestones (id_milestone, name, description, reward, week)
- UserMilestone(id_milestone\*, id_user\*, completition_date);
- Badges (id_badge, name, description, criteria);
- UserBadge ( id_badge\*, id_user\*, completion_date);
- Configuration (id_configuration ​ , id_user\*, difficulty, notifications, audio);

- **Clases Java**

### Exercise

Entidad JPA mapeada a la tabla `exercises`. Su identificador (`id_exercise`) se genera automáticamente con `GenerationType.IDENTITY`. Define atributos simples como `exercise_name`, `difficulty`, `speed` y `experience`, todos ellos mapeados con `@Column`.

![Exercise](/public/images/doc/Exercise.png)

### Routine

Entidad JPA para la tabla `routines`. Utiliza `@CreationTimestamp` en `creation_date` para generar automáticamente la fecha de creación. La relación con `User` se establece con `@ManyToOne`, y `@JoinColumn` define la clave foránea `id_user`. Usa `@OnDelete(action = OnDeleteAction.CASCADE)`, eliminando la rutina si el usuario asociado es eliminado.

![Routine](/public/images/doc/Routine.png)

### RoutineExercise

Entidad intermedia que usa una clave compuesta (`@EmbeddedId`), necesaria para la relación muchos a muchos entre `Routine` y `Exercise` con datos adicionales (`sequence_order`). Usa `@MapsId` para referenciar los identificadores de `Routine` y `Exercise` dentro de `RoutineExerciseKey`.

![RoutineExercise](/public/images/doc/RoutineExercise.png)

### RoutineExerciseKey

Clase embebida (`@Embeddable`) que define la clave primaria compuesta con `idRoutine` e `idExercise`. Implementa `equals` y `hashCode` para garantizar la correcta comparación y manipulación en colecciones y consultas.

![RoutineExerciseKey](/public/images/doc/RoutineExerciseKey.png)

### User

Entidad que representa la tabla `user`, con atributos como `username`, `email`, `level`, `experience`, `hashedPassword` y `token` para autenticación. `@Column(unique = true)` en `username` y `email` garantiza que no haya duplicados.

![User](/public/images/doc/User.png)

### UserExercise

Entidad intermedia que usa `@EmbeddedId` para gestionar la relación entre `User` y `Exercise`. Usa `@MapsId` en las relaciones con `User` y `Exercise`, lo que permite que los identificadores de la clave primaria compuesta sean usados directamente.

![UserExercise](/public/images/doc/UserExercise.png)

### UserExerciseKey

Clase embebida (`@Embeddable`) que define `idUser` y `idExercise` como clave primaria compuesta. Implementa `Serializable` y sobrescribe `equals` y `hashCode` para asegurar su correcta manipulación en Hibernate.

![UserExerciseKey](/public/images/doc/UserExerciseKey.png)

### Badge

Entidad simple mapeada a la tabla `badge`, con un identificador autogenerado y atributos básicos (`name`, `description`, `criteria`). No tiene relaciones directas en el código mostrado.

![Badge](/public/images/doc/Badge.png)

</details>

## 3. Requisitos de Usuario

### Requisitos del Usuario Final

- **Navegador Web**: Se recomienda el uso de Google Chrome, Mozilla Firefox o Microsoft Edge para una mejor experiencia.
- **Conexión a Internet**: Se necesita una conexión estable para interactuar con la aplicación.
- **Cuenta de Usuario**: Es obligatorio registrarse para acceder a las funcionalidades completas.

### Requisitos para Desarrolladores

Para ejecutar el proyecto en un entorno local, se requieren las siguientes herramientas:

#### Backend

- **Java 17 o superior**: Para ejecutar el backend en Spring Boot.
- **Eclipse IDE** (o cualquier otro IDE compatible con Java y Spring Boot).
- **Maven**: Para la gestión de dependencias y construcción del proyecto.
- **MySQL Server**: Para la base de datos.
- **Postman** (opcional): Para probar las API endpoints.

#### Frontend

- **Node.js (v16 o superior)**: Necesario para ejecutar React y las dependencias del proyecto.
- **Vite**: Utilizado como entorno de desarrollo para React.
- **Un gestor de paquetes**: Se recomienda `npm` o `yarn`.
- **Visual Studio Code** (o cualquier otro IDE compatible con JavaScript y React).

#### Base de Datos

- **MySQL 8 o superior**: Base de datos utilizada en el proyecto.
- **MySQL Workbench** (opcional): Para la gestión y visualización de la base de datos.

---

## 4. Casos de Uso

En principio, Axon solo contará con la vista de usuario, podria ser interesante en algun futuro tener una vista de administrador, pero en principio el usuario será el que modifique todo lo que sea necesario en el sistema.

![Diagrama Casos de Uso](/public/images/doc/DiagramaCasoDeUso.png)

---

## 5. Descripción del Sistema y Especificaciones Técnicas

### 5.1 Descripción General del Sistema

Axon es una aplicación diseñada para mejorar las capacidades cognitivas a través de ejercicios interactivos y gamificados. El sistema consta de:

- **Frontend**: Aplicación web desarrollada con **React** para proporcionar una experiencia interactiva.
- **Backend**: Servidor construido con **Spring Boot** y **Java 17**, que maneja la lógica del negocio y la base de datos **MySQL**.

### 5.2 Arquitectura del Sistema

- **Frontend**:

  - Tecnologías: **React**, **Vite**, **CSS/HTML**.
  - Se comunica con el backend a través de APIs RESTful.
  - [Enlace del Github](https://github.com/AncorGG/Axon)

- **Backend**:

  - Tecnologías: **Spring Boot**, **Java 17**.
  - Conexion a BBDD: **MySQL**.
  - [Enlace del Github](https://github.com/AncorGG/Axon-PGV-Backend)

- **Autentificador**:
  - Tecnologías: **Java 17**
  - Seguridad: Autenticación con **JWT**.
  - [Enlace del Github](https://github.com/erizomovil/Axon-PGV-Backend-Autentification)

### 5.3 Especificaciones Técnicas

- **Servidor**: Alojado en un servidor con soporte para **Java** y **Spring Boot**, y base de datos **MySQL 8**.
- **Base de Datos**: Relacional, con tablas como **Users**, **Exercises**, **Routines**, etc.
- **Frontend Web**: Desarrollado en **React** con diseño responsivo para dispositivos móviles y de escritorio.
- **Seguridad**: Autenticación mediante **JWT** y almacenamiento de contraseñas con **bcrypt**.
- **Pruebas**: Se utiliza **Vitest** para frontend.

---

## 6. Interfaces

### Diseño Inicial

- [Enlace al prototipo en Figma](https://www.figma.com/design/HJk8vgOWnx1QTlaK5IyE1X/Axon?node-id=4-692&t=0cKKAxUaRP04XtPF-1)

### 6.1 Aspectos Claves de Usabilidad

Se han considerado los siguientes principios para garantizar una experiencia de usuario óptima:

- **Consistencia**: Uso uniforme de colores, tipografías e iconografía en toda la plataforma.
- **Simplicidad**: Diseño limpio con navegación intuitiva y mínima carga cognitiva.
- **Eficiencia**: Menor cantidad de clics para realizar tareas comunes.
- **Adaptabilidad**: Compatibilidad con distintos dispositivos y tamaños de pantalla.

### 6.2 Evaluación de Usabilidad y Accesibilidad

Para asegurar que la aplicación sea accesible a todos los usuarios, se realizaron las siguientes pruebas:

- **Pruebas con usuarios reales**: Evaluaciones con usuarios de distintos niveles de experiencia.
- **Cumplimiento de WCAG**: Implementación de estándares de accesibilidad web (WCAG 2.1).
- **Pruebas con herramientas automáticas**: Uso de Lighthouse y Wave para identificar mejoras.

### 6.3 Implementaciones en la Plataforma

A continuación, se muestran algunas de las características aplicadas:

- **Diseño Claro y Minimalista**: Interfaces limpias, con distribución lógica y sin sobrecarga de información.
- **Contraste y Legibilidad Adecuados**: Texto con suficiente contraste respecto al fondo, respetando estándares WCAG.
- **Navegación por Teclado**: Todos los elementos interactivos accesibles con Tab y Enter.
- **Compatibilidad con Lectores de Pantalla**: Uso de aria-label, roles semánticos y atributos alt en imágenes.
- **Respuesta y Feedback Inmediato**: Confirmaciones visuales y auditivas al interactuar con botones o formularios.
- **Diseño Responsivo y Adaptable**: Correcto funcionamiento en distintos tamaños de pantalla y dispositivos.
- **Botones y Áreas Interactivas Amplias**: Elementos táctiles con espacio suficiente para facilitar su uso.
- **Personalización y Ajustes**: Modificación de fuentes, colores y contrastes según necesidades del usuario.
- **Instrucciones Claras y Consistentes**: Uso de lenguaje simple y guías de usuario comprensibles.
- **Navegación simple**: Uso de diversos métodos de navegación claros.

---

## 7. Manuales

1. [Manual de instalación](public/documentation/Axon-ManualdeInstalación.pdf)
2. [Manual de usuario](public/documentation/Axon-ManualdeUsuario.pdf)
3. [Documentación](public/documentation/Axon-Documentacion.pdf)
4. **Guia de Ayuda**: Integrada dentro de la app.

---

## 8. Test de Prueba

### Backend

<!-- **************************************************************************** -->

### Frontend

Probar una aplicación garantiza que sus componentes y funcionalidades cumplan su propósito previsto según lo esperado, reduciendo errores y asegurando estabilidad. Ayuda a detectar problemas antes de que lleguen a los usuarios, mejora la calidad del código y facilita futuros cambios al actuar como una red de seguridad. Además, aumenta la confianza en el desarrollo al validar cada parte de la aplicación.

1. **Header**: Se ha probado que el componente Header se renderiza correctamente sin errores.
2. **Card**: Se verificó que el componente Card renderiza correctamente los elementos según las props proporcionadas.
3. **Close**: Se probó que, al recibir `action="home"`, el componente navega correctamente a la ruta `/home`, y cuando no se recibe `action`, vuelve a la página anterior.
4. **NavBar**: Se comprobó que renderiza correctamente todos los íconos de navegación y asigna la clase `nav-icon-selected` al ícono correspondiente a la ruta actual. Además, se validó que cada ícono navega correctamente a su ruta al hacer clic.
5. **HorizontalNavBar**: Se verificó que muestra todas las opciones de navegación y redirige correctamente al hacer clic en ellas. También se comprobó que la clase `option-selected` se aplica a la opción correspondiente a la ruta actual.
6. **Return**: Se probó que, al no recibir `action`, el componente navega hacia la página anterior.
7. **Test Buttons**: Se validó que los botones "Continue" y "Repeat" funcionan correctamente según el estado `isActive`, asegurando que el botón "Continue" llame a la función `onContinue` cuando está activo y que "Repeat" recargue la página solo si la URL coincide con `repeatUrl`. Además, se verificó que los botones se deshabilitan cuando `isActive` es false.

**Exercise Selector**: Se han realizado pruebas para asegurar que el componente `ExerciseSelector` carga correctamente la lista de rutinas y ejercicios desde los servicios backend. Utilizando mocks para los servicios, se verifica que los datos se rendericen adecuadamente en la interfaz de usuario.

### Componente Principal - **DigitBash**

El test más importante en este proyecto corresponde al componente **DigitBash**, que es fundamental para la experiencia interactiva del usuario. Este componente genera secuencias de números que los usuarios deben memorizar y recordar bajo ciertas condiciones.

- **Descripción**: El test asegura que el componente:
  - **Genera una secuencia de 4 dígitos** sin repetir números consecutivos.
  - **Muestra los dígitos uno por uno** con un retraso entre cada uno.
  - La secuencia observada se valida con una expresión regular para confirmar que contiene 4 dígitos únicos.

```javascript
it("generates a 4 digit sequence with non-repeating numbers", async () => {
  const digitLength = 4;
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  await act(async () => {
    render(<DigitBash type="read" digitSpeed={1} digitLength={digitLength} />);
  });

  let codeElement = "";
  let previousDigit = "";
  for (let i = 0; i < digitLength; i++) {
    await act(async () => {
      const digit = await screen.getByText((content, element) => {
        return (
          element?.tagName === "P" &&
          element?.classList.contains("digitb-digit") &&
          /\d/.test(content)
        );
      });
      const currentDigit = digit.textContent!;
      expect(currentDigit).not.toBe(previousDigit);
      codeElement += currentDigit;
      previousDigit = currentDigit;
    });
    await act(async () => { await sleep(1000); });
  }

  console.log("Observed Number: " + codeElement);
  expect(codeElement).toMatch(/^\d{4}$/);
});
```

---

## 9. Pila Tecnológica

**Frontend**:

- **Tecnologías**: React, Vite, CSS/HTML.
- Comunicación con el backend a través de APIs RESTful.
- [Enlace del Repositorio Frontend](https://github.com/AncorGG/Axon)

**Backend**:

- **Tecnologías**: Spring Boot, Java 17.
- Conexión a BBDD: MySQL.
- [Enlace del Repositorio Backend](https://github.com/AncorGG/Axon-PGV-Backend)

**Autentificador**:

- **Tecnologías**: Java 17.
- Seguridad: Autenticación con JWT.
- [Enlace del Repositorio Autentificación](https://github.com/erizomovil/Axon-PGV-Backend-Autentification)

---

## 10. Comparación de Tecnologías

- **Frontend**:  
  React y Vite son tecnologías modernas que permiten un desarrollo rápido y eficiente. React es conocido por su eficiencia en el renderizado, mientras que Vite proporciona una configuración de desarrollo extremadamente rápida gracias a su enfoque en la construcción de proyectos y recarga en caliente.

- **Backend**:  
  Spring Boot es una opción robusta para aplicaciones Java con un gran ecosistema y soporte. Con MySQL, se puede lograr una integración sencilla y eficiente de bases de datos relacionales, proporcionando alta fiabilidad y escalabilidad.

- **Autentificación**:  
  El uso de JWT para la autenticación asegura una implementación ligera y segura de manejo de sesiones, siendo ideal para aplicaciones web modernas y móviles.

---

## 11. Repositorios

- [Repositorio Frontend](https://github.com/AncorGG/Axon)
- [Repositorio Backend](https://github.com/AncorGG/Axon-PGV-Backend)
- [Repositorio Autentificación](https://github.com/erizomovil/Axon-PGV-Backend-Autentification)

---

## 12. Planificación

El desarrollo del proyecto se dividió en dos fases principales:

1. **Fase de Planificación y Diseño:**

   - Se utilizó Figma para diseñar la interfaz de usuario, asegurando una experiencia fluida e intuitiva.
   - Se definieron los requisitos funcionales y técnicos del proyecto, estableciendo las bases para el desarrollo.
   - Una vez aprobado el diseño, se procedió a la siguiente fase.

2. **Fase de Desarrollo:**
   - Se trabajó simultáneamente en el front-end y back-end para optimizar tiempos.
   - El equipo utilizó GitHub Projects para asignar tareas, hacer seguimiento del progreso y mantener un flujo de trabajo ordenado.
   - Se realizaron revisiones de código periódicas para garantizar calidad y coherencia en el desarrollo.
   - Se llevaron a cabo pruebas continuas para detectar y corregir errores antes de la implementación final.

---

## 13. Conclusiones y Reflexiones

El desarrollo de este proyecto ha sido una experiencia enriquecedora, permitiéndonos mejorar nuestras habilidades tanto en la planificación como en la implementación de software. Algunos puntos clave incluyen:

- La fase de diseño fue crucial para evitar problemas en el desarrollo y garantizar una buena experiencia de usuario.
- El uso de herramientas como Figma y GitHub Projects ayudó a mantener el equipo organizado y alineado con los objetivos.
- Enfrentamos desafíos técnicos en la integración de ciertos módulos, pero logramos superarlos mediante investigación y colaboración.
- La implementación de buenas prácticas en el código y revisiones constantes fueron fundamentales para el éxito del proyecto.

---

## 14. Enlaces y Referencias

- [Figma](https://www.figma.com/)
- [GitHub Projects](https://github.com/features/project-management)
- [React](https://react.dev/)
- [Node.js](https://nodejs.org/)

---

## 15. Autores

- [Ancor García Guedes](https://github.com/AncorGG)
- [Jorge Gabriel Arcalá Gonzalez](https://github.com/erizomovil)
