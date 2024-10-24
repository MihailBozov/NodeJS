import Volcano from '../models/Volcano.js';


async function createVolcano(volcano, userId) {
    return await Volcano.create({...volcano, owner: userId});
}

async function findAllVolcanoes() {
    return await Volcano.find().lean();
}

async function findVolcanoById(id) {
    return await Volcano.findById(id).lean();
}

export default { createVolcano, findAllVolcanoes, findVolcanoById };