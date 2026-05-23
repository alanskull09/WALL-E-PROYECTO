import React from 'react';

export default function ChatLayout({ sidebar, messageList, chatInput }) {
  return (
    <div className="w-full h-screen flex overflow-hidden font-serif">
      <aside className="w-72 h-full flex flex-col justify-between bg-gradient-to-b from-[#D1C1D0] to-[#7C7A7A] p-4 border-r border-black/10">
        {sidebar}
      </aside>

      <main className="flex-1 h-full flex flex-col bg-gradient-to-b from-[#D1C1D0] via-[#4B5557] to-[#4B5557] relative">
        <section className="flex-1 overflow-y-auto p-6 flex flex-col">
          <div className="w-full max-w-4xl mx-auto">
            {messageList}
          </div>
        </section>

        <footer className="w-full p-6 bg-transparent">
          <div className="w-full max-w-4xl mx-auto">
            {chatInput}
          </div>
        </footer>
      </main>
    </div>
  );
}