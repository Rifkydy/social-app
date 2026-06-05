// Footer menampilkan informasi singkat di bagian bawah halaman
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>
        &copy; {year} <strong>SocialApp</strong> &mdash; Data dari{' '}
        <a
          href="https://jsonplaceholder.typicode.com/users"
          target="_blank"
          rel="noreferrer"
        >
          JSONPlaceholder API
        </a>
      </p>
    </footer>
  );
}

export default Footer;
