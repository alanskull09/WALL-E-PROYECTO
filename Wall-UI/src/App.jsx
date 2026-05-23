import { useState } from 'react'
import ChatInput from './components/ChatInput'
import MessageBubble from './components/MessageBubble'
import './App.css'

const MOCK_MESSAGES = [
  { id: 1, tipo: "wallui", hora: "12:00 pm", texto: "Hola, soy WALL-UI. ¿En qué te puedo ayudar?" },
  { id: 2, tipo: "user", hora: "12:00 pm", texto: "Mi diseño actual no tiene un diseño consistente, ¿Qué me recomiendas?" },
  { id: 3, tipo: "wallui", hora: "12:00 pm", texto: "Si gustas puedes enviarme tus links y te ayudo a acomodarlos en una barra de navegación." },
]

function App() {
  const [messages, setMessages] = useState(MOCK_MESSAGES)

  const handleEnviar = (texto) => {
    const newMsg = {
      id: messages.length + 1,
      tipo: "user",
      hora: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      texto: texto,
    }
    setMessages((prev) => [...prev, newMsg])
  }

  return (
    <section id="center" className="min-h-screen flex flex-col justify-end gap-4 py-4">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} tipo={msg.tipo} texto={msg.texto} hora={msg.hora} />
      ))}
      <ChatInput onEnviar={handleEnviar} />
    </section>
  )
}

export default App