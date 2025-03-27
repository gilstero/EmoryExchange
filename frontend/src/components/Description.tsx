import React from 'react'

export default function Description() {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-6 text-[#0c2b9c] text-center mb-4 p-12">
        <h1 className="text-2xl font-bold">What is Eagle Exchange?</h1>
        <p className="block">Eagle Exchange is Emory's premier freelancing platform, allowing Emory students to list their services on an Emory-exclusive site.</p>
      </div>
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
    </>
  )
}
