import { useSession, signIn, signOut } from "next-auth/react";
import Link from 'next/link';
import { useRouter } from "next/router";
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
export async function getServerSideProps(req) {
  const { id } = req.query;
  const res = await fetch('https://nattawut009-ji560chan-gmailcom.vercel.app/api/user/' + id, {
    method: 'GET',
  })
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
}

export default function Component({ posts }) {
  const { data: session } = useSession();
  const router = useRouter();


  const handleUpdate = (event) => {1
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      id: data.get('studentid'),
      studentid: data.get('studentid'),
      firstname: data.get('firstname'),
      lastname: data.get('lastname'),
      username: data.get('username'),
      password: data.get('password'),
      status: data.get('status')
    }

      fetch(`https://nattawut009-ji560chan-gmailcom.vercel.app/api/user`, {
        method: 'PUT', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == 'ok') {
          router.push('/dashboard')
        } else {
          console.log('Add Data Not Success')
          router.push('/dashboard')
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
 

  }; //end handleSubmit
  
  // if (session) {
    
    return (
      <>
        <nav className="navbar navbar-light bg-success">
          <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center w-100">
              {/* <div>Signed in as {session.user.email} {session.user.fname} {session.user.lname}</div>
              <button className="btn btn-danger" onClick={() => signOut()}>Sign out</button> */}
            </div>
          </div>
        </nav>
        <br />
        <div className="container ">
        <div className="card mt-4">
          <div className="card-body">
          
            
            <form onSubmit={handleUpdate}>
             {posts.user.map((post, i) => (
              <>
            <button type = "submit" className="btn btn-success">Add New</button>
            <Link href ="/dashboard">
            <button className="btn btn-warning mx-1">Back</button>
            </Link>
              <div className="form-row">
                <div className="form-group col-md-10">
                  <label htmlFor="inputEmail4">Student Id</label>
                  <input type="hidden" className="form-control" name ="studentid" id="studentid" placeholder="Student Id" 
                  // onChange={(event) => { setPassword(event.target.value) }}
                  defaultValue={post.id}
                  required/>
                </div>
                <div className="form-group col-md-10">
                  <label htmlFor="inputEmail4">Firstname</label>
                  <input type="text" className="form-control" name ="firstname" id="firstname" placeholder="Firstname" 
                  // onChange={(event) => { setPassword(event.target.value) }}
                  defaultValue={post.firstname}
                  required/>
                </div>
                <div className="form-group col-md-10">
                  <label htmlFor="inputAddress">Lastname</label>
                  <input type="text" className="form-control" name ="lastname" id="lastname" placeholder="Lastname" 
                  // onChange={(event) => { setPassword(event.target.value) }}
                  defaultValue={post.lastname}
                  required/>
                </div>
                <div className="form-group col-md-10">
                  <label htmlFor="inputAddress">Username</label>
                  <input type="text" className="form-control" name ="username" id="username" placeholder="Username"
                  // onChange={(event) => { setPassword(event.target.value) }}
                  defaultValue={post.username}
                  required />
                </div>
                <div className="form-group col-md-10">
                  <label htmlFor="inputPassword4">Password</label>
                  <input type="password" className="form-control" name ="password" id="password" placeholder="Password" 
                  // onChange={(event) => { setPassword(event.target.value) }}
                  defaultValue={post.password}
                  required/>
                </div>
              </div>
              <div className="form-group col-md-10">
                <label htmlFor="inputAddress2">Status</label>
                <input type="text" className="form-control" name ="status" id="status" placeholder="Status" 
                // onChange={(event) => { setPassword(event.target.value) }}
                defaultValue={post.status}
                required/>
              </div>
              <div className="form-group">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="gridCheck" />
                  <label className="form-check-label" htmlFor="gridCheck">
                    Check me out
                  </label>
                </div>
              </div>
              </>
              ))}
            </form>
          </div>
        </div>
        </div>
      </>
    );
  // }

  return (
    <>
      <div className="alert alert-danger" role="alert">
        Not signed in <br />
        <button className="btn btn-primary" onClick={() => signIn()}>Sign in</button>
      </div>
    </>
  );
}