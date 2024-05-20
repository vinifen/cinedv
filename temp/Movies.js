export class Movies{
	
	async getMoviesApi(){
		const url = 'https://moviesverse1.p.rapidapi.com/most-popular-movies';
		const options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': '634bd87a92msh6104c4ab10758c1p1bf9a8jsn93a4ca1cb312',
				'X-RapidAPI-Host': 'moviesverse1.p.rapidapi.com'
			}
		};
		
		try {
			const response = await fetch(url, options);
			const result = await response.json();
			return result.movies;
		} catch (error) {
			return [];
		}
	}

	async getAPI(){
		const api = await this.getMoviesApi();
		return api;
	}

	async selectedMovies(){
		try{
			const allMovies = await this.getMoviesApi();
			console.log(allMovies);
			let moviesData = [];
			let moviesNumber = 9;
			for (let i = 0; i < moviesNumber; i++){
				moviesData.push(allMovies.movies[i]);
			}
			return moviesData;
		} catch(error){
			return [];
		}
	}

	movieTitle(){
		return this.getMoviesApi()
	}

	async api1(){
		try {
			const api = await this.getAPI();
			return api;
		} catch (error) {
			return [];
		}
	}

	async api2(){
		try {
			const api = this.api1();
			return api;
		} catch (error) {
			return [];
		}
	}

	async api3(){
		try {
			const api = await this.getAPI();
			return api;
		} catch (error) {
			return [];
		}
	}

	async api4(){
		return this.api2();
	}
}



