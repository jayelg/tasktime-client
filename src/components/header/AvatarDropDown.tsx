import { siteConfig } from '../../../config/site'
import { ThemeToggle } from '../common/theme-toggle'
import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'

interface AvatarDropDownProps {
  firstName: string
  lastName: string
  setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  avatarImg?: string
}

const nameToInitials = (firstName: string, lastName: string) => {
  const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : ''
  const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : ''
  return firstInitial + lastInitial
}

const logOut = (
  setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setUserLoggedIn(false)
  localStorage.removeItem('jwt')
}

const AvatarDropDown = (props: AvatarDropDownProps) => {
  const { firstName, lastName, setUserLoggedIn, avatarImg = '' } = props
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={avatarImg} />
          <AvatarFallback>{nameToInitials(firstName, lastName)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-6">
        <DropdownMenuItem asChild={true}>
          <Link to="/app/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ThemeToggle />
        </DropdownMenuItem>
        <DropdownMenuItem asChild={true}>
          <Link to="/app/admin">Admin</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild={true}>
          <Link to={siteConfig.links.github} target="_blank" rel="noreferrer">
            Source
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild={true}>
          <Link to="/docs">Documentation</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/">
            <div onClick={() => logOut(setUserLoggedIn)}>
              Log out
              <span className="sr-only">Log out</span>
            </div>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AvatarDropDown
