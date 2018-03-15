import { Schema, arrayOf } from 'normalizr'

const userSchema = new Schema('users', {
    idAttribute: 'login'
});

const entSchema = new Schema('ents');

const entPageSchema = new Schema('entPages',{idAttribute: e => 'test'});

entPageSchema.define({
    data: arrayOf(entSchema)
});

const Schemas = {
    USER: userSchema,
    USER_ARRAY: arrayOf(userSchema),
    ENT: entSchema,
    ENT_ARRAY: arrayOf(entSchema),
    ENT_PAGE: entPageSchema
};

// Schemas for Github API responses.
export default Schemas;