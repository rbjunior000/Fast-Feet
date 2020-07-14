import React from 'react';

// import { Container } from './styles';

export default function Form(props) {
  return (
    <Container>
      <NavTable>
        <div>
          <h1>{props.title}</h1>
        </div>
        <NewPayment click="submit">{props.buttonTitle}</NewPayment>
      </NavTable>
      <Formulario>
        <Formik
          onSubmit={(values, actions) => {
            alert(values.name);
          }}
        >
          {propss => (
            <form onSubmit={propss.handleSubmit}>
              <div className="selects">
                <div className="select">
                  <p>Destinatario</p>
                  <Select defaultValue="Nome do destinatario">
                    {entregadores.map(item => (
                      <option value={item}>{item}</option>
                    ))}
                  </Select>
                </div>
                <div className="select">
                  <p> Entregador</p>
                  <Select>
                    {destinatarios.map(item => (
                      <option value={item}>{item}</option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="input">
                <p>Nome do produto</p>
                <Input />
              </div>
            </form>
          )}
        </Formik>
      </Formulario>
    </Container>
  );
}
