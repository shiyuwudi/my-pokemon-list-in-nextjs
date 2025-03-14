export interface IPokemonList {
  count: number;
  next: string;
  previous?: any;
  results: IPokemonItem[];
}

export interface IPokemonItem {
  name: string;
  url: string;
}

export interface ITypes {
  count: number;
  next: string;
  previous?: any;
  results: ITypesItem[];
}

export interface ITypesItem {
  name: string;
  url: string;
}

export interface IPokemonType {
  damage_relations: Damagerelations;
  game_indices: Gameindex[];
  generation: Doubledamagefrom;
  id: number;
  move_damage_class: Doubledamagefrom;
  moves: Doubledamagefrom[];
  name: string;
  names: Name[];
  past_damage_relations: any[];
  pokemon: Pokemon[];
  sprites: Sprites;
}

export interface Sprites {
  'generation-iii': Generationiii;
  'generation-iv': Generationiv;
  'generation-ix': Generationix;
  'generation-v': Generationv;
  'generation-vi': Generationvi;
  'generation-vii': Generationvii;
  'generation-viii': Generationviii;
}

export interface Generationviii {
  'brilliant-diamond-and-shining-pearl': Colosseum;
  'legends-arceus': Colosseum;
  'sword-shield': Colosseum;
}

export interface Generationvii {
  'lets-go-pikachu-lets-go-eevee': Colosseum;
  'sun-moon': Colosseum;
  'ultra-sun-ultra-moon': Colosseum;
}

export interface Generationvi {
  'omega-ruby-alpha-sapphire': Colosseum;
  'x-y': Colosseum;
}

export interface Generationv {
  'black-2-white-2': Colosseum;
  'black-white': Colosseum;
}

export interface Generationix {
  'scarlet-violet': Colosseum;
}

export interface Generationiv {
  'diamond-pearl': Colosseum;
  'heartgold-soulsilver': Colosseum;
  platinum: Colosseum;
}

export interface Generationiii {
  colosseum: Colosseum;
  emerald: Colosseum;
  'firered-leafgreen': Colosseum;
  'ruby-saphire': Colosseum;
  xd: Colosseum;
}

export interface Colosseum {
  name_icon: string;
}

export interface Pokemon {
  pokemon: Doubledamagefrom;
  slot: number;
}

export interface Name {
  language: Doubledamagefrom;
  name: string;
}

export interface Gameindex {
  game_index: number;
  generation: Doubledamagefrom;
}

export interface Damagerelations {
  double_damage_from: Doubledamagefrom[];
  double_damage_to: Doubledamagefrom[];
  half_damage_from: Doubledamagefrom[];
  half_damage_to: Doubledamagefrom[];
  no_damage_from: any[];
  no_damage_to: any[];
}

export interface Doubledamagefrom {
  name: string;
  url: string;
}