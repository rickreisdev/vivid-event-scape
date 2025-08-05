import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateEventData } from "@/types/event";
import EventForm from "@/components/EventForm";
import Navbar from "@/components/Navbar";
import AuthModal from "@/components/AuthModal";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { useEvents } from "@/hooks/useEvents";
import { useToast } from "@/hooks/use-toast";

const NewEvent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, profile, signIn, signUp, signOut } = useAuth();
  const { createEvent, isCreating } = useEvents();

  const [showAuthModal, setShowAuthModal] = useState(false);

  React.useEffect(() => {
    // Se não está logado, mostrar modal de autenticação
    if (!user) {
      setShowAuthModal(true);
    }
  }, [user]);

  const handleLogin = async (email: string, password: string) => {
    try {
      await signIn(email, password);
      setShowAuthModal(false);
      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo de volta${
          profile?.name ? `, ${profile.name}` : ""
        }`,
      });
    } catch (error: any) {
      toast({
        title: "Erro no login",
        description: error.message || "Erro ao fazer login",
        variant: "destructive",
      });
    }
  };

  const handleRegister = async (
    email: string,
    password: string,
    name: string
  ) => {
    try {
      await signUp(email, password, name);
      setShowAuthModal(false);
      toast({
        title: "Conta criada com sucesso!",
        description: `Bem-vindo, ${name}!`,
      });
    } catch (error: any) {
      toast({
        title: "Erro no registro",
        description: error.message || "Erro ao criar conta",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/");
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso",
      });
    } catch (error: any) {
      toast({
        title: "Erro no logout",
        description: error.message || "Erro ao fazer logout",
        variant: "destructive",
      });
    }
  };

  const handleCreateEvent = async (eventData: CreateEventData) => {
    if (!user) return;

    try {
      await createEvent(eventData);
      navigate("/");
    } catch (error) {
      console.error("Erro ao criar evento:", error);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar
          user={user}
          onLogout={handleLogout}
          onLoginClick={() => setShowAuthModal(true)}
        />

        <div className="pt-20 flex items-center justify-center flex-1">
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
            navigate("/");
          }}
          onLogin={handleLogin}
          onRegister={handleRegister}
          isLoading={false}
        />

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        user={user}
        onLogout={handleLogout}
        onLoginClick={() => setShowAuthModal(true)}
      />

      <EventForm
        onSubmit={handleCreateEvent}
        onCancel={handleCancel}
        isLoading={isCreating}
        title="Novo Evento"
      />

      <Footer />
    </div>
  );
};

export default NewEvent;
