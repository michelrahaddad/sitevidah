export default function Preloader() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#00B894]/20 border-t-[#00B894] rounded-full animate-spin mx-auto mb-4"></div>
        <h3 className="text-lg font-semibold text-[#636E72] mb-2">Cartão + Vidah</h3>
        <p className="text-sm text-[#636E72]/80">Carregando sua experiência...</p>
      </div>
    </div>
  );
}