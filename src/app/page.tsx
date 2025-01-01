'use client';

const HomePage = () => {
  const handleLogin = () => {
    window.location.href = '/api/auth?action=login';
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        onClick={handleLogin}
      >
        Login with Spotify
      </button>
    </div>
  );
};

export default HomePage;