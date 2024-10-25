import React, { memo, useEffect, useRef, useState } from 'react'
import { IPatient } from '../types/Patient'
import { PencilSquareIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon, UserIcon } from '@heroicons/react/24/outline'

interface PatientCardProps {
  patient: IPatient
  onEdit: (id: number) => void
  onVisible: (id: number) => void
  visible: boolean
}

const PatientCard: React.FC<PatientCardProps> = memo(
  ({
    patient: { id, avatar, name, description, createdAt, website },
    onEdit,
    onVisible,
    visible,
  }) => {
    const [expanded, setExpanded] = useState(false)
    const [imageError, setImageError] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)
    const cardRef = useRef<HTMLDivElement | null>(null)

    const formattedDate = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(createdAt))

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            onVisible(id) /// Call the onVisible function when the card enters the viewport
            observer.unobserve(entry.target) // Stop observing once it becomes visible
          }
        },
        { threshold: 0.1 } // Trigger when 10% of the element is visible
      )

      if (cardRef.current) {
        observer.observe(cardRef.current) // Start observing the card
      }

      return () => {
        if (cardRef.current) {
          observer.unobserve(cardRef.current) // Clean up the observer when unmounting
        }
      }
    }, [id, onVisible])

    return (
      <div
        ref={cardRef}
        className={`relative bg-white shadow-lg rounded-lg p-4 transition-all duration-300 ease-in-out transform ${
          expanded ? 'absolute z-100 scale-105' : 'hover:scale-105'
        }
      ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
      >
        <button
          onClick={() => onEdit(id)}
          className="absolute flex flex-row gap-1 top-4 right-4 text-primary hover:text-blue-500 focus:outline-none"
          aria-label="Edit patient"
        >
          <span className="font-semibold text-sm hover:underline">Edit</span>
          <PencilSquareIcon className="w-5 h-5 " />
        </button>

        <div className="flex items-center space-x-4">
          {imageError || !imageLoaded ? (
            <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
              <UserIcon className="w-8 h-8 text-gray-500" />
            </div>
          ) : (
            <img
              src={avatar}
              alt={name}
              className="w-16 h-16 rounded-full object-cover"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          )}
          <div>
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="text-gray-500 text-sm">{formattedDate}</p>
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-secondary hover:underline mt-1 block"
            >
              Visit website
            </a>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex flex-row gap-1 mt-4 items-center font-semibold text-sm text-primary hover:text-blue-500 hover:underline focus:outline-none"
        >
          {expanded ? 'Hide Details' : 'Show Details'}
          <ChevronDownIcon
            className={`w-4 ${
              expanded && 'rotate-180 transition-all duration-500'
            }`}
          />
        </button>

        <div
          className={`overflow-y-auto transition-all duration-300 ${
            expanded ? 'max-h-40 mt-2' : 'max-h-0'
          }`}
        >
          <p className="text-gray-700 pr-3">{description}</p>
        </div>
      </div>
    )
  },
  (prevProps, nextProps) => {
    // Only re-renders if the patient's props change
    return (
      prevProps.patient.id === nextProps.patient.id &&
      prevProps.patient.name === nextProps.patient.name &&
      prevProps.patient.description === nextProps.patient.description &&
      prevProps.patient.avatar === nextProps.patient.avatar &&
      prevProps.patient.website === nextProps.patient.website &&
      prevProps.visible === nextProps.visible
    )
  }
)

export default PatientCard
