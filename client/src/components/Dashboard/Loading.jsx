function DashLoading({pageName = 'Dashboard'}) {
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-[#E6E2FC] to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-purple-600 font-semibold">Loading {pageName}...</p>
        </div>
      </div>
    </div>
  );
}

export default DashLoading;
