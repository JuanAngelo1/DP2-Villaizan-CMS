import { Suspense } from "react"

function AuthLayout({children}: {children: React.ReactNode}) {
  return (
    <Suspense >
      <div className="bg-primary-foreground">{children}</div>
    </Suspense>
  )
}
export default AuthLayout