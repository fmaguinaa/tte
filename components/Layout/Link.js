import { withRouter } from 'next/router';
import { secondaryColor } from '../utils';

const ActiveLink = ({ children, router, href }) => {
  const style = {
    color: router.pathname === href ? `${secondaryColor}` : 'white'
  }

  const handleClick = e => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  )
}


export default withRouter(ActiveLink)
