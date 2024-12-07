import KycApprovalDetail from '@/components/SuperAdmin/KycApprovalDetail'
import React, { Suspense } from 'react'

function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <KycApprovalDetail/>
    </Suspense>
  )
}

export default page

