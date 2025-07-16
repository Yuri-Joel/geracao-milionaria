import { create } from 'zustand';

interface Projeto {
  nome: string;
  descricao: string;
  imagem: string;
}

interface DataState {
  titulo: string;
  descricao: string;
  projetos: Projeto[];
  carregar: () => Promise<void>;
}

export const useDataStore = create<DataState>((set) => ({
  titulo: '',
  descricao: '',
  projetos: [],
  carregar: async () => {
    const res = await fetch('/data.json');
    const json = await res.json();
    set({
      titulo: json.titulo,
      descricao: json.descricao,
      projetos: json.projetos,
    });
  },
}));
