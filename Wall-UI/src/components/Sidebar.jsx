import { useState } from 'react';

export default function Sidebar({ chats, activeChatId, onNewChat, onSelectChat, onDeleteChat }) {
    const [searchTerm, setSearchTerm] = useState('');
    // Nuevo estado para controlar si el menú de configuración está abierto o cerrado
    const [isConfigOpen, setIsConfigOpen] = useState(false);

    const filteredChats = chats.filter(chat =>
        chat.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col h-full bg-[#7C7A7A] font-serif text-[#000000] rounded-l-none relative shadow-2xl">
            {/* Cabecera / Logo */}
            <div className="p-5 pb-3">
                <h1 className="text-3xl font-bold tracking-wider mb-6 text-[#000000] drop-shadow-sm">
                    WALL-UI
                </h1>

                <button
                    onClick={onNewChat}
                    className="w-full flex items-center justify-center gap-2 bg-[#E1DDD5] hover:bg-[#D1C1D0] text-[#000000] py-2.5 px-4 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300 hover:scale-[1.03] active:scale-95 mb-4 font-medium group border border-transparent hover:border-[#A17B58]/30"
                >
                    <svg className="w-5 h-5 text-[#76B82A] group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Nueva conversación
                </button>

                <div className="relative group">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4B5557] transition-colors group-focus-within:text-[#A17B58]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Buscar chat"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#E1DDD5] text-[#000000] placeholder-[#4B5557] rounded-xl py-2 pl-9 pr-4 outline-none focus:ring-2 focus:ring-[#A17B58] transition-all duration-300 shadow-inner"
                    />
                </div>
            </div>

            {/* Lista de Chats Recientes */}
            <div className="flex-1 overflow-y-auto px-4 py-2 mt-2 space-y-2 scrollbar-thin scrollbar-thumb-[#4B5557] scrollbar-track-transparent">
                <h2 className="text-xs font-bold uppercase tracking-wider ml-1 mb-3 text-[#000000]/70">
                    Chats recientes
                </h2>
                
                {filteredChats.length === 0 ? (
                    <p className="text-sm text-[#000000]/60 ml-1 animate-pulse font-medium">
                        {chats.length === 0 ? "No hay chats recientes" : "No se encontraron resultados"}
                    </p>
                ) : (
                    filteredChats.map((chat) => {
                        const isActive = chat.id === activeChatId;
                        return (
                            <div
                                key={chat.id}
                                onClick={() => onSelectChat(chat.id)}
                                className={`group flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md animate-[wallSlideIn_0.4s_cubic-bezier(0.16,1,0.3,1)] ${
                                    isActive 
                                    ? 'bg-[#A17B58] text-[#E1DDD5]' 
                                    : 'bg-[#E1DDD5] hover:bg-[#D1C1D0] text-[#000000]'
                                }`}
                            >
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                                        isActive ? 'bg-[#E1DDD5]' : 'bg-[#4B5557] group-hover:bg-[#A17B58]'
                                    }`}>
                                        <svg className={`w-3.5 h-3.5 ${isActive ? 'text-[#A17B58]' : 'text-[#E1DDD5]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                        </svg>
                                    </div>
                                    <span className={`text-sm font-medium truncate ${isActive ? 'text-[#E1DDD5]' : 'text-[#000000]'}`}>
                                        {chat.title}
                                    </span>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); onDeleteChat(chat.id); }}
                                    className={`opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500 hover:text-white rounded-lg transition-all duration-200 transform scale-90 hover:scale-110 ${
                                        isActive ? 'text-[#E1DDD5]' : 'text-[#4B5557]'
                                    }`}
                                    title="Eliminar chat"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        )
                    })
                )}
            </div>

            {/* Menú de Configuración Flotante (Basado en el Wireframe 7) */}
            {isConfigOpen && (
                <div className="absolute bottom-16 left-4 right-4 bg-[#E1DDD5] rounded-xl shadow-xl border border-[#4B5557]/20 p-4 z-20 animate-[wallSlideUp_0.3s_ease-out]">
                    <div className="flex justify-between items-center border-b border-[#7C7A7A]/30 pb-2 mb-3">
                        <h3 className="font-bold text-[#000000]">Configuración</h3>
                        <button onClick={() => setIsConfigOpen(false)} className="text-[#4B5557] hover:text-red-500 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                    
                    <div className="space-y-4 text-sm text-[#000000]">
                        <div className="space-y-2">
                            <p className="font-semibold text-[#4B5557] text-xs uppercase">Chat</p>
                            <div className="flex justify-between items-center">
                                <span>Apariencia</span>
                                <span className="bg-[#D1C1D0] px-2 py-1 rounded text-xs">Oscuro</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Efectos</span>
                                <span className="bg-[#D1C1D0] px-2 py-1 rounded text-xs">Sí</span>
                            </div>
                        </div>

                        <div className="space-y-2 pt-2 border-t border-[#7C7A7A]/20">
                            <p className="font-semibold text-[#4B5557] text-xs uppercase">Cuenta</p>
                            <div className="flex justify-between items-center">
                                <span>Correo</span>
                                <span className="text-xs opacity-70 truncate max-w-[120px]">user@ejemplo.com</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Perfil de Usuario (Botón para abrir configuración) */}
            <div 
                onClick={() => setIsConfigOpen(!isConfigOpen)}
                className="bg-[#4B5557] p-4 flex items-center gap-3 mt-auto cursor-pointer hover:bg-[#A17B58] transition-colors duration-300 group relative z-10"
            >
                <div className="w-9 h-9 rounded-full bg-[#E1DDD5] flex items-center justify-center flex-shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300">
                    <svg className="w-5 h-5 text-[#4B5557]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <span className="text-[#E1DDD5] font-semibold tracking-wide">User</span>
                
                {/* Indicador visual de que es un menú */}
                <svg className={`w-4 h-4 text-[#E1DDD5] ml-auto transition-transform duration-300 ${isConfigOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                </svg>
            </div>

            <style>{`
                @keyframes wallSlideIn {
                    0% { opacity: 0; transform: translateX(-15px) scale(0.98); }
                    100% { opacity: 1; transform: translateX(0) scale(1); }
                }
                @keyframes wallSlideUp {
                    0% { opacity: 0; transform: translateY(10px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}