import React from 'react'
import PatientForm from './PatientForm'
import { IPatient } from '../types/Patient'

interface ManagePatientModalProps {
  patient: IPatient | null
  onSave: (patient: IPatient) => void
  onClose: () => void
}

const ManagePatientModal: React.FC<ManagePatientModalProps> = ({
  patient,
  onSave,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-all duration-1000 ease-in-out transform">
      <div className="bg-white rounded p-4 w-96">
        <PatientForm patient={patient} onSave={onSave} onClose={onClose} />
      </div>
    </div>
  )
}

export default ManagePatientModal
