import Link from 'next/link';

function BackToLoginLink() {
  return (
    <div className="text-center mt-6">
      <Link
        href="/user/login"
        className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200"
      >
        Back to Login
      </Link>
    </div>
  );
}

export default BackToLoginLink;