const { Developers } = require('../utils/db');

async function find(query) {
    let developers;
    const { limit, page } = query;

    delete query.limit;
    delete query.page;

    if (limit && page) {
        developers = await Developers.find(query).limit(parseInt(limit)).skip(parseInt(limit) * parseInt(page));
    } else {
        developers = await Developers.find(query);
    }

    return developers;
}

async function findById(id) {
    return await Developers.findById(id);
}

async function create(body) {
    const developer = new Developers(body);
    return await developer.save();
}

async function update(id, res) {
    await Developers.findById(id);
    return Developers.update(res);
    //return await novo.save();
}

async function _delete(id) {
    await Developers.findByIdAndRemove(id);
}

module.exports = { find, findById, create, update, _delete };