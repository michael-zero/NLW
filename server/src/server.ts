
import express from 'express';
import cors from 'cors'
import path from 'path'
import routes from './routes'
import {errors} from 'celebrate'

const app = express();

app.use(cors())
app.use(express.json()); //o express por padrão não entende o JSON, por isso eu adiciono essa funcionalidade.
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
//caminho estático para ficar disponivel, no caso as imagens ... para listar os objs

app.use(errors());

app.listen(3333);