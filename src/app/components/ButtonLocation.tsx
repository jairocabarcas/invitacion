export default function ButtonLocation() {
    return (
        <div className="flex justify-center mt-6">
            <a
                href="https://maps.google.com/?q=Parroquia+Nuestra+Señora+del+Perpetuo+Socorro+Sincelejo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-[#b59c78] text-white px-5 py-2 rounded-full shadow hover:bg-[#9c8566] transition text-sm md:text-base"
            >
                <span>📍</span>
                <span>Ubicación</span>
            </a>
        </div>
    );
}
