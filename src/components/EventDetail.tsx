
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto glass-effect border-white/20 m-4 max-w-[calc(100vw-2rem)]">
        <DialogHeader className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900 flex-1 leading-tight">
              {event.nome}
            </DialogTitle>
            {canEdit && (
              <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit?.(event)}
                  className="text-indigo-600 border-indigo-200 hover:bg-indigo-50 text-xs sm:text-sm h-8 px-3"
                >
                  <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onDelete?.(event)}
                  className="text-red-600 border-red-200 hover:bg-red-50 text-xs sm:text-sm h-8 px-3"
                >
                  <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  Excluir
                </Button>
              </div>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          <div className="flex items-center space-x-3 p-3 sm:p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100">
            <Calendar className="h-5 w-5 text-indigo-600 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-600">Data do evento</p>
              <p className="font-semibold text-gray-900 capitalize text-sm sm:text-base leading-tight">
                {formatDate(event.data)}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
            <MapPin className="h-5 w-5 text-purple-600 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-600">Localização</p>
              <p className="font-semibold text-gray-900 text-sm sm:text-base leading-tight">
                {event.cidade}, {event.estado}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-gray-600" />
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Descrição</h3>
            </div>
            <div className="p-3 sm:p-4 bg-gray-50 rounded-lg border">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
                {event.descricao}
              </p>
            </div>
          </div>

          {event.link && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <ExternalLink className="h-5 w-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Link Relacionado</h3>
              </div>
              <Button
                variant="outline"
                onClick={() => window.open(event.link, '_blank')}
                className="w-full justify-start text-indigo-600 border-indigo-200 hover:bg-indigo-50 h-11"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                <span className="truncate">Abrir Link</span>
              </Button>
            </div>
          )}

          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 leading-relaxed">
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
