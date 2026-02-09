
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Profissional } from '../types';

interface Props {
  onLogin: (user: Profissional) => void;
}

const ExpertLogin: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de autenticação
    if (password === 'veterinario123') {
      onLogin({
        id: Math.random().toString(36).substr(2, 9),
        nome: 'Dr. Especialista',
        email: email,
        crmv: 'SP-12345'
      });
      navigate('/expert/portal');
    } else {
      alert('Senha incorreta para área restrita.');
    }
  };

  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-[70vh] space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-teal-800">Área Restrita</h2>
        <p className="text-gray-500 text-sm">Acesso exclusivo para Médicos Veterinários habilitados.</p>
      </div>

      <form onSubmit={handleLogin} className="w-full space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400 uppercase">E-mail Profissional</label>
          <input 
            type="email" 
            required 
            className="w-full p-4 bg-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400 uppercase">Senha de Acesso</label>
          <input 
            type="password" 
            required 
            placeholder="Dica: veterinario123"
            className="w-full p-4 bg-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="w-full bg-teal-800 text-white font-bold py-4 rounded-2xl shadow-xl active:scale-95 transition">
          Entrar no Portal
        </button>
      </form>

      <button onClick={() => navigate('/')} className="text-gray-400 text-sm font-bold">Voltar ao Início</button>
    </div>
  );
};

export default ExpertLogin;
