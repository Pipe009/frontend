import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import Link from 'next/link';
export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/users');
  const data = await res.json();
  const posts = data.users || [];

  return {
    props: {
      posts,
    },
  };
}

export default function Component({ posts }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleDelete = async (id) => {
    try {
      await fetch('http://localhost:3000/api/users?id=' + id, {
        method: 'DELETE',
      });
      console.log('User deleted successfully');
      handleCloseModal();
      router.reload('/dashboard');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleCheck = async (id) => {
    console.log('Edit button clicked with ID:', id);
    // Implement your edit functionality here
  };

  return (
    <>
      {session ? (
        <>
          Signed in as {session.user.email} <br />
          {session.user.fname} {session.user.lname} <br />
          <button onClick={() => signOut()}>Sign out</button>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell>Student ID</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Password</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Edit/Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>{post.id}</TableCell>
                    <TableCell>{post.studentid}</TableCell>
                    <TableCell>{post.firstname}</TableCell>
                    <TableCell>{post.lastname}</TableCell>
                    <TableCell>{post.username}</TableCell>
                    <TableCell>{post.password}</TableCell>
                    <TableCell>{post.status}</TableCell>
                    <TableCell>
                      <button className="btn btn-outline-warning" onClick={() => handleCheck(post.id)}>Edit</button>
                      <button className="btn btn-outline-danger" onClick={() => { setDeleteItemId(post.id); handleShowModal(); }}>Delete</button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button type="button" variant="danger" onClick={() => handleDelete(deleteItemId)}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>

          <Link href="/AddMember">
            <button className="btn btn-outline-info">Add Member</button>
          </Link>
        </>
      ) : (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
    </>
  );
}
