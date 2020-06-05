import knex from '../database/connection'
import {Request, Response} from 'express';

class ItemsController{
    async index(request: Request, response: Response){
        /**
         * Seleciono todos os items do banco de dados, 
         * e ao ser requisitado o recurso items, serão retornados.
         */
       const items = await knex('items').select('*');
   
       //serializar: alterar o dado recebido para uma forma mais legível para o usuario
       const serializacaoItems = items.map(item => {
           return {
               id: item.id,
               title: item.title, 
               //exp://192.168.18.146:19000
              // exp://z9-8n9.zeromik5.mobile.exp.direct:80
               image_url: `http://192.168.18.146:3333/uploads/${item.image}`
           }
   
       })
   
      // console.log(items)
         
       return response.json(serializacaoItems)
   }
}

export default ItemsController;