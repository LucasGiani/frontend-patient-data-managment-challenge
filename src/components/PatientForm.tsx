import React from 'react'
import { IPatient, IPatientForm } from '../types/Patient'
import {
  Controller,
  FieldErrors,
  SubmitErrorHandler,
  useForm,
} from 'react-hook-form'

interface PatientFormProps {
  patient?: IPatient | null
  onSave: (patient: IPatient) => void
  onClose: () => void
}

const PatientForm: React.FC<PatientFormProps> = ({
  patient,
  onSave,
  onClose,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IPatientForm>({
    defaultValues: {
      name: patient?.name || '',
      avatar: patient?.avatar || '',
      description: patient?.description || '',
      website: patient?.website || '',
    },
  })

  const onSubmit = async ({
    name,
    avatar,
    description,
    website,
  }: IPatientForm) => {
    const newPatient: IPatient = {
      id: patient?.id || 0, // Provisionally zero for new patient
      createdAt: patient?.createdAt || new Date(),
      name,
      avatar,
      description,
      website,
    }

    onSave(newPatient)
    onClose()
  }

  const onSubmitError = (
    errorData: SubmitErrorHandler<IPatientForm> | FieldErrors<IPatientForm>
  ) => {
    console.log('ErrorData', errorData)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onSubmitError)} className="p-4">
      <h2 className="text-3xl font-light text-primary pb-4">
        {patient ? 'Edit patient' : 'Add patient'}
      </h2>
      <div className="mb-4">
        <Controller
          control={control}
          name="name"
          rules={{
            required: true,
          }}
          render={({ field: { name, ...rest } }) => (
            <>
              <label htmlFor={name} className="block text-sm font-medium">
                Name
              </label>
              <input
                id={name}
                type="text"
                placeholder={`Enter ${name}...`}
                className={`w-full mt-1 p-2 h-fit border border-gray-300 rounded
                  ${errors && errors[name] && 'border-red-500'}`}
                {...rest}
              />
              {errors && errors[name] && (
                <span className="text-xs text-red-500" role="alert">
                  Please enter a name.
                </span>
              )}
            </>
          )}
        />
      </div>
      <div className="mb-4">
        <Controller
          control={control}
          name="description"
          rules={{
            required: true,
          }}
          render={({ field: { name, ...rest } }) => (
            <>
              <label htmlFor={name} className="block text-sm font-medium">
                Description
              </label>
              <textarea
                id={name}
                placeholder={`Enter ${name}...`}
                className={`w-full mt-1 p-2 h-fit border border-gray-300 rounded
                  ${errors && errors[name] && 'border-red-500'}`}
                {...rest}
              />
              {errors && errors[name] && (
                <span className="text-xs text-red-500" role="alert">
                  Please enter a description.
                </span>
              )}
            </>
          )}
        />
      </div>
      <div className="mb-4">
        <Controller
          control={control}
          name="website"
          rules={{
            required: true,
          }}
          render={({ field: { name, ...rest } }) => (
            <>
              <label htmlFor={name} className="block text-sm font-medium">
                Website
              </label>
              <input
                id={name}
                placeholder={`Enter ${name}...`}
                className={`w-full mt-1 p-2 h-fit border border-gray-300 rounded
                  ${errors && errors[name] && 'border-red-500'}`}
                {...rest}
              />
              {errors && errors[name] && (
                <span className="text-xs text-red-500" role="alert">
                  Please enter a valid URL (e.g., https://example.com).
                </span>
              )}
            </>
          )}
        />
      </div>
      <div className="mb-4">
        <Controller
          control={control}
          name="avatar"
          rules={{
            required: true,
          }}
          render={({ field: { name, ...rest } }) => (
            <>
              <label htmlFor={name} className="block text-sm font-medium">
                Avatar URL
              </label>
              <input
                id={name}
                type="url"
                placeholder={`Enter ${name}...`}
                className={`w-full mt-1 p-2 h-fit border border-gray-300 rounded
                  ${errors && errors[name] && 'border-red-500'}`}
                {...rest}
              />
              {errors && errors[name] && (
                <span className="text-xs text-red-500" role="alert">
                  Please enter a valid URL (e.g., https://image.png).
                </span>
              )}
            </>
          )}
        />
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="flex flex-row gap-2 items-center outline-secondary border-secondary border px-8 py-2 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex flex-row gap-2 items-center bg-green-500 text-white px-8 py-2 rounded-lg hover:opacity-85"
        >
          Save
        </button>
      </div>
    </form>
  )
}

export default PatientForm
