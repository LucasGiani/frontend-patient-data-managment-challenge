import React, { useEffect, useState, useCallback } from 'react'
import { IPatient } from '../types/Patient'
import PatientCard from './PatientCard'
import ManagePatientModal from './ManagePatientModal'
import { UserPlusIcon } from '@heroicons/react/24/outline'

const PatientList: React.FC = () => {
  const [patients, setPatients] = useState<IPatient[]>([])
  const [patientToEdit, setPatientToEdit] = useState<IPatient | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [visiblePatients, setVisiblePatients] = useState<Set<number>>(new Set())

  // Function to obtain the list of patients from the API
  const fetchPatients = useCallback(async () => {
    try {
      setFetching(true)
      const response = await fetch(
        'https://63bedcf7f5cfc0949b634fc8.mockapi.io/users'
      )
      const patientsData: IPatient[] = await response.json()
      const formattedSortedPatients: IPatient[] = patientsData
        .map((patient) => ({
          ...patient,
          id: Number(patient.id), // Convert ID to number
        }))
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      setPatients(formattedSortedPatients)
    } catch (error) {
      console.log('Error on fetching patients', error)
    } finally {
      setFetching(false)
    }
  }, [patients, fetching])

  const handleEditPatient = useCallback(
    (patientId: number) => {
      setPatientToEdit(
        patients.find((patient) => patient.id === patientId) as IPatient
      )
      setModalVisible(true)
    },
    [modalVisible, patients]
  )

  const handleAddPatient = useCallback(() => {
    setPatientToEdit(null)
    setModalVisible(true)
  }, [patientToEdit, modalVisible])

  const handleCloseModal = useCallback(() => {
    setModalVisible(false)
    setPatientToEdit(null)
  }, [patientToEdit, modalVisible])

  const handleSavePatient = useCallback(
    (patientToSave: IPatient) => {
      setPatients((prevPatients) => {
        if (!patientToEdit) {
          const newPatientId =
            patients.reduce((max, patient) => Math.max(max, patient.id), 0) + 1
          return [
            { ...patientToSave, id: newPatientId, createdAt: new Date() },
            ...prevPatients,
          ]
        }

        const updatedPatients = prevPatients.map((patient) =>
          patient.id === patientToSave.id
            ? { ...patient, ...patientToSave }
            : patient
        )
        return updatedPatients
      })
      setModalVisible(false)
      setPatientToEdit(null)
    },
    [patients, modalVisible, patientToEdit]
  )

  // Function to handle intersection observer
  const setVisible = (id: number) => {
    setVisiblePatients((prev) => new Set(prev).add(id))
  }

  useEffect(() => {
    fetchPatients()
  }, [])

  return (
    <div>
      <div className="flex flex-row justify-between py-2">
        <span className="font-light text-primary text-2xl lg:text-3xl">
          Patients list
        </span>
        <button
          onClick={handleAddPatient}
          className="flex flex-row gap-2 items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:opacity-85"
        >
          <UserPlusIcon className="w-6 h-auto" />
          Add patient
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
        {!!patients.length &&
          patients.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              onEdit={handleEditPatient}
              onVisible={setVisible}
              visible={visiblePatients.has(patient.id)}
            />
          ))}
      </div>

      {modalVisible && (
        <ManagePatientModal
          patient={patientToEdit}
          onClose={handleCloseModal}
          onSave={handleSavePatient}
        />
      )}
    </div>
  )
}

export default PatientList
