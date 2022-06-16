/*HeaderComponent */

export const constants = {
  // Mensajes de error de la plataforma
  DialogErroroptions: {
    reload: 'Recargar',
    accept: 'Aceptar'
  },
  httpInterceptor: {
    'Default': {
      StatusCode: 'default',
      name: 'Error Default',
      title: '!Ops¡ Ha ocurrido un error',
      message: 'Parece que tenemos un error y es imposible conectarte. Por favor intenta más tarde o contáctanos por medio del botón "AYUDA"',
      image: 'assets/images/error-default.png',
      redirecTo: null,
      reload: true,
    },
    '400': {
      StatusCode: 400,
      name: 'Bad Request',
      title: 'Parámetros inválidos',
      message: 'Parece que el formato de tu solicitud no corresponde a uno esperado por el servidor. Por favor intenta más tarde o contáctanos por medio del botón "AYUDA"',
      image: 'assets/images/error-400.png',
      redirecTo: null,
      reload: true,
    },
    '403': {
      StatusCode: 403,
      name: 'Forbidden',
      title: 'Sesión expirada',
      message: 'Tu sesión ha expirado. Por favor regístrate de nuevo',
      image: 'assets/images/error-403.png',
      redirecTo: '/user',
      reload: false,
    },
    '404': {
      StatusCode: 404,
      name: 'Not Found',
      title: 'Página no encontrada',
      message: 'La página a la que intentaste ingresar no existe. Puedes comunicarte con nosotros por medio del botón “AYUDA”',
      image: 'assets/images/error-404-small.png',
      redirecTo: null,
      reload: false,
    },
    '500': {
      StatusCode: 500,
      name: 'Internal Server Error',
      title: 'Error de servidor',
      message: 'Parece que tenemos un inconveniente con nuestro servidor. Por favor intenta mas tarde o contáctanos por medio del botón "AYUDA"',
      image: 'assets/images/error-500.png',
      redirecTo: null,
      reload: true,
    },
    '502': {
      StatusCode: 502,
      name: 'Bad Gateway',
      title: 'Puerta de enlace no valida',
      message: 'Parece que algo ha pasado con tu red. Consulta sobre el estado de tu red, proxy o firewall o contáctanos por medio del botón "AYUDA"',
      image: 'assets/images/error-server-default.png',
      redirecTo: null,
      reload: true,
    },
    '503': {
      StatusCode: 503,
      name: 'Service Unavailable',
      title: 'Servidor en mantenimiento',
      message: 'Nuestro servidor se encuentra en mantenimiento. Por favor inténtalo más tarde o contáctanos por medio del botón "AYUDA"',
      image: 'assets/images/error-503.png',
      redirecTo: null,
      reload: true,
    },
    '504': {
      StatusCode: 504,
      name: 'Gateway Timeout',
      title: 'Tiempo de conexión expirado',
      message: 'Parece que tu petición ha tardado más de lo esperado. Por favor inténtalo de nuevo',
      image: 'assets/images/error-504.png',
      redirecTo: null,
      reload: true,
    },
    '508': {
      StatusCode: 508,
      name: 'Loop Detected',
      title: 'Número de intentos excedido',
      message: 'Hemos excedido el número de intentos. Cierra la pestaña he inténtalo de nuevo o contáctanos por medio del botón "AYUDA"',
      image: 'assets/images/error-server-default.png',
      redirecTo: null,
      reload: true,
    },
    '509': {
      StatusCode: 509,
      name: 'Bandwidth Limit Exceeded',
      title: 'Límite de ancho de banda excedido',
      message: 'Parece que has excedido el límite de tu ancho de banda. Por favor inténtalo más tarde',
      image: 'assets/images/error-server-default.png',
      redirecTo: null,
      reload: true,
    }
  },
  // Área para formularios (Mensajes y alertas de transacciones por formulario)
  request: {
    // Mensajes de respuesta Login
    unauthorized: 'El usuario o correo ingresado no se encuentra registrado, intente nuevamente',
    authorized: 'Bienvenido, por favor espere...'
  },
  // Mensajes de alerta por campo
  fields: {
    required: (attr: string) => `(*) El campo ${attr} es requerido.`,
    emailFormat: (attr: string) => `El campo ${attr} debe ser un correo eléctronico válido.`
  },
  menus: {

  },
  kendo: {
    styles: {
      Grid: {
        Header: { 'vertical-align': 'inherit', 'text-align': 'center' },
        Field: { 'text-align': 'center' }
      }
    }
  },
  modules: {
    notFound: {
      HEAD_IMG_URL: 'assets/images/notFound.png',
      HEAD_TITLE: 'Página no encontrada',
    },
    // Módulo de huella de carbono
    carbonFootprint: {
      deliveries: {
        exportToExcel: {
          label: 'Exportar a Excel',
          fileName: 'Informacion de viajes.xlsx'
        },
        importFromExcel: {
          label: 'Importar Excel'
        },
        table: {
          headers: {
            id: 'Id',
            bussinessId: 'Id',
            date: 'Fecha',
            sourceName: 'Origen',
            targetName: 'Destino',
            bUnit: 'U. Negocio',
            category: 'Categoría',
            year: 'Modelo',
            estimated: 'Calc. Estimados',
            footPrint: 'Huella'
          },
          dataFields: {
            bussinessId: 'BussinessId',
            id: 'id',
            date: 'Date',
            formattedDate: 'Formatted_Date',
            sourceName: 'Trip__Source__Name',
            targetName: 'Trip__Target__Name',
            bUnit: 'Trip__BussinessUnit__Name',
            category: 'StandardCategory__Name',
            year: 'Year',
            estimated: 'PerfomanceIsCalculated',
            estimatedPathIcon: 'Estimated_Path_Icon',
            footPrint: 'Footprint'
          },
          columnSection: {
            label: {
              weight: 'Peso Transportado: ',
              volume: 'Volumen Transportado: ',
              distance: 'Distancia: ',
              performance: 'Rendimiento'
            },
          }
        },

      },
      parameters: {
        exportToExcel: {
          label: 'Exportar a Excel',
          fileName: 'Parámetros de Rendimiento.xlsx'
        },
        importFromExcel: {
          label: 'IMPORTAR'
        },
        table: {
          headers: {
            category: 'Categoría',
            vehicleType: 'Tipo',
            model: 'Modelo',
            performance: {
              title: 'Rendimiento',
              small: '(Km/Gal)'
            },
            fuelType: 'Combustible'
          },
          dataFields: {
            category: 'Category__Name',
            vehicleType: 'BussinessVehicleType__Name',
            model: 'Year',
            performance: 'Perfomance',
            fuelType: 'FuelType__Name'
          }
        },

      },
      dashboard: {
        multiSeries: {
          originLabel: ' - Origen'
        }
      }
    },
    // Módulo Coldex
    coldex: {
      COLDEX_HEAD_IMG_URL: 'assets/images/coldex-icon-navbar.png',
      COLDEX_HEAD_TITLE: 'Coldex',
      SURVEY_CSS: {
        matrixdropdown: {
          root: 'table table-survey'
        }
      },
      PALETTE_COLORS: {
        '1': ['#009345', '#FFFFFF'],
        '2': ['#8CC540', '#FFFFFF'],
        '3': ['#FBB03B', '#FFFFFF'],
        '4': ['#F35927', '#FFFFFF'],
        '5': ['#FE0000', '#FFFFFF'],
        NA: ['#FFFFFF', '#000000'],
        SI: ['#FFFFFF', '#000000'],
        NO: ['#FFFFFF', '#000000']
      },
      VALIDATION_20: 'Debe dar respuesta a más del 20% de los actores para poder continuar.',
      VALIDATION_80: 'Ha valorado a más del 80% de los actores con la misma calificación en las siguientes preguntas, si la respuesta es correcta por favor justifique el por qué de dicha valoración, de lo contrario de clic en "Corregir" y ajuste sus respuestas.',
      TITLE_MSG_FINAL_COLDEX: 'Encuesta finalizada',
      BODY_MSG_FINAL_COLDEX: 'Usted ha completado satisfactoriamente el diligenciamiento de la encuesta, recibirá un correo de confirmación del cierre del cuestionario con los pasos a seguir. LOGYCA agradece su participación en esta iniciativa.',
      TITLE_ERROR_COLDEX: 'Encuesta no encontrada',
      BODY_MSG_ERROR_COLDEX: 'Encuesta no encontrada, por favor revise si el link corresponde al enviado por correo electrónico.',
      TITLE_MSG_DONT_FINALIZE: 'Encuesta no finalizada',
      BODY_MSG_DONT_FINALIZE: 'La encuesta no ha sido completada, sin embargo, sus respuestas han sido guardadas con éxito. Recuerde que al ingresar nuevamente al cuestionario, sus respuestas serán cargadas automáticamente.',
      CONDITION_COMPANIES_SECTORS: '{EmpresasSector} contains {item}',
      MSG_SAVE: 'Guardado',
      ROW_INVISIVILITY_CLASS: 'row-cells-invisible',
      SURVEYJS_THEME: 'bootstrapmaterial',
      SURVEYJS_COMPLETED_STATE: 'completed',
      TUTORIAL_QUESTION: 'Tutorial',
      INVISIBLE_PAGES_QUESTION: 'InvisiblePages',
      QUESTION_INVISIBLE: 'questionInvisible',
      HIDEN_BUSINESS_QUESTION: 'Empresa',
      LOCATION_QUESTION: 'Localización',
      ACTUAL_SECTORS_QUESTION: 'Sector',
      SELECTED_SECTORS_QUESTION: 'Sectors',
      RATED_BUSINESS_QUESTIONS: 'EmpresasSector',
      PROGRESS_QUESTION: 'Progress',
      ISTUTORIALQUESTION: '{Tutorial} = true',
    }
  }
};
