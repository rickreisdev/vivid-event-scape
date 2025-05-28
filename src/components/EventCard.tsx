
import React from 'react';
import { Calendar, MapPin, ExternalLink, Edit, Trash2 } from 'lucide-react';
import { Event } from '@/types/event';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface EventCardProps {
  event: Event;
  onView: (event: Event) => void;
  onEdit?: (event: Event) => void;
  onDelete?: (event: Event) => void;
  canEdit?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  onView, 
  onEdit, 
  onDelete, 
  canEdit = false 
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <Card className="event-card-hover cursor-pointer group overflow-hidden glass-effect border-white/20">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardHeader className="relative">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
            {event.nome}
          </h3>
          {canEdit && (
            <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.(event);
                }}
                className="h-8 w-8 p-0 hover:bg-indigo-100"
              >
                <Edit className="h-4 w-4 text-indigo-600" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.(event);
                }}
                className="h-8 w-8 p-0 hover:bg-red-100"
              >
                <Trash2 className="h-4 w-4 text-red-600" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent 
        className="relative cursor-pointer"
        onClick={() => onView(event)}
      >
        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-indigo-500" />
            <span className="text-sm">{formatDate(event.data)}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-purple-500" />
            <span className="text-sm">{event.cidade}, {event.estado}</span>
          </div>
          
          <p className="text-gray-700 text-sm line-clamp-3 leading-relaxed">
            {event.descricao}
          </p>
        </div>
      </CardContent>

      <CardFooter className="relative pt-4">
        <div className="flex items-center justify-between w-full">
          <Button 
            onClick={() => onView(event)}
            variant="outline" 
            size="sm"
            className="group-hover:border-indigo-300 group-hover:text-indigo-600 transition-colors"
          >
            Ver Detalhes
          </Button>
          
          {event.link && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                window.open(event.link, '_blank');
              }}
              className="text-gray-500 hover:text-indigo-600"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
