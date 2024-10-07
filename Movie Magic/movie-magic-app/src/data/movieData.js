import { json } from 'express';
import fs from 'fs/promises';
import path from 'path';

const dbPath = path.resolve('src/db.json');

async function getDb() {
    const jsonResult = await fs.readFile(dbPath, { encoding: 'utf-8' });
    const data = JSON.parse(jsonResult);
    return data;
}

async function getAll() {
    const data = await getDb();
    return data.movies;
}

async function saveDb(data) {
    return await fs.writeFile(dbPath, JSON.stringify(data))
}

async function create(movieData) {
    const db = await getDb();
    db.movies.push(movieData)
    return await saveDb(db);
}

export default { getAll, create };