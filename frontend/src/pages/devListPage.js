import React, { Component } from "react";
import DevServices from "../services/services";
import BootstrapTable from 'react-bootstrap-table-next';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import PageHeader from '../components/page-header.component'
import paginationFactory from 'react-bootstrap-table2-paginator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class DevelopersList extends Component {
  constructor(props) {
    super(props);
    this.getAllDevelopers = this.getAllDevelopers.bind(this);
    this.create = this.create.bind(this);
    this.remove = this.remove.bind(this);
    this.getActionFormat = this.getActionFormat.bind(this);
    this.columns = [{
        dataField: 'nome',
        text: 'Nome',
        sort: true
      }, {
        dataField: 'idade',
        text: 'Idade',
      }, {
        dataField: 'sexo',
        text: 'Sexo'
      }, {
        dataField: 'hobby',
        text: 'Hobby'
      }, {
        dataField: 'datanascimento',
        text: 'Data Nascimento',
      }, {
        text: 'Ações',
        formatter: this.getActionFormat,
      }];
    this.state = {
      developers: []
    };
  }

  componentDidMount() {
    this.getAllDevelopers();
  }

  async getAllDevelopers() {
    const response = await DevServices.getAll();

    console.log(response.data);
    
    response.data.forEach(developer => {
      developer.datanascimento = new Date(developer.datanascimento).toLocaleString().substr(0,10);
      developer.sexo = developer.sexo == 'M' ? 'Masculino' : 'Feminino';
    });
    this.setState({developers: response.data});
  }

  create(e){
    e.preventDefault()
    this.props.history.push("/criar");
  }

  async remove(developer){
    await DevServices.delete(developer.id);
    this.getAllDevelopers();
  }

  edit(e, developer) {
    e.preventDefault()
    this.props.history.push("/editar/" + developer.id.toString());
  }

  getActionFormat(cell, row) {
    return (
        <div>
            {row && row.id && <Button onClick={e => this.edit(e, row)} size="sm" type="button"><BsPencilSquare /></Button> } &nbsp;
            {row && row.id && <Button onClick={() => this.remove(row)} variant="danger" type="button" size="sm"><BsFillTrashFill /></Button>}
        </div>
    );
  }

  render() {
    const { developers } = this.state;
    return (
        <Container>
          <Row className="justify-content-center">
            <PageHeader title="Listar Desenvolvedor"></PageHeader>
          </Row>
          <Row className="justify-content-end"> 
              <Button className="justify-content-end" onClick={this.create}> Novo <FontAwesomeIcon icon="plus"></FontAwesomeIcon></Button>
          </Row>
          <Row >
            { developers && ( <BootstrapTable  bootstrap4 keyField='id' 
                                                        data={ developers } 
                                                        columns={ this.columns }
                                                        bordered={ true } 
                                                        pagination={ paginationFactory() } /> ) }
          </Row>
        </Container>
    )
  }
}