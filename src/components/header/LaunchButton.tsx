import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { Dialog, DialogTrigger, DialogContent } from '../ui/dialog'
import { EmailInput } from 'components/emailInput'

interface LaunchButtonProps {
  userLoggedIn: boolean
}

export function LaunchButton({ userLoggedIn }: LaunchButtonProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {userLoggedIn ? (
        <Button asChild variant={'outline'} size={'sm'}>
          <Link to="/app">Launch</Link>
        </Button>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="h-9 rounded-md border border-input px-3 hover:bg-accent hover:text-accent-foreground">
            Launch
          </DialogTrigger>
          <DialogContent>
            <EmailInput setOpen={setOpen} />
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
