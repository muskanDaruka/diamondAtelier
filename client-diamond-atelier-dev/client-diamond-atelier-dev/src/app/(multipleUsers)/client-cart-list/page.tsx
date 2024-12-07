
import ClientCartList from '@/components/SuperAdmin/clientCartList'
import React, { Suspense } from 'react'

function Page() {
  return (
    <div>
        <Suspense>
            <ClientCartList/>
        </Suspense>
    </div>
  )
}

export default Page