import Header from '../components/Header'
import Router from "next/router";

const EnrollmentForm = () => {
    const handleSubmit = async (event) =>{
        event.preventDefault()
        

        const data = {
            'studentID':event.target.studentID.value,
            'course':event.target.course.value,
            'fullName':event.target.fullName.value,
            'year':event.target.year.value,
            'email':event.target.email.value
        }

        let isEmail = true
        let Context = true
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        users.map((user)=>{
            if(user.email == data.email || user.studentID ==  data.studentID){
                Context = {
                    message:"Email or StudentID Already Exist"
                }
            isEmail = false
            return
            }
        })
            if(isEmail){
                users.push(data)
                localStorage.setItem("users",JSON.stringify(users))
                Context = {
                    message:"Successfully Registered"
                }
                event.target.studentID.value=''
                event.target.course.value=''
                event.target.fullName.value=''
                event.target.year.value=''
                event.target.email.value=''
                Router.push('/')
        }
        alert(Context.message)

    }

  return (
    <>
        <Header/>
        <div className="flex m-auto my-3 rounded flex-col justify-center w-11/12 min-h-100 drop-shadow-md bg-slate-200">
            <h1 className="flex place-content-center text-xl pt-3 bold-700">Course Enrollment</h1>
            <form className="grid gap-4 rounded p-3 mb-5" onSubmit={handleSubmit}>
                <div className="grid">
                    <label>Student ID</label>
                    <input
                        type="number"
                        name="studentID" 
                        className="w-100 outline-none ml-3 rounded py-1 indent-3" 
                        required/>
                </div>
                <div className="grid">
                    <label >Full Name</label>
                    <input 
                        name="fullName" 
                        className="w-100 outline-none ml-3 rounded py-1 indent-3"
                        required/>
                </div>
                <div className="grid">
                    <label>Year Level</label>
                    <input 
                        name="year" 
                        type='number' 
                        className="w-100 outline-none ml-3 rounded py-1 indent-3" 
                        required/>
                </div>
                <div className="grid">
                    <label>Email Address</label>
                    <input 
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
                    required>
                    <option value="BSIT">BS in Information Technology</option>
                    <option value="BSCS">BS in Computer Science</option>
                    <option value="BSCE">BS in Computer Engineering</option>
                </select>
                <button className="shadow p-3 rounded bg-sky-500">ENROLL NOW</button>
            </form>
        </div>
    </>
  )
}

export default EnrollmentForm
