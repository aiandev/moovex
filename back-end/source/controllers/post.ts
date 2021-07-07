import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import logging from '../config/logging';
import User from '../models/user';

const NAMESPACE = 'Post';

const savePost = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Token validated, user authorized.');
    let email: string = req.body.email;
    let postId: number = Number(req.params.id);
    let type: string = typeof postId;

    try {
        const user = await User.findOneAndUpdate({ email: email }, { $push: { posts: postId } });
        return res.status(201).json({
            message: 'Post Saved',
            type: type
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    let email: string = req.body.email;
    let id: number = Number(req.params.id);

    try {
        const query = await User.findOneAndUpdate({ email: email }, { $pull: { posts: id } }, { useFindAndModify: false });
        return res.status(202).json({
            message: 'Post Deleted'
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const getUserPosts = (req: Request, res: Response, next: NextFunction) => {
    let email: string = req.body.email;

    User.findOne({ email })
        .exec()
        .then((user) => {
            if (user) {
                return res.status(200).json({
                    posts: user.posts
                });
            } else {
                return res.status(204).json({
                    posts: []
                });
            }
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message
            });
        });
};

export default {
    savePost,
    deletePost,
    getUserPosts
};
