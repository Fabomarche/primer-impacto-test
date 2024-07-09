export interface VideoGame {
  id: number;
  name: string;
  genre: string;
  releaseDate: Date;
  metacriticScore: number;
}

class AppRepository {
  private videoGames: VideoGame[];

  constructor() {
    this.videoGames = [
      {
        id: 1,
        name: 'Super Mario Odyssey',
        genre: 'Platformer',
        releaseDate: new Date('2017-10-27'),
        metacriticScore: 97,
      },
      {
        id: 2,
        name: 'The Legend of Zelda: Breath of the Wild',
        genre: 'Action-adventure',
        releaseDate: new Date('2017-03-03'),
        metacriticScore: 97,
      },
      {
        id: 3,
        name: 'Red Dead Redemption 2',
        genre: 'Action-adventure',
        releaseDate: new Date('2018-10-26'),
        metacriticScore: 97,
      },
      {
        id: 4,
        name: 'The Witcher 3: Wild Hunt',
        genre: 'Action RPG',
        releaseDate: new Date('2015-05-19'),
        metacriticScore: 93,
      },
      {
        id: 5,
        name: 'Persona 5 Royal',
        genre: 'JRPG',
        releaseDate: new Date('2020-03-31'),
        metacriticScore: 95,
      },
      {
        id: 6,
        name: 'Hades',
        genre: 'Roguelike',
        releaseDate: new Date('2020-09-17'),
        metacriticScore: 93,
      },
    ];
  }

  public getAllVideoGames(): VideoGame[] {
    return this.videoGames;
  }

  public getVideoGameById(id: number): VideoGame | undefined {
    return this.videoGames.find((game) => game.id === id);
  }

  public addVideoGame(videoGame: VideoGame): void {
    this.videoGames.push(videoGame);
  }

  public updateVideoGame(videoGame: VideoGame): void {
    const index = this.videoGames.findIndex((game) => game.id === videoGame.id);
    if (index !== -1) {
      this.videoGames[index] = videoGame;
    }
  }

  public deleteVideoGame(id: number): void {
    const index = this.videoGames.findIndex((game) => game.id === id);
    if (index !== -1) {
      this.videoGames.splice(index, 1);
    }
  }
}

export default AppRepository;
