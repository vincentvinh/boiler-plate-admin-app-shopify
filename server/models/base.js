import { dbConnection, dbKnex} from "./database";
import moment from 'moment';
import { check } from 'express-validator';
import {Message} from "../helpers/message";

class BaseModel extends dbConnection.Model {
    constructor(data) {
        super(data);
        this.convertUnixTime(this);
    }

    get hasTimestamps() {
        return false;
    }

    convertUnixTime(model) {
        model.on('creating', (model, attrs, options) => {
            model.set('created_at', moment().unix());
            model.set('updated_at', moment().unix());
        });

        model.on('updating', (model, attrs, options) => {
            attrs.updated_at = moment().unix();
        });
    }

    static checkExist() {
        return [
            check('id').custom((value, {req}) => {
                return new Promise(async (resolve, reject) => {
                    value = value || 0;
                    const result = await this.checkById(value);

                    if (!result) {
                        reject();
                    } else {
                        resolve();
                    }
                });
            }).withMessage(Message.NotExist)
        ]
    }

    static checkById(id) {
        return this
            .query({where: {id: id}})
            .fetch({
                columns: ['id'],
                require: false
            });
    }

    static checkByField(field, value) {
        return this
            .where(field, value)
            .fetch({
                require: false
            });
    }

    static getOneById(id) {
        return this
            .query({where: {id: id}})
            .fetch({
                require: false
            });
    }

    static create(data) {
        return this.forge(data).save();
    }

    static updateByModel(model, data) {
        Object.keys(data).forEach((key) => {
            model.set(key, data[key])
        });

        return model.save();
    }

    static updateById(id, data) {
        return this.query({where: {id: id}}).save(data, {patch: true});
    }

    static deleteById(id) {
        return this.query().where('id', id).del();
    }

    static deleteByField(field, value) {
        return this.query().where(field, value).del();
    }
}

export default BaseModel