import { Request, Response, NextFunction } from 'express'
import { IPost } from '../models/posts'
import axios, { AxiosResponse } from 'axios'
import { WsConstant } from '../wsconstant'
import validator from '../middleware/posts'


const get = async (req: Request, res: Response, next: NextFunction) => {
    const result: AxiosResponse = await axios.get('https://jsonplaceholder.typicode.com/posts')
    const data: IPost[] = result.data;
    return res.status(200).json({
        data: data,
        message: WsConstant.GET_SUCCESS,
        success: true,
    })
}
const getById = async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id;
    const result: AxiosResponse = await axios.get('https://jsonplaceholder.typicode.com/posts/' + id)
    const data: IPost[] = result.data;
    return res.status(200).json({
        data: data,
        message: WsConstant.GET_SUCCESS,
        success: true,
    })
}
const put = async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id;
    const title: string = req.body.title ?? null;
    const body: string = req.body.body ?? null;
    const result: AxiosResponse = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, { ...(title && { title }), ...(body && { body }) })

    return res.status(200).json({
        data: null,
        message: WsConstant.UPDATED_SUCCESS,
        success: true,
    })
}

const post = async (req: Request, res: Response, next: NextFunction) => {
    const title: string = req.body.title;
    const body: string = req.body.body;

    const result: AxiosResponse = await axios.post(`https://jsonplaceholder.typicode.com/posts`, {
        title,
        body
    });

    return res.status(200).json({
        data: null,
        message: WsConstant.POST_SUCCESS,
        success: true,
    });
}

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from req.params
    let id: string = req.params.id;
    // delete the post
    let response: AxiosResponse = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    // return response
    return res.status(200).json({
        data: null,
        message: WsConstant.DELETE_SUCCESS,
        success: true,
    });
};



export default { get, getById, put, post, deletePost };