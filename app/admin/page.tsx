'use client';
import { Loader } from 'lucide-react';
import { useEffect } from 'react'
import { useCurrentUser } from '../(auth)/api/use-current-user';
import { useRouter } from 'next/navigation';

const Home = () => {
    const {data, isLoading} = useCurrentUser();
    const router = useRouter();
    const adminId = data?._id;
    useEffect(()=>{
    if(isLoading){
      return;
    }
    if(adminId){
      router.replace(`/admin/${adminId}`);
    }else{
        router.replace("/");
    }
  },[adminId,isLoading,router])
      if(isLoading){
        return <Loader className="animate-spin"/>
      }
      if(data === null){
        return null;
      }
}

export default Home