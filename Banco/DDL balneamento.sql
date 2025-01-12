-- Criação da tabela de usuários
create table public.usuarios (
  id serial primary key,
  nome varchar(255) not null,
  email varchar(255) not null unique,
  senha varchar(100) not null
);

-- Criação da tabela de estados
create table public.estados (
  id serial primary key,
  nome varchar(100) not null
);

-- Criação da tabela de campanhas de balneamento
create table public.campanhas_balneamento (
  id serial primary key,
  id_usuario_criador integer not null,
  nome varchar(150) not null,
  data_inicio timestamp not null,
  data_fim timestamp not null,
  id_estado integer not null,
  foreign key (id_usuario_criador) references public.usuarios (id),
  foreign key (id_estado) references public.estados (id)
);

-- Criação da tabela de cidades
create table public.cidades (
  id serial primary key,
  nome varchar(150) not null,
  id_estado integer not null,
  foreign key (id_estado) references public.estados (id)
);

-- Criação da tabela de pontos de coleta
create table public.pontos_coleta (
  id serial primary key,
  id_cidade integer not null,
  nome varchar(255) not null,
  latitude varchar(50) not null,
  longitude varchar(50) not null,
  tipo varchar(100) not null,
  descricao varchar(500),
  foreign key (id_cidade) references public.cidades (id)
);

-- Criação da tabela de boletins
create table public.boletins (
  id serial primary key,
  data_coleta timestamp not null,
  qualidade_agua varchar(50) not null,
  observacao varchar(500),
  id_ponto_coleta integer not null,
  id_usuario_criador integer not null,
  id_campanha integer not null,
  foreign key (id_usuario_criador) references public.usuarios (id),
  foreign key (id_campanha) references public.campanhas_balneamento (id),
  foreign key (id_ponto_coleta) references public.pontos_coleta (id)
);


