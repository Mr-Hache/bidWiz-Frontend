
"use client"

import { usePathname } from 'next/navigation';
import { useGetUserByUsernameQuery } from '@/app/redux/services/userApi';



function detail() {
  const pathname = usePathname(); // imprime la ruta actual
  const username = pathname.split('/')[2];
  
  const { data: user, isLoading, isError } = useGetUserByUsernameQuery({username});
  if (isLoading) return <div>Loading...</div>;
  if (isError || !user) return <div>User not found</div>;

  return (
    <div>
        <br />
        <br />
        <br />
        <br />
        <div>
            <img src={user.image} alt="" width={300} height={300} />                
            <h1>{`${user.name} ${user.lastName}`}</h1>     
              <h2>User name: {user.username}</h2>    
              <h2>Title: {user.experience.title}</h2>          
              <h2>Location: {user.experience.origin}</h2>
              <h2>{user.experience.expJobs}</h2>
              <h3>Languages: {user.languages.join(', ')}</h3>
              <h3>Subjects: {user.subjects.join(', ')}</h3>
                    
        </div>
    </div>
  );
}

export default detail;





