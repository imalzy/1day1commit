import { Request, Response, NextFunction } from 'express'
import { IPost } from '../models/posts'
import axios, { AxiosResponse } from 'axios'
import { WsConstant } from '../wsconstant'


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

export default { get, getById };