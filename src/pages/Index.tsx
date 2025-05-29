import React, { useState, useEffect } from 'react';
import { Plus, Calendar, MapPin, User, LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useEvents } from '@/hooks/useEvents';
import { useToast } from '@/hooks/use-toast';
import EventCard from '@/components/EventCard';
import EventDetail from '@/components/EventDetail';
import EventForm from '@/components/EventForm';
import AuthModal from '@/components/AuthModal';
import ConfirmDialog from '@/components/ConfirmDialog';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Event, CreateEventData, UpdateEventData } from '@/types/event';
import { Link } from 'react-router-dom';

const Index = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null);

  const { toast } = useToast();
  const { user, profile, signIn, signUp, signOut } = useAuth();
  const { events, loading, createEvent, updateEvent, deleteEvent, isCreating, isUpdating, isDeleting } = useEvents();
  

  useEffect(() => {
    document.title = 'EventosBR - Encontre os melhores eventos perto de você';
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      await signIn(email, password);
      setShowAuthModal(false);
      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo de volta${profile?.name ? `, ${profile.name}` : ''}`,
      });
    } catch (error: any) {
      toast({
        title: "Erro no login",
        description: error.message || "Erro ao fazer login",
        variant: "destructive",
      });
    }
  };

  const handleRegister = async (email: string, password: string, name: string) => {
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

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(null);
    setEditingEvent(event);
  };

  const handleUpdateEvent = async (eventData: CreateEventData) => {
    if (!editingEvent) return;
    
    try {
      const updateData: UpdateEventData = {
        id: editingEvent.id,
        ...eventData
      };
      await updateEvent(updateData);
      setEditingEvent(null);
    } catch (error) {
      console.error('Erro ao atualizar evento:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingEvent(null);
  };

  const handleDeleteClick = (event: Event) => {
    setEventToDelete(event);
    setShowDeleteDialog(true);
    setSelectedEvent(null);
  };

  const handleConfirmDelete = async () => {
    if (!eventToDelete) return;
    
    try {
      await deleteEvent(eventToDelete.id);
      setShowDeleteDialog(false);
      setEventToDelete(null);
    } catch (error) {
      console.error('Erro ao excluir evento:', error);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setEventToDelete(null);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Calendar className="h-8 w-8 text-indigo-400" />
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                EventosBR
              </h1>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              {user ? (
                <>
                  <span className="hidden sm:block text-sm text-gray-300">
                    Olá, {profile?.name || user.email}
                  </span>
                  <Link to="/novo-evento">
                    <Button size="sm" className="event-gradient text-white hover:opacity-90 transition-opacity">
                      <Plus className="h-4 w-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Novo Evento</span>
                      <span className="sm:hidden">Novo</span>
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleLogout}
                    className="text-gray-300 border-gray-600 hover:bg-white/10 hover:text-white"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden sm:inline ml-2">Sair</span>
                  </Button>
                </>
              ) : (
                <Button
                  size="sm"
                  onClick={() => setShowAuthModal(true)}
                  className="event-gradient text-white hover:opacity-90 transition-opacity"
                >
                  <LogIn className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Entrar</span>
                  <span className="sm:hidden">Login</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
          <div className="text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-lg">
              Descubra Eventos
              <span className="block bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
                Incríveis
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-200 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4 drop-shadow-md">
              Conecte-se com experiências únicas e encontre eventos que transformam momentos em memórias inesquecíveis
            </p>
            
            {!user && (
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
                <Button
                  size="lg"
                  onClick={() => setShowAuthModal(true)}
                  className="w-full sm:w-auto event-gradient text-white hover:opacity-90 transition-opacity shadow-lg"
                >
                  <User className="h-5 w-5 mr-2" />
                  Começar Agora
                </Button>
                <p className="text-sm text-gray-300">
                  Faça login para criar e gerenciar seus eventos
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Floating elements for visual appeal */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-indigo-500/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"></div>
      </section>

      {/* Events Section */}
      <section className="py-8 sm:py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg">
              Eventos em Destaque
            </h3>
            <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto drop-shadow-md">
              Explore uma seleção cuidadosa de eventos que prometem experiências extraordinárias
            </p>
          </div>

          {events.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <Calendar className="h-16 w-16 sm:h-24 sm:w-24 text-gray-400 mx-auto mb-4 sm:mb-6" />
              <h4 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-4 drop-shadow-lg">
                Nenhum evento encontrado
              </h4>
              <p className="text-gray-300 mb-6 sm:mb-8 max-w-md mx-auto px-4">
                Seja o primeiro a compartilhar um evento incrível com nossa comunidade!
              </p>
              {user && (
                <Link to="/novo-evento">
                  <Button className="event-gradient text-white hover:opacity-90 transition-opacity">
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Primeiro Evento
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onView={() => setSelectedEvent(event)}
                  onEdit={handleEditEvent}
                  onDelete={handleDeleteClick}
                  canEdit={user?.id === event.user_id}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Event Detail Modal */}
      <EventDetail
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onEdit={handleEditEvent}
        onDelete={handleDeleteClick}
        canEdit={user?.id === selectedEvent?.user_id}
      />

      {/* Edit Event Form */}
      {editingEvent && (
        <EventForm
          onSubmit={handleUpdateEvent}
          onCancel={handleCancelEdit}
          initialData={editingEvent}
          isLoading={isUpdating}
          title="Editar Evento"
        />
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
        isLoading={false}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Excluir Evento"
        description={`Tem certeza que deseja excluir o evento "${eventToDelete?.nome}"? Esta ação não pode ser desfeita.`}
        confirmText="Excluir"
        cancelText="Cancelar"
        isDestructive={true}
      />
    </div>
  );
};

export default Index;
