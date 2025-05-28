
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter } from 'lucide-react';
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
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Estados principais
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simulação de dados (será substituído pela integração Supabase)
  const mockEvents: Event[] = [
    {
      id: '1',
      nome: 'Tech Conference 2024',
      data: '2024-06-15',
      descricao: 'Uma conferência incrível sobre as últimas tendências em tecnologia. Palestrantes renomados do mundo inteiro compartilhando conhecimento sobre AI, Web3, e desenvolvimento sustentável.',
      cidade: 'São Paulo',
      estado: 'SP',
      link: 'https://techconf2024.com',
      user_id: 'user1',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      nome: 'Festival de Música',
      data: '2024-07-20',
      descricao: 'Festival com artistas nacionais e internacionais. Três dias de muita música, gastronomia e entretenimento para toda a família.',
      cidade: 'Rio de Janeiro',
      estado: 'RJ',
      user_id: 'user2',
      created_at: '2024-01-16T14:30:00Z',
      updated_at: '2024-01-16T14:30:00Z'
    },
    {
      id: '3',
      nome: 'Workshop de Design',
      data: '2024-06-10',
      descricao: 'Aprenda as melhores práticas de UX/UI Design com profissionais experientes. Inclui atividades práticas e networking.',
      cidade: 'Belo Horizonte',
      estado: 'MG',
      link: 'https://designworkshop.com',
      user_id: 'user1',
      created_at: '2024-01-17T09:15:00Z',
      updated_at: '2024-01-17T09:15:00Z'
    }
  ];

  // Simulação de autenticação
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      // Simular carregamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simular usuário logado (remover quando integrar com Supabase)
      const savedUser = localStorage.getItem('mockUser');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      
      // Carregar eventos
      setEvents(mockEvents);
      setFilteredEvents(mockEvents);
      setLoading(false);
    };

    loadData();
  }, []);

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

  // Funções de autenticação (mock)
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
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso",
    });
  };

  // Funções CRUD de eventos
  const handleCreateEvent = async (eventData: any) => {
    if (!user) return;
    
    setIsSubmitting(true);
    
    // Simular criação
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newEvent: Event = {
      id: Math.random().toString(36).substr(2, 9),
      ...eventData,
      user_id: user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    setEvents(prev => [newEvent, ...prev]);
    setShowEventForm(false);
    
    toast({
      title: "Evento criado!",
      description: "Seu evento foi criado com sucesso",
    });
    
    setIsSubmitting(false);
  };

  const handleUpdateEvent = async (eventData: any) => {
    if (!editingEvent || !user) return;
    
    setIsSubmitting(true);
    
    // Simular atualização
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedEvent: Event = {
      ...editingEvent,
      ...eventData,
      updated_at: new Date().toISOString()
    };
    
    setEvents(prev => prev.map(event => 
      event.id === editingEvent.id ? updatedEvent : event
    ));
    
    setEditingEvent(null);
    setShowEventForm(false);
    
    toast({
      title: "Evento atualizado!",
      description: "As alterações foram salvas com sucesso",
    });
    
    setIsSubmitting(false);
  };

  const handleDeleteEvent = async () => {
    if (!eventToDelete || !user) return;
    
    setEvents(prev => prev.filter(event => event.id !== eventToDelete.id));
    setShowDeleteConfirm(false);
    setEventToDelete(null);
    
    toast({
      title: "Evento excluído",
      description: "O evento foi removido com sucesso",
    });
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
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Descubra Eventos Incríveis
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Encontre e participe dos melhores eventos da sua região
            </p>
          </div>

          {/* Barra de busca e ações */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar eventos, cidades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/80 backdrop-blur-sm border-white/20"
              />
            </div>
            
            <Button
              onClick={handleNewEvent}
              className="event-gradient text-white hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              <Plus className="h-4 w-4 mr-2" />
              Novo Evento
            </Button>
          </div>

          {/* Lista de eventos */}
          {filteredEvents.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
                <Search className="h-16 w-16 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {searchTerm ? 'Nenhum evento encontrado' : 'Nenhum evento disponível'}
              </h3>
              <p className="text-gray-500 mb-6">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          onSubmit={editingEvent ? handleUpdateEvent : handleCreateEvent}
          onCancel={() => {
            setShowEventForm(false);
            setEditingEvent(null);
          }}
          initialData={editingEvent || undefined}
          isLoading={isSubmitting}
          title={editingEvent ? 'Editar Evento' : 'Novo Evento'}
        />
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
        isLoading={isSubmitting}
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
