const devService = require('./services');

async function find(req) {
    return await devService.find(req.query);
}

async function findById(req) {
    const developer = await devService.findById(req.params.id);
    return developer || {};
}

async function create(req) {
    const newDev = await devService.create(req.body);
    return { id: newDev._id };
}

async function update(req) {
    const updatedDev = await devService.update(req.params.id, req.body);
    return updatedDev;
}

async function _delete(req) {
    await devService._delete(req.params.id);
    return {};
}
module.exports = { find, findById, create, update, _delete };