

import ClientMemoList from '@/components/SuperAdmin/clientMemoList'
import React, { Suspense } from 'react'

function Page() {
  return (
    <div>
      <Suspense>
        <ClientMemoList/>
        </Suspense>
    </div>
  )
}

export default Page