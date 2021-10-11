const { stub } = require('sinon');
const { expect, assert } = require('chai');
const { find, findById, create, update, _delete } = require('../domains/services');
const { Developers } = require('../utils/db');

describe('Testar os services da API', () => {

    it('Deve retornar um array com todos os desenvolvedores', async() => {

        findMock = stub(Developers, 'find').returns([])
        const result = await find({});

        expect(result).to.be.a("array");
        expect(findMock.calledWith({})).to.equal(true);

        findMock.restore();
    });

    it('Deve retornar 1 desenvolvedor pelo id e um objeto', async() => {

        const findByIdMock = stub(Developers, 'findById').returns({});
        const id = 1;
        const result = await findById(id);

        expect(result).to.be.a("object");
        expect(findByIdMock.calledWith(id)).to.equal(true);

        findByIdMock.restore();
    });


    it('Deve criar um novo desenvolvedor e retornar ele mesmo', async() => {

        const newDev = {
            nome: 'Anderson Teixeira',
            sexo: 'M',
            idade: 36,
            hobby: "curtir a natureza, ouvir e tocar músicas, assistir filmes",
            datanascimento: Date.parse("06/03/1985"),
        };

        const saveMock = stub(Developers.prototype, 'save').returns(newDev);
        const result = await create(newDev);

        expect(result).to.deep.equal(newDev);

        saveMock.restore();
    });

    it('Deve editar um desenvolvedor e retornar ele mesmo', async() => {

        const updatedDev = {
            nome: 'Anderson Teixeira editado',
            sexo: 'M',
            idade: 36,
            hobby: "curtir a natureza, ouvir e tocar músicas, assistir filmes",
            datanascimento: Date.parse("06/03/1985"),
        };

        const findByIdMock = stub(Developers, 'findById').returns(Developers(updatedDev));
        const saveMock = stub(Developers, 'update').returns(updatedDev);
        const result = await update(1, updatedDev);

        expect(result).to.deep.equal(updatedDev);
        expect(findByIdMock.calledWith(1)).to.equal(true);

        saveMock.restore();
        findByIdMock.restore();
    });

    it('Deve remover um desenvolvedor pelo id', async() => {

        const findByIdAndRemoveMock = stub(Developers, 'findByIdAndRemove');
        const result = await _delete(1);

        expect(result, {});
        expect(findByIdAndRemoveMock.calledWith(1)).to.equal(true);

        findByIdAndRemoveMock.restore();
    });
});