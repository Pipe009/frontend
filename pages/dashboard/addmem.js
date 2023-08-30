import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Component({ posts }) {
  const { data: session } = useSession();
  const router = useRouter()

  //----------------------start handleSubmit--------------------------
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      studentid: data.get('txt_studentid'),
      firstname: data.get('txt_firstname'),
      lastname: data.get('txt_lastname'),
      username: data.get('txt_username'),
      password: data.get('txt_password'),
      status: data.get('txt_status')
    }

    //console.log("studentid :", jsonData.studentid);
    //console.log("firstname :", jsonData.firstname);
    //console.log("lastname :", jsonData.lastname);
    //console.log("username :", jsonData.username);
    //console.log("password :", jsonData.password);
    //console.log("status :", jsonData.status);

   
      fetch(` https://d439-49-229-108-186.ngrok-free.app/api/users`, {
        method: 'POST', // or 'PUT'
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
//----------------------end handleSubmit--------------------------
  if (session) {
    return (
      <>
        <header>
          <nav className="navbar fixed-top navbar-expand-lg bg-warning">
            <div className="container-fluid">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                Signed In as {session.user.fname} {session.user.lname}
                <span>&nbsp;</span>
                <form className="d-flex" role="search">
                  <button
                    className="btn btn-danger"
                    type="submit"
                    onClick={() => signOut()}
                  >
                    ออกจากระบบ
                  </button>
                </form>
              </div>
            </div>
          </nav>
        </header>
        <br />
        <br />
        <br />
        <br />
        <main>
          <div className="container-fluid">
            <p></p>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <h5 className="card-header">
                    <i className="bi bi-person-vcard-fill" /> Add Member
                  </h5>
                  <div className="card-body">

                    <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                        <input
                          type="text"
                          name="txt_studentid"
                          id="txt_studentid"
                          className="form-control bg-white"
                          placeholder="StudentID"
                          required
                        />
                      </div>
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          name="txt_firstname"
                          id="txt_firstname"
                          className="form-control bg-white"
                          placeholder="Firstname"
                          required
                        />
                      </div>
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          name="txt_lastname"
                          id="txt_lastname"
                          className="form-control bg-white"
                          placeholder="Lastname"
                          required
                        />
                      </div>
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          name="txt_username"
                          id="txt_username"
                          className="form-control bg-white"
                          placeholder="Username"
                          required
                        />
                      </div>
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          name="txt_password"
                          id="txt_password"
                          className="form-control bg-white"
                          placeholder="Password"
                          required
                        />
                      </div>
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          name="txt_status"
                          id="txt_status"
                          className="form-control bg-white"
                          placeholder="Status"
                          required
                        />
                      </div>

                      <p />
                      <div className="row">
                        <div className="col-md-12 text-center text-lg-start">
                          <button type="submit" className="btn btn-success btn-block"><span>Save</span><i className="bi bi-arrow-right" />
                          </button>&nbsp;&nbsp;&nbsp;

                          <Link href="/dashboard" className="btn btn-warning">Back</Link>
                          
                        </div>
                      </div>
                    </form>
                    <p></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <br></br>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}