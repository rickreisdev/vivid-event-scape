
import React from 'react';
import { X, Calendar, MapPin, FileText, ExternalLink, Edit, Trash2 } from 'lucide-react';
import { Event } from '@/types/event';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface EventDetailProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (event: Event) => void;
  onDelete?: (event: Event) => void;
  canEdit?: boolean;
}

const EventDetail: React.FC<EventDetailProps> = ({ 
  event, 
  isOpen, 
  onClose, 
  onEdit, 
  onDelete, 
  canEdit = false 
}) => {
  if (!event) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto glass-effect border-white/20">
        <DialogHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <DialogTitle className="text-2xl font-bold text-gray-900 pr-8">
              {event.nome}
            </DialogTitle>
            {canEdit && (
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit?.(event)}
                  className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onDelete?.(event)}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Excluir
                </Button>
              </div>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100">
            <Calendar className="h-5 w-5 text-indigo-600" />
            <div>
              <p className="text-sm text-gray-600">Data do evento</p>
              <p className="font-semibold text-gray-900 capitalize">
                {formatDate(event.data)}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
            <MapPin className="h-5 w-5 text-purple-600" />
            <div>
              <p className="text-sm text-gray-600">Localização</p>
              <p className="font-semibold text-gray-900">
                {event.cidade}, {event.estado}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-gray-600" />
              <h3 className="font-semibold text-gray-900">Descrição</h3>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {event.descricao}
              </p>
            </div>
          </div>

          {event.link && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <ExternalLink className="h-5 w-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Link Relacionado</h3>
              </div>
              <Button
                variant="outline"
                onClick={() => window.open(event.link, '_blank')}
                className="w-full justify-start text-indigo-600 border-indigo-200 hover:bg-indigo-50"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Abrir Link
              </Button>
            </div>
          )}

          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Criado em {new Date(event.created_at).toLocaleDateString('pt-BR')}
              {event.updated_at !== event.created_at && (
                <span> • Atualizado em {new Date(event.updated_at).toLocaleDateString('pt-BR')}</span>
              )}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetail;
