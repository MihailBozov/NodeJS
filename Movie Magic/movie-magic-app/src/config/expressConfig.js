import express from 'express'
import cookieParser from 'cookie-parser';

export default function expressConfig(app) {
    app.use(express.static('public'));
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
}
