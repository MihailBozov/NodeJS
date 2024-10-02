import Cast from '../models/Cast.js';

const create = (cast) => Cast.create(cast);
const getAllCasts = () => Cast.find().lean();
const findById = (id) => Cast.findById(id);
export default { create, getAllCasts, findById };
