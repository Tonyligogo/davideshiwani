import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useCallback, useMemo, useState } from "react";

type RequestType = {roleId?: Id<"hero">, roles: string[]};
type ResponseType = Id<"hero"> | null;

type Options = {
    onSuccess?: (data: ResponseType) => void;
    onError?: (error: Error) => void;
    onSettled?: () => void;
    throwError?: boolean;
}
export const useUpdateRoles = () => {
    const [data, setData] = useState<ResponseType>(null);
    const [error, setError] = useState<Error | null>(null);
    const [status, setStatus] = useState<'settled' | 'pending' | 'success' | 'error' | null>(null);
    const isPending = useMemo(()=>status === 'pending', [status]);
    const isSuccess = useMemo(()=>status === 'success', [status]);
    const isError = useMemo(()=>status === 'error', [status]);
    const isSettled = useMemo(()=>status === 'settled', [status]);
    const mutation = useMutation(api.hero.update);
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