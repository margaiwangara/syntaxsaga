export function getNavLinkClass(pathName: string) {
  let navLink = 'nav-link';

  switch (pathName) {
    case '/':
      navLink += ' active';
      break;
    case '/login':
      navLink += ' active';
      break;
    case '/register':
      navLink += ' active';
      break;
    default:
      break;
  }

  return navLink;
}
