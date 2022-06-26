import Header from "../../components/Header";
import { useEffect,useState } from "react";
import Router from 'next/router'

const UserIndex = ({userID}) => {
  const data = {
    'studentID':'',
    'course':'',
    'fullName':'',
    'year':'',
    'email':''
  }
  const [user,setUser] = useState([data])

  useEffect(()=>{
    let tempUser = JSON.parse(localStorage.getItem('users') || '[]')
    const getUser = tempUser.filter((user)=>{
      if(userID == user.studentID){
          return user
      }
    })
    setUser(getUser)
  },[])

  const handleSubmit = async (event) =>{
    event.preventDefault()

    const data = {
      'studentID':userID,
      'course':event.target.course.value,
      'fullName':event.target.fullName.value,
      'year':event.target.year.value,
      'email':event.target.email.value
    }

    let isEmail =true
    let Context = {}
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.map((user)=>{
        if(user.email == data.email && user.studentID != userID){
            Context = {
                message:"Email or StudentID Already Exist"
            }
        isEmail = false
        return
        }
    })

    if(isEmail){
      const editUser = users.map((user)=>{
        if(user.studentID == userID){
            return data
        }else{
          return user
        }
    })
    localStorage.setItem("users",JSON.stringify(editUser))
    Context = {
        message:"Successfully Updated"
    }
    event.target.course.value=''
    event.target.fullName.value=''
    event.target.year.value=''
    event.target.email.value=''
    Router.push('/')
    }
    alert(Context.message )
  } 


  return (<>
      <Header/>
        <div className="flex m-auto my-3 rounded flex-col justify-center w-11/12 min-h-100 drop-shadow-md bg-slate-200">
            <h1 className="flex place-content-center text-xl pt-3 bold-700">Edit {user[0].fullName}`s Info</h1>
            <form className="grid gap-4 rounded p-3 mb-5" onSubmit={handleSubmit}>
                <div className="grid">
                    <label >Full Name</label>
                    <input 
                        defaultValue={user[0].fullName}
                        name="fullName" 
                        className="w-100 outline-none ml-3 rounded py-1 indent-3"
                        required/>
                </div>
                <div className="grid">
                    <label>Year Level</label>
                    <input 
                        defaultValue={user[0].year}
                        name="year" 
                        type='number' 
                        className="w-100 outline-none ml-3 rounded py-1 indent-3" 
                        required/>
                </div>
                <div className="grid">
                    <label>Email Address</label>
                    <input 
                        defaultValue={user[0].email}
                        type="email" 
                        name="email" 
                        className="w-100 outline-none ml-3 rounded py-1 indent-3" 
                        required/>
                </div>
                <label  >Course</label>
                <select 
                    name="course" 
                    id="course" 
                    className="grid p-1 ml-3 rounded" 
                    defaultValue={user[0].course}
                    > 
                    <option value="BSIT">BS in Information Technology</option>
                    <option value="BSCS">BS in Computer Science</option>
                    <option value="BSCEng">BS in Computer Engineering</option>
                </select>
                <button className="shadow p-3 rounded bg-sky-500">EDIT INFO</button>
            </form>
        </div>
    </>
  )
}

export default UserIndex

export const getServerSideProps = (context) => {
  const userID = context.query.userID;
  return {
    props: { userID },
  };
};
