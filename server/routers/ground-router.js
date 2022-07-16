import is from '@sindresorhus/is';
import { Router } from 'express';
import { adminOnly, loginRequired } from '../middlewares';
import { groundService } from '../services/ground-service.js';

const groundRouter = Router();
