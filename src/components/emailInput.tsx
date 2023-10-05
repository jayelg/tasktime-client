import React, { useState } from 'react'

type EmailInputProps = {
  setOpen: (open: boolean) => void
}

const EmailInput: React.FC<EmailInputProps> = ({ setOpen }) => {
  const [email, setEmail] = useState('')

  const handleSubmit = () => {
    if (email) {
      const apiEndpoint = `${import.meta.env.VITE_SERVER_URL}/auth/login`
      fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ destination: email })
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log('email is coming.')
            // create a toast notification
          }
        })
        .catch((error) => console.error('Error:', error))
    }
  }

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      setOpen(false)
      handleSubmit()
    }
  }

  return (
    <input
      type="email"
      value={email}
      className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      placeholder="Enter your email to recieve a login link."
      onChange={(e) => setEmail(e.target.value)}
      onKeyDown={(e) => handleKeyUp(e)}
    />
  )
}

export { EmailInput }
