
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
        <h1>{user.username}</h1>
        <img src={user.image} alt="" width={300} height={300} />
        <h2>{`${user.name} ${user.lastName}`}</h2>
        <h2>{user.experience.title}</h2>
        <h2>{user.experience.origin}</h2>
        <h2>{user.experience.expJobs}</h2>
        <h3>{user.languages.join(', ')}</h3>
        <h3>{user.subjects.join(', ')}</h3>
    </div>
  );
}

export default detail;





