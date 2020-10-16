import React, {Component} from 'react';
import {withRouter} from 'next/router';
import {Collapse} from 'antd';
import GlobalLayou from '../components/Layout';
import styled from 'styled-components';
import {
  brandColor,
  lightGray,
  middleGray,
  secondaryColor,
} from '../components/utils';
import Head from '../components/Head';

const AyudaContainer = styled.div`
  &>div{
    text-align: justify;
    text-justify: inter-word;
    font-size: 1.2em;
  }
  & ul {
    list-style: none;
  }
  .ant-collapse{
    .ant-collapse-item{
      .ant-collapse-header{
        color: ${brandColor};
        text-align: center;
        font-size: 16px;
        font-weight: bold;
      }
      .ant-collapse-content-box{
        text-align: justify;
        padding: 3rem;
        ul ul, .privacy-list li{
          padding-left: 1.5rem;
        }
      }
    }
  }
`;

const TablaContainer = styled.div`
  text-align: center;
  h5 {
    font-size: 16px;
    font-weight: bold;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
    margin: 0 auto 20px;
    border-radius: 10px;
    thead {
      background-color: ${brandColor};
      color: white;
    }
    td,
    th {
      border: 1px solid #ddd;
      padding: 10px;
    }
    tbody {
      tr:nth-child(even) {
        background-color: ${lightGray};
      }
      tr:hover {
        background-color: ${middleGray};
      }
    }
  }
`;

const Panel = Collapse.Panel;

const textoViajeMascotas = () => (
    <div>
      <p>
        Por política de la compañía, las mascotas aceptadas para ser
        transportadas
        en las rutas que opera EduExpress se limitan a perros y gatos (animales
        domésticos).{' '}
        <u>
          Las aves exóticas, especies protegidas o en vía de extinción no son
          aceptadas para su transporte.
        </u>
        Asimismo, su mascota no será considerada dentro del equipaje permitido
        que
        su tarifa le ofrece.
      </p>
      <p>
        <b>Requisitos y condiciones</b>
      </p>
      <ul>
        <li>
          ✓ Solo está permitido una (01) mascota por pasajero y está sujeto a
          disponibilidad de espacio de la nave, cuya capacidad máxima son 3
          kennels.
        </li>
        <li>
          ✓ El pasajero tiene que entregar a su mascota en kennel para que la
          empresa pueda transportarlo y debe tener las siguientes
          características:
        </li>
        <ul>
          <li>
            o Ser de material resistente y seguro y con un cierre que ofrezca
            garantías de que no se abrirá en ningún momento.
          </li>
          <li>
            o Cómodo para la talla del animal y sin ningún deterioro exterior ni
            interior que pueda dañar a tu mascota.
          </li>
          <li>o Con ventilación y fondo impermeable.</li>
        </ul>
        <li>
          ✓ La mascota debe cumplir con las regulaciones de sanidad que exige la
          ley a través del certificado correspondiente y debe tener las
          certificaciones de vacunación.
        </li>
        <li>
          ✓ Se considerará un cobro mínimo de 06 Kgs, según la tarifa vigente de
          exceso de equipaje.
        </li>
        <li>
          ✓ Debe llenar y firmar el documento de autorización para transporte de
          mascotas emitido por EduExpress.
        </li>
      </ul>
      <p>
        <b>Información importante</b>
      </p>
      <ul>
        <li>
          • Excepcionalmente dentro de nuestras rutas se podrá transportar
          gallos
          de pelea que estén en galponeras y cuenten con sus respectivas
          certificaciones de vacunación. El flete de transporte es de 20 soles
          por
          gallo.
        </li>
        <li>
          • El transportista podrá denegar el embarque de cualquier animal que
          no
          cumpla con los requisitos anteriormente citados sin incurrir en
          responsabilidad alguna.
        </li>
      </ul>
    </div>
);

const textoTarifas = () => (
    <div>
      <p>
        Con el propósito de seguir ofreciendo un servicio de calidad y la mejor
        atención, Corporación Turística Yurimaguas S.A.C comunica a sus clientes
        un ajuste en las condiciones y precios de sus tarifas, el cual entrará
        en
        vigencia a partir del 01 de Enero de 2019. Nuestras tarifas serán las
        siguientes:
      </p>
      <TablaContainer>
        <h5>Ruta Yurimaguas – Nauta y viceversa</h5>
        <table border='1' align='center'>
          <thead>
          <tr>
            <td>Categoria</td>
            <td>Tarifa Regular</td>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Infante (0-2)</td>
            <td>S/. 16</td>
          </tr>
          <tr>
            <td>Niño (3-11)</td>
            <td>S/. 144</td>
          </tr>
          <tr>
            <td>Adultos (12+)</td>
            <td>S/. 160</td>
          </tr>
          </tbody>
        </table>
      </TablaContainer>
      <TablaContainer>
        <h5>Ruta Iquitos – Santa Rosa y viceversa</h5>
        <table border='1' align='center'>
          <thead>
          <tr>
            <td>Categoria</td>
            <td>Tarifa Regular</td>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Infante (0-2)</td>
            <td>S/. 14</td>
          </tr>
          <tr>
            <td>Niño (3-11)</td>
            <td>S/. 126</td>
          </tr>
          <tr>
            <td>Adultos (12+)</td>
            <td>S/. 140</td>
          </tr>
          </tbody>
        </table>
      </TablaContainer>
      <TablaContainer>
        <h5>Modificación de su viaje</h5>
        <div style={{overflowX: 'auto'}}>
          <table border='1' align='center' width={768}>
            <thead>
            <tr>
              <td>CONCEPTO/CONDICIÓN</td>
              <td>ANTES DEL VIAJE</td>
              <td>DESPUÉS DE LA FECHA DE VIAJE</td>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                Reprogramación (sujeto a disponibilidad de asientos y
                condiciones
                generales)
              </td>
              <td>
                <b>
                  <u>Si aún quedan más de 24 horas para su viaje:</u>
                </b>
                <ul>
                  <li>• 1era vez: Permite cambio sin costo alguno</li>
                  <li>• Otras veces: Permite con cargo de S/. 30</li>
                </ul>
                <b>
                  <u>
                    Si su viaje está programado dentro de las próximas 24 horas:
                  </u>
                </b>
                <ul>
                  <li>
                    • Se cobrará una penalidad del 50% del valor del boleto.
                  </li>
                </ul>
              </td>
              <td>Permite pagando una penalidad del 50% del valor del boleto.
              </td>
            </tr>
            <tr>
              <td>Devolución</td>
              <td>Permite devolución con cargo de S/. 100</td>
              <td>Permite devolución con cargo de S/.150</td>
            </tr>
            </tbody>
          </table>
        </div>
      </TablaContainer>
    </div>
);

const textoCondiciones = () => (
    <div>
      <p>
        En cumplimiento del Código de Protección y Defensa del Consumidor
        informamos las condiciones para Endosos y Postergaciones:
      </p>
      <b>
        <u>Condiciones generales del cambio de pasaje</u>
      </b>
      <ul>
        <li>
          1. Respecto al endoso:
          <ul>
            <li>
              ● Se puede realizar en cualquiera de nuestras oficinas de venta o
              agencias autorizadas, con 24 horas mínimas antes del zarpe del
              viaje
              que quiera endosar.
            </li>
            <li>
              ● Se deberá presentar el ticket del viaje (boleta o factura),
              documento de identidad del titular del ticket y el documento de
              identidad del tercero.
            </li>
            <li>● Aplica cargo por reemisión de S/. 30, no reembolsable.</li>
            <li>
              ● En el caso de que el ticket a endosar pertenezca a un infante o
              niño y el beneficiario sea un adulto, se deberá pagar la
              diferencia
              de tarifa por tipo de pasajero, al momento de solicitar el endoso.
            </li>
          </ul>
        </li>
        <li>
          2. Respecto a las postergaciones:
          <ul>
            <li>
              ● Se puede realizar en cualquiera de nuestras oficinas de venta o
              agencias autorizadas, con 24 horas mínimas antes del zarpe del
              viaje
              que quiera postergar.
            </li>
            <li>● Aplica cargo por reemisión de S/. 30, no reembolsable.</li>
            <li>
              ● El cambio procederá respetando siempre:
              <ul>
                <li>
                  A. Las regulaciones del boleto original, sujeto a la
                  disponibilidad de la misma tarifa o superior; aplicando cobro
                  de
                  diferencia tarifaria, de ser el caso.
                </li>
                <li>
                  B. Si el boleto no ha sido utilizado, la postergación será
                  máximo por el plazo de un año contado a partir de la fecha de
                  emisión (vigencia del ticket).
                </li>
                <li>
                  C. Solo aplica para pasajeros que califiquen como consumidores
                  finales, conforme al Código de Protección y Defensa del
                  Consumidor. En ese sentido, no aplica a empresas que cuenten
                  con
                  contrato corporativo u otras empresas o pasajeros que no
                  califiquen como consumidores finales.
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
);

const textoPrivacidad = () => (
    <div>
      <b>1. Normatividad aplicable</b>
      <p>
        De conformidad con lo dispuesto en la Ley N° 29733, Ley de Protección de
        Datos Personales y su Reglamento aprobado por Decreto Supremo N°
        003-2013-JUS, se presenta la política de tratamiento de datos para los
        Titulares de la información de los datos personales que se encuentren
        registrados en las bases de datos de CORPORACION TURISTICA YURIMAGUAS
        S.A.C.
      </p>
      <p>
        Esta Política de Tratamiento de Datos Personales tiene como objeto
        informarle sobre los aspectos relevantes en relación con la recolección,
        finalidad, uso, manejo y transferencia de datos personales que
        CORPORACION
        TURISTICA YURIMAGUAS S.A.C. realiza, así como también dar a conocer sus
        derechos como Titular.
      </p>

      <b>2. Identificación del responsable del tratamiento de la información</b>
      <p>
        CORPORACION TURISTICA YURIMAGUAS S.A.C, identificada con R.U.C
        20494033721, es una persona jurídica con el objeto social de Agencia de
        viajes, Transporte de pasajeros por vías interiores de navegación y
        Transporte de carga por vía terrestre, con domicilio fiscal en Calle
        Elena
        Pardo No 114 – Yurimaguas, Teléfono 065-351270, correo electrónico
        contacto@eduexpress.pe.
      </p>
      <p>
        CORPORACION TURISTICA YURIMAGUAS S.A.C (en adelante, “LA EMPRESA”) actúa
        como responsable y encargado del tratamiento de los datos registrados en
        sus bases de datos y no tiene asignado ningún encargado del tratamiento
        de
        datos externo a la empresa.
      </p>
      <b>3. Definiciones</b>
      <p>
        Para tener total entendimiento de la Política, se deben tener en cuenta
        las siguientes definiciones conformes con la legislación vigente sobre
        la
        materia:
      </p>
      <ul className='privacy-list'>
        <li>
          <b>❖ Autorización</b>
          <p>
            Consentimiento previo, expreso e informado del titular para llevar a
            cabo el tratamientode datos personales.
          </p>
        </li>
        <li>
          <b>❖ Aviso de privacidad</b>
          <p>
            Comunicación verbal o escrita generada por el responsable, dirigida
            al
            titular para el tratamiento de sus datos personales, mediante la
            cual
            se le informa acerca de la existencia de las políticas de
            tratamiento
            de información que le serán aplicables, la forma de acceder a las
            mismas y las finalidades del tratamiento que se pretende dar a los
            datos personales.
          </p>
        </li>
        <li>
          <b>❖ Base de Datos</b>
          <p>
            Conjunto organizado de datos personales que sean objeto de
            Tratamiento.
          </p>
        </li>
        <li>
          <b>❖ Cookie</b>
          <p>
            Es un archivo que envía un servidor web al disco duro del usuario
            que
            lo visita, con información sobre sus preferencias y sobre sus pautas
            de navegación a la hora de ingresar a internet.
          </p>
        </li>
        <li>
          <b>❖ Dato personal</b>
          <p>
            Cualquier información vinculada o que pueda asociarse a una o varias
            personas naturales determinadas o determinables.
          </p>
        </li>
        <li>
          <b>❖ Dato semiprivado</b>
          <p>
            Es semiprivado el dato que no tiene naturaleza íntima, reservada, ni
            pública y cuyo conocimiento o divulgación puede interesar no sólo a
            su
            titular sino a cierto sector o grupo de personas o a la sociedad en
            general, como el dato financiero, crediticio y de actividad
            comercial.
          </p>
        </li>
        <li>
          <b>❖ Datos sensibles</b>
          <p>
            Se entiende por datos sensibles aquellos que afectan la intimidad
            del
            titular o cuyo uso indebido puede generar su discriminación, tales
            como aquellos que revelen el origen racial o étnico, la orientación
            política, las convicciones religiosas o filosóficas, la pertenencia
            a
            sindicatos, organizaciones sociales, de derechos humanos o que
            promueva intereses de cualquier partido político o que garanticen
            los
            derechos y garantías de partidos políticos de oposición, así como
            los
            datos relativos a la salud, a la vida sexual, y los datos
            biométricos.
          </p>
        </li>
        <li>
          <b>❖ Dato público</b>
          <p>
            Es el dato que no es semiprivado, privado o sensible. Son
            considerados
            datos públicos, entre otros, los datos relativos al estado civil de
            las personas, a su profesión u oficio y a su calidad de comerciante
            o
            de servidor público. Por su naturaleza, los datos públicos pueden
            estar contenidos, entre otros, en registros públicos, documentos
            públicos, gacetas y boletines oficiales y sentencias judiciales
            debidamente ejecutoriadas que no estén sometidas a reserva.
          </p>
        </li>
        <li>
          <b>❖ Encargado del Tratamiento</b>
          <p>
            Persona natural o jurídica, pública o privada, que por sí misma o en
            asocio con otros, realiza el tratamiento de datos personales por
            cuenta del responsable del tratamiento.
          </p>
        </li>
        <li>
          <b>❖ Información financiera, crediticia y comercial</b>
          <p>
            Es aquella referida al nacimiento, ejecución y extinción de
            obligaciones dinerarias, independientemente de la naturaleza del
            contrato que les dé origen.
          </p>
        </li>
        <li>
          <b>❖ Responsable del Tratamiento</b>
          <p>
            Persona natural o jurídica, pública o privada, que por sí misma o en
            asocio con otros, decida sobre la base de datos y/o el tratamiento
            de
            los datos.
          </p>
        </li>
        <li>
          <b>❖ Titular</b>
          <p>
            Persona natural cuyos datos personales son objeto de tratamiento.
            Teniendo en cuenta que la empresa tiene sitio web también se
            denomina
            titular al usuario del portal web que haga entrega de sus datos
            personales por este medio.
          </p>
        </li>
        <li>
          <b>❖ Transferencia </b>
          <p>
            La transferencia de datos tiene lugar cuando el responsable y/o
            encargado del tratamiento de datos personales, ubicado en Colombia,
            envía la información o los datos personales a un receptor, que a su
            vez es responsable del tratamiento y se encuentra dentro o fuera del
            país.
          </p>
        </li>
        <li>
          <b>❖ Transmisión</b>
          <p>
            Tratamiento de datos personales que implica la comunicación de los
            mismos dentro o fuera del territorio de la República de Colombia
            cuando tenga por objeto la realización de un tratamiento por el
            encargado por cuenta del responsable.
          </p>
        </li>
        <li>
          <b>❖ Tratamiento</b>
          <p>
            Cualquier operación o conjunto de operaciones sobre datos
            personales,
            tales como la recolección, almacenamiento, uso, circulación,
            transmisión o supresión.
          </p>
        </li>
      </ul>

      <b>4. Recolección de datos</b>
      <p>
        LA EMPRESA podrá solicitar información del titular vía correo
        electrónico,
        presencial, telefónica, chat, aplicativo móvil o por su sitio web a
        clientes, proveedores, colaboradores, empleados, prospectos, aspirantes
        a
        vacantes de la empresa, casos en los cuales solicitará la autorización
        para el tratamiento de datos.
      </p>
      <p>
        LA EMPRESA en ningún momento solicitará a clientes o prospectos
        información catalogada como sensible tal como la relacionada con la
        orientación política, religiosa, sexual o filosófica, el origen racial o
        étnico, la pertenencia o participación a sindicatos u organizaciones
        sociales o de derechos humanos o datos relativos a la salud.
      </p>
      <p>
        LA EMPRESA podrá solicitar información a los usuarios que ingresen a los
        portales web, cuya respuesta en cualquier caso será voluntaria. Al
        ingresar al portal web, el usuario acepta que en caso de dar información
        personal lo hace de manera voluntaria y adquiere el compromiso de
        suministrar información personal correcta y verdadera, así como proceder
        a
        la actualización de sus datos cada vez que se requiera.
      </p>
      <p>
        Si el usuario ingresa vía, telefónica, chat, presencial, por aplicativo
        móvil o redes sociales, LA EMPRESA solicitará autorización del manejo de
        sus datos personales, así como proceder a la actualización de sus datos
        cada vez que se requiera vía correo electrónico.
      </p>
      <p>
        LA EMPRESA en ocasiones utilizará cookies para identificar a los
        usuarios
        que visitan el portal web, recordar sus preferencias y proporcionar
        servicios personalizados.
      </p>
      <p>
        La información y/o datos personales que recolectamos del titular por
        cualquiera de nuestros medios, son los siguientes:
      </p>
      <ul className='privacy-list'>
        <li>
          <b>❖ Para cotizaciones:</b> nombres completos, número de
          identificación,
          correo electrónico y número telefónico del titular.
        </li>
        <li>
          <b>❖ Para reservas:</b> nombres completos, número de identificación,
          fecha de nacimiento, correo electrónico, número telefónico, dirección
          de
          domicilio del titular, adicional los nombres completos de los
          acompañantes, fechas de nacimiento, números de identificación.
        </li>
        <li>
          <b>❖ Para facturación:</b> nombres completos o razón social, número de
          identificación o NIT, correo electrónico, número telefónico y
          dirección
          de domicilio del comprador.
        </li>
        <li>
          <b>❖ Para pagos:</b> Datos de la tarjeta como franquicia, banco del
          que
          hace parte, datos personales del tarjetahabiente, correo corporativo,
          correo personal, dirección domiciliaria.
        </li>
        <li>
          <b>❖ Para actualización perfil del cliente:</b> Preferencias y gustos
          al
          momento de viajar.
        </li>
      </ul>
      <b>
        4.1. Información adicional solicitada a trabajadores o colaboradores de
        la
        empresa
      </b>
      <p>
        LA EMPRESA podrá solicitar a sus trabajadores o colaboradores
        información
        que podría catalogarse como sensible tal como nivel de escolaridad,
        edad,
        estado civil y/o características de la vivienda (propia o arrendada), se
        solicita el nivel de escolaridad con el fin de validar el cargo a
        desempeñar por el titular, en caso que el cargo requiera un nivel de
        escolaridad definido, los demás datos para enfocar los programas de
        salud
        y seguridad en el trabajo y de promoción y prevención.
      </p>
      <p>
        Así mismo podrá solicitar información sobre las incapacidades médicas de
        los trabajadores para control de ausentismo, y así enfocar los programas
        de promoción y prevención y dar cumplimiento al Decreto 1072 de 2015.
      </p>

      <b>5. Autorización</b>
      <p>
        LA EMPRESA podrá usar cualquier mecanismo para obtener la autorización
        de
        tratamiento de datos ya sea escrito, de forma oral o vía correo
        electrónico que permitan concluir de forma razonable que se otorgó la
        autorización. Así mismo LA EMPRESA mantendrá registros o mecanismos
        necesarios para demostrar cuándo y cómo se obtuvo la autorización por
        parte de los titulares de datos personales para el tratamiento del
        mismo.
      </p>
      <p>La autorización del Titular No será necesaria cuando se trate de:</p>
      <ul className='privacy-list'>
        <li>
          ❖ Información requerida por LA EMPRESA en ejercicio de sus funciones
          legales o por orden judicial.
        </li>
        <li>❖ Datos de naturaleza pública.</li>
        <li>❖ Casos de urgencia médica o sanitaria.</li>
        <li>
          ❖ Tratamiento de información autorizado por la ley para fines
          históricos, estadísticos o científicos.
        </li>
        <li>❖ Datos relacionados con el registro civil de las Personas.</li>
      </ul>

      <b>6. Usos y finalidades del tratamiento de datos</b>
      <p>
        En desarrollo de su objeto social, del mantenimiento de vínculos
        comerciales, del cumplimiento de contratos de trabajadores,
        colaboradores,
        clientes, aliados y del cumplimiento de órdenes de autoridades
        judiciales
        y/o administrativas, LA EMPRESA podrá dar tratamiento a los datos
        personales para:
      </p>

      <ul className='privacy-list'>
        <li>
          ❖ Lograr una eficiente comunicación relacionada con nuestros
          productos,
          servicios, ofertas, promociones, alianzas, concursos, contenidos y
          demás
          actividades y así facilitarle el acceso general a la información de
          éstos.
        </li>
        <li>
          ❖ Evaluar la calidad de nuestros productos y servicios mediante
          encuestas de satisfacción y realizar estudios sobre hábitos de
          consumo,
          preferencia, interés de compra, prueba de producto, concepto y otras
          relacionadas con nuestros servicios.
        </li>
        <li>
          ❖ Realizar actividades de mercadeo, promoción, publicidad,
          facturación,
          cobranza, recaudo, mejoras en el servicio, consultas, verificaciones,
          control, habilitación de medios de pago, prevención de fraudes, así
          como
          cualquier otra actividad relacionada con nuestros servicios y oferta
          actuales y a futuro para el cumplimiento de las obligaciones
          contractuales y de nuestro objeto social, a través de cualquier medio
          en
          forma directa.
        </li>
        <li>
          ❖ Prestar asistencia de nuestros servicios a través de nuestro
          Departamento de servicio al cliente.
        </li>
        <li>
          ❖ Realizar las gestiones necesarias para dar cumplimiento a las
          obligaciones inherentes a los servicios contratados con LA EMPRESA
        </li>
        <li>❖ Controlar y prevenir el fraude en todas sus modalidades.</li>
        <li>
          ❖ Facilitar la correcta ejecución de las compras y prestaciones de los
          servicios contratados.
        </li>
        <li>
          ❖ Dar respuesta a algún requerimiento, solicitud, queja o inquietud
          enviada por un titular. Responder requerimientos legales de entidades
          administrativas y judiciales.
        </li>
      </ul>

      <p>
        Teniendo en cuenta los tratamientos descritos anteriormente LA EMPRESA
        podrá:
      </p>
      <ul className='privacy-list'>
        <li>
          ❖ Conocer, almacenar y procesar toda la información suministrada por
          el
          titular en una o varias bases de datos, en el formato que estime más
          conveniente.
        </li>
        <li>
          ❖ Ordenar, catalogar, clasificar, dividir o separar la información
          suministrada por el titular, de acuerdo a las necesidades del momento
          en
          que se requiera.
        </li>
        <li>
          ❖ Verificar, comprobar, validar, investigar o comparar la información
          suministrada por el titular, con cualquier información que se disponga
          legítimamente.
        </li>
        <li>
          ❖ Acceder, consultar, comparar y evaluar toda la información que sobre
          el titular se encuentre almacenada en las bases de datos de
          antecedentes
          judiciales o de seguridad legítimamente constituida que permita
          establecer de manera integral e históricamente el comportamiento
          judicial del titular.
        </li>
        <li>
          ❖ Estudiar, analizar, personalizar y utilizar la información
          suministrada por el titular para el seguimiento, desarrollo y/o
          mejoramiento, tanto individual como general, de condiciones de
          servicio,
          administración, seguridad y atención, así como para la implementación
          de
          planes de mercadeo, campañas, beneficios especiales y promociones.
        </li>
      </ul>

      <b>7. Deberes de LA EMPRESA como responsable del tratamiento de datos</b>
      <p>
        Los Responsables del tratamiento deberán cumplir los siguientes deberes,
        sin perjuicio de las demás disposiciones previstas en la presente ley y
        en
        otras que rijan su actividad:
      </p>
      <ul className='privacy-list'>
        <li>
          ❖ Garantizar al titular, en todo tiempo, el pleno y efectivo ejercicio
          del derecho de hábeas data.
        </li>
        <li>
          ❖ Solicitar y conservar, en las condiciones previstas en la presente
          ley, los soportes de la respectiva autorización otorgada por el
          titular.
        </li>
        <li>
          ❖ Informar debidamente al titular sobre la finalidad de la
          recolección,
          el uso dado a sus datos personales y los derechos que le asisten por
          virtud de la autorización otorgada.
        </li>
        <li>
          ❖ Tramitar las consultas y reclamos formulados en los términos
          señalados
          en la presente política.
        </li>
        <li>
          ❖ Conservar la información bajo las condiciones de seguridad
          necesarias
          para impedir su adulteración, pérdida, consulta, uso o acceso no
          autorizado o fraudulento.
        </li>
        <li>❖ Actualizar la información cuando sea necesario.</li>
        <li>
          ❖ Suministrar al encargado del tratamiento, según el caso, únicamente
          datos cuyo tratamiento esté previamente autorizado de conformidad con
          lo
          previsto en la presente política.
        </li>
        <li>
          ❖ Exigir al encargado del tratamiento en todo momento, el respeto a
          las
          condiciones de seguridad y privacidad de la información del titular.
        </li>
        <li>
          ❖ Informar a la autoridad de protección de datos cuando se presenten
          violaciones a los códigos de seguridad y existan riesgos en la
          administración de la información de los titulares.
        </li>
        <li>
          ❖ Cumplir las instrucciones y requerimientos que imparta la Autoridad
          Nacional de Protección del Consumidor.
        </li>
      </ul>

      <b>8. Deberes de LA EMPRESA como encargado del tratamiento de datos</b>
      <p>
        Como encargado del tratamiento de datos, LA EMPRESA deberá cumplir los
        siguientes deberes:
      </p>
      <ul className='privacy-list'>
        <li>
          ❖ Garantizar al titular, en todo tiempo, el pleno y efectivo ejercicio
          del derecho de hábeas data.
        </li>
        <li>
          ❖ Conservar la información bajo las condiciones de seguridad
          necesarias
          para impedir su adulteración, pérdida, consulta, uso o acceso no
          autorizado o fraudulento.
        </li>
        <li>
          ❖ Realizar oportunamente la actualización, rectificación o supresión
          de
          los datos.
        </li>
        <li>
          ❖ Actualizar la información reportada por los responsables del
          tratamiento dentro del tiempo permitido por ley.
        </li>
        <li>
          ❖ Tramitar las consultas y los reclamos formulados por los titulares
          en
          los términos señalados en la presente política.
        </li>
        <li>
          ❖ Registrar y catalogar los procesos de reclamos realizados por parte
          del titular o autoridad competente.
        </li>
        <li>
          ❖ Abstenerse de circular información que esté siendo controvertida por
          el titular y cuyo bloqueo haya sido ordenado por la Autoridad Nacional
          de Protección del Consumidor.
        </li>
        <li>
          ❖ Informar a la Autoridad Nacional de Protección del Consumidor cuando
          se presenten violaciones a los códigos de seguridad y existan riesgos
          en
          la administración de la información de los titulares.
        </li>
        <li>
          ❖ Cumplir las instrucciones y requerimientos que imparta Autoridad
          Nacional de Protección del Consumidor.
        </li>
      </ul>

      <b>9. Derechos del titular de la información</b>
      <p>
        El titular de la información que reposa en las bases de datos de LA
        EMPRESA tiene los siguientes derechos:
      </p>

      <ul className='privacy-list'>
        <li>
          ❖ Conocer, actualizar, verificar y rectificar sus datos personales
          frente a los responsables o encargados del tratamiento.
        </li>
        <li>
          ❖ Acceder en forma gratuita a sus datos personales que hayan sido
          objeto
          de tratamiento.
        </li>
        <li>
          ❖ Solicitar prueba de la autorización otorgada al responsable del
          tratamiento salvo cuando expresamente se exceptúe como requisito para
          el
          tratamiento.
        </li>
        <li>
          ❖ Tener acceso en cualquier momento a la política de tratamiento de
          datos que se le aplica a sus datos personales.
        </li>
        <li>
          ❖ Tener conocimiento del medio de contacto por el cual puede acceder a
          sus derechos como titular ante el responsable o encargado del
          tratamiento.
        </li>
        <li>
          ❖ Revocar total o parcialmente la autorización del tratamiento de sus
          datos por parte de LA EMPRESA. En caso de revocatoria total por parte
          del titular, LA EMPRESA solo podrá usar los datos en ejercicio de sus
          funciones legales o por orden judicial.
        </li>
        <li>
          ❖ Presentar ante la Autoridad Nacional de Protección del Consumidor
          quejas por infracciones o incumplimiento al régimen de protección de
          datos personales.
        </li>
      </ul>

      <b>10. Medios de contacto para ejercer sus derechos</b>
      <p>
        El Titular podrá ejercer sus derechos sobre sus datos personales
        haciendo
        solicitud vía correo electrónico a la dirección contacto@eduexpress.pe.
      </p>

      <b>
        11. Procedimientos para consultas, solicitudes o reclamos por parte del
        titular
      </b>
      <p>
        El Titular podrá ejercer sus derechos ante LA EMPRESA realizando previa
        solicitud por medio del canal ya mencionado. Siendo necesario que la
        solicitud exprese de manera clara sus datos de contacto como nombres y
        apellidos completos, número de documento de identidad, correo
        electrónico
        y el objetivo de la solicitud, todo ello con la finalidad de dar
        respuesta
        a su solicitud.
      </p>
      <p>
        Toda solicitud o reclamo se verificará la identidad del titular de los
        datos para proseguir con el tratamiento. Cuando la solicitud tenga por
        objeto la rectificación o actualización, el titular deberá indicar las
        correcciones a realizar.
      </p>
      <p>
        El Titular de los datos personales puede revocar la autorización
        concedida
        en cualquier momento, exceptuando de lo anterior aquellos eventos en los
        cuales lo impida una disposición legal o contractual. El Titular deberá
        informar con precisión si la revocatoria es total o parcial. La
        revocatoria de la autorización es parcial cuando el Titular manifiesta
        que
        desea revocar el Tratamiento de sus datos personales para ciertas
        finalidades específicas como aquellas publicitarias, de concursos, de
        estudios de consumo, etc, escenario en el que el titular deberá indicar
        la
        finalidad que desea eliminar.
      </p>
      <p>
        Toda solicitud será atendida en un plazo máximo de quince (15) hábiles
        contados a partir de la fecha del recibo de la solicitud. En el evento
        de
        no ser posible atender la solicitud en dicho término, se informará
        dentro
        del mismo término, expresando los motivos que dan lugar a la
        imposibilidad, al igual que la fecha en que se dará respuesta, la cual
        no
        podrá ser superior a cinco (5) días hábiles siguientes al vencimiento
        del
        primer plazo.
      </p>
      <p>
        Si la solicitud no contiene los datos de contacto suficientes, o no
        expongan de manera expresa los hechos que permitan a LA EMPRESA atender
        y
        dar trámite a la petición, se le comunicará tal situación al remitente
        dentro de los cinco (5) días siguientes al recibo de la solicitud para
        que
        haga llegar la información necesaria dentro de los quince (15) días
        hábiles siguientes al recibo del requerimiento, de no hacer llegar las
        aclaraciones solicitadas se considerará como desistida la petición.
      </p>

      <b>12. Confidencialidad</b>
      <p>
        LA EMPRESA no vende, comercializa, ni transfiere la información personal
        que el titular entregue y de la cual haga tratamiento, excepto en los
        casos permitidos por la ley. La información personal entregada por los
        titulares sólo es accesible por un número limitado de personas que
        tienen
        permisos especiales para manejo de la información y que están
        comprometidos a mantener la confidencialidad de los datos, en todos los
        casos.
      </p>
      <p>
        LA EMPRESA realiza acuerdos de confidencialidad con las personas que
        tienen acceso a la información, para garantizar el respeto de la misma.
        Sin embargo, puede suceder que, en virtud de órdenes judiciales, o de
        regulaciones legales, se deba revelar información a las autoridades que
        así lo requieran.
      </p>

      <b>13. Seguridad de la información</b>
      <p>
        LA EMPRESA adoptará las medidas técnicas, administrativas y humanas
        necesarias para garantizar la seguridad de los datos personales objeto
        de
        tratamiento, para evitar la pérdida, consulta, mal uso o acceso no
        autorizado a los datos, aclarando que dichas medidas de seguridad no son
        infalibles sobre todo en lo que tiene que ver con datos procesados o
        enviados por Internet, por tal motivo LA EMPRESA no se responsabiliza
        por
        cualquier consecuencia derivada del ingreso indebido de terceros a las
        bases de datos y/o por alguna falla técnica en el funcionamiento y/o
        conservación de datos. LA EMPRESA informará en la medida de sus
        facultados
        a los titulares de la información de cualquier evento de robo, acceso o
        pérdida de la información donde puedan estar involucrados sus datos.
        Estos
        casos de robo, acceso o perdida de la información se pueden presentar
        por
        medio de:
      </p>
      <ul className='privacy-list'>
        <li>
          ❖ Correos electrónicos con dominios falsos o clonados. Por lo cual es
          importante que el usuario realice las transacciones siempre por
          dominios
          conocidos para disminuir los riesgos.
        </li>
        <li>
          ❖ Software espía instalado en computadores públicos que roban la
          información digitada por el usuario. Por lo anterior, se recomienda en
          lo posible que la transacción sea realizada en el computador de la
          casa
          o la oficina y mantener antivirus actualizado.
        </li>
        <li>
          ❖ Se podría presentar suplantación del “USUARIO” por conocimiento por
          parte de un tercero de los datos personales del titular. Por lo cual
          se
          recomienda no brindar información personal a personas desconocidas.
        </li>
      </ul>

      <b>14. Transferencia de datos a terceros países</b>
      <p>
        LA EMPRESA no transfiere bases de datos a terceros ni a países, excepto
        lo
        que sea requerido por ley.
      </p>

      <b>15. Actualización y vigencia</b>
      <p>
        LA EMPRESA se reserva el derecho de actualizar o modificar esta política
        en cualquier momento, razón por la cual se invita a todo titular a
        consultar regular o periódicamente la página web www.eduexpress.pe a
        través de la cual se mantendrá la última versión de esta política.
        Cuando
        el cambio se refiera a las finalidades del tratamiento, se solicitará de
        los titulares una nueva autorización para aplicar las mismas, además se
        indicará la fecha a partir de la cual regirá la nueva política.
      </p>
      <p>
        Los datos suministrados serán utilizados durante el plazo necesario para
        dar cumplimiento del uso y finalidades descritos en esta Política.
      </p>
    </div>
);

class Ayuda extends Component {

  render() {
    return (
        <GlobalLayou>
          <Head
              title="Ayuda - EduExpress"
              description="Si necesitas ayuda, puedes seguir estos pasos o contactarnos"
              url="https://eduexpress.pe/ayuda"
          />
          <div style={{
            minHeight: 'calc(100vh - 144px)',
            backgroundColor: 'white',
            marginTop: 64,
          }}>
            <div style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              padding: '2rem',
            }}>
              <h1 style={{
                fontSize: '3rem',
                display: 'inline',
                borderBottom: `2px solid ${secondaryColor}`,
              }}>Centro de
                ayuda</h1>
            </div>
            <div style={{padding: '2rem'}}>
              <AyudaContainer>
                <Collapse accordion
                          defaultActiveKey={this.props.router.asPath ===
                          '/ayuda#politica' ? '4' : ''}>
                  <Panel header='VIAJE CON MASCOTAS' key='1'>
                    {textoViajeMascotas()}
                  </Panel>
                  <Panel header='TARIFAS - ENERO 2019' key='2'>
                    {textoTarifas()}
                  </Panel>
                  <Panel
                      header='CONDICIONES DE CAMBIO Y POSTERGACIONES - ENERO 2019'
                      key='3'
                  >
                    {textoCondiciones()}
                  </Panel>
                  <Panel
                      header='POLITICA DE PRIVACIDAD Y TRATAMIENTO DE DATOS PERSONALES'
                      key='4'
                  >
                    {textoPrivacidad()}
                  </Panel>
                </Collapse>
              </AyudaContainer>
            </div>
          </div>

        </GlobalLayou>
    );
  }
}

export default withRouter(Ayuda);
