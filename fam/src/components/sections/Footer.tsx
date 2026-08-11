import { Link } from 'react-router-dom';


    <footer className="border-t border-neutral-100 bg-white py-12 sm:py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-5 sm:px-6 md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <Link to="/" className="text-xl font-bold text-neutral-900">
            FamZee
          </Link>
          <p className="mt-2 max-w-xs text-sm text-neutral-500">
            Your family&apos;s private space for memories, events, and connection.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-neutral-500">
          <a href="#experience" className="transition hover:text-neutral-900">
            Experience
          </a>
          <a href="#showcase" className="transition hover:text-neutral-900">
            Product
          </a>
          <Link to="/register" className="transition hover:text-neutral-900">
            Sign up
          </Link>
          <Link to="/login" className="transition hover:text-neutral-900">
            Log in
          </Link>
          <Link to="/privacy" className="transition hover:text-neutral-900">
            Privacy
          </Link>
          <Link to="/terms" className="transition hover:text-neutral-900">
            Terms
          </Link>
        <p className="text-sm text-neutral-400">
          © {new Date().getFullYear()} FamZee
        </p>