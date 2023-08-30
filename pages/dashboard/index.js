import { useSession, signIn, signOut } from "next-auth/react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { useRouter } from "next/router";
import Link from "next/link";
export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/users');
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
  
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });
  
    if (result.isConfirmed) {
      // Perform the deletion using fetch
      await fetch('http://localhost:3000/api/users?id=' + id, {
        method: 'DELETE',
      });
  
      // Reload the page
      router.reload('/dashboard');
  
      // Show success message
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      );
    }
  };

  // if (session) {
    return (
      <>
        {/* Signed in as {session.user.email} <br />
        {session.user.fname} {session.user.lname} <br />
        <button onClick={() => signOut()}>Sign out</button> */}<br />
        <Link href="./dashboard/addmem"><button className="btn btn-success">Add New</button></Link><br />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell>id</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.users.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>{post.id}</TableCell>
                  <TableCell>{post.firstname}</TableCell>
                  <TableCell>{post.lastname}</TableCell>
                  <TableCell>{post.username}</TableCell>
                  <TableCell>{post.password}</TableCell>
                  <TableCell>{post.status}</TableCell>
                  <td>
                <ul class="list-inline m-0">
                 <li class="list-inline-item">
                      <button class="btn btn-success btn-sm rounded-0">Edit</button>
                   </li>
                    <li class="list-inline-item">
                   <button class="btn btn-danger btn-sm rounded-0" onClick={() => handleDelete(post.id)}>Delete</button>
                      </li>
                         </ul>
                </td>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }

//   return (
//     <>
//       Not signed in <br />
//       <button onClick={() => signIn()}>Sign in</button>
//     </>
//   );
// }

// "username": "karn.yong@melivecode.com",
// "password": "melivecode",