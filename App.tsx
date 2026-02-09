
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Ave, Analise, CasoReferencia, Profissional } from './types';

// Views
import Home from './views/Home';
import BirdList from './views/BirdList';
import AddBird from './views/AddBird';
import EditBird from './views/EditBird';
import AnalysisForm from './views/AnalysisForm';
import AnalysisResult from './views/AnalysisResult';
import History from './views/History';
import FeedbackForm from './views/FeedbackForm';
import ExpertLogin from './views/ExpertLogin';
import ExpertPortal from './views/ExpertPortal';
import ExpertSubmitCase from './views/ExpertSubmitCase';

// Components
import Layout from './components/Layout';

const App: React.FC = () => {
  const [birds, setBirds] = useState<Ave[]>(() => {
    const saved = localStorage.getItem('avi-birds');
    return saved ? JSON.parse(saved) : [];
  });

  const [analyses, setAnalyses] = useState<Analise[]>(() => {
    const saved = localStorage.getItem('avi-analyses');
    return saved ? JSON.parse(saved) : [];
  });

  const [expertCases, setExpertCases] = useState<CasoReferencia[]>(() => {
    const saved = localStorage.getItem('avi-expert-cases');
    return saved ? JSON.parse(saved) : [];
  });

  const [profissional, setProfissional] = useState<Profissional | null>(() => {
    const saved = localStorage.getItem('avi-expert-user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('avi-birds', JSON.stringify(birds));
  }, [birds]);

  useEffect(() => {
    localStorage.setItem('avi-analyses', JSON.stringify(analyses));
  }, [analyses]);

  useEffect(() => {
    localStorage.setItem('avi-expert-cases', JSON.stringify(expertCases));
  }, [expertCases]);

  const addBird = (bird: Ave) => setBirds(prev => [...prev, bird]);
  
  const updateBird = (updatedBird: Ave) => {
    setBirds(prev => prev.map(b => b.id === updatedBird.id ? updatedBird : b));
  };

  const addAnalysis = (analysis: Analise) => {
    setAnalyses(prev => {
        const filtered = prev.filter(a => a.id !== analysis.id);
        return [...filtered, analysis];
    });
  };

  const addExpertCase = (caso: CasoReferencia) => {
    setExpertCases(prev => [...prev, caso]);
  };

  const loginExpert = (user: Profissional) => {
    setProfissional(user);
    localStorage.setItem('avi-expert-user', JSON.stringify(user));
  };

  const logoutExpert = () => {
    setProfissional(null);
    localStorage.removeItem('avi-expert-user');
  };

  return (
    <HashRouter>
      <Layout profissional={profissional} onLogout={logoutExpert}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/birds" element={<BirdList birds={birds} />} />
          <Route path="/birds/add" element={<AddBird onAdd={addBird} />} />
          <Route path="/birds/edit/:id" element={<EditBird birds={birds} onUpdate={updateBird} />} />
          <Route path="/birds/:id" element={<History birds={birds} analyses={analyses} />} />
          <Route path="/analyze/:birdId" element={<AnalysisForm birds={birds} expertCases={expertCases} onComplete={addAnalysis} />} />
          <Route path="/analyze/:birdId/edit/:analysisId" element={<AnalysisForm birds={birds} analyses={analyses} expertCases={expertCases} onComplete={addAnalysis} />} />
          <Route path="/result/:analysisId" element={<AnalysisResult analyses={analyses} />} />
          <Route path="/feedback/:analysisId" element={<FeedbackForm analyses={analyses} onUpdate={addAnalysis} />} />
          
          {/* Rotas Especialista */}
          <Route path="/expert/login" element={<ExpertLogin onLogin={loginExpert} />} />
          <Route path="/expert/portal" element={<ExpertPortal profissional={profissional} cases={expertCases} />} />
          <Route path="/expert/submit" element={<ExpertSubmitCase profissional={profissional} onAdd={addExpertCase} />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
