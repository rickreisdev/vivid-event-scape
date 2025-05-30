# EventosBR

## Sobre o Projeto

EventosBR é uma plataforma moderna para gerenciamento e descoberta de eventos. Este projeto foi desenvolvido como parte de um estudo prático sobre desenvolvimento de software utilizando ferramentas modernas de IA, como Lovable e as funcionalidades do Cursor, demonstrando a integração eficiente entre desenvolvimento tradicional e assistência por IA.

**Link do Projeto no Lovable**: https://lovable.dev/projects/6f7a3e45-e08f-4ea5-a0a2-3447e3ee93da

## Como Executar o Projeto Localmente

Para trabalhar com o código localmente, você precisará ter Node.js & npm instalados - [instale usando nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Siga estes passos:

```sh
# Passo 1: Clone o repositório usando a URL do Git do projeto
git clone <URL_DO_GIT>

# Passo 2: Navegue até o diretório do projeto
cd <NOME_DO_PROJETO>

# Passo 3: Instale as dependências necessárias
npm i

# Passo 4: Inicie o servidor de desenvolvimento com auto-reload e preview instantâneo
npm run dev
```

## Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias e ferramentas:

### Stack Principal
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase (Autenticação e Banco de Dados)

### Ferramentas de Desenvolvimento
- Lovable (Desenvolvimento Assistido por IA)
- Cursor (IDE)
- ChatGPT
- Claude (Engenharia de Prompts)

## Configuração do Ambiente

### Variáveis de Ambiente

1. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
VITE_SUPABASE_URL=sua_url_do_projeto
VITE_SUPABASE_ANON_KEY=sua_chave_anon
```

Para obter estes valores:
1. Acesse o painel do Supabase
2. Navegue até Project Settings -> API
3. Copie os valores de "Project URL" e "anon public" para as respectivas variáveis

### Configuração do Banco de Dados

No Supabase, você precisará criar duas tabelas: `eventos` e `profiles`. Execute os seguintes comandos SQL no Editor SQL do Supabase:

#### Tabela 'eventos'
```sql
create table public.eventos (
  id uuid not null default gen_random_uuid (),
  nome text not null,
  data date not null,
  descricao text not null,
  cidade text not null,
  estado text not null,
  link text null,
  created_at timestamp without time zone not null default now(),
  updated_at timestamp without time zone null,
  user_id uuid not null default gen_random_uuid (),
  constraint eventos_pkey primary key (id)
) TABLESPACE pg_default;

create trigger update_eventos_updated_at BEFORE
update on eventos for EACH row
execute FUNCTION update_updated_at_column ();
```

#### Tabela 'profiles'
```sql
create table public.profiles (
  id uuid not null,
  name text not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint profiles_pkey primary key (id),
  constraint profiles_id_fkey foreign KEY (id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;

create trigger update_profiles_updated_at BEFORE
update on profiles for EACH row
execute FUNCTION update_updated_at_column ();
```

> **Importante**: Certifique-se de que o arquivo `.env` está listado no `.gitignore` para não expor suas credenciais.
