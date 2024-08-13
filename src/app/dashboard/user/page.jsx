import React from 'react'
import DefaultPage from "../../../components/Admin/Home/Home";
import Users from '../../../components/Admin/Users/Users';

const page = () => {
  return (
    <>
    <DefaultPage>
        <Users />
    </DefaultPage>
    </>
  )
}

export default page