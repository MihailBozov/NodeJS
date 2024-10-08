import Cast from '../models/Cast.js';

const create = (cast) => Cast.create(cast);
const getAllCasts = () => Cast.find().lean();
const getAllFilteredCasts = (castIds) => Cast.find({_id: {$nin: castIds}});
const findCastById = (id) => Cast.findById(id);

export default { create, getAllCasts, findCastById, getAllFilteredCasts };
