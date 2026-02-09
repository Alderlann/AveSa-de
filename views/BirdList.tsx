
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Ave } from '../types';

interface Props {
  birds: Ave[];
}

const BirdList: React.FC<Props> = ({ birds }) => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Minhas Aves</h2>
        <Link to="/birds/add" className="bg-teal-600 text-white p-2 rounded-full shadow-md">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
        </Link>
      </div>

      {birds.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center border-2 border-dashed border-gray-200">
          <p className="text-gray-500 mb-4">Você ainda não cadastrou nenhuma ave.</p>
          <button 
            onClick={() => navigate('/birds/add')}
            className="text-teal-600 font-semibold"
          >
            Cadastrar primeiro pet
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {birds.map(bird => (
            <div 
              key={bird.id}
              onClick={() => navigate(`/birds/${bird.id}`)}
              className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4 cursor-pointer hover:border-teal-300 transition"
            >
              <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center text-teal-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800">{bird.nome}</h3>
                <p className="text-sm text-gray-500">{bird.especie} • {bird.idade}</p>
              </div>
              <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BirdList;
