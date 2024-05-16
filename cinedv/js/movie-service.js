export class Movies{
	
	static async getApi(){
		const url = 'https://moviesverse1.p.rapidapi.com/most-popular-movies';
		const options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': '634bd87a92msh6104c4ab10758c1p1bf9a8jsn93a4ca1cb312',
				'X-RapidAPI-Host': 'moviesverse1.p.rapidapi.com'
			}
		};

		let loadingElement = document.querySelector('#loading')
		const elementos = document.querySelector("#posts-container"); 
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(data);
			let moviesData = [];
			for (let i = 0; i < 9; i++){
				moviesData.push(data.movies[i]);
			}
			loadingElement.classList.add("hide");
			return moviesData;
	}

}