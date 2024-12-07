
import ClientHoldList from '@/components/SuperAdmin/clientHoldList'
import React, { Suspense } from 'react'

function Page() {
  return (
    <div>
      <Suspense>
        <ClientHoldList/>
        </Suspense>
    </div>
  )
}

export default Page