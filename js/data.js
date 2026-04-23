const DADOS_JOGOS = [
  { id: 1, titulo: "A Lenda do Heroi", desenvolvedor: "Dumativa", ano: 2016, genero: "Plataforma", preco: 59.99, cores: ["#c97c1a", "#8b5e0a"] },
  { id: 2, titulo: "Among Us", desenvolvedor: "Innersloth", ano: 2018, genero: "Social", preco: 4.99, cores: ["#1a6b4a", "#0f4a30"] },
  { id: 3, titulo: "Assassin's Creed Valhalla", desenvolvedor: "Ubisoft", ano: 2020, genero: "Acao", preco: 49.99, cores: ["#1a4a6b", "#0f2e4a"] },
  { id: 4, titulo: "Bloodborne", desenvolvedor: "FromSoftware", ano: 2015, genero: "RPG", preco: 19.99, cores: ["#1a3a6b", "#2d1a6b"] },
  { id: 5, titulo: "Call of Duty: Modern Warfare", desenvolvedor: "Activision", ano: 2019, genero: "Tiro", preco: 89.99, cores: ["#2a5a8a", "#1a3a5a"] },
  { id: 6, titulo: "Counter-Strike 2", desenvolvedor: "Valve", ano: 2023, genero: "Tiro", preco: 0, cores: ["#3a7a2a", "#1a4a0a"] },
  { id: 7, titulo: "Elden Ring", desenvolvedor: "FromSoftware", ano: 2022, genero: "RPG", preco: 179.99, cores: ["#6b4a1a", "#4a2a0a"] },
  { id: 8, titulo: "FIFA 24", desenvolvedor: "EA Sports", ano: 2023, genero: "Esportes", preco: 299.99, cores: ["#1a2a6b", "#0a1a4a"] },
  { id: 9, titulo: "Hollow Knight", desenvolvedor: "Team Cherry", ano: 2017, genero: "Indie", preco: 29.99, cores: ["#2a1a4a", "#1a0a2a"] },
  { id: 10, titulo: "It Takes Two", desenvolvedor: "Hazelight", ano: 2021, genero: "Aventura", preco: 89.99, cores: ["#6b2a1a", "#4a1a0a"] },
  { id: 11, titulo: "League of Legends", desenvolvedor: "Riot Games", ano: 2009, genero: "Estrategia", preco: 0, cores: ["#1a4a6b", "#0a2a4a"] },
  { id: 12, titulo: "Minecraft", desenvolvedor: "Mojang", ano: 2011, genero: "Sandbox", preco: 99.99, cores: ["#4a6b2a", "#2a4a0a"] },
  { id: 13, titulo: "Mortal Kombat 1", desenvolvedor: "NetherRealm", ano: 2023, genero: "Luta", preco: 249.99, cores: ["#6b1a1a", "#4a0a0a"] },
  { id: 14, titulo: "Phasmophobia", desenvolvedor: "Kinetic Games", ano: 2020, genero: "Horror", preco: 39.99, cores: ["#2a2a4a", "#0a0a2a"] },
  { id: 15, titulo: "Portal 2", desenvolvedor: "Valve", ano: 2011, genero: "Puzzle", preco: 14.99, cores: ["#4a6b6b", "#1a4a4a"] },
  { id: 16, titulo: "Rocket League", desenvolvedor: "Psyonix", ano: 2015, genero: "Esportes", preco: 0, cores: ["#6b3a1a", "#4a1a0a"] },
  { id: 17, titulo: "The Witcher 3", desenvolvedor: "CD Projekt Red", ano: 2015, genero: "RPG", preco: 49.99, cores: ["#3a5a1a", "#1a3a0a"] },
  { id: 18, titulo: "Valorant", desenvolvedor: "Riot Games", ano: 2020, genero: "Tiro", preco: 0, cores: ["#6b1a2a", "#4a0a1a"] },
  { id: 19, titulo: "VRChat", desenvolvedor: "VRChat Inc.", ano: 2017, genero: "VR", preco: 0, cores: ["#3a1a6b", "#1a0a4a"] },
  { id: 20, titulo: "Celeste", desenvolvedor: "Extremely OK Games", ano: 2018, genero: "Plataforma", preco: 39.99, cores: ["#6b1a4a", "#4a0a2a"] }
];

const GENEROS = [
  "Todos", "Acao", "Aventura", "Corrida", "Esportes",
  "Estrategia", "Horror", "Indie", "Luta", "Plataforma",
  "Puzzle", "RPG", "Sandbox", "Simulacao", "Social", "Tiro", "VR"
];