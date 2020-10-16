import GlobalLayou from '../components/Layout';
import React from 'react';
import {secondaryColor} from '../components/utils';
import styled from 'styled-components';
import Head from '../components/Head';
import {get} from 'lodash';
import {
  Breadcrumb,
  Button,
  Checkbox,
  Col,
  Form,
  Icon,
  Input,
  Radio,
  Row,
  Select,
} from 'antd';
import Uploader from '../components/Uploader';
import {compose, withApollo} from 'react-apollo';
import moment from 'moment';

const {Option} = Select;

const ReclamosContainer = styled.div`
  max-width: 100vw;
  min-height: calc(100vh - 144px);
  background: #f6f5f6;
`;

const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem 2rem 0 2rem;
  margin-top: 64px;
  flex-direction: column;
`;

const BreadContainer = styled.div`
  width: 85%;
  margin: 0 auto;
  padding: 2rem 2rem 0 2rem;
  & .ant-breadcrumb-separator {
    padding: 0 0.5rem;
  }
  @media only screen and (max-width: 56.25em) {
    margin: 0;
    width: 100%;
    padding: 2rem;
  }
`

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  align-items: center;
  margin: 0 auto;
  box-shadow: 0 4px 9.4px 0.6px rgba(3, 39, 61, .1);
  background: white;
  padding: 2rem 4rem;
  h2 {
    margin: 0;
  }
  & .claim-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    & .ant-radio-wrapper {
      margin-right: 2rem;
      span:nth-child(2) {
        margin-left: 0.5rem;
      }
    }
  }
  & .ant-form-item-label {
    display: flex;
    label {
      display: flex;
      align-items: center;
    }
  }
  & .label-div {
    display: inline;
    span:nth-child(2) {
      font-style: italic;
    }
  }
  @media only screen and (max-width: 56.25em) {
    margin: 0;
    width: 100%;
    padding: 2rem;
    & .ant-radio-wrapper {
      white-space: initial;
    }
  }
  & .ant-form {
    width: 100%;
  }
`;

const Nota = styled.div`
  width: 85%;
  margin: 0 auto;
  padding: 2rem 4rem;
  @media only screen and (max-width: 56.25em) {
    margin: 0;
    width: 100%;
    padding: 2rem;
  }
`;

class ReclamacionesForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const variables = {
          ...values,
          file: values.file.map(i => ({
            name: i.name,
            url: i.url,
            size: i.size,
            status: i.status,
          })),
        };
        console.log('variables', variables);
        // try {
        //   await this.props.client.mutate({
        //     mutation: createClaim,
        //     variables,
        //   });
        //   message.success('Su reclamo fue enviado con exito');
        // } catch (e) {
        //   message.error('No se pudo enviar su reclamo, intente nuevamente.');
        // }
      }
    });
  };

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList.map(el => ({...el, url: get(el, 'response.file')}));
  };

  getDay = () => {
    const str = moment().format('dddd[,] DD [de] MMMM [del] YYYY');
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  render() {
    const {getFieldDecorator, getFieldValue} = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 8},
        lg: {span: 10},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
        lg: {span: 14},
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 24,
          offset: 0,
        },
      },
    };

    const offices = {
      'yurimaguas': 'Calle Mariscal Castilla #1032',
      'nauta': 'Jirón Lima 3ra Cuadra S/N frente al Parque Cenepa',
      'caballococha': 'Calle Leoncio Prado #103',
      'gladys': 'Calle Elena Pardo # 114',
      'iquitos': 'Calle Pevas #202 Esquina con Raimondi',
      'tabatinga': 'Calle Rúa Marechal Mallet #248 - Centro Hotel Cristina',
      'santarosa': 'Puerto Principal Rondiña 2da Zona - A 200 metros de la Marina de Guerra del Perú',
    };

    return (
      <GlobalLayou>
        <Head
          title="Reclamaciones - EduExpress"
          description="Envíanos tu sugerencia, reclamo o solicitud."
          url="https://eduexpress.pe/rutas"
        />
        <ReclamosContainer>
          <ContentHeader>
            <h1 style={{
              fontSize: '3rem',
              display: 'inline',
              borderBottom: `2px solid ${secondaryColor}`,
              textAlign: 'center',
            }}>
              Libro de reclamaciones
            </h1>
            <h2 style={{
              fontSize: '2rem',
              display: 'inline',
              textAlign: 'center',
            }}>
              (Book of claims)
            </h2>
          </ContentHeader>
          <BreadContainer>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Icon type="home"/>
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/">
                <span>Inico</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item href="#">Libro de reclamaciones</Breadcrumb.Item>
            </Breadcrumb>
          </BreadContainer>
          <div style={{padding: '2rem'}}>
            <FormContainer>
              <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Row gutter={16}>
                  <Col xs={24} md={24}>
                    <Form.Item
                      label={(<div className="label-div"><span>Fecha</span> / <span>Date</span></div>)}
                    >
                      {this.getDay()}
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={24}>
                    <Form.Item
                      label={(<div className="label-div"><span>Razón Social</span> / <span>Company</span></div>)}
                    >
                      CORPORACION TURISTICA YURIMAGUAS S.A.C RUC: 20494033721
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={24}>
                    <Form.Item
                      label={(<div className="label-div"><span>Oficina</span> / <span>Office</span></div>)}
                    >
                      {getFieldDecorator('office', {
                        initialValue: 'yurimaguas',
                        rules: [
                          {
                            required: true,
                            message: 'Este campo es obligatorio',
                          }],
                      })(
                        <Select>
                          <Option value="yurimaguas">Oficina Yurimaguas</Option>
                          <Option value="nauta">Oficina Nauta</Option>
                          <Option value="caballococha">Oficina
                            Caballococha</Option>
                          <Option value="gladys">Oficina Gladys</Option>
                          <Option value="iquitos">Oficina Iquitos</Option>
                          <Option value="tabatinga">Agencia Tabatinga</Option>
                          <Option value="santarosa">Pontón Santa Rosa</Option>
                        </Select>,
                      )}
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={24}>
                    <Form.Item
                      label={(<div className="label-div"><span>Dirección</span> / <span>Address</span></div>)}
                    >
                      {offices[getFieldValue('office')]}
                    </Form.Item>
                  </Col>
                </Row>
                <div style={{display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', marginBottom: '3rem'}}>
                  <h2>1. Identificación del consumidor reclamante</h2><span style={{marginLeft: '1rem'}}>/ Identification of the claimant consumer</span>
                </div>
                <Row gutter={16}>
                  <Col xs={24} md={24}>
                    <Form.Item
                      label={(<div className="label-div"><span>Nombres</span> / <span>Fullname</span></div>)}
                    >
                      {getFieldDecorator('fullName', {
                        rules: [
                          {
                            required: true,
                            message: 'Este campo es obligatorio',
                          },
                        ],
                      })(<Input/>)}
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={24}>
                    <Form.Item
                      label={(<div className="label-div"><span>Apellido Paterno</span> / <span>First Last Name</span></div>)}
                    >
                      {getFieldDecorator('firstLastName', {
                        rules: [
                          {
                            required: true,
                            message: 'Este campo es obligatorio',
                          },
                        ],
                      })(<Input/>)}
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={24}>
                    <Form.Item
                      label={(<div className="label-div"><span>Apellido Materno</span> / <span>Second Last Name</span></div>)}
                    >
                      {getFieldDecorator('secondLastName', {
                        rules: [
                          {
                            required: true,
                            message: 'Este campo es obligatorio',
                          },
                        ],
                      })(<Input/>)}
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={24}>
                    <Form.Item
                      label={(<div className="label-div"><span>Domicilio</span> / <span>Address</span></div>)}
                    >
                      {getFieldDecorator('address', {
                        rules: [
                          {
                            required: true,
                            message: 'Este campo es obligatorio',
                          },
                        ],
                      })(<Input/>)}
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={24}>
                    <Form.Item
                      label={(<div className="label-div"><span>Tipo de documento</span> / <span>Type of document</span></div>)}
                    >
                      {getFieldDecorator('documentType', {
                        rules: [
                          {
                            required: true,
                            message: 'Este campo es obligatorio',
                          }],
                      })(
                        <Select>
                          <Option value="dni">DNI</Option>
                          <Option value="pasaporte">Pasaporte</Option>
                          <Option value="carne">Carne de extranjeria</Option>
                        </Select>,
                      )}
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={24}>
                    <Form.Item
                      label={(<div className="label-div"><span>Numero de documento</span> / <span>Document Number</span></div>)}
                    >
                      {getFieldDecorator('documentNumber', {
                        rules: [
                          {
                            required: true,
                            message: 'Este campo es obligatorio',
                          },
                        ],
                      })(<Input/>)}
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={24}>
                    <Form.Item
                      label={(<div className="label-div"><span>Correo electrónico</span> / <span>E-mail</span></div>)}
                    >
                      {getFieldDecorator('email', {
                        rules: [
                          {
                            type: 'email',
                            message: 'Por favor ingrese un correo valido',
                          },
                          {
                            required: true,
                            message: 'Este campo es obligatorio',
                          },
                        ],
                      })(<Input/>)}
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={24}>
                    <Form.Item
                      label={(<div className="label-div"><span>Teléfono</span> / <span>Phone Number</span></div>)}
                    >
                      {getFieldDecorator('phone', {
                        rules: [
                          {
                            required: true,
                            message: 'Este campo es obligatorio',
                          },
                        ],
                      })(<Input/>)}
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={24}>
                    <Form.Item
                      label={(<div style={{display: 'flex', alignItems: 'baseline', flexDirection: 'column'}} className="label-div"><span>Nombres del padre o madre (En caso de ser menor de edad) / </span> <span>Parent's names (In case of being under age.) </span></div>)}
                    >
                      {getFieldDecorator('parentName', {
                        rules: [
                          {
                            required: false,
                            message: 'Este campo es obligatorio',
                          },
                        ],
                      })(<Input/>)}
                    </Form.Item>
                  </Col>
                </Row>
                <div style={{display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', marginBottom: '3rem'}}>
                  <h2>2. Indentificación del bien contratado</h2><span style={{marginLeft: '1rem'}}>/ Identification of the contracted property</span>
                </div>
                <Row gutter={16}>
                  <Col xs={24} md={24}>
                    <Form.Item
                      label={(<div className="label-div"><span>Numero de comprobante</span> / <span>Voucher number</span></div>)}
                    >
                      {getFieldDecorator('voucherNumber', {
                        rules: [
                          {
                            required: true,
                            message: 'Este campo es obligatorio',
                          },
                        ],
                      })(<Input/>)}
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={24}>
                    <Form.Item
                      label={(<div className="label-div"><span>Codigo de reserva</span> / <span>Reservation code</span></div>)}
                    >
                      {getFieldDecorator('reservationCode', {
                        rules: [
                          {
                            required: true,
                            message: 'Este campo es obligatorio',
                          },
                        ],
                      })(<Input/>)}
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      style={{alignItems: 'center'}}
                      label={(<div className="label-div"><span>Tipo del bien contratado</span> / <span>type of property contracted</span></div>)}
                    >
                      {getFieldDecorator('typeOfProperty', {
                        rules: [
                          {
                            required: true,
                            message: 'Este campo es obligatorio',
                          },
                        ],
                      })(
                        <Radio.Group className="claim-group">
                          <Radio value='product'>(1) Producto / Product</Radio>
                          <Radio value='service'>(2) Servicio / Service</Radio>
                        </Radio.Group>,
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label={(<div className="label-div"><span>Detalle del bien contratado</span> / <span>Detail of the contracted property</span></div>)}
                    >
                      {getFieldDecorator('detailOfProperty', {
                        rules: [
                          {
                            required: true,
                            message: 'Este campo es obligatorio',
                          },
                        ],
                      })(
                        <Input.TextArea rows={6}/>,
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <div style={{display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', marginBottom: '3rem'}}>
                  <h2>3. Detalle del reclamo</h2><span style={{marginLeft: '1rem'}}>/ Detail of the claim</span>
                </div>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      label={(<div className="label-div"><span>Tipo</span> / <span>Type</span></div>)}
                    >
                      {getFieldDecorator('typeOfClaim', {
                        rules: [
                          {
                            required: true,
                            message: 'Este campo es obligatorio',
                          },
                        ],
                      })(
                        <Radio.Group className="claim-group">
                          <Radio value='claim'>(1) Reclamo / Claim</Radio>
                          <Radio value='complain'>(2) Queja / Complain</Radio>
                          <Radio value='congratulation'>Felicitación / Congratulations</Radio>
                          <Radio value='sugestion'>Sugerencia / Sugestion</Radio>
                        </Radio.Group>,
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label={(<div className="label-div"><span>Detalle</span> / <span>Detail</span></div>)}
                    >
                      {getFieldDecorator('detail', {
                        rules: [
                          {
                            required: true,
                            message: 'Este campo es obligatorio',
                          },
                        ],
                      })(
                        <Input.TextArea rows={6}/>,
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label={(<div className="label-div"><span>Pedido</span> / <span>Request</span></div>)}
                    >
                      {getFieldDecorator('request', {
                        rules: [
                          {
                            required: true,
                            message: 'Este campo es obligatorio',
                          },
                        ],
                      })(
                        <Input.TextArea rows={6}/>,
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label={(<div className="label-div"><span>Adjuntar archivos</span> / <span>Attach files</span></div>)}
                    >
                      {getFieldDecorator('file', {
                        valuePropName: 'fileList',
                        getValueFromEvent: this.normFile,
                      })(
                        <Uploader
                          accept="image/*,.pdf"
                          multiple
                          folderName="reclamos"
                          target={'archivos'}
                        >
                          <Button>
                            <Icon type="upload"/> Adjuntar archivos
                          </Button>
                        </Uploader>,
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item {...tailFormItemLayout}>
                      {getFieldDecorator('sign', {
                        valuePropName: 'checked',
                        initialValue: true,
                        rules: [
                          {
                            required: true,
                            message: 'Este campo es obligatorio',
                          },
                        ],
                      })(
                        <Checkbox>
                          <span style={{marginLeft: '1rem'}}>Acepto el contenido del presente formulario y manifiesto bajo Declaración jurada la veracidad de lo indicado.</span>
                        </Checkbox>,
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                  <Button type="primary" htmlType="submit"
                          style={{padding: '1rem 3rem', height: 'auto', fontSize: '2rem'}}
                          disabled={getFieldValue('sign') === false}>
                    Enviar / Send
                  </Button>
                </div>
              </Form>
            </FormContainer>
            <Nota>
              <ul>
                <li>
                  NOTA: CORPORACION TURISTICA YURIMAGUAS S.A.C (de ahora en adelante La Empresa), queda facultada a efectuar respuesta de
                  la queja en el correo electrónico consignado por el
                  consumidor, la misma que se realizará en los términos
                  concedidos por la norma. La Empresa mantendrá un registro
                  de los correos electrónicos remitidos como respuesta.
                </li>
                <li>Asimismo, La empresa queda facultada en tomar acciones legales pertinentes en caso se verifique que la información consignada es inexacta o falsa</li>
                <li>
                  La formulación del reclamo no impide acudir a otras vías de
                  solución de controversias ni es requisito previo para
                  interponer una denuncia ante el INDECOPI.
                </li>
                <li>
                  El Proveedor deberá dar respuesta al reclamo en un plazo no
                  mayor a treinta (30) días calendario, pudiendo ampliar el
                  plazo hasta por treinta (30) días más, previa comunicación al
                  consumidor.
                </li>
                <li>
                  (1) RECLAMO: Disconformidad relacionada a los productos o
                  servicios.
                </li>
                <li>
                  (2) QUEJA: Disconformidad no relacionada a los productos o
                  servicios; o malestar o descontento respecto a la atención al
                  público
                </li>
              </ul>
            </Nota>
          </div>
        </ReclamosContainer>
      </GlobalLayou>
    );
  }
}

const Reclamaciones = Form.create()(ReclamacionesForm);

export default compose(
  withApollo,
)(Reclamaciones);
