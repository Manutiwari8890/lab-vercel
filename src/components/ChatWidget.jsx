'use client';
import { useState } from 'react';

export default function ChatWidget() {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ messages, setMessages ] = useState([
        { sender: 'bot', text: 'Hello! How can I help you find lab supplies or acids today?' }
    ]);
    const [ input, setInput ] = useState('');
    const [ loading, setLoading ] = useState(false);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMsg = input;
        setMessages((prev) => [ ...prev, { sender: 'user', text: userMsg } ]);
        setInput('');
        setLoading(true);

        try {
            const res = await fetch('https://new.labdisposable.com/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg }),
            });
            const data = await res.json();
            setMessages((prev) => [ ...prev, { sender: 'bot', text: data.reply } ]);
        } catch (err) {
            setMessages((prev) => [ ...prev, { sender: 'bot', text: 'Network error. Try again later.' } ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-10 z-50">
            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-secondary text-white p-4 rounded-full shadow-lg hover:bg-primary transition cursor-pointer relative"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className='w-6 h-6'>
                        <path d="m22.5,9h-.5v-1c0-2.757-2.243-5-5-5h-4V1c0-.552-.447-1-1-1s-1,.448-1,1v2h-4c-2.757,0-5,2.243-5,5v1h-.5c-.827,0-1.5.673-1.5,1.5v3c0,.827.673,1.5,1.5,1.5h.5v1c0,2.757,2.243,5,5,5h7.697l3.963,2.642c.36.24.775.361,1.191.361.348,0,.696-.084,1.015-.255.699-.375,1.134-1.1,1.134-1.894v-6.855h.5c.827,0,1.5-.673,1.5-1.5v-3c0-.827-.673-1.5-1.5-1.5Zm-2.5,12.855c0,.022,0,.089-.078.13-.08.043-.136.004-.152-.007l-4.215-2.81c-.164-.109-.357-.168-.555-.168H7c-1.654,0-3-1.346-3-3v-8c0-1.654,1.346-3,3-3h10c1.654,0,3,1.346,3,3v13.855ZM7,9.5c0-.828.672-1.5,1.5-1.5s1.5.672,1.5,1.5-.672,1.5-1.5,1.5-1.5-.672-1.5-1.5Zm10,0c0,.828-.672,1.5-1.5,1.5s-1.5-.672-1.5-1.5.672-1.5,1.5-1.5,1.5.672,1.5,1.5Zm-.153,4.695c.294.468.152,1.085-.315,1.378-1.037.651-2.666,1.427-4.531,1.427s-3.494-.776-4.531-1.427c-.468-.293-.609-.911-.315-1.378.294-.467.911-.609,1.378-.316.815.512,2.079,1.121,3.469,1.121s2.653-.609,3.469-1.121c.466-.294,1.085-.152,1.378.316Z" fill="currentColor" />
                    </svg>
                </button>
            ) : (
                <div className="w-120 h-110 bg-white border border-gray-200 rounded-xl shadow-xl flex flex-col justify-between">
                    {/* Header */}
                    <div className="bg-primary rounded-t-xl text-white px-5 py-3  flex justify-between items-center">
                        <span className="font-semibold">Lab Disposable Assistant</span>
                        <button onClick={() => setIsOpen(false)} className="text-white font-bold cursor-pointer">✕</button>
                    </div>

                    {/* Messages Container */}
                    <div className="p-3 overflow-y-auto flex-1 space-y-2 text-sm chat-scrollbar">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`p-2 rounded-lg max-w-[80%] font-medium ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800'}`} dangerouslySetInnerHTML={{ __html: msg.text }}>
                                </div>
                            </div>
                        ))}
                        {loading &&
                            <div className="flex items-end gap-2 text-gray-400 text-xs italic font-medium">
                                <span>LDP is typing</span>
                                <span className="flex items-center gap-1">
                                    <span className="typing-dot"></span>
                                    <span className="typing-dot"></span>
                                    <span className="typing-dot"></span>
                                </span>
                            </div>
                        }
                    </div>

                    {/* Input Form */}
                    <form onSubmit={sendMessage} className="p-3 border-t border-gray-200 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about products, prices..."
                            className="flex-1 border font-medium border-gray-300 rounded-[8px] px-4 py-2.5 text-sm focus:outline-none focus:border-primary text-black"
                        />
                        <button type="submit" className="bg-primary text-white px-3 py-1 rounded-[8px] text-sm hover:bg-secondary cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='w-4 h-4'><g id="_01_align_center" data-name="01 align center"><path d="M1.444,6.669a2,2,0,0,0-.865,3.337l3.412,3.408V20h6.593l3.435,3.43a1.987,1.987,0,0,0,1.408.588,2.034,2.034,0,0,0,.51-.066,1.978,1.978,0,0,0,1.42-1.379L23.991.021ZM2,8.592l17.028-5.02L5.993,16.586v-4Zm13.44,13.424L11.413,18h-4L20.446,4.978Z" fill='currentColor' /></g></svg>
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}