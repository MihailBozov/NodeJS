import Volcano from '../models/Volcano.js';


async function createVolcano(volcano, userId) {
    return await Volcano.create({ ...volcano, owner: userId });
}

async function findAllVolcanoes() {
    return await Volcano.find().lean();
}

async function findVolcanoById(id) {
    return await Volcano.findById(id).lean();
}

async function deleteVolcano(id) {
    await Volcano.findByIdAndDelete(id);
}

async function editVolcano(id, editedVolcano) {
    const volcanoDb = await Volcano.findByIdAndUpdate(id, editedVolcano, { runValidators: true });
}

async function vote(volcanoId, userId) {
    const volcano = await Volcano.findById(volcanoId);
    const volcanoList = volcano.voteList;

    if (volcanoList.includes(userId)) {
        return false;
    }

    volcanoList.push(userId);
    volcano.voteList = volcanoList;
    await volcano.save();
    return true;
}

async function hasVoted(volcanoId, userId) {
    const volcano = await Volcano.findById(volcanoId);
    return volcano.voteList.includes(userId)
}

export default { createVolcano, findAllVolcanoes, findVolcanoById, deleteVolcano, editVolcano, vote, hasVoted };