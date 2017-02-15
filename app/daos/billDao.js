//dependent daos
import * as locationDao from './locationDao';

//import services
import * as billService from '../services/billService';

const mongoose = require('mongoose');
const Bill = mongoose.model('Bill');

export function create(req) {
    return new Promise((resolve, reject)=>{
        return locationDao.fetchById(req.body.location).then((location)=>{
            let bill = new Bill(addBillToLocation(req.body, location));
            bill.create(req.file);
            let roofType = (bill.roof!='Flat Roof')?  bill.roof +' ('+bill.orientation+')' : bill.roof;
            resolve({
                type: 'success',
                text: 'Successfully saved your information!',
                size: billService.getSolarSize(bill),
                roof: {
                    type: roofType,
                    message: billService.getRoofMessage(bill)
                },
                shading: {
                    type: bill.shading,
                    message: billService.getShadingMessage(bill)
                },
                bill: bill
            });
        }).catch((e)=>{
            reject ({
                type: 'failure',
                text: e.message && e.message.replace('Validation', '') || 'Error: Cannot save your information',
                statusCode: 409
            });
        })
    })

}

function addBillToLocation(bill, location){
  bill.location = location;
  return bill;
}
