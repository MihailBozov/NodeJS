import express from 'express'

export default function expressConfig(app) {
    app.use(express.static('public'));
    app.use(express.urlencoded({ extended: false }));
}
