import { Search } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white mb-10 fixed top-0 left-0 right-0 z-50">
      <div className="px-18 mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">★</span>
            </div>
            <span className="text-xl font-semibold">
              Review
              <span className="font-bold text-transparent bg-gradient-to-r from-[#D100F3] to-[#002BC5] bg-clip-text">
                &
              </span>
              <span className="font-bold">RATE</span>
            </span>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-12">
            {/* Search Bar */}
            <div className="flex-1 mx-8">
              <div className="relative w-[450px]">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-5 pr-12 border border-gray-300 rounded w-full h-11 text-base"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-600 w-6 h-6" />
              </div>
            </div>
            <button className="hover:underline">SignUp</button>
            <button className="hover:underline">Login</button>
          </div>
        </div>
      </div>
    </header>
  );
}
