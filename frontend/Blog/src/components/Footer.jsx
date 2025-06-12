const Footer = () => {
  return (
    <footer >
      <p>&copy; {new Date().getFullYear()} Author App. All rights reserved.</p>
      <p>
        <a href="/privacy-policy" >
          Privacy Policy
        </a>
      </p>
    </footer>
  );
}
export default Footer;