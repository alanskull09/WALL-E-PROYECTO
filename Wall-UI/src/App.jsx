import { useState } from 'react'
import ChatLayout from './components/ChatLayout'
import ChatInput from './components/ChatInput'
import MessageBubble from './components/MessageBubble'
import Sidebar from './components/Sidebar'
import SuggestionChip from './components/SuggestionChip'
import TypingIndicator from './components/TypingIndicator'
import './App.css'

// Catálogo de sugerencias posibles
const SUGGESTION_POOL = [
  { text: "Diseño minimalista", query: "¿Cómo puedo hacer un diseño minimalista?" },
  { text: "Paleta de colores", query: "Sugiere una paleta de colores profesional" },
  { text: "Mejorar accesibilidad", query: "¿Cómo mejoro la accesibilidad de mi web?" },
  { text: "Jerarquía visual", query: "Dame consejos de jerarquía visual" },
  { text: "Evalúa mi formulario", query: "Evalúa mi formulario" },
  { text: "Fuentes legibles", query: "¿Qué tipografía recomiendas para texto largo?" },
  { text: "Botones atractivos", query: "¿Cómo diseño botones que llamen la atención?" },
  { text: "Modo oscuro", query: "¿Cuáles son las mejores prácticas para modo oscuro?" },
];

// Función para obtener sugerencias aleatorias distintas
const getRandomSuggestions = (count = 3) => {
  const shuffled = [...SUGGESTION_POOL].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

function App() {
  const [chats, setChats] = useState([
    { 
      id: 1, 
      title: 'Chat 1', 
      messages: [{ id: 1, tipo: "wallui", hora: "12:00 pm", texto: "Hola, soy WALL-UI. ¿En qué te puedo ayudar? 🤖" }], 
      suggestions: getRandomSuggestions(3) 
    }
  ]);
  const [activeChatId, setActiveChatId] = useState(1);
  const [isTyping, setIsTyping] = useState(false);

  const activeChat = chats.find(c => c.id === activeChatId);
  const currentMessages = activeChat ? activeChat.messages : [];
  const currentSuggestions = activeChat ? activeChat.suggestions : [];

  const handleEnviar = (texto) => {
    if (!activeChatId || texto.trim() === '' || isTyping) return;

    const userMsg = {
      id: Date.now(),
      tipo: "user",
      hora: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      texto: texto,
    }

    // Guardamos el mensaje del usuario y ocultamos temporalmente los chips
    setChats(prevChats => prevChats.map(chat => 
      chat.id === activeChatId 
        ? { ...chat, messages: [...chat.messages, userMsg], suggestions: [] } 
        : chat
    ));

    setIsTyping(true);

    setTimeout(() => {
      let respuestaBot = "Lo siento, por el momento no tengo esa información en mi base de datos de UI/UX. ¿Podrías intentar preguntarlo de otra forma? 🛠️";
      const textoLower = texto.toLowerCase();

      // Generamos un set aleatorio de preguntas alternativas para las respuestas que las requieran
      const opcionesAleatorias = getRandomSuggestions(3);
      const listaPreguntasText = opcionesAleatorias.map(opc => `• ${opc.query}`).join('\n');

      if (textoLower === "hola" || textoLower === "hola!") {
        const saludos = [
          "¡Hola! Soy WALL-UI, tu asistente especializado en diseño de interfaces. ¿En qué te ayudo hoy? 🤖",
          "¡Hola! Qué gusto verte por aquí. ¿Qué estructura o pantalla vamos a perfeccionar hoy? ✨",
          "¡Hola, desarrollador! Listo para optimizar layouts y código. Dime, ¿en qué te puedo asistir? 🎨"
        ];
        respuestaBot = saludos[Math.floor(Math.random() * saludos.length)];
        
      } else if (textoLower.includes("como estas") || textoLower.includes("cómo estás")) {
        const estados = [
          "¡Funcionando al 100% y procesando pixeles! ✨ ¿Qué interfaz vamos a mejorar hoy?",
          "¡Excelente! Con los servidores optimizados y listo para diseñar. 🤖",
          "¡Muy bien! Analizando las leyes de la Gestalt para ayudarte a estructurar tus ideas. 📐"
        ];
        respuestaBot = estados[Math.floor(Math.random() * estados.length)];

      } else if (
        textoLower.includes("qué haces") || textoLower.includes("que haces") || 
        textoLower.includes("quién eres") || textoLower.includes("quien eres")
      ) {
        respuestaBot = "Soy WALL-UI, un asistente especializado en el diseño de experiencias e interfaces de usuario (UI/UX). A diferencia de otras IAs comunes, fui entrenado para entender flujos visuales, estructurar layouts y optimizar componentes de software frontend. 🤖🎨";

      } else if (
        textoLower.includes("qué puedes hacer") || textoLower.includes("que puedes hacer") || 
        textoLower.includes("ayudar") || textoLower.includes("funciones") ||
        textoLower.includes("preguntas") || textoLower.includes("recomiendas preguntar")
      ) {
        respuestaBot = `Puedo brindarte apoyo en la organización de componentes, sugerir paletas de colores espaciales, compactar código estructurado complejo y ayudarte a cumplir criterios ergonómicos y de accesibilidad. 🛠️\n\nAquí tienes algunas preguntas aleatorias que puedes hacerme ahora mismo:\n\n${listaPreguntasText}`;

      } else if (textoLower.includes("minimalista")) {
        respuestaBot = "Para un diseño minimalista, concéntrate en el espacio en blanco (whitespace), usa una paleta de 2 o 3 colores neutros y elimina cualquier elemento redundante. ¡Menos es más! 🎨";
        
      } else if (textoLower.includes("paleta") || textoLower.includes("colores")) {
        respuestaBot = "Te sugiero usar un tono neutro y oscuro para fondos (como #4B5557), un color claro para la legibilidad (#E1DDD5) y un acento vibrante (como #76B82A) para botones importantes. 🖌️";
        
      } else if (textoLower.includes("accesibilidad") || textoLower.includes("accesible")) {
        respuestaBot = "Asegúrate de tener un buen contraste de colores (mínimo 4.5:1 para textos), usa etiquetas 'alt' en tus imágenes y permite que toda la web sea navegable usando el teclado. ♿";
        
      } else if (textoLower.includes("jerarquía") || textoLower.includes("jerarquia")) {
        respuestaBot = "Para una buena jerarquía visual, usa el tamaño y el peso de la fuente para destacar los títulos, y agrupa elementos relacionados usando la ley de proximidad de la Gestalt. 📏";
        
      } else if (textoLower.includes("formulario")) {
        respuestaBot = "En los formularios, coloca etiquetas claras fuera del input, indica los campos obligatorios de forma evidente y provee retroalimentación inmediata si ocurre un error. 📋";
        
      } else if (textoLower.includes("fuentes") || textoLower.includes("tipografía") || textoLower.includes("tipografia")) {
        respuestaBot = "Para texto digital largo, las fuentes Sans-Serif como Inter, Roboto o San Francisco facilitan la lectura en pantallas. Mantén un tamaño base mínimo de 16px. 🔤";
        
      } else if (textoLower.includes("botones") || textoLower.includes("botón") || textoLower.includes("boton")) {
        respuestaBot = "Los botones efectivos necesitan un área de clic cómoda (padding amplio), bordes consistentes con la marca y un estado hover contrastante para el llamado a la acción (CTA). 🖱️";
        
      } else if (textoLower.includes("modo oscuro") || textoLower.includes("dark mode")) {
        respuestaBot = "Evita usar negro puro (#000000). Es mejor emplear grises muy oscuros (como #121212) para reducir la fatiga visual y desaturar los colores de acento para que no lastimen la vista. 🌙";
      }

      const walluiMsg = {
        id: Date.now() + 1,
        tipo: "wallui",
        hora: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        texto: respuestaBot,
      };

      // Guardamos la respuesta del bot y refrescamos los chips inferiores con nuevas opciones aleatorias
      setChats(currentChats => currentChats.map(chat => 
        chat.id === activeChatId 
          ? { ...chat, messages: [...chat.messages, walluiMsg], suggestions: getRandomSuggestions(3) } 
          : chat
      ));
      
      setIsTyping(false);
    }, 1500);
  }

  const handleNewChat = () => {
    const newId = chats.length > 0 ? Math.max(...chats.map(c => c.id)) + 1 : 1;
    const newChat = {
      id: newId,
      title: `Chat ${newId}`,
      messages: [{ 
        id: Date.now(), 
        tipo: "wallui", 
        hora: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), 
        texto: "Hola, soy WALL-UI. ¡Nueva conversación iniciada! 🤖" 
      }],
      suggestions: getRandomSuggestions(3)
    };
    setChats([newChat, ...chats]);
    setActiveChatId(newId);
  };

  const handleDeleteChat = (id) => {
    const updatedChats = chats.filter(chat => chat.id !== id);
    setChats(updatedChats);
    if (id === activeChatId) {
      setActiveChatId(updatedChats.length > 0 ? updatedChats[0].id : null);
    }
  };

  const messageListContent = (
    <div className="flex flex-col justify-end min-h-full gap-4 pb-4">
      {!activeChatId ? (
        <div className="flex-1 flex items-center justify-center text-[#E1DDD5] opacity-70 font-medium">
          Selecciona o crea una nueva conversación para empezar.
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {currentMessages.map((msg) => (
              <MessageBubble key={msg.id} tipo={msg.tipo} texto={msg.texto} hora={msg.hora} />
            ))}
            
            {isTyping && <TypingIndicator />}
          </div>

          {currentSuggestions.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-6 justify-center animate-[wallPopIn_0.4s_ease-out]">
              {currentSuggestions.map((sugg, i) => (
                <SuggestionChip key={i} texto={sugg.text} onClick={() => handleEnviar(sugg.query)} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )

  return (
    <ChatLayout 
      sidebar={
        <Sidebar 
          chats={chats} 
          activeChatId={activeChatId}
          onNewChat={handleNewChat}
          onSelectChat={setActiveChatId}
          onDeleteChat={handleDeleteChat}
        />
      } 
      messageList={messageListContent}
      chatInput={activeChatId ? <ChatInput onEnviar={handleEnviar} /> : null}
    />
  )
}

export default App