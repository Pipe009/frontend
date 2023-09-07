import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import 'bootstrap/dist/css/bootstrap.min.css';

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/users");
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
}

export default function Component({ posts }) {
  const { data: session } = useSession();
  const router = useRouter()

  const handleDelete = async (id) => {
    //console.log("ID : ", id);
    fetch('http://localhost:3000/api/users' + id, {
    method: 'DELETE',
    })
    return router.reload('/dashboard')
  }
 
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
                Signed In as {session.user.firstname} {session.user.lastname}
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
        <br /><br /><br /><br />
        <main>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 text-end">
              <Link href="/dashboard/user/add/"className="btn btn-primary">Add Member</Link>
              </div>
            </div>
            <p></p>
            <div className="row">
              <div className="col-md-12">

              <div className="card">
  <h5 className="card-header"><i className="bi bi-person-vcard-fill" />Member List</h5>
  <div className="card-body">


                <table className="table">
                  <thead className="table-light">
                    <tr>
                      <th className="text-center">
                        <b>No</b>
                      </th>
                      <th className="text-center">
                        <b>StudentId</b>
                      </th>
                      <th className="text-center">
                        <b>Firstname</b>
                      </th>
                      <th className="text-center">
                        <b>Lastname</b>
                      </th>
                      <th className="text-center">
                        <b>Username</b>
                      </th>
                      <th className="text-center">
                        <b>Password</b>
                      </th>
                      <th className="text-center">
                        <b>Status</b>
                      </th>
                      <th className="text-center">
                        <b>Edit/Delete</b>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.users.map((post, i) => (
                      <tr>
                        <td className="text-center">{i+1}</td>
                        <td className="text-center">{post.studentid}</td>
                        <td className="text-center">{post.firstname}</td>
                        <td className="text-center">{post.lastname}</td>
                        <td className="text-center">{post.username}</td>
                        <td className="text-center">{post.password}</td>
                        <td className="text-center">{post.status}</td>
                        <td className="text-center">
                          <Link href={`/dashboard/user/edit/${post.id}`} className="btn btn-warning">
                            <i className="bi bi-pencil-square">Edit</i>
                          </Link>{" "}
                          <button type="button" className="btn btn-danger" onClick={() => handleDelete(post.id)}> 
                          <i className="bi bi-trash3">Delete</i>
                        </button>{" "}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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