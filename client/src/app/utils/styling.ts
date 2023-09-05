export function getNavLinkClass(pathName: string) {
  let navLink = 'nav-link';

  switch (pathName) {
    case '/':
      navLink += ' active';
      break;
    case '/access/login':
      navLink += ' active';
      break;
    case '/access/register':
      navLink += ' active';
      break;
    default:
      break;
  }

  return navLink;
}
