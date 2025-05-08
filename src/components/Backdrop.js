import backdropImg from '../turtle-bg.webp';

export default function Backdrop() {
    return (
        <div className="relative w-full my-16">
            {/* Background Image */}
            <img className="w-full h-[500px] object-cover brightness-75" src={backdropImg} alt="backdrop" />

            {/* Overlay & Text */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white bg-opacity-50 px-8 py-4 rounded-lg shadow-lg text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900">Welcome to the Turtle Registration System</h1>
                </div>
            </div>
        </div>
    );
}
