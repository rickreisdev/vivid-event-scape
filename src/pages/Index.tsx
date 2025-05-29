import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import { Event } from '@/types/event';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import EventCard from '@/components/EventCard';
import EventDetail from '@/components/EventDetail';
import EventForm from '@/components/EventForm';
import Navbar from '@/components/Navbar';
import AuthModal from '@/components/AuthModal';
import LoadingSpinner from '@/components/LoadingSpinner';
import ConfirmDialog from '@/components/ConfirmDialog';
import { useAuth } from '@/hooks/useAuth';
import { useEvents } from '@/hooks/useEvents';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signIn, signUp, signOut } = useAuth();
  const { 
    events, 
    loading, 
    createEvent, 
    updateEvent, 
    deleteEvent,
    isCreating,
    isUpdating,
    isDeleting
  } = useEvents();
  
  // Ref para o formulário de evento
  const eventFormRef = useRef<HTMLDivElement>(null);
  
  // Estados de interface
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [showEventDetail, setShowEventDetail] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null);
  
  // Estados de filtro e busca
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  // Filtrar eventos
  useEffect(() => {
    if (!searchTerm) {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(event =>
        event.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.cidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.estado.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.descricao.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
  }, [searchTerm, events]);

  // Funções de autenticação
  const handleLogin = async (email: string, password: string) => {
    try {
      await signIn(email, password);
      setShowAuthModal(false);
      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo de volta, ${email}`,
      });
    } catch (error: any) {
      toast({
        title: "Erro no login",
        description: error.message || "Erro ao fazer login",
        variant: "destructive",
      });
    }
  };

  const handleRegister = async (email: string, password: string) => {
    try {
      await signUp(email, password);
      setShowAuthModal(false);
      toast({
        title: "Conta criada com sucesso!",
        description: `Bem-vindo, ${email}`,
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

  // Funções CRUD de eventos
  const handleCreateEvent = async (eventData: any) => {
    if (!user) return;
    
    try {
      await createEvent(eventData);
      setShowEventForm(false);
    } catch (error) {
      console.error('Erro ao criar evento:', error);
    }
  };

  const handleUpdateEvent = async (eventData: any) => {
    if (!editingEvent || !user) return;
    
    try {
      await updateEvent({
        id: editingEvent.id,
        ...eventData,
      });
      setEditingEvent(null);
      setShowEventForm(false);
    } catch (error) {
      console.error('Erro ao atualizar evento:', error);
    }
  };

  const handleDeleteEvent = async () => {
    if (!eventToDelete || !user) return;
    
    try {
      await deleteEvent(eventToDelete.id);
      setShowDeleteConfirm(false);
      setEventToDelete(null);
    } catch (error) {
      console.error('Erro ao excluir evento:', error);
    }
  };

  // Handlers de interface
  const handleViewEvent = (event: Event) => {
    setSelectedEvent(event);
    setShowEventDetail(true);
  };

  const handleEditEvent = (event: Event) => {
    if (!user || event.user_id !== user.id) return;
    
    setEditingEvent(event);
    setShowEventForm(true);
    setShowEventDetail(false);
    
    // Scroll para o formulário após um pequeno delay para garantir que o formulário foi renderizado
    setTimeout(() => {
      eventFormRef.current?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 100);
  };

  const handleDeleteConfirm = (event: Event) => {
    if (!user || event.user_id !== user.id) return;
    
    setEventToDelete(event);
    setShowDeleteConfirm(true);
    setShowEventDetail(false);
  };

  const handleNewEvent = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    setEditingEvent(null);
    setShowEventForm(true);
    
    // Scroll para o formulário após um pequeno delay
    setTimeout(() => {
      eventFormRef.current?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar 
          user={user} 
          onLogout={handleLogout}
          onLoginClick={() => setShowAuthModal(true)}
        />
        <LoadingSpinner />
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

      <main className="pt-20 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              Descubra Eventos Incríveis
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Encontre e participe dos melhores eventos da sua região
            </p>
          </div>

          {/* Barra de busca e ações */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 items-stretch sm:items-center">
            <div className="relative flex-1 max-w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar eventos, cidades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/80 backdrop-blur-sm border-white/20 h-11"
              />
            </div>
            
            <Button
              onClick={handleNewEvent}
              className="event-gradient text-white hover:opacity-90 transition-opacity h-11 px-6"
            >
              <Plus className="h-4 w-4 mr-2" />
              Novo Evento
            </Button>
          </div>

          {/* Lista de eventos */}
          {filteredEvents.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
                <Search className="h-12 w-12 sm:h-16 sm:w-16 text-indigo-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
                {searchTerm ? 'Nenhum evento encontrado' : 'Nenhum evento disponível'}
              </h3>
              <p className="text-gray-500 mb-6 text-sm sm:text-base max-w-md mx-auto">
                {searchTerm 
                  ? 'Tente ajustar sua busca ou limpar os filtros'
                  : 'Seja o primeiro a criar um evento incrível!'
                }
              </p>
              {!searchTerm && (
                <Button 
                  onClick={handleNewEvent}
                  className="event-gradient text-white hover:opacity-90 transition-opacity"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Primeiro Evento
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onView={handleViewEvent}
                  onEdit={handleEditEvent}
                  onDelete={handleDeleteConfirm}
                  canEdit={user && event.user_id === user.id}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modais */}
      <EventDetail
        event={selectedEvent}
        isOpen={showEventDetail}
        onClose={() => setShowEventDetail(false)}
        onEdit={handleEditEvent}
        onDelete={handleDeleteConfirm}
        canEdit={user && selectedEvent?.user_id === user.id}
      />

      {showEventForm && (
        <EventForm
          ref={eventFormRef}
          onSubmit={editingEvent ? handleUpdateEvent : handleCreateEvent}
          onCancel={() => {
            setShowEventForm(false);
            setEditingEvent(null);
          }}
          initialData={editingEvent || undefined}
          isLoading={isCreating || isUpdating}
          title={editingEvent ? 'Editar Evento' : 'Novo Evento'}
        />
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
        isLoading={false}
      />

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteEvent}
        title="Excluir Evento"
        description={`Tem certeza que deseja excluir o evento "${eventToDelete?.nome}"? Esta ação não pode ser desfeita.`}
        confirmText="Excluir"
        isDestructive
      />
    </div>
  );
};

export default Index;
