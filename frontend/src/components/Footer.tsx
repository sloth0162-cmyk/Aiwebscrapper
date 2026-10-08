const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} WebSummarizer
        </p>

        <p className="text-sm text-gray-500">
          Built with React & Flask
        </p>
      </div>
    </footer>
  );
};

export default Footer;