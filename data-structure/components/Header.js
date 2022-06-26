import Link from 'next/link'

const Header = () => {
  return <>
        <div className="text-white grid grid-cols-4 py-3 gap-4 bg-indigo-900">
            <div className="col-end-5 grid gap-4 grid-cols-2">
                <Link href="/enrollmentForm">Enroll</Link>
                <Link href="/">Home</Link>
            </div>
        </div>
    </>
  
}

export default Header
