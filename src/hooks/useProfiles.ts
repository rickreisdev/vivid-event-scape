
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

interface CreateProfileData {
  name: string;
}

export const useProfiles = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: async (): Promise<Profile | null> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });

  const createProfileMutation = useMutation({
    mutationFn: async (profileData: CreateProfileData): Promise<Profile> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('profiles')
        .insert([{
          id: user.id,
          name: profileData.name,
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error) => {
      console.error('Erro ao criar perfil:', error);
      toast({
        title: "Erro ao criar perfil",
        description: "Ocorreu um erro ao criar o perfil. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  return {
    profile: profileQuery.data,
    isLoadingProfile: profileQuery.isLoading,
    createProfile: createProfileMutation.mutateAsync,
    isCreatingProfile: createProfileMutation.isPending,
  };
};
