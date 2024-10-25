import PatientList from './components/PatientList'
import { UserGroupIcon } from '@heroicons/react/16/solid'

function App() {
  return (
    <>
      <header className="sticky white shadow-md">
        <div className="flex flex-row gap-3 text-primary items-center mx-auto max-w-7xl p-4 sm:p-6 lg:p-4">
          <UserGroupIcon className="w-10" />
          <h1 className="font-light sm:text-1xl lg:text-3xl">
            Frontend - Patient Data Management
          </h1>
        </div>
      </header>
      <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-4">
        <PatientList />
      </main>
    </>
  )
}

export default App
