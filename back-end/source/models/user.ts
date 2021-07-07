import mongoose, { Schema } from 'mongoose';
import IUser from '../interfaces/user';

export const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: false
    },
    posts: {
        type: Array,
        required: false
    }
});

export default mongoose.model<IUser>('users', UserSchema);
