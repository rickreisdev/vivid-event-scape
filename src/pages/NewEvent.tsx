
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateEventData } from '@/types/event';
import EventForm from '@/components/EventForm';
import Navbar from '@/components/Navbar';
import AuthModal from '@/components/AuthModal';
import { useToast } from '@/hooks/use-toast';

const NewEvent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [user, setUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Verificar se usuário está logado
    const savedUser = localStorage.getItem('mockUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      setShowAuthModal(true);
    }
  }, []);

  const handleLogin = async (email: string, password: string) => {
    setIsSubmitting(true);
    
    // Simular autenticação
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = { email, id: 'user1' };
    setUser(mockUser);
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    
    toast({
      title: "Login realizado com sucesso!",
      description: `Bem-vindo de volta, ${email}`,
    });
    
    setIsSubmitting(false);
  };

  const handleRegister = async (email: string, password: string) => {
    setIsSubmitting(true);
    
    // Simular registro
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = { email, id: 'user1' };
    setUser(mockUser);
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    
    toast({
      title: "Conta criada com sucesso!",
      description: `Bem-vindo, ${email}`,
    });
    
    setIsSubmitting(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('mockUser');
    navigate('/');
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso",
    });
  };

  const handleCreateEvent = async (eventData: CreateEventData) => {
    if (!user) return;
    
    setIsSubmitting(true);
    
    // Simular criação do evento
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Evento criado!",
      description: "Seu evento foi criado com sucesso",
    });
    
    setIsSubmitting(false);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen">
        <Navbar 
          user={user} 
          onLogout={handleLogout}
          onLoginClick={() => setShowAuthModal(true)}
        />
        
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Faça login para criar eventos
            </h2>
            <p className="text-gray-600">
              É necessário estar logado para criar novos eventos.
            </p>
          </div>
        </div>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => {
            setShowAuthModal(false);
            navigate('/');
          }}
          onLogin={handleLogin}
          onRegister={handleRegister}
          isLoading={isSubmitting}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar 
        user={user} 
        onLogout={handleLogout}
        onLoginClick={() => setShowAuthModal(true)}
      />
      
      <EventForm
        onSubmit={handleCreateEvent}
        onCancel={handleCancel}
        isLoading={isSubmitting}
        title="Novo Evento"
      />
    </div>
  );
};

export default NewEvent;
