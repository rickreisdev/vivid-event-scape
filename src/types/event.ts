
export interface Event {
  id: string;
  nome: string;
  data: string;
  descricao: string;
  cidade: string;
  estado: string;
  link?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateEventData {
  nome: string;
  data: string;
  descricao: string;
  cidade: string;
  estado: string;
  link?: string;
}

export interface UpdateEventData extends CreateEventData {
  id: string;
}
