import Header from '../components/Header'
import Head from 'next/head'
import Link from 'next/link'
import React,{ useEffect,useState } from 'react'
import {faTrash,faUserPen} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Index = () => {
  const [users,setUsers] = useState([])
  const [newUser,setNewUser] = useState([])
  
  const deleteUser = (deleteID) =>{
    const temp = users.filter((userData)=> {if(userData.studentID != deleteID) return userData })
    localStorage.setItem("users",JSON.stringify(temp))
    setNewUser(temp)
}


  useEffect(()=>{
    setUsers(JSON.parse(localStorage.getItem('users') || '[]'))
  },[newUser])

  return <>
            <Head>
              <title>Final Output</title>
            </Head>
            <Header></Header>
            <table className="grid mt-3">
              <thead className='grid bg-purple-700'>
                <tr className='grid  w-100 grid-cols-6 gap-4'>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Course</th>
                  <th>Year Level</th>
                  <th>Email</th>
                  <th>Modify</th>
                </tr>
              </thead>
              <tbody className='grid'>
                {
                  users.map((user,index)=>(
                        <tr key={user.studentID} className={index % 2?'grid w-100 bg-slate-200 grid-cols-6 gap-4': 'grid w-100 grid-cols-6 gap-4'}>
                          <td className="grid place-content-center break-all">{user.studentID}</td>
                          <td className="grid place-content-center break-all">{user.fullName}</td>
                          <td className="grid place-content-center break-all">{user.course}</td>
                          <td className="grid place-content-center break-all">{user.year}</td>
                          <td className="grid place-content-center break-all">{user.email}</td>
                          <td className="flex justify-around">
                            <span><FontAwesomeIcon className="text-red-500" onClick={()=>deleteUser(user.studentID)} icon={faTrash}/></span>
                            <span><Link href={`/editForm/${user.studentID}`}><a><FontAwesomeIcon className='text-green-500' icon={faUserPen}/></a></Link></span>
                          </td>
                        </tr>
                  ))
                }
            </tbody>
            </table>
        </>
}

export default Index

