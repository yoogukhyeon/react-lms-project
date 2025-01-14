import { INews } from '@/types/news';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { api } from '..';
import { queryClient } from '../../';

const getList = (category: string | any, startNum: string | any, endNum: string | any) => {
    return api.get({
        url: `${process.env.REACT_APP_API_URL}/api/news?category=${category}&startNum=${startNum}&endNum=${endNum}`,
    });
};

export const useNewsQuery = (category: string | any, startNum: string | any, endNum: string | any) => {
    return useQuery(['newsList', category, startNum, endNum], () => getList(category, startNum, endNum), {
        select: (data) => data?.data?.data,
        keepPreviousData: true,
    });
};

const getDetail = (id: number) => {
    return api.get({ url: `${process.env.REACT_APP_API_URL}/api/news/detail/${id}` });
};

export const useNewsDetailQuery = (id: number) => {
    return useQuery(['newsDetail', id], () => getDetail(id), {
        select: (data) => data?.data?.data?.news,
        refetchOnWindowFocus: false,
    });
};

const postBoard = (data: INews) => {
    return api.post({ url: `${process.env.REACT_APP_API_URL}/api/news`, data });
};

const putBoard = (data: INews) => {
    return api.put({ url: `${process.env.REACT_APP_API_URL}/api/news`, data });
};

export const useNewsMutation = (isUpdate: boolean) => {
    return useMutation<AxiosResponse, AxiosError, INews>((data): any => {
        return isUpdate ? putBoard(data) : postBoard(data);
    });
};

const getCategoryList = () => {
    return api.get({ url: `${process.env.REACT_APP_API_URL}/api/news/category` });
};

export const useCategoryQuery = () => {
    return useQuery(['categoryList'], () => getCategoryList(), {
        select: (data) => data?.data?.data,
        keepPreviousData: true,
    });
};
