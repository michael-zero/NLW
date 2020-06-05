import {Request, Response} from 'express';

import knex from '../database/connection'

class PointsController {


    //listagem
    async index(request: Request, response: Response){
        const {city, uf, items} = request.query;

        const parsedItems = String(items)
        .split(',')
        .map(item => Number(item.trim())); //trim remove espaços da esq e dir.

        const points = await knex('points')
        .join('point_items', 'points.id', '=', 'point_items.point_id')
        .whereIn('point_items.item_id', parsedItems) //retorna todos os points que possuem pelo menos um dos itens passados
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct() //pode haver duplicatas, entao só retorna os distintos!
        .select('points.*'); //retorna apenas os dados da tabela points 

        const serializacaoPoints = points.map(point => {
            return {
               ...point,
                //exp://192.168.18.146:19000
               // exp://z9-8n9.zeromik5.mobile.exp.direct:80
                image_url: `http://192.168.18.146:3333/uploads/${point.image}`
            }
    
        })



        response.json(serializacaoPoints);
    }



    async show(request: Request, response: Response){
        const {id} = request.params;

        const point = await knex('points').where('id', id).first(); //usa o first pq eu sei q é um unico elemento, senao seria um array

        if(!point){
            return response.status(400).json({message: 'point not found.'})
        }


        const serializacaoPoint = {
                ...point,
                image_url: `http://192.168.18.146:3333/uploads/${point.image}`
            
    
        };


        const items = await knex('items')
        .join('point_items', 'items.id', '=', 'point_items.item_id')
        .where('point_items.point_id', id)
        .select('items.title');

        return response.json({point: serializacaoPoint, items});
    }


    async create(request: Request, response: Response){
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;
    
    
        const trx = await knex.transaction(); // n permitir que operações dependentes 
        //sejam executadas, caso uma tenha dado errado .. ROLLBACK
    
        //console.log(request.body);
    
        const point = {
            image: request.file.filename ,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        };
        //abaixo usa short syntax, mesmo q => name : name ;
        //retorna os ids do dados inseridos, como foi inserido somente um, [0]
       const insertedIds =  await trx('points').insert(point);
    
        const point_id = insertedIds[0];
    
        const pointItems = items
        .split(',')
        .map((item: string) => Number(item.trim()))
        .map((item_id: number)=> {
            return{
                item_id,
                point_id,
            }
        })
    
        await trx('point_items').insert(pointItems);

        await trx.commit();//realiza os inserts na base de dados;
    
        return response.json({
            id: point_id,
            ... point

        });
    
    }
}

export default PointsController;