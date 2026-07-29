import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useCallback, useMemo, useState } from "react";

type RequestType = {aboutId?: Id<"about">, avatarUrl:Id<"_storage">, title: string, description: string, socialLinks: {platform: string, url?: string, phone?: string, icon?: string}[]};
type ResponseType = Id<"about"> | null;

type Options = {
    onSuccess?: (data: ResponseType) => void;
    onError?: (error: Error) => void;
    onSettled?: () => void;
    throwError?: boolean;
}
export const useUpdateAboutSection = () => {
    const [data, setData] = useState<ResponseType>(null);
    const [error, setError] = useState<Error | null>(null);
    const [status, setStatus] = useState<'settled' | 'pending' | 'success' | 'error' | null>(null);
    const isPending = useMemo(()=>status === 'pending', [status]);
    const isSuccess = useMemo(()=>status === 'success', [status]);
    const isError = useMemo(()=>status === 'error', [status]);
    const isSettled = useMemo(()=>status === 'settled', [status]);
    const mutation = useMutation(api.about.update);
    const mutate = useCallback(async (values:RequestType, options?: Options)=>{
        try{
            setStatus('pending');
            setError(null);
            const response = await mutation(values);
            setData(response);
            setStatus('success');
            options?.onSuccess?.(response);
            return response;
        }catch(error){
            setError(error as Error);
            setStatus('error');
            options?.onError?.(error as Error);
            if(options?.throwError){
                throw error;
            }
        }finally{
            setStatus('settled');
            options?.onSettled?.();
        }
    },[mutation]);

    return {mutate, data, error, isPending, isSuccess, isError, isSettled};
};