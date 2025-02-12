import React from 'react'

export default function Description() {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6 text-green-800 text-center mb-4">
      <div className="flex flex-col justify-center p-4 w-[300px]">
        <h3 className="font-bold text-2xl">Safe and Secure</h3>
        <p>
          Freelancers verified by Emory email to ensure security
        </p>
      </div>

      <div className="flex flex-col justify-center p-4 w-[300px]">
        <h3 className="font-bold text-2xl">Wide Variety of Services</h3>
        <p>
        Available freelancers in academic tutoring, career coaching, research studies, dorm help, and much more
        </p>
      </div>

      <div className="flex flex-col justify-center p-4 w-[300px]">
        <h3 className="font-bold text-2xl">Campus Community</h3>
        <p>
        Encouraging uplifting Emory students and collaboration within the community
        </p>
      </div>
      
    </div>
  )
}
