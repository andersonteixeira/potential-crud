import React, { Component } from "react";
import DevServices from "../services/services";
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import {withRouter} from 'react-router'
import PageHeader from '../components/page-header.component'
import "react-datepicker/dist/react-datepicker.css";

class DevEdit extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this)
    this.retrieveDeveloper = this.retrieveDeveloper.bind(this)
    this.state = {
        nome: "",
        idade: "",
        sexo: "",
        hobby: "",
        datanascimento: "",
        dev: ""
    };
  }

  componentDidMount() {
    this.retrieveDeveloper(this.props.match.params.id);
  }
  
  async retrieveDeveloper(id) {
      const response = await DevServices.getById(id);
      
      response.data.sexo = response.data.sexo == 'M' ? 'Masculino' : 'Feminino';
      response.data.datanascimento = new Date(response.data.datanascimento);

      this.setState({
        dev: response.data.id,
        nome: response.data.nome,
        idade: response.data.idade.toString(),
        sexo: response.data.sexo,
        hobby: response.data.hobby,
        datanascimento: response.data.datanascimento.toISOString().substr(0,10)
    })
    console.log(this.state);
  }

  async handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const developer = {
        nome: form.elements.nome.value,
        sexo: form.elements.sexo.value.substring(0,1),
        idade: parseInt(form.elements.idade.value),
        datanascimento: form.elements.datanascimento.value,
        hobby: form.elements.hobby.value
    }
    const response = await DevServices.create(developer);
    console.log("responde aqui", response)
    if (!response){
        console.log("Erro ao alterar desenvolvedor");
    }
    else{
        const ide = this.state.dev;
        await DevServices.delete(ide);
        this.props.history.push("/");
    }
  };

  render() {
    return (
        <Container>
            <Row className="justify-content-center">
                <PageHeader title="Editar desenvolvedor"></PageHeader>
            </Row>
            <Form onSubmit={this.handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} controlId="nome" name="nome">
                        <Form.Label>Nome:</Form.Label>
                        <Form.Control type="text" placeholder="Digite o nome" defaultValue={this.state.nome} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="sexo" name="sexo">
                        <Form.Label>Sexo:</Form.Label>
                        <Form.Control as="select" defaultValue="Masculino" defaultValue={this.state.sexo}>
                            <option>Masculino</option>
                            <option>Feminino</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row >
                    <Form.Group as={Col} controlId="idade" name="idade">
                        <Form.Label>Idade:</Form.Label>
                        <Form.Control type="text" placeholder="Digite a idade" defaultValue={this.state.idade} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="datanascimento" name="datanascimento">
                        <Form.Label>Data Nasc.:</Form.Label>
                        <Form.Control type="date" defaultValue={this.state.datanascimento}/>
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="hobby" name="hobby">
                    <Form.Label>Hobby:</Form.Label>
                    <Form.Control as="textarea" placeholder="Escreva seu hobby" defaultValue={this.state.hobby}/>
                </Form.Group>

                <Button style={{float: 'right'}} variant="primary" type="submit">
                    Salvar
                </Button>
            </Form>
        </Container>
    )
  }
}
export default withRouter(DevEdit);