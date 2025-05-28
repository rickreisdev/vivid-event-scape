
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, FileText, Link as LinkIcon, Save, X } from 'lucide-react';
import { CreateEventData, Event } from '@/types/event';

interface EventFormProps {
  onSubmit: (data: CreateEventData) => void;
  onCancel: () => void;
  initialData?: Event;
  isLoading?: boolean;
  title?: string;
}

const EventForm: React.FC<EventFormProps> = ({ 
  onSubmit, 
  onCancel, 
  initialData, 
  isLoading = false,
  title = "Novo Evento"
}) => {
  const [formData, setFormData] = useState<CreateEventData>({
    nome: '',
    data: '',
    descricao: '',
    cidade: '',
    estado: '',
    link: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        nome: initialData.nome,
        data: initialData.data,
        descricao: initialData.descricao,
        cidade: initialData.cidade,
        estado: initialData.estado,
        link: initialData.link || ''
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.data) {
      newErrors.data = 'Data é obrigatória';
    }

    if (!formData.descricao.trim()) {
      newErrors.descricao = 'Descrição é obrigatória';
    }

    if (!formData.cidade.trim()) {
      newErrors.cidade = 'Cidade é obrigatória';
    }

    if (!formData.estado.trim()) {
      newErrors.estado = 'Estado é obrigatório';
    }

    if (formData.link && !formData.link.match(/^https?:\/\/.+/)) {
      newErrors.link = 'Link deve ser uma URL válida (começar com http:// ou https://)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof CreateEventData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="glass-effect border-white/20 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {title}
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nome" className="flex items-center text-gray-700 font-medium">
                  <FileText className="h-4 w-4 mr-2 text-indigo-500" />
                  Nome do Evento
                </Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => handleChange('nome', e.target.value)}
                  placeholder="Digite o nome do evento"
                  className={`transition-colors ${errors.nome ? 'border-red-300 focus:border-red-500' : 'focus:border-indigo-500'}`}
                />
                {errors.nome && <p className="text-sm text-red-600">{errors.nome}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="data" className="flex items-center text-gray-700 font-medium">
                  <Calendar className="h-4 w-4 mr-2 text-purple-500" />
                  Data do Evento
                </Label>
                <Input
                  id="data"
                  type="date"
                  value={formData.data}
                  onChange={(e) => handleChange('data', e.target.value)}
                  className={`transition-colors ${errors.data ? 'border-red-300 focus:border-red-500' : 'focus:border-indigo-500'}`}
                />
                {errors.data && <p className="text-sm text-red-600">{errors.data}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cidade" className="flex items-center text-gray-700 font-medium">
                    <MapPin className="h-4 w-4 mr-2 text-green-500" />
                    Cidade
                  </Label>
                  <Input
                    id="cidade"
                    value={formData.cidade}
                    onChange={(e) => handleChange('cidade', e.target.value)}
                    placeholder="São Paulo"
                    className={`transition-colors ${errors.cidade ? 'border-red-300 focus:border-red-500' : 'focus:border-indigo-500'}`}
                  />
                  {errors.cidade && <p className="text-sm text-red-600">{errors.cidade}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estado" className="text-gray-700 font-medium">
                    Estado
                  </Label>
                  <Input
                    id="estado"
                    value={formData.estado}
                    onChange={(e) => handleChange('estado', e.target.value)}
                    placeholder="SP"
                    className={`transition-colors ${errors.estado ? 'border-red-300 focus:border-red-500' : 'focus:border-indigo-500'}`}
                  />
                  {errors.estado && <p className="text-sm text-red-600">{errors.estado}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao" className="text-gray-700 font-medium">
                  Descrição
                </Label>
                <Textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => handleChange('descricao', e.target.value)}
                  placeholder="Descreva seu evento..."
                  rows={4}
                  className={`resize-none transition-colors ${errors.descricao ? 'border-red-300 focus:border-red-500' : 'focus:border-indigo-500'}`}
                />
                {errors.descricao && <p className="text-sm text-red-600">{errors.descricao}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="link" className="flex items-center text-gray-700 font-medium">
                  <LinkIcon className="h-4 w-4 mr-2 text-blue-500" />
                  Link (opcional)
                </Label>
                <Input
                  id="link"
                  type="url"
                  value={formData.link}
                  onChange={(e) => handleChange('link', e.target.value)}
                  placeholder="https://exemplo.com"
                  className={`transition-colors ${errors.link ? 'border-red-300 focus:border-red-500' : 'focus:border-indigo-500'}`}
                />
                {errors.link && <p className="text-sm text-red-600">{errors.link}</p>}
              </div>

              <div className="flex space-x-4 pt-6">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 event-gradient text-white hover:opacity-90 transition-opacity"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Salvando...
                    </div>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Evento
                    </>
                  )}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  disabled={isLoading}
                  className="flex-1"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventForm;
