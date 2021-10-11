const { stub } = require('sinon');
const { expect, assert } = require('chai');
const { find, findById, create, update, _delete } = require('../domains/controllers');
const DevService = require('../domains/services');

describe('Testar os controllers da API', () => {

    it('Deve chamar service.find e retornar um array', async() => {

        findMock = stub(DevService, 'find').returns([]);
        const req = { query: {} };
        const result = await find(req);

        expect(result).to.be.a("array");
        expect(findMock.calledWith(req.query)).to.equal(true);

        findMock.restore();
    });

    it('Deve retornar um objeto pelo id', async() => {

        findByIdMock = stub(DevService, 'findById').returns(null);

        var req = {
            params: {
                id: 1
            }
        };
        const result = await findById(req);

        expect(result).to.be.a("object");
        expect(findByIdMock.calledWith(req.params.id)).to.equal(true);

        findByIdMock.restore();
    });

    it('Deve chamar o serviço de create e retornar um objeto com id', async() => {

        createMock = stub(DevService, 'create').returns({ _id: "123" });

        var req = {
            body: {
            nome: 'Anderson Teixeira',
            sexo: 'M',
            idade: 36,
            hobby: "curtir a natureza, ouvir e tocar músicas, assistir filmes",
            datanascimento: Date.parse("06/03/1985"),
            }
        };
        const result = await create(req);

        expect(result).to.deep.equal({ id: "123" });
        expect(createMock.calledWith(req.body)).to.equal(true);

        createMock.restore()
    });

    it('Deve chamar o serviço update e retornar um objeto alterado', async() => {

        var updatedDev = {
            nome: 'Anderson Teixeira',
            sexo: 'M',
            idade: 36,
            hobby: "curtir a natureza, ouvir e tocar músicas, assistir filmes",
            datanascimento: Date.parse("06/03/1985"),
        };

        updateMock = stub(DevService, 'update').returns(updatedDev);

        var req = {
            body: updatedDev,
            params: {
                id: "123"
            },
        };
        const result = await update(req);

        expect(result).to.deep.equal(updatedDev);
        expect(updateMock.calledWith(req.params.id, req.body)).to.equal(true);

        updateMock.restore();
    });

    it('Deve chamar o serviço de delete e retornar', async() => {

        deleteMock = stub(DevService, '_delete').returns({});

        var req = {
            params: {
                id: "123"
            },
        };
        const result = await _delete(req);

        expect(result).to.deep.equal({});
        expect(deleteMock.calledWith(req.params.id)).to.equal(true);

        deleteMock.restore();
    });
});